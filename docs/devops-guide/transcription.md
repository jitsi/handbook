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

Three pieces must be configured:

1. **Transcription service** — the proxy itself.
2. **Prosody** — enable transcription on rooms (this guide includes a sample
   module that forces it on for *all* rooms).
3. **Jicofo** — point the bridge at the service URL and (optionally) attach auth
   headers.

---

## 1. Running the transcription service

The service is a Node.js application. It is configured entirely through
environment variables (no config file; a `.env` file is read if present). It
listens on port `8080` and exposes a WebSocket endpoint at `/transcribe`.

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

The repo ships a `Dockerfile` and a `docker:build` npm script that builds the
image for you. The Opus codec is pulled in as a **git submodule**, so it must be
checked out before building — otherwise the build fails with
`No rule to make target 'src/OpusDecoder/opus/configure.ac'`:

```bash
# check out the libopus submodule (required)
git submodule update --init src/OpusDecoder/opus

npm install
npm run docker:build   # builds the WASM artifacts on the host, then the image
```

:::note Opus backend
The image ships both Opus backends and selects one at runtime via the
`OPUS_BACKEND` environment variable — `wasm` (default) or `native` (the
compiled libopus addon). The native addon is compiled inside the container; the
WASM artifacts are built on the host by `docker:build`. See the project's
`README.md` for toolchain prerequisites (Node.js 22+, a C/C++ toolchain).
:::

Run it, passing configuration as environment variables (or an env file):

```bash
docker run -d --name transcriber \
  -p 8080:8080 \
  -e PROVIDERS_PRIORITY=openai \
  -e OPENAI_API_KEY=<your-key> \
  -e OPENAI_MODEL=gpt-4o-mini-transcribe \
  opus-transcriber-proxy
```

Or with an `.env` file:

```bash
docker run -d --name transcriber \
  -p 8080:8080 \
  --env-file .env \
  opus-transcriber-proxy
```

The bridge then connects to `ws://<host>:8080/transcribe`. Put it behind a TLS
reverse proxy if the bridge reaches it over `wss://`.

Quick connectivity check:

```bash
wscat -c "ws://localhost:8080/transcribe?sessionId=test&sendBack=true"
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
        "room_metadata";          -- required: provides room.jitsiMetadata
        "force_async_transcription";
    }
```

Reload prosody (`prosodyctl reload`) afterwards.

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
    url-template = "ws://transcriber.internal:8080/transcribe?sessionId={{MEETING_ID}}"

    ping {
      enabled = true
      interval = 10 seconds
      timeout = 3 seconds
    }
  }
}
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
