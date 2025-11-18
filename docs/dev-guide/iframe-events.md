---
id: dev-guide-iframe-events
title: Events
---

The `JitsiMeetExternalAPI` object implements the [EventEmitter] API for emitting and listening for events.

You can add event listeners to the embedded Jitsi Meet using the **`addListener`** method:

```javascript
api.addListener(event, listener);
```

If you want to remove a listener you can use the **`removeListener`** method:

```javascript
api.removeListener(event, listener);
```

The **`event`** parameter is a string object with the name of the event.

The **`listener`** parameter is a function object with one argument that creates a notification when the event occurs along with related event data.

## Event Categories

**Conference Lifecycle:**
- `videoConferenceJoined`, `videoConferenceLeft`
- `readyToClose`, `participantJoined`, `participantLeft`

**Participant Events:**
- `participantJoined`, `participantLeft`, `participantKickedOut`
- `participantRoleChanged`, `displayNameChange`
- `avatarChanged`, `emailChange`

**Audio/Video Events:**
- `audioMuteStatusChanged`, `videoMuteStatusChanged`
- `audioAvailabilityChanged`, `videoAvailabilityChanged`
- `cameraError`, `micError`
- `screenSharingStatusChanged`, `contentSharingParticipantsChanged`

**UI & Layout Events:**
- `tileViewChanged`, `filmstripDisplayChanged`
- `largeVideoChanged`, `dominantSpeakerChanged`
- `participantsPaneToggled`

**Chat & Communication:**
- `incomingMessage`, `chatUpdated`
- `endpointTextMessageReceived`, `nonParticipantMessageReceived`

**Recording & Streaming:**
- `recordingStatusChanged`, `recordingLinkAvailable`

**Lobby & Moderation:**
- `knockingParticipant`
- `moderationStatusChanged`, `moderationParticipantApproved`, `moderationParticipantRejected`

**Breakout Rooms:**
- `breakoutRoomsUpdated`

**System Events:**
- `errorOccurred`, `log`, `browserSupport`
- `deviceListChanged`, `dataChannelOpened`

---

## Events

### cameraError

Fired when camera access fails.

**Payload:**
```javascript
{
    type: string,    // Error type constant
    message: string  // Error description
}
```

### avatarChanged

Fired when a participant's avatar changes.

**Payload:**
```javascript
{
    id: string,        // Participant ID
    avatarURL: string  // New avatar URL
}
```

### audioAvailabilityChanged

Provides event notifications about changes to audio availability status.

The listener receives an object with the following structure:

```javascript
{
    available: boolean // new available status - boolean
}
```

### audioMuteStatusChanged

Provides event notifications about changes to audio mute status.

The listener receives an object with the following structure:

```javascript
{
    muted: boolean // new muted status - boolean
}
```

### breakoutRoomsUpdated

Provides notifications about breakout rooms changes.

The listener receives an object with the following structure:

```javascript
{
    [roomId]: {
        id: string,
        jid: string,
        name: string,
        isMainRoom: true | undefined,
        participants: {
            [participantJid]: {
                displayName: string,
                jid: string,
                role: string
            }
        }
    },
    ...
}
```


### browserSupport

Fired when browser support status is determined.

**Payload:**
```javascript
{
    supported: boolean  // true if browser is supported, false otherwise
}
```

### contentSharingParticipantsChanged

Fired when the list of screen-sharing participants changes.

**Payload:**
```javascript
{
    data: string[]  // Array of participant IDs currently sharing their screen
}
// Example: { data: ['participant1', 'participant2'] }
```

### customNotificationActionTriggered

