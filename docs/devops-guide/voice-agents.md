---
id: voice-agents
title: Voice agents
sidebar_label: Voice agents
---

A voice agent is an AI participant that listens to a meeting and speaks in
it. The agent is not a client, and it does not join the MUC. The Jitsi
Videobridge (the bridge) sends the Opus audio of the participants to a media
relay over a WebSocket. The media relay decodes the audio and sends it to
your agent server over a second WebSocket. The agent server sends audio back.
The bridge plays that audio into the meeting as one more audio source.

The reference implementation has three parts:

- The `/agent` endpoint of
  [opus-transcriber-proxy](https://github.com/jitsi/opus-transcriber-proxy)
  is the media relay. The documents of that project call it the gateway. The
  same project also provides [bridge-based transcription](transcription.md).
- The Prosody module `mod_voice_agent_component.lua` in jitsi-meet is the
  provisioning API. A backend calls this API to place an agent in a meeting.
- [`@jitsi/voice-agent-client`](https://github.com/jitsi/voice-agent-client)
  is a Node.js client library for the provisioning API.

:::note No end-to-end encryption
An agent cannot take part in a meeting that has end-to-end encryption on.
The bridge cannot decrypt the audio of the participants. The provisioning
API refuses an invite while a participant has end-to-end encryption on.
:::

:::note Requirements
Voice agents need jitsi-meet, Jicofo and the bridge from the stable release
`jitsi-meet_11509` or later. The `mix` fan-in (section 6) needs a
`jitsi-meet-prosody` package that is later than that release.
:::

```
 your backend ──invite / dismiss / events──►  Prosody  ──room metadata──►  Jicofo
                                            (/voice-agent)                    │
                                                 ▲                         connect
                                    dial config, │ status                     ▼
 your agent  ◄──WebSocket: jitsi-agent-media──  media relay  ◄──WebSocket──  JVB
 server                                          (/agent)        (Opus)       ▲
                                                                              │
                                                                        participants
```

Configure five pieces:

1. **Media relay** — the proxy, with the `/agent` endpoint enabled.
2. **Prosody** — the `voice_agent_component` module, which serves the
   provisioning API.
3. **Jicofo** — point the bridge at the media relay, and report the state of
   each agent to Prosody.
4. **Bridge** — optional limits for the connection to the media relay.
5. **config.js** — optional consent settings in the jitsi-meet client.

Then write an agent (section 6) and place it in a meeting (section 7).

---

## 1. Running the media relay

The same opus-transcriber-proxy process, or image, that serves transcription
also serves voice agents, on the `/agent` endpoint. The endpoint is off by
default, because the media relay opens connections to the agent servers that
the invites name.

When the bridge connects, the media relay gets the address of the agent
server from Prosody (`GET /voice-agent/dial`). It then opens a WebSocket to
that address. It also reports the state of that connection to Prosody
(`POST /voice-agent/status`).

| Variable | Default | Description |
|---|---|---|
| `ENABLE_AGENT` | `false` | Enable the `/agent` endpoint |
| `AGENT_SHARED_SECRET` | (unset) | Secret that the bridge must send in the `X-Agent-Token` header. Unset → the media relay refuses each connection to `/agent` with 503 |
| `AGENT_PROVISIONING_URL` | (unset) | Base URL of the provisioning API, for example `http://<prosody-host>:5280/voice-agent`. Unset → the media relay cannot get the address of an agent server. Use a private network or `https://`: the answers contain the secrets of the agent servers |
| `AGENT_PROVISIONING_TOKEN` | (unset) | Bearer token for the provisioning API: the `voice_agent_dial_secret` of Prosody |
| `AGENT_PROVISIONING_HOST` | (unset) | `Host` header for the provisioning API, for a Prosody that routes HTTP by virtual host |
| `AGENT_ALLOWED_HOSTS` | (empty) | Comma-separated list of permitted agent server hosts. An entry permits that host and its subdomains. Empty → all public hosts. Private addresses are blocked |
| `AGENT_PACE_LEAD_MS` | `200` | Agent audio, in milliseconds, that the media relay can release ahead of real time. This is the most audio that can still play after a barge-in |

The `AGENT_MIX_*` variables set the defaults of the `mix` fan-in for the
deployment. `AGENT_PROTOCOL.md` in the project describes the options. The
name of a variable is `AGENT_MIX_` and the name of the option in upper snake
case, for example `AGENT_MIX_BUFFER_MS` for `bufferMs`.

### As a standalone container

Use the same prebuilt image as transcription
([`jitsi/opus-transcriber-proxy`](https://hub.docker.com/r/jitsi/opus-transcriber-proxy))
and add the agent environment variables:

```bash
docker run -d --name agent-relay \
  -p 127.0.0.1:9090:8080 \
  -e ENABLE_AGENT=true \
  -e ENABLE_TRANSCRIBE=false \
  -e ENABLE_TRANSLATE=false \
  -e AGENT_SHARED_SECRET=<relay-secret> \
  -e AGENT_PROVISIONING_URL=http://<prosody-host>:5280/voice-agent \
  -e AGENT_PROVISIONING_TOKEN=<dial-secret> \
  -e AGENT_PROVISIONING_HOST=jitmeet.example.com \
  -e OPENAI_API_KEY=placeholder \
  jitsi/opus-transcriber-proxy:latest
```

This relay serves only `/agent`. If it also serves transcription or
translation, remove the two `=false` lines and replace the placeholder with
the API key of your provider.

The command publishes the port on the loopback interface, for a bridge on
the same host. That bridge connects to `ws://localhost:9090/agent`. Only the
bridges must reach this port. For a bridge on a different host, publish the
port on a private interface, or put a TLS reverse proxy before the relay and
use `wss://`. This connection carries the audio of the meeting and the relay
secret.

:::note A provider key must be set
The process stops at startup if no transcription provider has an API key.
This is also true when it serves only the `/agent` endpoint. The `/agent`
endpoint does not use the key, so a placeholder is sufficient there.
:::

An agent server on a private address needs
`AGENT_ALLOW_PRIVATE_ENDPOINTS=true`. Set `AGENT_ALLOWED_HOSTS` together
with it. The media relay then connects only to the hosts that you name.

---

## 2. Prosody configuration

`mod_voice_agent_component.lua` is an HTTP module. It keeps the agents of a
meeting in two places. The name and the state of each agent go into the room
metadata (the `agents` key). `mod_room_metadata_component` sends them to all
clients and to Jicofo. The address of the agent server and its secret are not
in the room metadata. They stay in Prosody, and the media relay reads them
from the `dial` route.

Load the module on the main virtual host in `prosody.cfg.lua`:

```lua
-- In the global section, before the first VirtualHost
http_default_host = "jitmeet.example.com"

VirtualHost "jitmeet.example.com"
    modules_enabled = {
        -- ... existing modules ...
        "voice_agent_component";
    }

    muc_component = "conference.jitmeet.example.com"
    breakout_rooms_component = "breakout.jitmeet.example.com" -- optional

    -- Key server for the provisioning tokens. Do not use the key server
    -- of the meeting tokens (see Authentication)
    prosody_password_public_key_repo_url = "https://<provisioning-keys>/<path>"

    -- Only on a host without token authentication (see Authentication)
    -- app_id = "<app-id>"
    -- asap_key_server = "https://<provisioning-keys>/<path>"

    voice_agent_status_secret = "<status-secret>"   -- Jicofo sends it
    voice_agent_dial_secret = "<dial-secret>"       -- the relay sends it
    voice_agent_webhook_secret = "<webhook-secret>" -- signs the webhooks
```

Restart prosody afterward:

```bash
systemctl restart prosody
```

Prosody selects the virtual host of an HTTP request from its `Host` header.
With `http_default_host`, a request that names an unknown host, for example
`http://localhost:5280`, goes to the main virtual host. Jicofo needs this
when its `status` URL does not use the name of the virtual host, because
Jicofo cannot set the `Host` header. The media relay can set it, with
`AGENT_PROVISIONING_HOST`.

| Option | Default | Description |
|---|---|---|
| `muc_component` | — (required) | The main MUC component |
| `breakout_rooms_component` | (unset) | The breakout rooms component. Set it to let agents into breakout rooms |
| `prosody_password_public_key_repo_url` | — (required) | Key server for the tokens of the provisioning routes. Without it the module does not load |
| `muc_mapper_domain_base` | — (required) | The main domain. The module uses it to check the `room` claim of a token. The default configuration already sets it |
| `voice_agent_status_secret` | (empty) | Bearer secret that Jicofo sends to the `status` route |
| `voice_agent_dial_secret` | (empty) | Bearer secret that the media relay sends to the `dial` and `status` routes. Empty → the status secret also reads the `dial` route. Set both secrets in production |
| `voice_agent_webhook_secret` | (empty) | Key that signs the lifecycle webhooks. Empty → the module refuses an invite that has a `callbackUrl` |
| `voice_agent_callback_allowed_hosts` | `{}` | Hosts that can receive webhooks (exact host or `.suffix`). Empty → all hosts. Set it when more than one party can send invites: Prosody sends a request to the URL that an invite names |
| `voice_agent_max_agents` | `5` | Maximum number of agents in one meeting |

The header comment of the module lists the other options.

Prosody serves the API under `/voice-agent` on its HTTP port (`5280` by
default). The routes `invite`, `dismiss`, `list`, `get` and `events` are for
your backend. The routes `status` and `dial` are for Jicofo and the media
relay. Serve the routes for your backend through a reverse proxy with TLS,
or keep them on a private network. In the reverse proxy, pass only `invite`,
`dismiss`, `list`, `get` and `events`. Do not let callers outside the
deployment reach port 5280: close it in the firewall, or set the
`http_interfaces` option of Prosody. Use a different random value for each
secret, for example from `openssl rand -hex 32`.

### Authentication

Each request has an `Authorization: Bearer <token>` header. The routes for
your backend accept only an ASAP token. This is a JWT that you sign with a
private key of your own. Prosody verifies it with the public key from
`prosody_password_public_key_repo_url`. These routes do not accept the
shared secrets. The `status` and `dial` routes accept the shared secrets
from the table above, and also an ASAP token.

Use a key server that holds only the keys of your provisioning backend.
Prosody accepts a token that any key on this server signed. Thus a meeting
token does not work on these routes, on condition that the keys of the
meeting tokens are on a different server.

| Part of the token | Value |
|---|---|
| `typ` (header) | `JWT` |
| `alg` (header) | `RS256`. If the host sets `signature_algorithm` to a different RS algorithm, that algorithm |
| `kid` (header) | The key ID. Prosody gets the public key from `<key server URL>/<SHA-256 of the key ID, in hex>.pem` |
| `iss` | An issuer that the host accepts: `asap_accepted_issuers`, or by default the `app_id` of the host |
| `aud` | Required. By default the host accepts each value. `asap_accepted_audiences` limits the values |
| `exp` | The time at which the token expires. Always set it. Prosody refuses the token after that time. Use a short life, for example 10 minutes |
| `room` | The name of the meeting that the token can act on, or `*` for all meetings. Required |
| `sub` | The tenant of the meeting. For a meeting without a tenant, the main domain (`jitmeet.example.com`). `*` permits all tenants. Required |

A request for a meeting that the token does not name gets 403. Prefer a
token for one meeting. Use `*` only in a backend that you trust with all
meetings. A token for a meeting can also read the address and the secret of
each agent in that meeting, so give tokens only to a backend that you trust
with them.

To make a key, give its ID a name and put the public key on the key server.
The name of the file is the SHA-256 hash of the key ID:

```bash
KID=my-backend-1
openssl genrsa -out asap.key 2048
openssl rsa -in asap.key -pubout \
  -out "$(printf %s "$KID" | openssl dgst -sha256 -r | cut -d' ' -f1).pem"
```

This Node.js script prints a token for one meeting. The `room` claim is the
name of the meeting without the tenant:

```javascript
// token.mjs: print a provisioning token for one meeting.
// Usage: node token.mjs <room>
// Set ASAP_KID, ASAP_KEY_FILE, ASAP_ISSUER and ASAP_SUBJECT first.
import { createSign } from 'node:crypto';
import { readFileSync } from 'node:fs';

const encode = value =>
    Buffer.from(JSON.stringify(value)).toString('base64url');
const now = Math.floor(Date.now() / 1000);
const header = encode({
    typ: 'JWT', alg: 'RS256', kid: process.env.ASAP_KID
});
const claims = encode({
    iss: process.env.ASAP_ISSUER, // An issuer that the host accepts.
    aud: 'jitsi',
    sub: process.env.ASAP_SUBJECT, // The tenant, or the main domain.
    room: process.argv[2],
    exp: now + 600
});
const signature = createSign('RSA-SHA256')
    .update(`${header}.${claims}`)
    .sign(readFileSync(process.env.ASAP_KEY_FILE), 'base64url');

console.log(`${header}.${claims}.${signature}`);
```

:::note The host needs an app_id
The module uses the token library of the jitsi-meet Prosody plugins. This
library needs `app_id` and one of `app_secret`, `asap_key_server` or
`cache_keys_url` on the virtual host. Without them the module does not load.
A host with [token authentication](token-authentication.md) has them. On a
host without token authentication, set `app_id` and `asap_key_server`, as in
the commented lines of the example. The module uses `app_id` only as the
default accepted issuer. It always gets the keys from
`prosody_password_public_key_repo_url`.

Do not add `asap_key_server` to a host that verifies its meeting tokens with
`app_secret`. That host already has what the library needs, and the meeting
tokens would then need an RS256 signature.
:::

:::note docker-jitsi-meet
With docker-jitsi-meet, put the module name in the `XMPP_MODULES` variable
of the prosody container. Put the options of this section in
`XMPP_CONFIGURATION`, with a comma between them. docker-jitsi-meet already
sets `http_default_host`.
:::

:::note Development setup
Some options remove a protection. Do not use them in production.

In Prosody, `voice_agent_insecure_skip_auth = true` removes the
authentication of all routes. `voice_agent_insecure_allow_ws_endpoint = true`
removes the TLS requirement for the agent server, so that it can be a
`ws://` URL. `voice_agent_insecure_allow_http_callback = true` removes the
TLS requirement for a webhook.

In the media relay, `AGENT_REQUIRE_WSS=false` also removes the TLS
requirement for the agent server. `AGENT_ALLOW_PRIVATE_ENDPOINTS=true`
without `AGENT_ALLOWED_HOSTS` removes the block on private addresses and on
localhost, for each invite. `AGENT_ALLOW_UNAUTHENTICATED=true` removes the
check of `AGENT_SHARED_SECRET` on `/agent`.
:::

---

## 3. Jicofo configuration

Jicofo reads the agents of a meeting from the room metadata. For each agent,
Jicofo allocates an endpoint without a transport on the bridge. Jicofo then
tells the bridge to connect to the media relay. Jicofo adds the query
parameters `conference` and `agentId` to the URL. The media relay uses them
to get the address of the agent server from Prosody. This configuration is
under `jicofo.agent` in `jicofo.conf` (HOCON).

| Key | Type | Default | Purpose |
|---|---|---|---|
| `jicofo.agent.url-template` | string | — (feature disabled if unset) | WebSocket URL template for the media relay. Supports `{{MEETING_ID}}` and `{{REGION}}` (optional, the region of the bridge). No whitespace. |
| `jicofo.agent.http-headers` | map | `{}` | HTTP headers sent on the WebSocket connect. |
| `jicofo.agent.ping.enabled` | boolean | `true` | Send WebSocket pings to keep the connection alive. |
| `jicofo.agent.ping.interval` | duration | `10 seconds` | Interval between pings. |
| `jicofo.agent.ping.timeout` | duration | `3 seconds` | Pong wait timeout. |
| `jicofo.agent.status.url` | string | — (reports disabled if unset) | URL of the `status` route of Prosody. |
| `jicofo.agent.status.token` | string | — | Bearer token for the `status` route: the `voice_agent_status_secret` of Prosody. |
| `jicofo.agent.status.timeout` | duration | `5 seconds` | Time limit for one report. |
| `jicofo.agent.status.retries` | int | `2` | Number of retries after a report fails. |

Basic configuration pointing at a standalone media relay:

```hocon
jicofo {
  agent {
    url-template = "ws://localhost:9090/agent?meeting={{MEETING_ID}}"

    http-headers {
      "X-Agent-Token" = "<relay-secret>"
    }

    status {
      url = "http://localhost:5280/voice-agent/status"
      token = "<status-secret>"
    }
  }
}
```

Restart Jicofo to apply the new configuration:

```bash
systemctl restart jicofo
```

The bridge opens the URL from `url-template`. Use a host name that the bridge
can reach. The value of `X-Agent-Token` is the `AGENT_SHARED_SECRET` of the
media relay.

The `status` URL of this example names `localhost`. Prosody serves it only
when `http_default_host` is the main virtual host (section 2).

Jicofo reports two states to Prosody: `connecting`, when it asks the bridge
for the endpoint, and `failed`, when that request fails. The media relay
reports the other states.

---

## 4. Bridge configuration

The bridge has no switch for voice agents. It connects to the media relay
when Jicofo tells it to. If the connection closes, the bridge connects
again. It stops after `videobridge.exporter.agent-max-reconnect-attempts`
consecutive failed attempts (default `10`). The first attempt has no delay.
The delay then starts at `base-delay` (default `1 second`) and doubles up to
`max-delay` (default `30 seconds`).

The bridge does not connect again after the media relay closes the
connection with code `4001` (the agent ended the session) or `4002` (the
media relay cannot use the agent server).

If `videobridge.loudest.route-loudest-only` is `true`, the bridge forwards
only the audio of the loudest speakers. An agent then also hears only those
speakers. The default is `false`.

---

## 5. Client configuration (config.js)

The jitsi-meet client needs no setting to show an agent. The client shows the
agent as a participant when the state of the agent is `active`. By default,
the client lets the agent in without a question: the agent hears each
participant, and each participant hears the agent.

To ask each participant first, add the following to your `config.js`:

```javascript
voiceAgents: {
    // Ask each participant before an agent may hear them. A participant
    // is muted until they decide. Only the participants who allow the
    // agent hear it. Defaults to false.
    requireConsent: true,

    // Link for the "Learn more" link of the consent dialog.
    consentLearnMoreLink: 'https://jitsi.org/meet/consent',
},
```

The agent gets only the audio of the participants whose client allowed that
agent.

The `configOverwrite` and URL-hash mechanisms can also override `voiceAgents`
keys, for example `voiceAgents.requireConsent`. So an application that embeds
a meeting can ask for consent there, without a change to the served
`config.js`.

---

## 6. Writing an agent

An agent server is a WebSocket server. The media relay connects to it one
time for each meeting that the agent is in. The two sides speak the
`jitsi-agent-media` protocol. Each message is one JSON text frame with an
`event` field. The complete contract is `AGENT_PROTOCOL.md` in the
opus-transcriber-proxy project.

| Direction | Message | Meaning |
|---|---|---|
| relay → agent | `info` | The first message: `protocol`, `version`, `mediaFormat`, `fanIn`, `sessionId`, `agentId`, `conference`, `meetingId` and the `customParameters` of the invite |
| relay → agent | `start` | An audio stream begins. `start.tag` identifies the stream |
| relay → agent | `media` | Audio of one stream: `media.tag`, `media.chunk`, `media.timestamp` and `media.payload` (base64) |
| relay → agent | `speakers` | The speaker order, dominant speaker first. The media relay sends it when the order changes |
| relay → agent | `mark` | The media relay released the audio before the mark with this `mark.name` |
| agent → relay | `media` | The speech of the agent: `media.payload` (base64), in chunks of any size |
| agent → relay | `clear` | Barge-in: drop the agent audio that the media relay did not release yet |
| agent → relay | `mark` | A checkpoint in the agent audio, with a `mark.name` |
| agent → relay | `end` | The agent leaves the meeting |
| both | `ping`, `pong` | Keepalive. `pong` returns the `id` of the `ping` |

By default the audio is PCM, signed 16-bit little-endian, mono, at 24000 Hz.
Read the sample rate from `mediaFormat.sampleRate`. Do not assume it. Send
the agent audio in the same format. An invite with
`mediaFormat.encoding: "audio/opus"` gets Opus packets in the two directions
instead. Ignore each message and each field that you do not know. The
protocol can add them in a minor version.

### A minimal agent

This Node.js server needs only the `ws` package (`npm install ws`). It
collects the speech of one turn. When the speaker stops, the server sends
the same audio back. Put your speech model at the `SPEECH MODEL` comment.

```javascript
// agent.mjs: a minimal agent server. It repeats each turn of speech.
import { createHash, timingSafeEqual } from 'node:crypto';
import { WebSocketServer } from 'ws';

// The value of endpoint.authorization in the invite.
const AUTHORIZATION = process.env.AGENT_AUTHORIZATION;
// A frame with an RMS level above this value is speech.
const SPEECH_RMS = Number(process.env.SPEECH_RMS ?? 500);
// A speaker who is quiet for this time has completed a turn.
const END_OF_TURN_MS = Number(process.env.END_OF_TURN_MS ?? 700);
// The agent leaves the meeting after this number of replies. 0: never.
const MAX_REPLIES = Number(process.env.MAX_REPLIES ?? 0);
// The longest turn that the agent keeps, in base64 characters: about
// 30 s of PCM at 24000 Hz.
const MAX_TURN_CHARS = 2_000_000;
// The largest number of audio streams from one meeting.
const MAX_STREAMS = 64;

if (!AUTHORIZATION) {
    console.error('Set AGENT_AUTHORIZATION. Do not run without a secret.');
    process.exit(1);
}

const digest = value =>
    createHash('sha256').update(String(value ?? '')).digest();
const expected = digest(AUTHORIZATION);

const wss = new WebSocketServer({
    // A TLS reverse proxy on the same host connects to this address.
    host: process.env.HOST ?? '127.0.0.1',
    port: Number(process.env.PORT ?? 9091),
    // One message has about 20 ms of audio. Refuse a much larger one.
    maxPayload: 64 * 1024,
    // The media relay sends endpoint.authorization as this header.
    verifyClient: ({ req }) =>
        timingSafeEqual(digest(req.headers.authorization), expected)
});

// The RMS level of PCM16 little-endian audio.
function rms(pcm) {
    let sum = 0;

    for (let i = 0; i + 1 < pcm.length; i += 2) {
        sum += pcm.readInt16LE(i) ** 2;
    }

    return Math.sqrt(sum / Math.max(1, pcm.length >> 1));
}

// One connection is one agent in one meeting.
wss.on('connection', ws => {
    const streams = new Map(); // tag -> { turn: [payload], size, timer }
    let pendingMark; // The mark of the reply that plays now.
    let replies = 0;

    const send = message => ws.send(JSON.stringify(message));

    // The speaker of this stream completed a turn: answer it.
    const reply = stream => {
        // SPEECH MODEL: a real agent gives the turn to its speech model
        // here (speech-to-text, a language model and text-to-speech, or
        // one speech-to-speech model) and sends the audio of the answer
        // as it arrives. This example sends the turn back unchanged.
        for (const payload of stream.turn.splice(0)) {
            send({ event: 'media', media: { payload } });
        }
        stream.size = 0;
        // The media relay returns the mark after it releases this audio.
        pendingMark = `reply-${++replies}`;
        send({ event: 'mark', mark: { name: pendingMark } });
    };

    ws.on('message', data => {
        let m;

        try {
            m = JSON.parse(data.toString());
        } catch {
            return;
        }
        switch (m?.event) {
        case 'info': {
            // The first message. Read the format. Do not assume it.
            const { encoding, sampleRate } = m.mediaFormat ?? {};

            console.log(`${m.agentId} in ${m.conference}: ${encoding} at`
                + ` ${sampleRate} Hz, fanIn ${m.fanIn ?? 'per-source'}`);
            if (!String(m.version).startsWith('1.')
                    || encoding !== 'audio/l16') {
                // This example speaks version 1 with PCM only. Leave.
                send({ event: 'end' });
            }
            break;
        }
        case 'media': {
            // Audio of one stream. The tag is a participant source, or
            // "mix". A "start" message with the same tag came before it.
            const { tag, payload } = m.media ?? {};

            if (typeof tag !== 'string' || typeof payload !== 'string') {
                break;
            }
            if (!streams.has(tag)) {
                if (streams.size >= MAX_STREAMS) {
                    break;
                }
                streams.set(tag, { turn: [], size: 0, timer: undefined });
            }
            const stream = streams.get(tag);
            const speech
                = rms(Buffer.from(payload, 'base64')) > SPEECH_RMS;

            if (speech && pendingMark) {
                // Barge-in: a person speaks while the reply plays. Drop
                // the audio that the media relay did not release yet.
                send({ event: 'clear' });
                pendingMark = undefined;
            }
            if ((speech || stream.turn.length > 0)
                    && stream.size + payload.length <= MAX_TURN_CHARS) {
                stream.turn.push(payload);
                stream.size += payload.length;
            }
            if (speech) {
                clearTimeout(stream.timer);
                stream.timer
                    = setTimeout(() => reply(stream), END_OF_TURN_MS);
            }
            break;
        }
        case 'mark':
            // The media relay released the audio before this mark.
            if (m.mark?.name === pendingMark) {
                pendingMark = undefined;
                if (MAX_REPLIES && replies >= MAX_REPLIES) {
                    // The task is complete. The agent leaves the meeting.
                    send({ event: 'end' });
                }
            }
            break;
        case 'ping':
            send({ event: 'pong', id: m.id });
            break;
        default:
            // "speakers" gives the speaker order, dominant speaker first.
            // The protocol can add messages. Ignore the unknown ones.
            break;
        }
    });

    ws.on('close', () => streams.forEach(s => clearTimeout(s.timer)));
    ws.on('error', error => console.log('socket error:', error.message));
});
```

Run it with `AGENT_AUTHORIZATION='Bearer <agent-secret>' node agent.mjs`.
The server listens on port 9091 of the loopback interface. The address of
the agent server in an invite must be a `wss://` URL, so put the agent
server behind a TLS reverse proxy. A host on a private address needs the
settings of section 1. Start the agent server before you send the invite.

### Fan-in

The `fanIn` field of the invite selects the audio that the agent gets. The
`info` message tells the agent which fan-in is in effect.

| `fanIn` | The agent gets | Notes |
|---|---|---|
| `per-source` (default) | One stream for each participant, each with its own `tag` | The media relay does not mix. Streams arrive at the same time when people speak at the same time. The agent must keep the streams apart by `tag` |
| `dominant` | Only the stream of the dominant speaker | The frames keep the `tag` of each speaker, but only one `tag` is active at a time. The bridge selects the speaker, so the first few hundred milliseconds of a new speaker do not arrive |
| `mix` | One stream with the `tag` `mix`: the sum of the participants | PCM only. The audio does not identify the speaker. The `speakers` message does, in its `mixed` field. The mix arrives one jitter buffer later (60 ms by default). The `mix` object of the invite sets the options, for example `maxSpeakers` |

A `tag` is the name of an audio source (`<endpointId>-a0`). It does not
identify the person. A stream can go silent and start again without a new
`start` message. The example keeps one turn for each `tag`, so it works with
each fan-in without a change.

### Barge-in, marks and the end of a session

The media relay does not play the agent audio immediately. It releases the
audio at real-time speed, and keeps the remainder in a queue. Three messages
control this queue:

- **`mark`** — The agent sends a `mark` after the audio of a reply. The
  media relay returns the `mark` when it releases the audio before it. A
  `mark` shows that the media relay sent the audio. It does not show that
  the participants heard it.
- **`clear`** — When a person speaks while a reply plays, the agent sends
  `clear`. The media relay drops the audio in the queue. Only the audio that
  it already released can still play (at most `AGENT_PACE_LEAD_MS`).
- **`end`** — The agent sends `end` when its task is complete. The media
  relay closes the WebSocket, and the agent leaves the meeting. The bridge
  does not connect again. In the example, set `MAX_REPLIES` to see this.

If the connection closes for another reason, the bridge connects to the
media relay again. The agent server then gets a new connection with a new
`info` message and a new `sessionId`.

---

## 7. Placing the agent in a meeting

Your backend calls the provisioning API to place the agent in a meeting.
`@jitsi/voice-agent-client` wraps the API for Node.js 18 or later. The
library is a pre-release, and it is not on npm. Build it from the source and
install it from the local directory:

```bash
git clone https://github.com/jitsi/voice-agent-client.git
cd voice-agent-client && npm install && npm run build
cd ../my-backend && npm install ../voice-agent-client
```

This script invites the agent, follows its state, and dismisses it:

```javascript
// invite.mjs: place the agent in a meeting and follow it.
// Usage: node invite.mjs <meeting> [per-source|dominant|mix]
import { VoiceAgentClient } from '@jitsi/voice-agent-client';

const [ conference, fanIn = 'per-source' ] = process.argv.slice(2);

if (!process.env.AGENT_AUTHORIZATION) {
    console.error('Set AGENT_AUTHORIZATION: the secret of the agent server.');
    process.exit(1);
}

const client = new VoiceAgentClient({
    // The address of the /voice-agent routes of your deployment.
    baseUrl: process.env.VOICE_AGENT_URL,
    // An ASAP token that can act on the meeting. A backend that runs for
    // a long time gives a function here that returns a new token.
    token: process.env.VOICE_AGENT_TOKEN
});

// A meeting exists after its first participant joins. With waitForRoom,
// the client tries again for 30 seconds while the API answers 404.
const agent = await client.invite({
    conference,
    displayName: 'Parrot',
    agentId: 'parrot',
    endpoint: {
        url: process.env.AGENT_URL,
        authorization: process.env.AGENT_AUTHORIZATION
    },
    fanIn
}, { waitForRoom: true });

console.log('invited', agent.agentId, 'with source', agent.sourceName);

const stream = client.events({ conference });
let gone = false; // The agent failed or ended.

// Ctrl+C, or a stop of the process, ends the loop below.
for (const signal of [ 'SIGINT', 'SIGTERM' ]) {
    process.once(signal, () => stream.close());
}

try {
    for await (const event of stream) {
        if (event.event === 'snapshot') {
            // The first event: each agent of the meeting, with its state.
            const mine = event.agents.find(a => a.agentId === agent.agentId);

            console.log('state:', mine?.state ?? 'gone');
            gone = !mine || mine.state === 'failed';
        } else if (event.agentId === agent.agentId) {
            console.log(event.event, event.reason ?? '');
            gone = event.event !== 'agent.connected';
        }
        if (gone) {
            break;
        }
    }
} finally {
    stream.close();
    if (!gone) {
        // Do not leave the agent in the meeting when this script stops.
        await client.dismiss(conference, agent.agentId).then(
            () => console.log('dismissed', agent.agentId),
            console.error);
    }
}
```

Run it:

```bash
export ASAP_KID=my-backend-1
export ASAP_KEY_FILE=asap.key
export ASAP_ISSUER=<app-id>
export ASAP_SUBJECT=jitmeet.example.com
export VOICE_AGENT_URL=https://<api-host>/voice-agent
export VOICE_AGENT_TOKEN=$(node token.mjs myroom)
export AGENT_URL=wss://<agent-host>/ws
export AGENT_AUTHORIZATION='Bearer <agent-secret>'
node invite.mjs myroom dominant
```

`token.mjs` is the script of section 2. Put `token.mjs` and `invite.mjs` in
`my-backend`. Ctrl+C removes the agent from the meeting. The token is good
for 10 minutes. For a longer run, give `token` a function that makes a new
token.

`VOICE_AGENT_URL` must be an `https://` URL. The library accepts `http://`
only for a loopback host, or with the option `allowHttp: true`.

| Method | Route | Notes |
|---|---|---|
| `invite(request, { waitForRoom })` | `POST invite` | Returns `{ agentId, sourceName }`. A second invite with the same `agentId` and the same parameters returns the same agent. Different parameters get 409 |
| `dismiss(conference, agentId)` | `POST dismiss` | Removes the agent. `agent.ended` follows |
| `list(conference)` | `GET list` | The agents of the meeting, by `agentId` |
| `get(conference, agentId)` | `GET get` | `{ displayName, sourceName, state }`, or `undefined` when the agent is gone |
| `events({ conference })` | `GET events` | The lifecycle events. Iterate with `for await`. Stop with `close()`. The library connects again and sends `Last-Event-ID` |
| `waitFor(conference, agentId, state)` | `GET events` | Resolves when the agent gets to the state. Rejects when the agent gets to a different final state, or after 30 seconds |

`conference` is the name of the meeting as in the meeting URL: `<room>`, or
`<tenant>/<room>`. The API puts `agent-` before the `agentId`. An `agentId`
has letters, digits, `_` and `-`, and at most 48 characters. The invite can
also have `customParameters` (the agent gets them in the `info` message),
`mediaFormat`, `mix` and `callbackUrl`. `AGENT_REST_API.md` in the
opus-transcriber-proxy project describes each field.

An error has a JSON body `{ "error": "<message>" }`, but a 401 answer has no
body. The library throws a `VoiceAgentApiError` with the `status` and the
`body`. The API answers 404 when the meeting or the agent does not exist. It
answers 409 when the meeting has the maximum number of agents, when the
`agentId` exists with different parameters, or when end-to-end encryption is
on.

### Lifecycle

An agent goes through these states: `provisioning`, `connecting`, `active`,
`ended`. An error gives the state `failed`.

| Event | State | When |
|---|---|---|
| `agent.connected` | `active` | The media relay has an open WebSocket to the agent server |
| `agent.failed` | `failed` | The bridge cannot allocate the agent, or the media relay cannot connect to the agent server. `reason` tells why, for example `endpoint refused: HTTP 401` |
| `agent.ended` | `ended` | A `dismiss`, an `end` message from the agent, or the end of the meeting (`reason: room-destroyed`) |

A failed agent stays `failed`. To try again, send the invite again with the
same `agentId`. An agent that failed does not also get an `agent.ended`
event.

If the invite has a `callbackUrl` (an `https://` URL), Prosody also sends
each event to that URL with a POST request. The body is the JSON of the
event: `event`, `agentId`, `conference`, `sourceName`, `state`, `timestamp`
and, if applicable, `reason`. The `X-Agent-Signature` header has the value
`sha256=<HMAC>`. The HMAC is the HMAC-SHA256 of the request body, in hex,
with `voice_agent_webhook_secret` as the key. Prosody can send the same
event more than one time.
