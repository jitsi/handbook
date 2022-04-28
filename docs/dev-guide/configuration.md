---
id: dev-guide-configuration
title: Configuration
---

:::note
Options marked with 🚫 are not overwritable through `configOverwrite`
:::

:::warning
This page is a work in progress. Not all options are described here yet.
:::

## API

### apiLogLevels

type: `Array`

Logs that should go be passed through the 'log' event if a handler is defined for it

Default: **unset**

```javascript
apiLogLevels: ['warn', 'log', 'error', 'info', 'debug']
```

### buttonsWithNotifyClick

type: `Array`

Toolbar buttons which have their click/tap event exposed through the API on
`toolbarButtonClicked`. Passing a string for the button key will
prevent execution of the click/tap routine; passing an object with `key` and
`preventExecution` flag on false will not prevent execution of the click/tap
routine. Below array with mixed mode for passing the buttons.

Default: **unset**

```javascript
buttonsWithNotifyClick: [
    'camera',
    {
        key: 'chat',
        preventExecution: false
    },
    {
        key: 'closedcaptions',
        preventExecution: true
    },
    'desktop',
    'download',
    'embedmeeting',
    'etherpad',
    'feedback',
    'filmstrip',
    'fullscreen',
    'hangup',
    'help',
    {
        key: 'invite',
        preventExecution: false
    },
    'livestreaming',
    'microphone',
    'mute-everyone',
    'mute-video-everyone',
    'participants-pane',
    'profile',
    {
        key: 'raisehand',
        preventExecution: true
    },
    'recording',
    'security',
    'select-background',
    'settings',
    'shareaudio',
    'sharedvideo',
    'shortcuts',
    'stats',
    'tileview',
    'toggle-camera',
    'videoquality',
    // The add passcode button from the security dialog.
    {
        key: 'add-passcode',
        preventExecution: false
    },
    '__end'
]
```

### mouseMoveCallbackInterval

type: `Number`

Default interval (milliseconds) for triggering `mouseMoved` iframe API event.

Default: `1000`

```javascript
mouseMoveCallbackInterval: 1000
```

### useHostPageLocalStorage

type: `Boolean`

This property is related to the use case when jitsi-meet is used via the IFrame API. When the property is true
jitsi-meet will use the local storage of the host page instead of its own. This option is useful if the browser
is not persisting the local storage inside the iframe.

Default: **unset**

```javascript
useHostPageLocalStorage: true
```

## Audio

### audioLevelsInterval

type: `Number`

The interval (milliseconds) at which the audio levels are calculated.

Default: `200`

```javascript
audioLevelsInterval: 200
```

### audioQuality

type: `Object`

Specify audio quality stereo and opusMaxAverageBitrate values in order to enable HD audio.
Beware, by doing so, you are disabling echo cancellation, noise suppression and AGC.

Default: **unset**

```javascript
audioQuality: {
    stereo: false,
    opusMaxAverageBitrate: null // Value to fit the 6000 to 510000 range.
}
```

### disableAudioLevels

type: `Boolean`

Disable measuring of audio levels.

Default: `false`

```javascript
disableAudioLevels: false
```

### disabledSounds

type: `Array`

The sounds passed in this array will be disabled.

Default: **unset**

```javascript
disabledSounds: [
    // 'ASKED_TO_UNMUTE_SOUND'
    // 'E2EE_OFF_SOUND'
    // 'E2EE_ON_SOUND'
    // 'INCOMING_MSG_SOUND'
    // 'KNOCKING_PARTICIPANT_SOUND'
    // 'LIVE_STREAMING_OFF_SOUND'
    // 'LIVE_STREAMING_ON_SOUND'
    // 'NO_AUDIO_SIGNAL_SOUND'
    // 'NOISY_AUDIO_INPUT_SOUND'
    // 'OUTGOING_CALL_EXPIRED_SOUND'
    // 'OUTGOING_CALL_REJECTED_SOUND'
    // 'OUTGOING_CALL_RINGING_SOUND'
    // 'OUTGOING_CALL_START_SOUND'
    // 'PARTICIPANT_JOINED_SOUND'
    // 'PARTICIPANT_LEFT_SOUND'
    // 'RAISE_HAND_SOUND'
    // 'REACTION_SOUND'
    // 'RECORDING_OFF_SOUND'
    // 'RECORDING_ON_SOUND'
    // 'TALK_WHILE_MUTED_SOUND'
]
```

