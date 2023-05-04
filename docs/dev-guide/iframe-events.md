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

The following events are currently supported:

### cameraError

Provides event notifications about Jitsi Meet having failed to access the meeting camera.

The listener receives an object with the following structure:

```javascript
{
    type: string, // A constant representing the overall type of the error.
    message: string // Additional information about the error.
}
```

### avatarChanged

Provides event notifications about changes to a participant's avatar.

The listener receives an object with the following structure:

```javascript
{
    id: string, // the id of the participant that changed his avatar.
    avatarURL: string // the new avatar URL.
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

Provides event notifications about the current browser support.

The listener receives an object with the following structure:

```javascript
{
    supported: boolean
}
```

### contentSharingParticipantsChanged

Provides real-time list of currently screen sharing participant ID's.

The listener receives an object with the following structure:

```javascript
{
    data: ["particId1", "particId2", ...]
}
```

### dataChannelOpened

Indicates the data channel is open and thus messages can be sent over it.

### endpointTextMessageReceived

Provides event notifications about a text messages received through data channels.

The listener receives an object with the following structure:

```javascript
{
    senderInfo: {
        jid: string, // the jid of the sender
        id: string // the participant id of the sender
    },
    eventData: {
        name: string, // the name of the datachannel event: `endpoint-text-message`
        text: string // the received text from the sender
    }
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

Provides event notifications about a knocking participant in the lobby.

The listener receives an object with the following structure:

```javascript
{
    participant: {
        // the id and name of the participant that is currently knocking in the lobby
        id: string,
        name: string
    }
}
```

### largeVideoChanged

Provides event notifications about changes in the large video display.

The listener receives an object with the following structure:

```javascript
{
    id: string // id of the participant that is now on large video in the stage view.
}
```

### log

Provides log event notifications with the log level being one of the values specified in the [config.js] file in the **`apiLogLevels`** property (if not specified the event does not fire).

The listener receives an object with the following structure:

```javascript
{
    logLevel: string, // A constant representing the log type (info, error, debug, warn).
    args: string // Additional log information.
}
```

### micError

Provides event notifications about Jitsi Meet issues with mic access.

The listener receives an object with the following structure:

```javascript
{
    type: string, // A constant representing the overall type of the error.
    message: string // Additional information about the error.
}
```

### screenSharingStatusChanged

Provides event notifications about either turning on or off local user screen sharing.

The listener receives an object with the following structure:

```javascript
{
    on: boolean, //whether screen sharing is on
    details: {

        // From where the screen sharing is capturing, if known. Values which are
        // passed include 'window', 'screen', 'proxy', 'device'. The value undefined
        // will be passed if the source type is unknown or screen share is off.
        sourceType: string|undefined
    }
}
```

### dominantSpeakerChanged

Provides event notifications about dominant speaker changes.

The listener receives an object with the following structure:

```javascript
{
    id: string //participantId of the new dominant speaker
}
```

### raiseHandUpdated

Provides event notifications about the participant raising/lowering the hand.

The listener will receive an object with the following structure:

```javascript
{
    id: string,         // participantId of the user who raises/lowers the hand
    handRaised: number  // 0 when hand is lowered and the hand raised timestamp when raised.
}
```

### tileViewChanged

Provides event notifications about entrance or exit from the tile view layout mode.

The listener receives an object with the following structure:

```javascript
{
    enabled: boolean, // whether tile view is not displayed or not
}
```

### chatUpdated

Provides event notifications about chat state being updated.

The listener receives an object with the following structure:

```javascript
{
    isOpen: boolean, // Whether the chat panel is open or not
    unreadCount: number // The unread messages counter
}
```

### incomingMessage

Provides event notifications about incoming chat messages.

The listener receives an object with the following structure:

```javascript
{
    from: string, // The id of the user that sent the message
    nick: string, // the nickname of the user that sent the message
    privateMessage: boolean, // whether this is a private or group message
    message: string // the text of the message
}
```

### mouseEnter

Provides event notifications when mouse enters the iframe.
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

### mouseLeave

Provides event notifications when mouse leaves the iframe.
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

### participantMenuButtonClicked

Provides event notifications about a participant context menu button being clicked.

The listener receives an object with the following structure:

```javascript
{
    key: string, // the pressed button's key. The key is as defined in `toolbarButtons` config,
    participantId: string // the id of the participant for which the button was clicked
}
```

### toolbarButtonClicked

Provides event notifications about a toolbar button being clicked and whether the click routine was executed or not.
For overriding a button's click, please use the following config overwrite:
https://github.com/jitsi/jitsi-meet/blob/042a2cb447bd9ff39ab3904e493952787bd30924/config.js#L547

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

Provides event notifications about device list changes.

The listener receives an object with the following structure:

```javascript
{
    devices: Object // the new list of available devices.
}
```

**NOTE:** The **`device`** object has the same format as the **`getAvailableDevices`** result format.

### emailChange

Provides event notifications about email changes.

The listener receives an object with the following structure:

```javascript
{
    id: string, // the id of the participant that changed his email
    email: string // the new email
}
```

### feedbackSubmitted

Provides event notifications about conference feedback submissions:

```javascript
{
    error: string // The error which occurred during submission, if any.
}
```

### filmstripDisplayChanged

Provides event visibility notifications for the filmstrip that is being updated:

```javascript
{
    visible: boolean // Whether or not the filmstrip is displayed or hidden.
}
```

### moderationStatusChanged

Provides event notifications about changes to moderation status.

```javascript
{
    mediaType: string, // The media type for which moderation changed.
    enabled: boolean // Whether or not moderation changed to enabled.
}
```

### moderationParticipantApproved

Provides event notifications about participants approvals for moderation.

```javascript
{
    id: string, // The ID of the participant that got approved.
    mediaType: string // The media type for which the participant was approved.
}
```

### moderationParticipantRejected

Provides event notifications about participants rejections for moderation.

```javascript
{
    id: string, // The ID of the participant that got rejected.
    mediaType: string // The media type for which the participant was rejected.
}
```

### notificationTriggered

Provides event notifications when an application notification occurs.

```javascript
{
    title: string, // The notification title.
    description: string // The notification description.
}
```

### participantJoined

Provides event notifications about new participants who join the room.

The listener receives an object with the following structure:

```javascript
{
    id: string, // the id of the participant
    displayName: string // the display name of the participant
}
```

### participantKickedOut

Provides event notifications about participants being removed from the room.

The listener receives an object with the following structure:

```javascript
{
    kicked: {
        id: string, // the id of the participant removed from the room
        local: boolean // whether or not the participant is the local particiapnt
    },
    kicker: {
        id: string // the id of the participant who kicked out the other participant
    }
}
```

### participantLeft

Provides event notifications about participants that leave the meeting room.

The listener receives an object with the following structure:

```javascript
{
    id: string // the id of the participant
}
```

### participantRoleChanged

Provides event notifications that fire when the local user role has changed (e.g., none, moderator, participant).

The listener receives an object with the following structure:

```javascript
{
    id: string // the id of the participant
    role: string // the new role of the participant
}
```

### participantsPaneToggled

Provides event notifications that fire when the participants pane status changes.

The listener receives an object with the following structure:

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
    breakoutRoom: boolean // whether the current room is a breakout room
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

### whiteboardStatusChanged

Provides event notifications about changes to the whiteboard.

The listener receives an object with the following structure:

```javascript
{
    status: string // new whiteboard status
}
```

[config.js]: https://github.com/jitsi/jitsi-meet/blob/master/config.js
[interface_config.js]: https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js
[EventEmitter]: https://nodejs.org/api/events.html
[MouseEvent]: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
