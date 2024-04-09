---
id: dev-guide-configuration
title: Configuration
---

This page describes available configuration options for Jitsi Meet. These are either set in `config.js` on the server
side or overridden in the app.

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

Toolbar buttons which have their click/tap event exposed through the API on `toolbarButtonClicked`. Passing a string for the button key will prevent execution of the click/tap routine; passing an object with `key` and `preventExecution` flag on false will not prevent execution of the click/tap routine. Below array with mixed mode for passing the buttons.

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

### customParticipantMenuButtons

type: `Array<{ icon: string; id: string; text: string; }>`

Default: **unset**

A list of custom buttons that can be added to the Participant Context Menu. Each will have an icon, that can be either a base64 encoded image or the path to an image, a unique id, and a text that will be displayed alongside the icon in the menu. This custom button will trigger the `participantMenuButtonClick` event that will have the id set to the button as the `key` and the `participantId`, representing the id of the participant for which the button was clicked.

```javascript
customParticipantMenuButtons: [
    {
        icon: 'data:image/svg+xml;base64,...',
        id: 'custom-button',
        text: 'Custom Button'
    }
]
```

### customToolbarButtons

type: `Array<{ icon: string; id: string; text: string; }>`

Default: **unset**

A list of custom buttons that can be added to the Toolbar. Each will have an icon, that can be either a base64 encoded image or the path to an image, a unique id, and a text that will be displayed alongside the icon in the menu. This custom button will trigger the `toolbarButtonClicked` event that will the id set to the button as the `key`.

```javascript
customToolbarButtons: [
    {
        icon: 'data:image/svg+xml;base64,...',
        id: 'custom-toolbar-button',
        text: 'Custom Toolbar Button'
    }
]
```

### mouseMoveCallbackInterval

type: `Number`

Default interval (milliseconds) for triggering `mouseMoved` iframe API event.

Default: `1000`

```javascript
mouseMoveCallbackInterval: 1000
```

### participantMenuButtonsWithNotifyClick

type: `Array`

Participant context menu buttons which have their click/tap event exposed through the API on `participantMenuButtonClick`. Passing a string for the button key will prevent execution of the click/tap routine; passing an object with `key` and `preventExecution` flag on false will not prevent execution of the click/tap routine. Below array with mixed mode for passing the buttons.

Default: **unset**

```javascript
participantMenuButtonsWithNotifyClick: [
    'allow-video',
    {
        key: 'ask-unmute',
        preventExecution: false
    },
    'conn-status',
    'flip-local-video',
    'grant-moderator',
    {
        key: 'kick',
        preventExecution: true
    },
    {
        key: 'hide-self-view',
        preventExecution: false
    },
    'mute',
    'mute-others',
    'mute-others-video',
    'mute-video',
    'pinToStage',
    'privateMessage',
    {
        key: 'remote-control',
        preventExecution: false
    },
    'send-participant-to-room',
    'verify',
]
```

### useHostPageLocalStorage

type: `Boolean`

This property is related to the use case when Jitsi Meet is used via the IFrame API. When the property is true
Jitsi Meet will use the local storage of the host page instead of its own. This option is useful if the browser
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

### ~~disableSpeakerStatsSearch~~

type: `Boolean`

Specifies whether there will be a search field in speaker stats or not.

__DEPRECATED__ Use `speakerStats.disableSearch` instead.

Default: false

```javascript
disableSpeakerStatsSearch: false
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
    // '_ON_SOUND'
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

### speakerStats

type: `Object`

Options related to the speaker stats feature.

Properties: 

* `disabled` - Specifies whether the speaker stats is enable or not.
* `disableSearch` - Specifies whether there will be a search field in speaker stats or not.
* `order` - Specifies whether participants in speaker stats should be ordered or not, and with what priority.

Default:

```javascript
speakerStats: {
    disabled: false,
    disableSearch: false,
    order: [
        'role', // Moderators on top.
        'name', // Alphabetically by name.
        'hasLeft', // The ones that have left in the bottom.
    ], // the order of the array elements determines priority.
}
```

### ~~speakerStatsOrder~~

type: `Array`

Specifies whether participants in speaker stats should be ordered or not, and with what priority.

__DEPRECATED__ Use `speakerStats.order` instead.

Default:
 ```javascript
    speakerStatsOrder: [
        'role', // Moderators on top.
        'name', // Alphabetically by name.
        'hasLeft', // The ones that have left in the bottom.
    ], // the order of the array elements determines priority.
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