### enableNoAudioDetection

type: `Boolean`

Enabling this will run the lib-jitsi-meet no audio detection module which
will notify the user if the current selected microphone has no audio
input and will suggest another valid device if one is present.

Default: `true`

```javascript
enableNoAudioDetection: true
```

### enableNoisyMicDetection

type: `Boolean`

Enabling this will run the lib-jitsi-meet noise detection module which will
notify the user if there is noise, other than voice, coming from the current
selected microphone. The purpose it to let the user know that the input could
be potentially unpleasant for other meeting participants.

Default: `true`

```javascript
enableNoisyMicDetection: true
```

### startAudioMuted

type: `Number`

Every participant after the Nth will start audio muted.

Default: **unset**

```javascript
startAudioMuted: 10
```

### startAudioOnly

type: `Boolean`

Start the conference in audio only mode (no video is being received nor sent).

Default: **unset**

```javascript
startAudioOnly: false
```

### startSilent

type: `Boolean`

Enabling it (with #params) will disable local audio output of remote
participants and to enable it back a reload is needed.

Default: **unset**

```javascript
startSilent: false
```

### startWithAudioMuted

type: `Boolean`

Start calls with audio muted. This option is only applied locally.

Default: **unset**

```javascript
startWithAudioMuted: false
```

## Callstats

### callStatsConfigParams

type: `Object`

The callstats initialize config params as described in the API [here](https://docs.callstats.io/docs/javascript#callstatsinitialize-with-app-secret).

```javascript
callStatsConfigParams: {
    disableBeforeUnloadHandler: true, // disables callstats.js's window.onbeforeunload parameter.
    applicationVersion: "app_version", // Application version specified by the developer.
    disablePrecalltest: true, // disables the pre-call test, it is enabled by default.
    siteID: "siteID", // The name/ID of the site/campus from where the call/pre-call test is made.
    additionalIDs: { // additionalIDs object, contains application related IDs.
        customerID: "Customer Identifier. Example, walmart.",
        tenantID: "Tenant Identifier. Example, monster.",
        productName: "Product Name. Example, Jitsi.",
        meetingsName: "Meeting Name. Example, Jitsi loves callstats.",
        serverName: "Server/MiddleBox Name. Example, jvb-prod-us-east-mlkncws12.",
        pbxID: "PBX Identifier. Example, walmart.",
        pbxExtensionID: "PBX Extension Identifier. Example, 5625.",
        fqExtensionID: "Fully qualified Extension Identifier. Example, +71 (US) +5625.",
        sessionID: "Session Identifier. Example, session-12-34"
    },
    collectLegacyStats: true, //enables the collection of legacy stats in chrome browser
    collectIP: true //enables the collection localIP address
}
```

### callStatsID

type: `String`

You must provide the Application ID to enable sending statistics to callstats.io

```javascript
callStatsID: 'my-callstats-app-id'
```

### callStatsSecret

type: `String`

You must provide the Secret to enable sending statistics to callstats.io

```javascript
callStatsSecret: 'my-callstats-secret'
```

### enableDisplayNameInStats

type: `Boolean`

Enables sending participants' display names to callstats.

```javascript
enableDisplayNameInStats: false
```

### enableEmailInStats

type: `Boolean`

Enables sending participants' emails (if available) to callstats and other analytics

```javascript
enableEmailInStats: false
```

### feedbackPercentage

type: `Number`

Controls the percentage of automatic feedback shown to participants when callstats is enabled.
The default value is 100%. If set to 0, no automatic feedback will be requested

```javascript
feedbackPercentage: 100
```

## Closed captions

### autoCaptionOnRecord*

type: `Boolean`

Enables turning captions on automatically when the recording starts

Default: `false`

```javascript
autoCaptionOnRecord: false
```

### preferredTranscribingLanguage 🚫

type: `Boolean`

Transcriber language. This settings will only work if `transcribeWithAppLanguage` is explicitly set to `false`.
Available languages can be found [here](https://github.com/jitsi/jitsi-meet/blob/master/react/features/transcribing/transcriber-langs.json).

Default: `'en-US'`

```javascript
preferredTranscribeLanguage: 'en-CA'
```

### transcribeWithAppLanguage 🚫

type: `Boolean`

If `true` the transcriber will use the application language.
The application language is either explicitly set by participants in their settings or automatically
detected based on the environment, e.g. if the app is opened in a chrome instance which is using french as its
default language then transcriptions for that participant will be in french.

Default: `true`

```javascript
transcribeWithAppLanguage: false
```

### transcribingEnabled

type: `Boolean`

Enable transcription (in interface_config, subtitles and buttons can be configured).

Default: `false`

```javascript
transcribingEnabled: true
```

## Connection

### bosh*

type: `String`

The BOSH URL.

```javascript
bosh: '//jitsi-meet.example.com/http-bind'
```

### disableRtx

type: `Boolean`

Disables or enables RTX (RFC 4588).

Default: `false`

```javascript
disableRtx: true
```

### disableSimulcast

type: `Boolean`

Enable / disable simulcast support.

Default: `false`

```javascript
disableSimulcast: true
```

### e2ee

type: `Object`

Configure End-to-End Encryption.

```javascript
e2ee: {
    labels: {
        labelTooltip: 'Tooltip',
        description: 'Description',
        label: 'E2EE',
        warning: 'Warning'
    },
    externallyManagedKey: false
}
```

### e2eping

type: `Object`

Options related to end-to-end (participant to participant) ping.

Properties:
* `enabled` - Whether end-to-end pings should be enabled.
* `numRequests` - The number of responses to wait for.
* `maxConferenceSize` - The max conference size in which e2e pings will be sent.
* `maxMessagesPerSecond` - The maximum number of e2e ping messages per second for the whole conference to aim for.
    This is used to contol the pacing of messages in order to reduce the load on the backend.

```javascript
e2eping: {
    enabled: false,
    numRequests: 5,
    maxConferenceSize: 200,
    maxMessagesPerSecond: 250
}
```

### enableEncodedTransformSupport

type: `Boolean`

Enable support for encoded transform in supported browsers. This allows
E2EE to work in Safari if the corresponding flag is enabled in the browser.
**Experimental**.

```javascript
enableEncodedTransformSupport: false
```

### enableForcedReload 🚫

type: `Boolean`

Enables forced reload of the client when the call is migrated as a result of
the bridge going down.

```javascript
enableForcedReload: true
```

### enableIceRestart

type: `Boolean`

Enables ICE restart logic in LJM and displays the page reload overlay on
ICE failure. Current disabled by default because it's causing issues with
signaling when Octo is enabled. Also when we do an "ICE restart"(which is
not a real ICE restart), the client maintains the TCC sequence number
counter, but the bridge resets it. The bridge sends media packets with
TCC sequence numbers starting from 0.

```javascript
enableIceRestart: true
```

### gatherStats

type: `Boolean`

Whether to enable stats collection or not in the `TraceablePeerConnection`.
This can be useful for debugging purposes (post-processing/analysis of
the webrtc stats) as it is done in the jitsi-meet-torture bandwidth
estimation tests.

```javascript
gatherStats: false
```

### hosts

type: `Object`

URLs for the app connection.

Properties
* `domain` - XMPP domain
* `anonymousdomain` - When using authentication, domain for guest users.
* `authdomain` - Domain for authenticated users. Defaults to `domain`.
* `focus` - Focus component domain. Defaults to **focus.`domain`**.
* `muc` - XMPP MUC domain.

```javascript
hosts: {
    domain: 'jitsi-meet.example.com',
    anonymousdomain: 'guest.example.com',
    authdomain: 'jitsi-meet.example.com',
    focus: 'focus.jitsi-meet.example.com',
    muc: 'conference.jitsi-meet.example.com'
}
```

### p2p

type: `Object`

Peer-To-Peer mode: used (if enabled) when there are just 2 participants.

Properties:
* `enabled` - Enables peer to peer mode. When enabled the system will try to
    establish a direct connection when there are exactly 2 participants
    in the room. If that succeeds the conference will stop sending data
    through the JVB and use the peer to peer connection instead. When a
    3rd participant joins the conference will be moved back to the JVB
    connection.
* `enableUnifiedOnChrome` - Enable unified plan implementation support on Chromium for p2p connection.
* `iceTransportPolicy` - Sets the ICE transport policy for the p2p connection. At the time
    of this writing the list of possible values are `all` and `relay`,
    but that is subject to change in the future. The enum is defined in
    the [WebRTC standard](https://www.w3.org/TR/webrtc/#rtcicetransportpolicy-enum).
    If not set, the effective value is `all`.
* `preferH264` - __DEPRECATED__ Use `preferredCodec` instead.
* `preferredCodec` - Provides a way to set the video codec preference on the p2p connection. Acceptable
    codec values are `VP8`, `VP9` and `H264`.
* `disableH264` - __DEPRECATED__ Use `disabledCodec` instead.
* `disabledCodec` - Provides a way to prevent a video codec from being negotiated on the p2p connection
* `backToP2PDelay` - How long we're going to wait, before going back to P2P after the 3rd
    participant has left the conference (to filter out page reload).
* `stunServers` - The STUN servers that will be used in the peer to peer connections.

```javascript
p2p: {
    enabled: true,
    enableUnifiedOnChrome: false,
    iceTransportPolicy: 'all',
    preferredCodec: 'H264',
    disabledCodec: '',
    backToP2PDelay: 5,
    stunServers: [
        { urls: 'stun:jitsi-meet.example.com:3478' },
        { urls: 'stun:meet-jit-si-turnrelay.jitsi.net:443' }
    ]
}
```

### pcStatsInterval

type: `Number`

The interval at which PeerConnection.getStats() is called.

Default: `10000`

```javascript
pcStatsInterval: 50000
```

### useNewBandwidthAllocationStrategy 🚫

type: `Boolean`

Provides a way to translate the legacy bridge signaling messages, `LastNChangedEvent`,
`SelectedEndpointsChangedEvent` and `ReceiverVideoConstraint` into the new `ReceiverVideoConstraints` message
that invokes the new bandwidth allocation algorithm in the bridge which is described [here](https://github.com/jitsi/jitsi-videobridge/blob/master/doc/allocation.md).

```javascript
useNewBandwidthAllocationStrategy: false
```

### useTurnUdp

type: `Boolean`

Use TURN/UDP servers for the jitsi-videobridge connection (by default
we filter out TURN/UDP because it is usually not needed since the
bridge itself is reachable via UDP)

```javascript
useTurnUdp: false
```

### webrtcIceTcpDisable

type: `Boolean`

Disables ICE/TCP by filtering out local and remote TCP candidates in signalling.

```javascript
webrtcIceTcpDisable: false
```

### webrtcIceUdpDisable

type: `Boolean`

Disables ICE/UDP by filtering out local and remote UDP candidates in signalling.

```javascript
webrtcIceUdpDisable: false
```

### websocket 🚫

type: `String`

Websocket URL

```javascript
websocket: 'wss://jitsi-meet.example.com/xmpp-websocket'
```

## Etherpad

### etherpad_base

type: `String`

If set, it adds a "Open shared document" link to the bottom right menu that
will open an etherpad document.

```javascript
etherpad_base: 'https://your-etherpad-installati.on/p/'
```

### openSharedDocumentOnJoin

type: `Boolean`

If etherpad integration is enabled, setting this to `true` will
automatically open the etherpad when a participant joins.  This
does not affect the mobile app since opening an etherpad
obscures the conference controls -- it's better to let users
choose to open the pad on their own in that case.

```javascript
openSharedDocumentOnJoin: false
```

## LastN

### channelLastN

type: `Number`

Default value for the channel "last N" attribute. -1 for unlimited.

```javascript
channelLastN: -1
```

### lastNLimits 🚫

type: `Object`

Provides a way to use different "last N" values based on the number of participants in the conference.
The keys in an Object represent number of participants and the values are "last N" to be used when number of
participants gets to or above the number.


For the given example mapping, "last N" will be set to 20 as long as there are at least 5, but less than
29 participants in the call and it will be lowered to 15 when the 30th participant joins. The 'channelLastN'
will be used as default until the first threshold is reached.

```javascript
lastNLimits: {
    5: 20,
    30: 15,
    50: 10,
    70: 5,
    90: 2
}
```

### startLastN

type: `Number`

Provides a way for the lastN value to be controlled through the UI.
When startLastN is present, conference starts with a last-n value of startLastN and channelLastN
value will be used when the quality level is selected using "Manage Video Quality" slider.

```javascript
startLastN: 1
```

## Lobby

### autoKnockLobby

type: `Boolean`

If Lobby is enabled starts knocking automatically.

```javascript
autoKnockLobby: false
```

### enableLobbyChat

type: `Boolean`

Enable lobby chat.

```javascript
enableLobbyChat: false
```

### hideLobbyButton

type: `Boolean`

Hide the lobby button.

```javascript
hideLobbyButton: false
```