Callback that triggers for custom actions defined for the [showNotification](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe-commands/#shownotification) command

The listener receives an object with the following structure:

```javascript
{
    data: {
        id: string // uuid of the triggered action
    }
}
```

### dataChannelOpened

Fired when the data channel opens, enabling peer-to-peer messaging.

**Payload:** None

### endpointTextMessageReceived

Fired when a text message is received via data channels.

**Payload:**
```javascript
{
    senderInfo: {
        jid: string,  // Sender's Jabber ID
        id: string    // Sender's participant ID
    },
    eventData: {
        name: string,  // Event name: 'endpoint-text-message'
        text: string   // Message content
    }
}
```

### nonParticipantMessageReceived

Fired when a message is received from a non-participant (e.g., server, bot).

**Payload:**
```javascript
{
    id: string | null,  // Message ID (may be null)
    message: string     // Message content
}
```

### faceLandmarkDetected

Provides event notifications when a face landmark is detected

The listener receives an object with the following structure:

```javascript
{
    faceBox: {
        left: number, // face bounding box distance as percentage from the left video edge
        right: number // face bounding box distance as percentage from the right video edge
        width: number // face bounding box width as percentage of the total video width
    }, // this might be undefined if config.faceLandmarks.faceCenteringThreshold is not passed
    faceExpression: string // check https://github.com/jitsi/jitsi-meet/blob/master/react/features/face-landmarks/constants.js#L3 for available values
}
```

### errorOccurred

Provides event notifications about an error which has occurred.

The listener receives an object with the following structure:

```javascript
{
    details: Object?, // additional error details
    message: string?, // the error message
    name: string, // the coded name of the error
    type: string, // error type/source, one of : 'CONFIG', 'CONNECTION', 'CONFERENCE'
    isFatal: boolean // whether this is a fatal error which triggered a reconnect overlay or not
}
```

### knockingParticipant

Fired when a participant is waiting in the lobby.

**Payload:**
```javascript
{
    participant: {
        id: string,    // Participant ID
        name: string   // Participant display name
    }
}
```

### largeVideoChanged

Fired when the participant displayed in large video changes.

**Payload:**
```javascript
{
    id: string  // Participant ID now displayed in large video
}
```

### log

Fired for log messages when `apiLogLevels` is configured in config.js.

**Payload:**
```javascript
{
    logLevel: string,  // Log level: 'info', 'error', 'debug', or 'warn'
    args: string       // Log message and additional information
}
```

### micError

Fired when microphone access fails.

**Payload:**
```javascript
{
    type: string,    // Error type constant
    message: string  // Error description
}
```

### screenSharingStatusChanged

Fired when local screen sharing is started or stopped.

**Payload:**
```javascript
{
    on: boolean,  // true if screen sharing is active, false if stopped
    details: {
        sourceType: string | undefined  // Capture source: 'window', 'screen', 'proxy', 'device', or undefined
    }
}
```

### dominantSpeakerChanged

Fired when the dominant (loudest) speaker changes.

**Payload:**
```javascript
{
    id: string  // Participant ID of the new dominant speaker
}
```

### raiseHandUpdated

Fired when a participant raises or lowers their hand.

**Payload:**
```javascript
{
    id: string,         // Participant ID
    handRaised: number  // 0 when lowered, or timestamp (ms) when raised
}
```

### tileViewChanged

Fired when tile view mode is enabled or disabled.

**Payload:**
```javascript
{
    enabled: boolean  // true if tile view is active, false otherwise
}
```

### chatUpdated

Fired when the chat panel state changes.

**Payload:**
```javascript
{
    isOpen: boolean,      // true if chat panel is open, false if closed
    unreadCount: number   // Number of unread messages
}
```

### incomingMessage

Fired when a chat message is received.

**Payload:**
```javascript
{
    from: string,              // Sender's participant ID
    nick: string,              // Sender's display name
    privateMessage: boolean,   // true for private message, false for group
    message: string,           // Message text
    stamp: string              // ISO-8601 timestamp
}
```

### mouseEnter

Fired when the mouse pointer enters the iframe.

**Payload:**
```javascript
{
    event: {  // MouseEvent properties
        clientX: number, clientY: number,
        movementX: number, movementY: number,
        offsetX: number, offsetY: number,
        pageX: number, pageY: number,
        x: number, y: number,
        screenX: number, screenY: number
    }
}
```

### mouseLeave

Fired when the mouse pointer leaves the iframe.

**Payload:**
```javascript
{
    event: {  // MouseEvent properties
        clientX: number, clientY: number,
        movementX: number, movementY: number,
        offsetX: number, offsetY: number,
        pageX: number, pageY: number,
        x: number, y: number,
        screenX: number, screenY: number
    }
}
```

### mouseMove

Provides event notifications when mouse moves inside the iframe.
Tis event is triggered on an interval which can be configured by overriding the config.js mouseMoveCallbackInterval property.

The listener receives an object with the following structure based on [MouseEvent]:

```javascript
{
    event: {
        clientX,
        clientY,
        movementX,
        movementY,
        offsetX,
        offsetY,
        pageX,
        pageY,
        x,
        y,
        screenX,
        screenY
    }
}
```

### participantMenuButtonClick

Provides event notifications about a participant context menu button being clicked.

The listener receives an object with the following structure:

```javascript
{
    key: string, // the pressed button's key. The key is as defined in `toolbarButtons` config,
    participantId: string, // the id of the participant for which the button was clicked,
    preventExecution: boolean // whether the execution of the button click was prevented or not
}
```

### toolbarButtonClicked

Provides event notifications about a toolbar button being clicked and whether the click routine was executed or not.
To enable this notification you need to add the button to [`buttonsWithNotifyClick` config](/handbook/docs/dev-guide/dev-guide-configuration#buttonswithnotifyclick). 

The listener receives an object with the following structure:

```javascript
{
    key: string, // the pressed button's key. The key is as defined in `toolbarButtons` config,
    preventExecution: boolean // whether the click routine execution was prevented or not.
}
```

### outgoingMessage

Provides event notifications about outgoing chat messages.

The listener receives an object with the following structure:

```javascript
{
    message: string, // the text of the message
    privateMessage: boolean // whether this is a private or group message
}
```

### displayNameChange

Provides event notifications about display name changes.

The listener receives an object with the following structure:

```javascript
{
    id: string, // the id of the participant that changed their display name
    displayname: string // the new display name
}
```

### deviceListChanged

Fired when the list of available media devices changes.

**Payload:**
```javascript
{
    devices: object  // Available devices (same format as getAvailableDevices())
}
```

**Note:** The `devices` object has the same structure as returned by `getAvailableDevices()`.

### emailChange

Fired when a participant's email address changes.

**Payload:**
```javascript
{
    id: string,     // Participant ID
    email: string   // New email address
}
```

### feedbackSubmitted

Fired when conference feedback is submitted.

**Payload:**
```javascript
{
    error: string | undefined  // Error message if submission failed, undefined if successful
}
```

### filmstripDisplayChanged

Fired when the filmstrip visibility changes.

**Payload:**
```javascript
{
    visible: boolean  // true if filmstrip is visible, false if hidden
}
```

### moderationStatusChanged

Fired when moderation status changes for a media type.

**Payload:**
```javascript
{
    mediaType: string,  // Media type: 'audio' or 'video'
    enabled: boolean    // true if moderation is enabled, false if disabled
}
```

### moderationParticipantApproved

Fired when a participant is approved to unmute.

**Payload:**
```javascript
{
    id: string,         // Participant ID
    mediaType: string   // Media type approved: 'audio' or 'video'
}
```

### moderationParticipantRejected

Fired when a participant's unmute request is rejected.

**Payload:**
```javascript
{
    id: string,         // Participant ID
    mediaType: string   // Media type rejected: 'audio' or 'video'
}
```

### notificationTriggered

Fired when an application notification is displayed.

**Payload:**
```javascript
{
    title: string,        // Notification title
    description: string   // Notification message
}
```

### participantJoined

Fired when a new participant joins the conference.

**Payload:**
```javascript
{
    id: string,            // Participant ID
    displayName: string    // Participant's display name
}
```

### participantKickedOut

Fired when a participant is removed from the conference.

**Payload:**
```javascript
{
    kicked: {
        id: string,      // ID of the removed participant
        local: boolean   // true if the local participant was kicked
    },
    kicker: {
        id: string       // ID of the participant who performed the kick
    }
}
```

### participantLeft

Fired when a participant leaves the conference.

**Payload:**
```javascript
{
    id: string  // Participant ID
}
```

### participantRoleChanged

Fired when a participant's role changes.

**Payload:**
```javascript
{
    id: string,    // Participant ID
    role: string   // New role: 'moderator', 'participant', or 'none'
}
```

### participantsPaneToggled

Fired when the participants pane is opened or closed.

**Payload:**
```javascript
{
    open: boolean // whether the pane is open or not
}
```

### passwordRequired

Provides event notifications that fire when participants fail to join a password protected room.

### videoConferenceJoined

Provides event notifications that fire when the local user has joined the video conference.

The listener receives an object with the following structure:

```javascript
{
    roomName: string, // the room name of the conference
    id: string, // the id of the local participant
    displayName: string, // the display name of the local participant
    avatarURL: string, // the avatar URL of the local participant
    breakoutRoom: boolean, // whether the current room is a breakout room
    visitor: boolean // whether the current user is a visitor
}
```

### videoConferenceLeft

Provides event notifications that fire when the local user has left the video conference.

The listener receives an object with the following structure:

```javascript
{
    roomName: string // the room name of the conference
}
```

### conferenceCreatedTimestamp

Provides notification of the start time of the video conference.

The listener receives an object with the following structure:

```javascript
{
    timestamp: timestamp // time the conference started
}
```

### videoAvailabilityChanged

Provides event notifications about video availability status changes.

The listener receives an object with the following structure:

```javascript
{
    available: boolean // new available status - boolean
}
```

### videoMuteStatusChanged

Provides event notifications about video mute status changes.

The listener receives an object with the following structure:

```javascript
{
    muted: boolean // new muted status - boolean
}
```

### videoQualityChanged

Provides event notifications about changes to video quality settings.

The listener receives an object with the following structure:

```javascript
{
    videoQuality: number // the height of the resolution related to the new video quality setting.
}
```

### readyToClose

Provides event notifications that fire when Jitsi Meet is ready to be closed (i.e., hangup operations are completed).

### recordingLinkAvailable

Provides event notifications about recording link becoming available.

The listener receives an object with the following structure:

```javascript
{
    link: string, // the recording link
    ttl: number // the time to live of the recording link
}
```

### recordingStatusChanged

Provides event notifications about recording status changes.

The listener receives an object with the following structure:

```javascript
{
    on: boolean // new recording status - boolean,
    mode: string // recording mode, `local`, `stream` or `file`,
    error: string | undefined // error type if recording fails, undefined otherwise
    transcription: boolean // whether a transcription is active or not
}
```

### subjectChange

Provides event notifications regarding the change of subject for a conference.

The listener receives an object with the following structure:

```javascript
{
    subject: string // the new subject
}
```

### suspendDetected

Provides notifications about detecting suspended events in the host computer.

### peerConnectionFailure

Notify the external application that a PeerConnection lost connectivity. This event is fired only if
a PC `failed` but connectivity to the rtcstats server is still maintained signaling that there is a
problem establishing a link between the app and the JVB server or the remote peer in case of P2P.
Will only fire if rtcstats is enabled.

```javascript
{
    // Type of PC, Peer2Peer or JVB connection.
    isP2P: boolean,

    // Was this connection previously connected. If it was it could mean
    // that connectivity was disrupted, if not it most likely means that the app could not reach
    // the JVB server, or the other peer in case of P2P.
    wasConnected: boolean
}
```

### transcribingStatusChanged

Provides event notifications about status changes in the transcribing process.

The listener receives an object with the following structure:

```javascript
{
    on: boolean,
}
```

### transcriptionChunkReceived

Provides event notifications about new transcription chunks being available.

The listener receives an object with the following structure:

```javascript
{
    // Transcription language
    language: string,

    // ID for this chunk.
    messageID: string,

    // participant info
    participant: {
        avatarUrl: string,
        id: string
        name: string,
    },

    // If the transcription is final, the text will be here.
    final: string,

    // If the transcription is not final but has high accuracy the text will be here.
    stable: string,

    // If the transcription is not final but has low accuracy the text will be here.
    unstable: string,
}
```

### whiteboardStatusChanged

Provides event notifications about changes to the whiteboard.

The listener receives an object with the following structure:

```javascript
{
    status: string // new whiteboard status
}
```

### p2pStatusChanged

Provides event notifications about changes to the connection type.

The listener receives an object with the following structure:

```javascript
{
    isP2p: boolean|null // whether the new connection type is P2P
}
```


### audioOnlyChanged

Provides event notifications about changes to the audio only mode status.

The listener receives an object with the following structure:

```javascript
{
    audioOnlyChanged: boolean // whether the audio only is enabled or disabled.
}
```

[config.js]: https://github.com/jitsi/jitsi-meet/blob/master/config.js
[interface_config.js]: https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js
[EventEmitter]: https://nodejs.org/api/events.html
[MouseEvent]: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