## Breakout rooms

### breakoutRooms

type: `Object`

Options related to the breakout rooms feature.

Default: **unset**

Properties:
* `hideAddRoomButton` - Hides the add breakout room button. This replaces `hideAddRoomButton`.
* `hideAutoAssignButton` - Hides the auto assign participants button.
* `hideJoinRoomButton` - Hides the join breakout room button.
* `hideModeratorSettingsTab` - Hides the button to open the moderator settings tab.
* `hideMoreActionsButton` - Hides the more actions button.
* `hideMuteAllButton` - Hides the mute all button.

```javascript
breakoutRooms: {
    hideAddRoomButton: false,
    hideAutoAssignButton: false,
    hideJoinRoomButton: false
}
```

### ~~hideAddRoomButton~~

type: `Boolean`

__DEPRECATED__ Use `breakoutRooms.hideAddRoomButton` instead.

Hides add breakout room button.

Default: `false`

```javascript
hideAddRoomButton: false
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

## Transcriptions

### autoCaptionOnRecord 

__DEPRECATED__ Use `transcription.autoTranscribeOnRecord` instead.

### preferredTranscribingLanguage

__DEPRECATED__ Use `transcription.preferredLanguage` instead.

### transcribeWithAppLanguage

__DEPRECATED__ Use `transcription.useAppLanguage` instead.

### transcribingEnabled

__DEPRECATED__ Use `transcription.enabled` instead.

### transcription

type: `Object`

Transcription related options.

Properties:

* `enabled` - Enable transcription (in interface_config, subtitles and buttons can be configured). Default `false`.
* `translationLanguages` - Translation languages. Available languages can be found in ./src/react/features/transcribing/translation-languages.json.
* `useAppLanguage` - If `true` the transcriber will use the application language. The application language is either explicitly set by participants in their settings or automatically detected based on the environment, e.g. if the app is opened in a Chrome instance which is using French as its default language then transcriptions for that participant will be in french. Default: `true`.
* `preferredLanguage` - Transcriber language. This settings will only work if `useAppLanguage` is explicitly set to `false`. Available languages can be found [here](https://github.com/jitsi/jitsi-meet/blob/master/react/features/transcribing/transcriber-langs.json). Default: `'en-US'`.
* `autoTranscribeOnRecord` - Enables automatic turning on transcribing when recording is started. Default: `true`.

```javascript
transcription: {
    enabled: true,
    translationLanguages: ['en-US', 'es'],
    useAppLanguage: false,
    preferredLanguage: 'en-US',
    autoTranscribeOnRecord: true
}
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
the WebRTC stats) as it is done in the jitsi-meet-torture bandwidth
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
* `iceTransportPolicy` - Sets the ICE transport policy for the p2p connection. At the time
    of this writing the list of possible values are `all` and `relay`,
    but that is subject to change in the future. The enum is defined in
    the [WebRTC standard](https://www.w3.org/TR/webrtc/#rtcicetransportpolicy-enum).
    If not set, the effective value is `all`.
* `codecPreferenceOrder` - Provides a way to set the codec preference on desktop based endpoints.
* `mobileCodecPreferenceOrder` - Provides a way to set the codec preference on mobile devices, both on RN and mobile browser based endpoints.
* `preferredCodec` - __DEPRECATED__ Use `codecPreferenceOrder` or `mobileCodecPreferenceOrder` instead.
* `disabledCodec` - __DEPRECATED__ Use `codecPreferenceOrder` or `mobileCodecPreferenceOrder` instead.
* `backToP2PDelay` - How long we're going to wait, before going back to P2P after the 3rd
    participant has left the conference (to filter out page reload).
* `stunServers` - The STUN servers that will be used in the peer to peer connections.

```javascript
p2p: {
    enabled: true,
    enableUnifiedOnChrome: false,
    iceTransportPolicy: 'all',
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

### peopleSearchQueryTypes

type: `Array`

The entity types which are queriable when inviting people in a room. Valid values are "phone", "room", "sip", "user", "videosipgw" and "email". Authentication for Jitsi entity types is done by passing a jwt, authentication for external entity types (e. g. email) is done by passing an alternative token (e. g. peopleSearchTokenLocation).

Default: `[]`

```javascript
peopleSearchQueryTypes: ["user", "email"]
```

### peopleSearchUrl

type: `String`

Directory endpoint which is called for invite dialog autocomplete. Expected response format is an array of objects. Each object should be formatted as follows:

```javascript
{
    id: int,
    type: string, # the entity type (phone, room, user, email etc.),
    name: string, # the entity display name
    avatar?: string, # full URL to the entity picture, not mandatory
    number?: string, # required for phone numbers
}
```

Default: `""`

```javascript
peopleSearchUrl: "https://myservice.com/api/people"
```

### inviteServiceUrl

type: `String`

Endpoint which is called to send invitation requests. The request is made in POST and contains as a POST body an array of objects formatted the same as the peopleSearchUrl response body.

Default: `""`

```javascript
inviteServiceUrl: "https://myservice.com/api/invite"
```

### peopleSearchTokenLocation

type: `String`

For external entities (e. g. email), the localStorage key holding the token value for directory and invite endpoints authentication.


Default: `""`

```javascript
peopleSearchTokenLocation: "mytoken"
```

### peopleSearchTokenKey

type: `String`

For external entities (e. g. email), the query param name which will hold the token value. For example, if peopleSearchTokenLocation is "mytoken" and peopleSearchTokenKey is "token", then the following will be passed in the requests to the directory and invite endpoints : `?token={localStorage.getItem("mytoken")}`


Default: `""`

```javascript
peopleSearchTokenKey: "token"
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

## Filmstrip

### disableFilmstripAutohiding

type: `Boolean`

Prevents the filmstrip from autohiding when screen width is under a certain threshold

Default: `false`

```javascript
disableFilmstripAutohiding: true
```

### filmstrip

type: `Object`

Options related to the filmstrip.

Default: **unset**

Properties:
* `disableResizable` - Disables user resizable filmstrip. This also allows configuration of the filmstrip
    (width, tiles aspect ratios) through the interfaceConfig options.
* `disableStageFilmstrip` - Disables the stage filmstrip (displaying multiple
    participants on stage besides the vertical filmstrip)

```javascript
filmstrip: {
    disableResizable: true,
    disableStageFilmstrip: false
}
```

## Face Landmarks

### faceLandmarks

type: `Object`

Options related to the face landmarks features.

Properties:
* `enableFaceCentering` - Enables centering faces within a video by sharing face coordinates.
* `enableFaceExpressionsDetection` - Enables detecting face expressions from video.
* `enableDisplayFaceExpressions` - Enables displaying face expressions in speaker stats.
* `enableRTCStats` - Enables anonymized stats collection for face landmarks.
* `faceCenteringThreshold` - Minimum required face movement percentage threshold for sending new face centering coordinates data.
* `captureInterval` - Milliseconds for processing a new image capture in order to detect face landmarks.

```javascript
faceLandmarks: {
        enableFaceCentering: false,
        enableFaceExpressionsDetection: false,
        enableDisplayFaceExpressions: false,
        enableRTCStats: false,
        faceCenteringThreshold: 20,
        captureInterval: 1000
},
```

## Giphy

### giphy

type: `Object`

Setup for the Giphy integration.

Properties:
* `enabled` - Whether the feature is enabled or not.
* `sdkKey` - SDK API Key from Giphy.
* `displayMode` - Display mode can be one of:
    - `tile` - show the GIF on the tile of the participant that sent it.
    - `chat` - show the GIF as a message in chat.
    - `all` - all of the above. This is the default option.
* `tileTime` - How long the GIF should be displayed on the tile (in milliseconds).
* `rating` - Limit results by audience rating: 
    - `g` - broadly accepted as appropriate in a public environment. This is the default option.
    - `pg` - commonly witnessed in a public environment, but not as broadly accepted as appropriate.
    - `pg-13` - typically not seen unless sought out, but still commonly witnessed.
    - `r` - typically not seen unless sought out, and could be considered alarming if witnessed.

```javascript
giphy: {
    enabled: true,
    sdkKey: 'example-key',
    displayMode: 'tile',
    tileTime: 7000,
    rating: 'pg'
}
```

## Gravatar

### gravatar

type: `Object`

Setup for Gravatar-compatible services.

Properties:
* `baseUrl` 🚫 - Base URL for a Gravatar-compatible service. Defaults to Gravatar.
* `disabled` - True if Gravatar should be disabled.

```javascript
gravatar: {
    baseUrl: 'https://www.gravatar.com/avatar/',
    disabled: false
}
```

### ~~gravatarBaseURL~~ 🚫

type: `String`

__DEPRECATED__ Use `gravatar.baseUrl` instead.

Base URL for a Gravatar-compatible service.

Default: 'https://www.gravatar.com/avatar/'

```javascript
gravatarBaseURL: 'https://www.gravatar.com/avatar/'
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

### ~~autoKnockLobby~~

type: `Boolean`

__DEPRECATED__ Use `lobby.autoKnock` instead.

If Lobby is enabled starts knocking automatically.

```javascript
autoKnockLobby: false
```

### ~~enableLobbyChat~~

type: `Boolean`

__DEPRECATED__ Use `lobby.enableChat` instead.

Enable lobby chat.

```javascript
enableLobbyChat: false
```

### ~~hideLobbyButton~~

type: `Boolean`

__DEPRECATED__ Use `securityUi.hideLobbyButton` instead.

Hide the lobby button.

```javascript
hideLobbyButton: false
```

### lobby

type: `Object`

Options related to the lobby screen.

Default: **unset**

Properties:
* `autoKnock` - If the lobby is enabled, it starts knocking automatically. Replaces `autoKnockLobby`.
* `enableChat` - Enables the lobby chat. Replaces `enableLobbyChat`.

```javascript
lobby: {
    autoKnock: true,
    enableChat: false
}
```

## Moderator

### disableModeratorIndicator

type: `Boolean`

Hides the moderator indicators.

Default: `false`

```javascript
disableModeratorIndicator: true
```

### disableReactionsModeration

type: `Boolean`

Disables the moderation of reactions feature.

Default: `false`

```javascript
disableReactionsModeration: true
```

### disableRemoteMute

type: `Boolean`

Disables muting operations of remote participants.

Default: `false`

```javascript
disableRemoteMute: true
```

## Notifications

### notifications

type: `Array`

Use this array to configure which notifications will be shown to the user.
The items correspond to the title or description key of that notification.
Some of these notifications also depend on some other internal logic to be displayed or not,
so adding them here will not ensure they will always be displayed.

A falsy value for this prop will result in having all notifications enabled (e.g null, undefined, false).

```javascript
notifications: []
```

### disabledNotifications

type: `Array`

List of notifications to be disabled. Works in tandem with the above setting.

```javascript
disabledNotifications: [
    'notify.chatMessages', // shown when receiving chat messages while the chat window is closed
    'notify.grantedTo', // shown when moderator rights were granted to a participant
]
```

## Participants Pane

### participantsPane

type: `Object`

Options related to the participants pane.

Default: **unset**

Properties:
* `hideModeratorSettingsTab` - Hides the button to open the moderator settings tab.
* `hideMoreActionsButton` - Hides the more actions button.
* `hideMuteAllButton` - Hides the mute all button.

```javascript
participantsPane: {
    hideModeratorSettingsTab: false,
    hideMoreActionsButton: false,
    hideMuteAllButton: false
}
```

## Recording

### dropbox

type: `Object`

Enable the dropbox integration.

Properties:
* `appKey` - Your APP Key.
* `redirectURI` - A URL to redirect the user to, after authenticating by default uses

```javascript
dropbox: {
    appKey: 'DROPBOX_APP_KEY',
    redirectURI: 'https://jitsi-meet.example.com/subfolder/static/oauth.html'
}
```

### fileRecordingsEnabled

type: `Boolean`

Whether to enable file recording or not.

```javascript
fileRecordingsEnabled: false
```

### fileRecordingsServiceEnabled 🚫

type: `Boolean`

When integrations like dropbox are enabled only that will be shown,
by enabling fileRecordingsServiceEnabled, we show both the integrations
and the generic recording service (its configuration and storage type
depends on jibri configuration)

```javascript
fileRecordingsServiceEnabled: true
```

### fileRecordingsServiceSharingEnabled 🚫

type: `Boolean`

Whether to show the possibility to share file recording with other people
(e.g. meeting participants), based on the actual implementation
on the backend.

```javascript
fileRecordingsServiceSharingEnabled: false
```

### hideRecordingLabel

type: `Boolean`

Set recording label to auto hide instead of staying always on screen.

Default: `false`

```javascript
hideRecordingLabel: true
```

### localRecording

type: `Object`

Set local recording configuration.

Properties:
* `disable` - Whether to disable the feature or not.
* `notifyAllParticipants` - Whether to notify all the participants when a local recording is started.

```javascript
localRecording: {
    disable: false,
    notifyAllParticipants: true
}
```

### recordingLimit 🚫

type: `Object`

Options for the recording limit notification.

Properties:
* `limit` - The recording limit in minutes. Note: This number appears in the notification text
    but doesn't enforce the actual recording time limit. This should be configured in jibri!
* `appName` = The name of the app with unlimited recordings.
* `appURL` - The URL of the app with unlimited recordings.

```javascript
recordingLimit: {
    limit: 60,
    appName: 'Unlimited recordings APP',
    appURL: 'https://unlimited.recordings.app.com/'
}
```

### recordings

type: `Object`

Options for the recordings features.

Properties:
* `recordAudioAndVideo` - If true (default) recording audio and video is selected by default in the recording dialog.
* `suggestRecording` - If true, shows a notification at the start of the meeting with a call to action button to start recording (for users who can do so).
* `showPrejoinWarning` - If true, shows a warning label in the prejoin screen to point out the possibility that the call you're joining might be recorded.

```javascript
recordings: {
    recordAudioAndVideo: true,
    suggestRecording: false,
    showPrejoinWarning: true
}
```

## Screen Sharing

### desktopSharingFrameRate

type: `Object`

Optional desktop sharing frame rate options

Default: `{
    min: 5,
    max: 5
}`

```javascript
desktopSharingFrameRate: {
    min: 3,
    max: 10
}
```

### disableScreensharingVirtualBackground

type: `Boolean`

Disables using screensharing as virtual background.

```javascript
disableScreensharingVirtualBackground: false
```

### screenshotCapture

type: `Object`

Options for the screenshot capture feature.

Properties:
* `enabled` - Enables the feature
* `mode` - The mode for the screenshot capture feature. Can be either 'recording' - screensharing screenshots
    are taken only when the recording is also on, or 'always' - screensharing screenshots are always taken.

```javascript
screenshotCapture: {
    enabled: true,
    mode: 'recording'
}
```

## Security UI
### securityUi

type: `Object`

Options regarding the security-related UI elements.

Default: **unset**

Properties:
* `hideLobbyButton` - Hides the lobby button. Replaces `hideLobbyButton`.
* `disableLobbyPassword` - Hides the possibility to set and enter a lobby password.

```javascript
securityUi: {
    hideLobbyButton: true,
    disableLobbyPassword: false
}
```

## Testing
### testing

type: `Object`

Experimental features.

Default: **unset**

Properties:
* `assumeBandwidth` - Allows the setting of a custom bandwidth value from the UI.
* `disableE2EE` - Disables the End to End Encryption feature. Useful for debugging issues related to insertable streams.
* `mobileXmppWsThreshold` - Enables XMPP WebSocket (as opposed to BOSH) for the given amount of users.
* `p2pTestMode` - P2P test mode disables automatic switching to P2P when there are 2 participants in the conference.
* `testMode` - Enables the test specific features consumed by jitsi-meet-torture.
* `noAutoPlayVideo` - Disables the auto-play behavior of *all* newly created video element. This is useful when the client runs on a host with limited resources.

```javascript
testing: {
    assumeBandwidth: true,
    disableE2EE: false,
    mobileXmppWsThreshold: 10, // enable XMPP WebSockets on mobile for 10% of the users
    p2pTestMode: false,
    testMode: false,
    noAutoPlayVideo: false
}
```

## Video

### constraints

type: `Object`

W3C spec-compliant video constraints to use for video capture. Currently
used by browsers that return true from lib-jitsi-meet's
`util#browser#usesNewGumFlow`. The constraints are independent of
this config's resolution value. Defaults to requesting an ideal
resolution of 720p.

```javascript
constraints: {
    video: {
        height: {
            ideal: 720,
            max: 720,
            min: 240
        }
    }
}
```

### disableAddingBackgroundImages

type: `Boolean`

When true the user cannot add more images to be used as a virtual background.
Only the default ones will be available.

```javascript
disableAddingBackgroundImages: true
```

### disableH264

type: `Boolean`

If set to true, disable the H.264 video codec by stripping it out of the SDP.

```javascript
disableH264: true
```

### disableLocalVideoFlip

type: `Boolean`

Disable the Flip video option from the context menu for local video.

```javascript
disableLocalVideoFlip: true
```

### disableSelfView

type: `Boolean`

Disables self-view tile. (hides it from tile view and filmstrip)

```javascript
disableSelfView: true
```

### doNotFlipLocalVideo

type: `Boolean`

A property used to unset the default flip state of the local video.
When it is set to `true`, the local(self) video will not be mirrored anymore.

```javascript
doNotFlipLocalVideo: true
```

### maxFullResolutionParticipants

type: `Boolean`

How many participants while in the tile view mode, before the receiving video quality is reduced from HD to SD?
Use `-1` to disable.

```javascript
maxFullResolutionParticipants: 5
```

### ~~preferH264~~

type: `Boolean`

__DEPRECATED__ Use `preferredCodec` under the `videoQuality` section instead.

Prefer to use the H.264 video codec (if supported).
Note that it's not recommended to do this because simulcast is not
supported when  using H.264. For 1-to-1 calls this setting is enabled by
default and can be toggled in the p2p section.

### resolution

type: `Number`

Sets the preferred resolution (height) for local video

Default: `720`

```javascript
resolution: 1080
```

### startVideoMuted

type: `Number`

Every participant after the Nth will start the video muted.

```javascript
startVideoMuted: 5
```

### startWithVideoMuted

type: `Boolean`

Start calls with video muted. Only applied locally.

```javascript
startWithVideoMuted: true
```

### videoQuality

type: `Object`

Specify the settings for video quality optimizations on the client.

Properties:
* `codecPreferenceOrder` - Provides a way to set the codec preference on desktop-based endpoints.
* `mobileCodecPreferenceOrder` - Provides a way to set the codec preference on mobile devices, both on RN and mobile browser-based endpoints.
* `disabledCodec` - __DEPRECATED__ Use `codecPreferenceOrder` or `mobileCodecPreferenceOrder` instead.
* `preferredCodec` - __DEPRECATED__ Use `codecPreferenceOrder` or `mobileCodecPreferenceOrder` instead.
* `maxBitratesVideo` - Provides a way to configure the maximum bitrates that will be enforced on the simulcast streams for
    video tracks. The keys in the object represent the type of stream (LD, SD, or HD), and the values
    are the max.bitrates to be set on that particular type of stream. The actual send may vary based on
    the available bandwidth calculated by the browser, but it will be capped by the values specified here.
    This is currently not implemented on app-based clients on mobile.
* `minHeightForQualityLvl` - The options can be used to override default thresholds of video thumbnail heights corresponding to
    the video quality levels used in the application. At the time of this writing, the allowed levels are:
    *    `low` - for the low-quality level (180p at the time of this writing)
    *    `standard` - for the medium quality level (360p)
    *    `high` - for the high-quality level (720p)

    The keys should be positive numbers which represent the minimal thumbnail height for the quality level.
    With the default config value below the application will use 'low' quality until the thumbnails are
    at least 360 pixels tall. If the thumbnail height reaches 720 pixels then the application will switch to
    the high quality.

```javascript
videoQuality: {
    maxBitratesVideo: {
        H264: {
            low: 200000,
            standard: 500000,
            high: 1500000
        },
        VP8 : {
            low: 200000,
            standard: 500000,
            high: 1500000
        },
        VP9: {
            low: 100000,
            standard: 300000,
            high: 1200000
        }
    },
    minHeightForQualityLvl: {
        360: 'standard',
        720: 'high'
    },
}
```

## Whiteboard

### whiteboard

type: `Object`

Options related to the Excalidraw whiteboard integration.

Default: **unset**

Properties:
* `enabled` - Whether the feature is enabled or not.
* `collabServerBaseUrl` - The [server](https://github.com/jitsi/excalidraw-backend) used to support whiteboard collaboration.
* `userLimit` - The user access limit to the whiteboard, introduced as a means to control the performance.
* `limitUrl` - The url for more info about the whiteboard and its usage limitations.

```javascript
whiteboard: {
    enabled: true,
    collabServerBaseUrl: 'https://excalidraw-backend.example.com',
    userLimit: 25,
    limitUrl: 'https://example.com/blog/whiteboard-limits'
}
