---
id: live-audio-translation
title: Live audio translation
sidebar_label: Live audio translation
---

Live audio translation is a speech-to-speech dubbing feature. A listener
subscribes to a speaker in a target language. The Jitsi Videobridge (JVB)
forwards the Opus audio of that speaker to a translation service over a
WebSocket. As a synthetic source, the service sends the translation back into
the conference. The synthetic source ducks or mutes the original audio for
that listener.

The `/translate` endpoint of
[opus-transcriber-proxy](https://github.com/jitsi/opus-transcriber-proxy) is
the reference implementation. The same project also provides
[bridge-based transcription](transcription.md).

:::note Not the same as transcript translation
This feature differs from the older "translated captions" feature
(`transcription.translationEnabled`). That feature translates text
transcripts on the client. This feature produces translated speech, not text.
:::

```
                                   ┌────────────────────────┐
 speaker audio  ──────Opus──►  JVB │ ──WebSocket──► translation  │ ──► OpenAI realtime
                                   │      service (per source)   │      translations API
 translated audio ◄────────────────                         │ ◄──
                              (synthetic source, per listener language)
                                   └────────────────────────┘
```

Configure four pieces:

1. **Translation service** — the proxy itself, running in translation mode.
2. **Prosody** — the `audio_translation` component that collects per-listener
   subscriptions and aggregates them for Jicofo.
3. **Jicofo** — point the bridge at the service URL and choose a connect mode.
4. **config.js** — enable the feature (and its UI) in the jitsi-meet client.

A fifth part is optional: usage reporting, which meters the translated audio
and attributes it to a customer.

---

## 1. Running the translation service

The same opus-transcriber-proxy process, or image, that serves transcription
also serves live audio translation, on the `/translate` endpoint instead of
`/transcribe`. For speech-to-speech translation, the service calls the
realtime translations endpoint that OpenAI names `gpt-realtime-translate`.

| Variable | Default | Description |
|---|---|---|
| `ENABLE_TRANSLATE` | `true` | Enable the `/translate` endpoint (disabled → its WebSocket upgrade is rejected with 404) |
| `TRANSLATE_TRANSCRIPTS` | `true` | Also emit target-language transcripts (`false` → translated audio only) |
| `OPENAI_TRANSLATION_MODEL` | `gpt-realtime-translate` | Speech-to-speech translation model |
| `OPENAI_TRANSLATION_API_KEY` | (falls back to `OPENAI_API_KEY`) | Separate API key/quota for translation |
| `TRANSLATION_USAGE_URL` | (unset) | Endpoint that receives translated-audio duration usage reports; unset → a no-op |
| `TRANSLATION_USAGE_REPORT_INTERVAL_MS` | `15000` | Interval between incremental usage reports for an open translation |
| `TRANSLATION_TALK_SILENCE_TIMEOUT_MS` | `350` | Silence before a translated "talk" ends and a `sending=false` notification is emitted |

### As a standalone container

Use the same prebuilt image as transcription
([`jitsi/opus-transcriber-proxy`](https://hub.docker.com/r/jitsi/opus-transcriber-proxy))
and add the translation environment variables. The image serves both
`/transcribe` and `/translate` on the same port:

```bash
docker run -d --name transcriber \
  -p 9090:8080 \
  -e OPENAI_API_KEY=<your-key> \
  -e OPENAI_TRANSLATION_MODEL=gpt-realtime-translate \
  jitsi/opus-transcriber-proxy:latest
```

The bridge connects to `ws://<host>:9090/translate`. Put it behind a TLS
reverse proxy if the bridge reaches it over `wss://`.

### In Cloudflare (CF)

The `/translate` endpoint runs entirely inside the Worker isolate. Unlike
`/transcribe`, this path needs no container and no Durable Object. The
production `wrangler.jsonc` binds both endpoints on the same Worker, so the
transcription deploy command (`npm run cf:deploy`) also deploys `/translate`.
You do not need a separate deploy step.

To test `/translate` alone, run this command. It skips the container image
build:

```bash
npx wrangler dev --config wrangler.translate.jsonc
```

`wrangler.translate.jsonc` is for development only. It omits `containers` and
`durable_objects`, and it does not serve `/transcribe`.

---

## 2. Prosody configuration

`mod_audio_translation_component.lua` is a separate Prosody component.
Prosody does not load it directly on the MUC. The component collects the
`<senderId, language>` subscription of each listener. It aggregates the
subscriptions into `audioTranslationRequests` and exposes that map to Jicofo
only, through RoomMetadata. `mod_room_metadata_component` forwards the map
only to jicofo and admin occupants, and it never sends the map to regular
clients.

Enable it as its own component in `prosody.cfg.lua`:

```lua
Component "audiotranslation.jitmeet.example.com" "audio_translation_component"
    muc_component = "conference.jitmeet.example.com"
    breakout_rooms_component = "breakout.jitmeet.example.com" -- optional

    -- Optional: cap distinct subscriptions per listener (unlimited by default)
    -- audio_translation_max_subscriptions = 10

    -- Optional: debounce window for aggregate/listener publishes (default 0.5s)
    -- audio_translation_debounce_interval = 0.5
```

Restart prosody afterward:

```bash
systemctl restart prosody
```

### Permissions

Two permissions gate the feature, both enabled for everyone by default in
`jitsi_default_permissions` (`mod_jitsi_permissions.lua`), same as
`transcription`:

| Permission | Default | Governs |
|---|---|---|
| `live-translation` | `true` | Toggling the room-level `audioTranslation.enabled` flag (moderators only, enforced separately in the component) |
| `live-translation-subscribe` | `true` | A listener subscribing to the translation of a speaker |

Set `jitsi_default_permissions` in `prosody.cfg.lua` to override the default
for all rooms. A token can also set `context.features`, the same way it does
for other feature permissions.

:::note
The room-level enable flag (`audioTranslation.enabled` in RoomMetadata) is a
normal key. A client can write it, and the `live-translation` permission
gates that write. This differs from transcription: Prosody blocks all client
writes to `asyncTranscription`.
:::

---

## 3. Jicofo configuration

Jicofo reads the aggregated `audioTranslationRequests` map from RoomMetadata.
For each `<sender, language>` pair, Jicofo creates one synthetic audio
source. It also drives one or more translator `<connect>`s to the bridge or
bridges, the same way it drives the transcriber connect. This configuration
is under `jicofo.translation` in `jicofo.conf` (HOCON).

| Key | Type | Default | Purpose |
|---|---|---|---|
| `jicofo.translation.url-template` | string | — (feature disabled if unset) | WebSocket URL template for the translation service. Supports `{{MEETING_ID}}` (required) and `{{REGION}}` (optional). |
| `jicofo.translation.http-headers` | map | `{}` | HTTP headers sent on the WebSocket connect. |
| `jicofo.translation.mode` | string | `per-source` | `per-source`: a connect on its own (local) bridge translates the audio of each sender. `single-bridge`: a single connect on one selected bridge handles all sources and languages (mirrors transcriber selection). |
| `jicofo.translation.max-languages-per-connect` | int | `5` | Max target languages per connect in `per-source` mode; a sender requesting more is split across multiple connects. Ignored in `single-bridge` mode. |
| `jicofo.translation.ping.enabled` | boolean | `true` | Send WebSocket pings to keep the connection alive. |
| `jicofo.translation.ping.interval` | duration | `10 seconds` | Interval between pings. |
| `jicofo.translation.ping.timeout` | duration | `3 seconds` | Pong wait timeout. |

Basic configuration pointing at a standalone service:

```hocon
jicofo {
  translation {
    url-template = "ws://localhost:9090/translate?sessionId={{MEETING_ID}}"
    mode = "per-source"
    max-languages-per-connect = 5

    ping {
      enabled = true
      interval = 10 seconds
      timeout = 3 seconds
    }
  }
}
```

Restart Jicofo to apply the new configuration:

```bash
systemctl restart jicofo
```

---

## 4. Client configuration (config.js)

Enable live audio translation in the jitsi-meet client too. Add the
following to your `config.js`:

```javascript
audioTranslation: {
    enabled: false,

    // Volume (0..1) to which the original audio of a speaker is ducked while its translation
    // plays. Defaults to 0.15. Ignored on iOS: there the client mutes the original instead,
    // because iOS cannot lower the volume of that audio element.
    duckedVolume: 0.15,

    // Whether to process the translated-source sending notifications from the bridge. These
    // notifications drive the per-participant "receiving translated audio" indicator. Off by
    // default until the bridge also emits stop notifications, not only start notifications.
    enableSendingChangeEvents: false,
},
```

The `configOverwrite` and URL-hash mechanisms can also override
`audioTranslation` keys, for example `audioTranslation.enabled`. So you can
toggle the feature for one room, for testing or for a staged rollout, without
a change to the served `config.js`.

---

## 5. Usage reporting and billing

The translation service can report how much audio it translated. A deployment
can use these reports to meter the feature, or to bill a customer for it.

Two parts make this work:

- A **token** that says who to charge. Prosody supplies the token. Jicofo and
  the JVB pass it to the translation service.
- A **usage endpoint** that receives the reports. The service authenticates
  each report with the token.

Usage reporting is optional. Leave `TRANSLATION_USAGE_URL` unset, and the
service does not report anything.

### How the token reaches the service

```
 Prosody main MUC module        gets the token for the room
        │
        │  room metadata, admin-only:  translation.httpHeaders
        ▼
 Jicofo                         merges it over jicofo.translation.http-headers
        │
        │  colibri2 <connect>:  httpHeaders
        ▼
 JVB                            opens the WebSocket to the translation service
        │
        │  upgrade request header:  X-Translation-Token
        ▼
 Translation service            keeps the token for the connection
        │
        │  POST TRANSLATION_USAGE_URL, Authorization: Bearer <token>
        ▼
 Usage endpoint                 resolves the token and records the usage
```

The token moves in five steps:

1. A Prosody module on the main MUC gets the token for the room. jitsi-meet
   contains no such module. Each deployment supplies its own. The module
   usually reads the token from an entitlement service, or from the JWT of the
   room. Keep the token on `room._data`. Do not put it in
   `room.jitsiMetadata`, because Prosody broadcasts that table to all clients.

2. The module returns the token from the `jitsi-room-metadata-admin-extra`
   event:

   ```lua
   module:hook('jitsi-room-metadata-admin-extra', function(event)
       local token = get_translation_token(event.room);

       if token then
           return { translation = { httpHeaders = { ['X-Translation-Token'] = token } } };
       end
   end);
   ```

   `mod_room_metadata_component.lua` fires this event in its admin-only
   branch. Thus the fields that you return go to Jicofo only. Regular
   occupants receive a sanitized copy of the metadata, without these fields.

3. Jicofo reads `translation.httpHeaders` from the room metadata. It merges
   that map over the static `jicofo.translation.http-headers` map. The values
   from the room win. Jicofo puts the result on each translator `<connect>`,
   in `per-source` mode and in `single-bridge` mode.

4. The JVB sets each header on the WebSocket upgrade request to the
   translation service.

5. The service reads the `X-Translation-Token` header from the upgrade
   request. It keeps the token for the life of the connection.

Jicofo masks these header values in its logs.

:::note Breakout rooms
A breakout room is a different room, on a different component. It has no
token of its own. If your deployment uses breakout rooms, resolve a breakout
room to its main room in the hook, and return the token of the main room.
:::

### A static token for one tenant

A deployment with one customer does not need a Prosody module. Put the token
directly in `jicofo.conf`:

```hocon
jicofo.translation.http-headers {
  "X-Translation-Token" = "<token>"
}
```

Jicofo sends these headers on every translator connect. A token from room
metadata overrides a header with the same name.

### Blocking translation for a room

`mod_audio_translation_component.lua` fires
`jitsi-audio-translation-allow-publish` before it publishes the aggregated
request map. Return `false` from a handler, and the component does not
publish the map. Jicofo then starts no translator connect, and the room gets
no translation. The component logs a warning when it suppresses a non-empty
request set.

The event is open by default. No handler, or any return value other than
`false`, permits the publish.

```lua
module:hook('jitsi-audio-translation-allow-publish', function(event)
    if is_entitled(event.room) then
        return; -- no opinion: permit the publish
    end

    return false; -- block translation for the whole room
end);
```

Use this hook together with the token hook. A room with no token then gets no
translation at all, instead of translation that nobody can charge for.

To also hide the feature in the client, set the `audioTranslationAvailable`
key in `room.jitsiMetadata` to `false`. The client hides the translation
controls when this key is `false`. Prosody blocks all client writes to this
key, so only the server can set it.

### What the service reports

The service counts the audio that it sends to the translation model. It
counts one direction at a time. A direction is one speaker translated into
one target language. The service counts only the audio that it appends to
the model. It does not count audio that it decodes and then discards,
for example when the connection to the model never opens.

The service reports each direction more than one time:

- While the direction is open, the service reports the duration translated
  since the previous report. The interval is
  `TRANSLATION_USAGE_REPORT_INTERVAL_MS` (default 15000 ms). Set the value to
  `0` or less to stop the periodic reports.
- When the direction closes, the service reports the last remaining duration.
  It also does this at shutdown, for each direction that is still open.

Periodic reports prevent a total loss of usage data if the process stops
before a long call ends.

The service collects these reports in a buffer. It sends the buffer after 50
events, or after 1000 ms, whichever occurs first. It groups the events by
token, and sends one request for each token:

```
POST <TRANSLATION_USAGE_URL>
Authorization: Bearer <X-Translation-Token>
Content-Type: application/json

{
  "events": [
    { "duration_seconds": 12.5, "event_id": "0f7c…" },
    { "duration_seconds": 3.25, "event_id": "b214…" }
  ]
}
```

`event_id` is a new UUID for each event. Use it as an idempotency key: if the
service sends the same event two times, discard the second one. This prevents
a double charge.

The request body contains no room name, no participant, and no language. The
receiving service resolves the token, and records the usage against the
correct account.

### Limits of the reporting

Know these properties before you bill from these reports:

- **Reporting is best-effort.** The service gives each request 5 seconds. If
  the request fails or times out, the service writes a log message and
  discards the batch. It does not try again. A lost batch loses at most one
  second of buffered events.
- **A connection with no token reports nothing.** The service drops the event
  without a log message. This applies to the development path
  (`/translate?lang=…`), which sends no token.
- **A missing usage URL is not an error.** The service writes one warning, and
  then discards all reports quietly.
