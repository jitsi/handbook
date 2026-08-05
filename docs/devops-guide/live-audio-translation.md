---
id: live-audio-translation
title: Live audio translation
sidebar_label: Live audio translation
---

Live audio translation is a speech-to-speech "dubbing" feature: a listener
subscribes to a speaker in a target language, the Jitsi Videobridge (JVB)
forwards that speaker's Opus audio to a translation service over a WebSocket,
and translated audio (as a synthetic source) is sent back into the conference
for that listener, ducking or muting the original.

The reference implementation is the `/translate` endpoint of
[opus-transcriber-proxy](https://github.com/jitsi/opus-transcriber-proxy) —
the same project used for [bridge-based transcription](transcription.md).

:::note Not the same as transcript translation
This is unrelated to the older "translated captions" feature
(`transcription.translationEnabled`), which translates *text* transcripts
client-side. Live audio translation produces translated *audio*.
:::

```
                                   ┌────────────────────────┐
 speaker audio  ──────Opus──►  JVB │ ──WebSocket──► translation  │ ──► OpenAI realtime
                                   │      service (per source)   │      translations API
 translated audio ◄────────────────                         │ ◄──
                              (synthetic source, per listener language)
                                   └────────────────────────┘
```

Four pieces must be configured:

1. **Translation service** — the proxy itself, running in translation mode.
2. **Prosody** — the `audio_translation` component that collects per-listener
   subscriptions and aggregates them for Jicofo.
3. **Jicofo** — point the bridge at the service URL and choose a connect mode.
4. **config.js** — enable the feature (and its UI) in the jitsi-meet client.

---

## 1. Running the translation service

Live audio translation is served by the **same** opus-transcriber-proxy
process/image as transcription, on its `/translate` endpoint (as opposed to
`/transcribe`). It uses OpenAI's realtime *translations* endpoint
(`gpt-realtime-translate`) for speech-to-speech translation.

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

Same prebuilt image as transcription
([`jitsi/opus-transcriber-proxy`](https://hub.docker.com/r/jitsi/opus-transcriber-proxy)) —
just add the translation env vars. `/transcribe` and `/translate` are both
served on the same port:

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

`/translate` runs **entirely inside the Worker isolate** — no container and no
Durable Object are involved for this path, unlike `/transcribe`. The
production `wrangler.jsonc` already binds both endpoints on the same Worker,
so deploying for transcription (`npm run cf:deploy`) also serves
`/translate` — no separate deploy is needed.

For fast local iteration on `/translate` only (skips the container image
build):

```bash
npx wrangler dev --config wrangler.translate.jsonc
```

`wrangler.translate.jsonc` is dev-only (omits `containers` /
`durable_objects`); it does not serve `/transcribe`.

---

## 2. Prosody configuration

`mod_audio_translation_component.lua` is a separate Prosody **component**
(not loaded on the MUC directly). It collects each listener's
`<senderId, language>` subscriptions, aggregates them into
`audioTranslationRequests`, and exposes that map to Jicofo only via
RoomMetadata (`mod_room_metadata_component` forwards it to jicofo/admin
occupants only — it is never sent to regular clients).

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
| `live-translation-subscribe` | `true` | A listener subscribing to a speaker's translation |

Override via `jitsi_default_permissions` in `prosody.cfg.lua`, or per-token
via `context.features`, the same way as other feature permissions.

:::note
The room-level enable flag (`audioTranslation.enabled` in RoomMetadata) is a
normal, client-writable key gated by the `live-translation` permission —
unlike transcription's `asyncTranscription`, which is blocked from client
writes entirely.
:::

---

## 3. Jicofo configuration

Jicofo reads the aggregated `audioTranslationRequests` map from RoomMetadata,
creates a synthetic translated audio source per `<sender, language>`, and
drives one or more translator `<connect>`s to the bridge(s) — mirroring how
it drives the transcriber connect. Configuration is under
`jicofo.translation` in `jicofo.conf` (HOCON).

| Key | Type | Default | Purpose |
|---|---|---|---|
| `jicofo.translation.url-template` | string | — (feature disabled if unset) | WebSocket URL template for the translation service. Supports `{{MEETING_ID}}` (required) and `{{REGION}}` (optional). |
| `jicofo.translation.http-headers` | map | `{}` | HTTP headers sent on the WebSocket connect. |
| `jicofo.translation.mode` | string | `per-source` | `per-source`: each sender's audio is translated by a connect on its own (local) bridge. `single-bridge`: a single connect on one selected bridge handles all sources/languages (mirrors transcriber selection). |
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

Live audio translation must also be enabled in the jitsi-meet client
configuration. Add the following to your `config.js`:

```javascript
audioTranslation: {
    enabled: false,

    // Volume (0..1) a speaker's original audio is ducked to while its translation plays.
    // Defaults to 0.15. Ignored on iOS, where the original is muted instead because the
    // element volume cannot be lowered there.
    duckedVolume: 0.15,

    // Whether to process the bridge's translated-source sending notifications, which drive the
    // per-participant "receiving translated audio" indicator. Off by default until the bridge
    // emits stop notifications as well as start ones.
    enableSendingChangeEvents: false,
},
```

`audioTranslation` (e.g. `audioTranslation.enabled`) is also whitelisted for
`configOverwrite` / URL-hash overrides, so it can be toggled per-room for
testing or controlled rollout without changing the served `config.js`.
