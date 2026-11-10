---
id: transcription
title: Transcriptions (bridge-based)
sidebar_label: Transcription
---

The transcription proxy is a real-time transcription service that the Jitsi
Videobridge (JVB) connects to over a WebSocket. The bridge forwards each
participant's Opus audio to the service, which decodes it and relays it to a
speech-to-text backend (OpenAI, Deepgram, Google Gemini or xAI). Transcription
results are streamed back and injected into the conference.

The reference implementation is
[opus-transcriber-proxy](https://github.com/jitsi/opus-transcriber-proxy).

This is the *bridge-based* transcription path (JVB → transcription service), as
opposed to the older Jigasi-based transcriber. Jicofo decides when transcription
is active and tells the bridge which URL to connect to.

:::caution Replaces Jigasi transcription
This bridge-based path **replaces** transcription via
[Jigasi](https://github.com/jitsi/jigasi). The Jigasi transcription support is
**deprecated** and will be removed in a future release. New deployments should
use the bridge-based path; existing Jigasi-transcription deployments should plan
to migrate.
:::

```
                                   ┌────────────────────────┐
 participant audio  ──Opus──►  JVB │ ──WebSocket──► trans-   │ ──► OpenAI / Deepgram /
                                   │   cription service      │      Gemini / xAI
 transcription-result  ◄───────────                         │ ◄──
                                   └────────────────────────┘
```

Four pieces must be configured:

1. **Transcription service** — the proxy itself.
2. **Prosody** — enable transcription on rooms (this guide includes a sample
   module that forces it on for *all* rooms).
3. **Jicofo** — point the bridge at the service URL and (optionally) attach auth
   headers.
4. **config.js** — enable transcription in the jitsi-meet client.

---

## 1. Running the transcription service

The service is a Node.js application. It is configured entirely through
environment variables (no config file; a `.env` file is read if present). It
listens on port `8080` by default and exposes a WebSocket endpoint at `/transcribe`.

At minimum you must set the API key for at least one backend and pick a provider
priority. Example for OpenAI:

```bash
PROVIDERS_PRIORITY=openai
OPENAI_API_KEY=<your-key>
OPENAI_MODEL=gpt-4o-mini-transcribe
PORT=8080
```

Other backends (Deepgram, Google Gemini, xAI) are selected the same way. The
full set of environment variables and per-provider options is documented in the
project's `README.md` and `BACKENDS.md` — they are not reproduced here.

#### Custom OpenAI-compatible endpoints

The service can talk to any **OpenAI-compatible** transcription API instead of
OpenAI itself — e.g. an in-house / self-hosted model exposing the OpenAI
realtime transcription protocol. Enable the custom provider
(`ENABLE_OPENAI_CUSTOM_PROVIDER=true`) and point the connection at your endpoint
(per-connection `provider=openai_custom` + `openaiCustomUrl=...`, with the key
in the `X-Custom-Openai-Api-Key` header). See the project's `README.md` /
`BACKENDS.md` for the exact parameters.

### As a standalone container

Prebuilt multi-arch images are published to Docker Hub as
[`jitsi/opus-transcriber-proxy`](https://hub.docker.com/r/jitsi/opus-transcriber-proxy)
(`latest`, plus per-commit SHA tags). Just pull and run — passing configuration
as environment variables:

```bash
docker run -d --name transcriber \
  -p 9090:8080 \
  -e PROVIDERS_PRIORITY=openai \
  -e OPENAI_API_KEY=<your-key> \
  -e OPENAI_MODEL=gpt-4o-mini-transcribe \
  jitsi/opus-transcriber-proxy:latest
```

Or with an `.env` file:

```bash
docker run -d --name transcriber \
  -p 9090:8080 \
  --env-file .env \
  jitsi/opus-transcriber-proxy:latest
```

:::note Opus backend
The image ships both Opus backends and selects one at runtime via the
`OPUS_BACKEND` environment variable — `wasm` (default) or `native` (the
compiled libopus addon).
:::

To build the image yourself instead of using the published one, see the build
instructions in the project's `README.md`.

The bridge then connects to `ws://<host>:9090/transcribe`. Put it behind a TLS
reverse proxy if the bridge reaches it over `wss://`.

Quick connectivity check:

```bash
wscat -c "ws://localhost:9090/transcribe?sessionId=test&sendBack=true"
```

### In Cloudflare (CF)

The service can run as a **Cloudflare Container** fronted by a **Worker** (which
handles the WebSocket upgrade and routing). Configuration lives in
`wrangler.jsonc` / `wrangler-container.jsonc`; see `CLOUDFLARE_DEPLOYMENT.md`
and `CONTAINER_ROUTING.md` in the repo for the full details.

```bash
# check out the libopus submodule (one-time; the image builds it)
git submodule update --init src/OpusDecoder/opus

# install worker deps and authenticate
cd worker
npm install
npx wrangler login

# set backend API keys as Worker secrets
npx wrangler secret put OPENAI_API_KEY --config ../wrangler-container.jsonc

# deploy (builds locally, then deploys)
cd ..
npm run cf:deploy
```

After deploy (allow a few minutes) the endpoint is the Worker URL, e.g.:

```
wss://<worker-name>.<ACCOUNT>.workers.dev/transcribe
```

Pick a **routing mode** via the `ROUTING_MODE` var in `wrangler.jsonc`. For
Jitsi (many short sessions) `pool` is recommended — it keeps a set of warm
containers and minimizes cold starts:

```jsonc
"vars": {
  "ROUTING_MODE": "pool",
  "CONTAINER_POOL_SIZE": "10"
}
```

Other modes: `session` (one container per session), `shared` (single container,
dev only), `autoscale`.

:::note Cloudflare Access (Zero Trust)
If you protect the Worker with Cloudflare Access, the bridge must present
service-token headers (`CF-Access-Client-Id` / `CF-Access-Client-Secret`).
Those are configured on the Jicofo side — see
[Cloudflare Zero Trust auth](#cloudflare-zero-trust-auth) below.
:::

---

## 2. Prosody configuration

Transcription is gated by per-room metadata stored by
`mod_room_metadata_component` under `room.jitsiMetadata`. The relevant key is
`asyncTranscription` — when `true`, transcription runs without depending on an
active client requesting it. (It is also gated by the room's
`recording.isTranscribingEnabled`; both must be true for Jicofo to start
transcribing.)

`asyncTranscription` is a **server-controlled** key: clients are explicitly
forbidden from setting it (it is in the `blocked_metadata_keys` list of
`mod_room_metadata_component.lua`). So it must be set server-side.

### Sample module: force `asyncTranscription=true` for all rooms

Create `mod_force_async_transcription.lua` and place it on the prosody plugin
path (e.g. `/usr/share/jitsi-meet/prosody-plugins/` or whatever your
`plugin_paths` points to):

```lua
-- mod_force_async_transcription.lua
-- Forces asyncTranscription=true on every room's metadata.
-- Enable on the main MUC component (e.g. conference.<domain>).

local util = module:require 'util';
local is_healthcheck_room = util.is_healthcheck_room;

module:hook('muc-room-created', function(event)
    local room = event.room;

    if is_healthcheck_room(room.jid) then
        return;
    end

    -- mod_room_metadata_component initializes this table at priority -1,
    -- so run after it.
    if not room.jitsiMetadata then
        room.jitsiMetadata = {};
    end

    room.jitsiMetadata.asyncTranscription = true;

    module:log('info', 'Forced asyncTranscription=true for room %s', room.jid);
end, -2); -- priority -2: after room_metadata_component (-1)
```

The `-2` priority ensures the hook runs *after* `mod_room_metadata_component`
(which runs at `-1` and creates `room.jitsiMetadata`).

Enable it on the MUC component in `prosody.cfg.lua`:

```lua
Component "conference.example.com" "muc"
    modules_enabled = {
        -- ... existing modules ...
        "muc_meeting_id";
        "force_async_transcription";
    }
```

Restart prosody afterward.

```bash
systemctl restart prosody
```

:::note
This only forces the `asyncTranscription` flag. For transcription to actually
start, the room must also have transcription enabled in the `recording`
metadata. To unconditionally transcribe every room you would also force that
flag on — extend the module to set the `recording` metadata as well, or enable
transcription through the normal UI/config path.
:::

---

## 3. Jicofo configuration

Jicofo builds the transcriber WebSocket URL from a template and hands it (plus
any HTTP headers) to the bridge over Colibri2. Configuration is under
`jicofo.transcription` in `jicofo.conf` (HOCON).

| Key | Type | Default | Purpose |
|---|---|---|---|
| `jicofo.transcription.url-template` | string | — | WebSocket URL template for the transcription service. Supports `{{MEETING_ID}}` (required) and `{{REGION}}` (optional, bridge region). |
| `jicofo.transcription.http-headers` | map | `{}` | HTTP headers sent on the WebSocket connect. |
| `jicofo.transcription.ping.enabled` | boolean | `true` | Send WebSocket pings to keep the connection alive. |
| `jicofo.transcription.ping.interval` | duration | `10 seconds` | Interval between pings. |
| `jicofo.transcription.ping.timeout` | duration | `3 seconds` | Pong wait timeout. |

The `url-template` placeholders are substituted at runtime: `{{MEETING_ID}}`
from the conference, `{{REGION}}` from the transcribing bridge's region (empty
string if the bridge has no region).

Basic configuration pointing at a standalone service:

```hocon
jicofo {
  transcription {
    url-template = "ws://localhost:9090/transcribe?sessionId={{MEETING_ID}}&sendBack=true"

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

With a regionalized Cloudflare deployment:

```hocon
jicofo.transcription.url-template =
  "wss://{{REGION}}.<worker-name>.example.workers.dev/transcribe?sessionId={{MEETING_ID}}"
```

### Cloudflare Zero Trust auth

If the service is behind **Cloudflare Access**, attach a service token via
`http-headers`. These headers are sent on every WebSocket connect:

```hocon
jicofo.transcription {
  url-template = "wss://<worker-name>.example.workers.dev/transcribe?sessionId={{MEETING_ID}}"

  http-headers {
    "CF-Access-Client-Id"     = "<service-token-client-id>.access"
    "CF-Access-Client-Secret" = "<service-token-client-secret>"
  }
}
```

`http-headers` is general-purpose — any header works (e.g. an
`Authorization: Bearer <token>`). Per-conference headers and extra URL query
params can also be supplied through the `room_metadata` component
(`transcription.httpHeaders` / `transcription.urlParams`); those are merged over
the base config, with the per-room values taking precedence.

:::note
The transcriber URL is fixed once a Colibri session is created — Jicofo rejects
changing to a different URL mid-conference. If transcription is enabled but no
`url-template` is configured, Jicofo logs *"Transcription enabled, but no URL is
configured"* and does nothing.
:::

---

## 4. Client configuration (config.js)

Transcription must also be enabled in the jitsi-meet client configuration.
Add the following to your `config.js`:

```javascript
transcription: {
    enabled: true,
},
```

---

## 5. Text translation (optional)

The transcription service can translate each final transcript into other
languages. Participants then see subtitles in the language that they choose.

:::note Not the same as audio translation
Text translation changes the *text* of the transcript. It does not change the
audio. Live audio translation is a different feature. It uses a separate
service endpoint (`/translate`) and separate Jicofo settings
(`jicofo.translation`).
:::

Text translation is **off by default**. You do not change the configuration of
Prosody, Jicofo or the bridge. You change only the configuration of the
transcription service. Use versions of Jicofo, the bridge and jitsi-meet that
include text translation.

### How it works

1. A participant chooses a subtitle language in the client. The client sends the
   language in the presence of the participant (`translation_language`). When
   the participant goes back to the original language, the client sends an empty
   value.
2. Jicofo collects the languages of all participants. For visitors, Jicofo reads
   the languages from the room metadata (`visitors.transcribingLanguages`).
3. Jicofo puts the set of languages in the `requests` list of the transcriber
   connection. The bridge forwards the set to the transcription service in the
   `sources` control event.
4. For each final transcript, the service makes one translation request for each
   language in the set. The service sends the results back through the bridge.

Note the following:

- The set of languages is always the complete set. When a participant changes
  language, Jicofo sends the new set. The bridge updates the open connection. It
  does not reconnect. An empty set stops all translation.
- The service translates only final transcripts. It does not translate interim
  results.
- The service does not wait for a translation. A slow provider does not delay the
  original transcript. If one translation fails, the service drops only that
  language for that transcript.
- The service does not translate a transcript into the language that it is
  already in.
- The service returns the language code exactly as the client sent it. The
  provider must accept that code.

The service sends each translation as a `transcription-result` event. The
`type` field is `translation-result`. The `message_id` is the same as the
`message_id` of the original transcript. The client shows the translation in
place of the original transcript. The message can contain more fields than the
fields in this example:

```json
{
  "event": "transcription-result",
  "type": "translation-result",
  "message_id": "<message_id of the original transcript>",
  "language": "fr",
  "text": "bonjour",
  "participant": { "id": "<participant-id>" },
  "timestamp": 1768341932000
}
```

### Enable it in the transcription service

Set `ENABLE_TEXT_TRANSLATION=true` and give the service a key for at least one
provider. If `ENABLE_TEXT_TRANSLATION` is `false`, the service ignores the
requested languages and writes a log message. In this case, also set
`translationEnabled: false` in `config.js` (see
[Client configuration](#client-configuration)). Otherwise the client shows a
language selector that gives no translation.

```bash
docker run -d --name transcriber \
  -p 8090:8080 \
  -e PROVIDERS_PRIORITY=openai \
  -e OPENAI_API_KEY=<your-key> \
  -e OPENAI_MODEL=gpt-4o-mini-transcribe \
  -e ENABLE_TEXT_TRANSLATION=true \
  jitsi/opus-transcriber-proxy:latest
```

The service picks the provider in the same way as for transcription.
`TEXT_TRANSLATION_PROVIDERS_PRIORITY` is a comma-separated, ordered list. A
provider is available when it has a key. The first available provider is the
default.

| Provider | Default model | Key variable | Key fallback |
|---|---|---|---|
| `openai` | `gpt-4o-mini` | `TEXT_TRANSLATION_OPENAI_API_KEY` | `OPENAI_API_KEY` |
| `gemini` | `gemini-3.5-flash-lite` | `TEXT_TRANSLATION_GEMINI_API_KEY` | `GEMINI_API_KEY` |
| `xai` | `grok-4.20-0309-non-reasoning` | `TEXT_TRANSLATION_XAI_API_KEY` | `XAI_API_KEY` |
| `google` (Cloud Translation v2) | not applicable | `TEXT_TRANSLATION_GOOGLE_API_KEY` or `TEXT_TRANSLATION_GOOGLE_CREDENTIALS_JSON` | none for the API key. `TEXT_TRANSLATION_GOOGLE_CREDENTIALS_JSON` falls back to `GOOGLE_CREDENTIALS_JSON` |

The default order is `openai,gemini,xai,google`. If a provider already has a
transcription key, you do not need a new key for text translation with that
provider.

:::caution The google provider needs its own key
The `google` provider uses Cloud Translation. This is a different API from
Gemini. A Gemini API key does not work for it. There is no fallback to
`GEMINI_API_KEY`.

If you set both an API key and service-account credentials, the service uses the
API key. If you set neither, the provider is not available.
:::

The `openai`, `gemini` and `xai` providers use a large language model. They get
the most recent final results as context. The context helps the model to choose
the correct pronoun, gender and level of formality. The `google` provider
translates each text alone and does not use context.

| Variable | Default | Purpose |
|---|---|---|
| `ENABLE_TEXT_TRANSLATION` | `false` | Turn text translation on. |
| `TEXT_TRANSLATION_PROVIDERS_PRIORITY` | `openai,gemini,xai,google` | Provider order. The first available provider is the default. |
| `TEXT_TRANSLATION_HISTORY_TURNS` | `6` | Number of earlier final transcripts to send as context. `0` turns the context off. |
| `TEXT_TRANSLATION_HISTORY_MAX_CHARS` | `2000` | Maximum size of the context, in characters. The service removes the oldest turns first. |
| `TEXT_TRANSLATION_INCLUDE_SPEAKERS` | `true` | Send a speaker label (`Speaker 1`, `Speaker 2`) with each turn of the context. The label is a number for the session, not a display name. |
| `TEXT_TRANSLATION_TIMEOUT_MS` | `10000` | Time limit for one translation request. The service discards a late translation. |

To override the default provider, add `text_translation_provider=<name>` to the
`url-template` in Jicofo. For example:
`...transcribe?sessionId={{MEETING_ID}}&sendBack=true&text_translation_provider=gemini`.
If the name is not valid or not available, the service writes an error message
and uses the default provider. It does not close the connection.

The service README lists more variables. They set the model, the endpoint URL,
the temperature, the reasoning effort and the output limit. See the
[opus-transcriber-proxy README](https://github.com/jitsi/opus-transcriber-proxy#text-translation-transcribe).

### Client configuration

The subtitle language list is part of the `transcription` block in `config.js`.
These options are optional:

```javascript
transcription: {
    enabled: true,

    // Show the language selection in the UI. Default: true.
    translationEnabled: true,

    // Language codes to offer. The available codes are in
    // lang/translation-languages.json in jitsi-meet. The default is all of them.
    translationLanguages: [ 'en', 'es', 'fr', 'ro' ],

    // Languages to show at the top of the list.
    translationLanguagesHead: [ 'en' ],
},
```

Offer only languages that your translation provider accepts.
