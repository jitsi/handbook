---
id: dev-guide-iframe
title: IFrame API
---

Embedding the Jitsi Meet API into your site or app enables you to host and provide secure video meetings with your colleagues, teams, and stakeholders. The Meet API provides a full complement of comprehensive meeting features.

Your Jitsi meetings can be hosted and attended using any device while keeping your data and privacy protected. You can reach your meeting participants anywhere in the world eliminating the need for travel and the associated inconvenience.

The IFrame API enables you to embed Jitsi Meet functionality into your meeting application so you can experience the full functionality of the globally distributed and highly available deployment available with [meet.jit.si](https://meet.jit.si/).

You can also embed and integrate the globally distributed and highly available deployment on the [meet.jit.si](https://meet.jit.si/) platform itself. 

## Integration

To enable the Jitsi Meet API in your application you must use one of the following JavaScript (JS) Jitsi Meet API library scripts and integrate it into your application:

For self-hosting in your domain:

```javascript
<script src='https://<your-domain>/external_api.js'></script>
```

meet.jit.si:
```javascript
<script src='https://meet.jit.si/external_api.js'></script>

```

## Creating the Jitsi Meet API object

After you have integrated the Meet API library, you must then create the Jitsi Meet API object.

The Meet API object takes the following form:

**`api = new JitsiMeetExternalAPI(domain, options)`**

The API object constructor uses the following options:

* **domain**: The domain used to build the conference URL (e.g., **`meet.jit.si`**).

* **options**: The object with properties. 

  Optional arguments include:
  
    * **roomName**: The name of the room to join.
    
    * **width**: The created IFrame width.
    
      The width argument has the following characteristics:
    
      - A numerical value indicates the width in pixel units.
    
      - If a string is specified the format is a number followed by **`px`**, **`em`**, **`pt`**, or **`%`**.
    
    * **height**: The height for the created IFrame. 
    
      The height argument has the following characteristics: 
    
      - A numerical value indicates the height in pixel units.
    
      - If a string is specified the format is a number followed by **`px`**, **`em`**, **`pt`**, or **`%`**. 
    
    * **parentNode**: The HTML DOM Element where the IFrame is added as a child.
    
    * **configOverwrite**: The JS object with overrides for options defined in the [config.js] file.
    
    * **interfaceConfigOverwrite**: The JS object with overrides for options defined in the [interface_config.js] file.
    
    * **jwt**: The [JWT](https://jwt.io/) token.
    
    * **onload**: The IFrame onload event handler.
    
    * **invitees**: Object arrays that contain information about participants invited to a call.
    
    * **devices**: Information map about the devices used in a call.
    
    * **userInfo**: The JS object that contains information about the participant starting the meeting (e.g., email).

      For example:

```javascript
const domain = 'meet.jit.si';
const options = {
    roomName: 'JitsiMeetAPIExample',
    width: 700,
    height: 700,
    parentNode: document.querySelector('#meet')
};
const api = new JitsiMeetExternalAPI(domain, options);
```

You can set the initial media devices for the call using the following:

```javascript
const domain = 'meet.jit.si';
const options = {
    ...
    devices: {
        audioInput: '<deviceLabel>',
        audioOutput: '<deviceLabel>',
        videoInput: '<deviceLabel>'
    },
    ...
};
const api = new JitsiMeetExternalAPI(domain, options);
```

You can override options set in the [config.js] file and the [interface_config.js] file using the **`configOverwrite`** and **`interfaceConfigOverwrite`** objects, respectively.

For example:

```javascript
const options = {
    ...
    configOverwrite: { startWithAudioMuted: true },
    interfaceConfigOverwrite: { DISABLE_DOMINANT_SPEAKER_INDICATOR: true },
    ...
};
const api = new JitsiMeetExternalAPI(domain, options);
```
To pass a JWT token to Jitsi Meet use the following:

 ```javascript
const options = {
    ...
    jwt: '<jwt_token>',
    ...
};
const api = new JitsiMeetExternalAPI(domain, options);
 ```

You can set the **`userInfo`** (e.g., email, display name) for the call using the following:

```javascript
var domain = "meet.jit.si";
var options = {
    ...
    userInfo: {
        email: 'email@jitsiexamplemail.com',
        displayName: 'John Doe'
    }
}
var api = new JitsiMeetExternalAPI(domain, options);
```

Configuring the tile view:

You can configure the maximum number of columns in the tile view by overriding the **`TILE_VIEW_MAX_COLUMNS`** property from the [interface_config.js] file via the **`interfaceConfigOverwrite`** object:

```javascript
const options = {
    ...
    interfaceConfigOverwrite: { TILE_VIEW_MAX_COLUMNS: 2 },
    ...
};
const api = new JitsiMeetExternalAPI(domain, options);
```
**Note:** **`TILE_VIEW_MAX_COLUMNS`** accepts values from 1 to 5. The default value is 5.

## Functions

Use the following API functions to control your embedded Jitsi Meet Conference.

### captureLargeVideoScreenshot

Captures a screenshot for the participant in the large video view (on stage).

```javascript
api.captureLargeVideoScreenshot().then(data => {
    // data is an Object with only one param, dataURL
    // data.dataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAA..."
});
```

### getAvailableDevices

Retrieves a list of available devices.

```javascript
api.getAvailableDevices().then(devices => {
    // devices = {
    //     audioInput: [{
    //         deviceId: 'ID'
    //         groupId: 'grpID'
    //         kind: 'audioinput'
    //         label: 'label'
    //     },....],
    //     audioOutput: [{
    //         deviceId: 'ID'
    //         groupId: 'grpID'
    //         kind: 'audioOutput'
    //         label: 'label'
    //     },....],
    //     videoInput: [{
    //         deviceId: 'ID'
    //         groupId: 'grpID'
    //         kind: 'videoInput'
    //         label: 'label'
    //     },....]
    // }
    ...
});
```

### getCurrentDevices

Retrieves a list of currently selected devices.

```javascript
api.getCurrentDevices().then(devices => {
    // devices = {
    //     audioInput: {
    //         deviceId: 'ID'
    //         groupId: 'grpID'
    //         kind: 'videoInput'
    //         label: 'label'
    //     },
    //     audioOutput: {
    //         deviceId: 'ID'
    //         groupId: 'grpID'
    //         kind: 'videoInput'
    //         label: 'label'
    //     },
    //     videoInput: {
    //         deviceId: 'ID'
    //         groupId: 'grpID'
    //         kind: 'videoInput'
    //         label: 'label'
    //     }
    // }
    ...
});
```

### getParticipantsInfo

Returns an array containing participant information such as ID, display name, avatar URL, and email.

```javascript
api.getParticipantsInfo();
```

### getVideoQuality

Returns the current video quality setting.

```javascript
api.getVideoQuality();
```

### isDeviceChangeAvailable

Resolves to true if the device change is available and to false if not.

```javascript
// The accepted deviceType values are - 'output', 'input' or undefined.
api.isDeviceChangeAvailable(deviceType).then(isDeviceChangeAvailable => {
    ...
});
```

### isDeviceListAvailable

Resolves to true if the device list is available and to false if not.

```javascript
api.isDeviceListAvailable().then(isDeviceListAvailable => {
    ...
});
```

### isMultipleAudioInputSupported

Resolves to true if multiple audio input is supported and to false if not.

```javascript
api.isMultipleAudioInputSupported().then(isMultipleAudioInputSupported => {
    ...
});
```

### pinParticipant

Selects the participant ID to be the pinned participant in order to always receive video for this participant.

```javascript
api.pinParticipant(participantId);
```

### resizeLargeVideo

Resizes the large video container per the provided dimensions.

```javascript
api.resizeLargeVideo(width, height);
```

### setAudioInputDevice

Sets the audio input device to the one with the passed label or ID.

```javascript
api.setAudioInputDevice(deviceLabel, deviceId);
```

### setAudioOutputDevice

Sets the audio output device to the one with the passed label or ID.

```javascript
api.setAudioOutputDevice(deviceLabel, deviceId);
```

### setLargeVideoParticipant

Displays the participant with the given participant ID on the large video.

If no participant ID is given, a participant is picked based on the dominant, pinned speaker settings.

```javascript
api.setLargeVideoParticipant(participantId);
```

### setVideoInputDevice

Sets the video input device to the one with the passed label or ID.

```javascript
api.setVideoInputDevice(deviceLabel, deviceId);
```

### startRecording

Starts a file recording or streaming session. See the `startRecording` command for more details.

```javascript
api.startRecording(options);
```

### stopRecording

Stops an ongoing file recording or streaming session. See the `stopRecording` command for more details.

```javascript
api.startRecording(mode);
```

### getNumberOfParticipants

Returns the number of conference participants:

```javascript
const numberOfParticipants = api.getNumberOfParticipants();
```

### getAvatarURL

Returns a participant's avatar URL:

```javascript
const avatarURL = api.getAvatarURL(participantId);
```

### getDisplayName

Returns a participant's display name:

```javascript
const displayName = api.getDisplayName(participantId);
```

### getEmail

Returns a participant's email:

```javascript
const email = api.getEmail(participantId);
```

### getIFrame

Returns the IFrame HTML element which is used to load the Jitsi Meet conference:

```javascript
const iframe = api.getIFrame();
```

### isAudioMuted

Returns a Promise which resolves to the current audio muted state:

```javascript
api.isAudioMuted().then(muted => {
    ...
});
```

### isVideoMuted

Returns a Promise which resolves to the current video muted state:

```javascript
api.isVideoMuted().then(muted => {
    ...
});
```

### isAudioAvailable

Returns a Promise which resolves to the current audio availability state:

```javascript
api.isAudioAvailable().then(available => {
    ...
});
```

### isVideoAvailable

Returns a Promise which resolves to the current video availability state:

```javascript
api.isVideoAvailable().then(available => {
    ...
});
```

### invite

Invite the given array of participants to the meeting:

```javascript
api.invite([ {...}, {...}, {...} ]).then(() => {
    // success
}).catch(() => {
    // failure
});
```
**NOTE:** The invitee format in the array depends on the invite service used in the deployment.

### dispose

Removes the embedded Jitsi Meet conference:

```javascript
api.dispose();
```

**NOTE:** Jitsi recommends removing the conference before the page is unloaded.

## Commands

You can control the embedded Jitsi Meet conference by calling **`executeCommand`** on the **`JitsiMeetExternalAPI`** object:

```javascript
api.executeCommand(command, ...arguments);
```

The command parameter is a string which contains the command name. 

You can also execute multiple commands using the **`executeCommands`** method:

```javascript
api.executeCommands(commands);
```

The **`commands`** parameter is an object with the names of the commands as keys and the arguments for the commands as values:

```javascript
api.executeCommands({
    displayName: [ 'nickname' ],
    toggleAudio: []
});
```

The following commands are supported:

### displayName

Sets the display name of the local participant. 

  This command requires one argument to set the new display name.

```javascript
api.executeCommand('displayName', 'New Nickname');
```

### password

Sets the password for the room. 

```javascript
// set new password for channel
api.addEventListener('participantRoleChanged', function(event) {
    if (event.role === "moderator") {
        api.executeCommand('password', 'The Password');
    }
});
// join a protected channel
api.on('passwordRequired', function ()
{
    api.executeCommand('password', 'The Password');
});
```

### toggleLobby

Toggles the lobby mode on or off. 

This command requires the desired lobby mode state as the argument.

```javascript
api.addEventListener('participantRoleChanged', function (event) {
    if(event.role === 'moderator') {
        api.executeCommand('toggleLobby', true);
    }
});
```

### sendTones

Touch tone playback.

This command requires the selected touch tone dial pads to play as well as the length of and time gap between tone play as the arguments. 

```javascript
api.executeCommand('sendTones', {
    tones: string, // The dial pad touch tones to play. For example, '12345#'.
    duration: number, // Optional. The number of milliseconds each tone should play. The default is 200.
    pause: number // Optional. The number of milliseconds between each tone. The default is 200.
});
```

### subject

Sets the subject of the conference. 

This command requires the new subject to be set as the argument.

```javascript
api.executeCommand('subject', 'New Conference Subject');
```

### toggleAudio

Mutes / unmutes the audio for the local participant. 

No arguments are required.

```javascript
api.executeCommand('toggleAudio');
```

### toggleVideo

Mutes / unmutes the video for the local participant. 

No arguments are required.

```javascript
api.executeCommand('toggleVideo');
```

### toggleFilmStrip

Hide or show the filmstrip. 

No arguments are required.

```javascript
api.executeCommand('toggleFilmStrip');
```

### toggleChat

Hide or show chat messaging. 

No arguments are required.

```javascript
api.executeCommand('toggleChat');
```

### toggleShareScreen

Start or stop screen sharing. 

No arguments are required.

```javascript
api.executeCommand('toggleShareScreen');
```

### toggleTileView

Enter or exit the tile view layout mode. 

No arguments are required.

```javascript
api.executeCommand('toggleTileView');
```

### hangup

Ends the call. 

No arguments are required.

```javascript
api.executeCommand('hangup');
```

### email

Changes the local email address. 

This command requires the new email address as the single argument.

```javascript
api.executeCommand('email', 'example@example.com');
```

### avatarUrl

Changes the local avatar URL. 

This command requires the new avatar URL to be set as the single argument.

```javascript
api.executeCommand('avatarUrl', 'https://avatars0.githubusercontent.com/u/3671647');
```

### sendEndpointTextMessage

Sends a text message to another participant through the data channels.

```javascript
api.executeCommand('sendEndpointTextMessage', 'receiverParticipantId', 'text');
```

### setLargeVideoParticipant

Displays the participant on the large video display.

The participant ID, if specified, is displayed on the large video. If no argument is passed, the participant to be displayed on the large  video is automatically selected based on the dominant/pinned speaker settings.

```javascript
api.executeCommand('setLargeVideoParticipant', 'abcd1234');
```

### setVideoQuality

Sets the send and receive video resolution. 

The resolution height setting is implemented using a single argument.

```javascript
api.executeCommand('setVideoQuality', 720);
```

### muteEveryone

Mute all meeting participants. 

This command can only be executed by the meeting moderator. No arguments are required.

```javascript
api.executeCommand('muteEveryone');
```

### startRecording

Starts a file recording or streaming session using passed parameters:

  - **RTMP streaming** - Recording mode set to **`stream`** with an **`rtmpStreamKey`**. The **`rtmpBroadcastID`** value is optional.
  
  - **YouTube streams** - Recording mode set to **`stream`** with an **`youtubeStreamKey`**. The **`youtubeBroadcastID`** value is optional.
  
  - **Dropbox recording** - Recording mode set to **`file`** with a Dropbox OAuth2 token. 
  
  Additionally, Dropbox saving should be enabled on the Jitsi meet deploy config you are using.
  
  - **File recording** - Recording mode set to **`file`**. 
  
  Optionally, **`shouldShare`** should be passed on. No other params are required.
  
```javascript
api.executeCommand('startRecording', {
    mode: string //recording mode, either `file` or `stream`.
    dropboxToken: string, //dropbox oauth2 token.
    shouldShare: boolean, //whether the recording should be shared with the participants or not. Only applies to certain jitsi meet deploys.
    rtmpStreamKey: string, //the RTMP stream key.
    rtmpBroadcastID: string, //the RTMP broadcast ID.
    youtubeStreamKey: string, //the youtube stream key.
    youtubeBroadcastID: string //the youtube broacast ID.
});
```

### stopRecording

Stops an ongoing **`stream`** or **`file`** recording.

The mode in which the recording was started must be specified.

```javascript
api.executeCommand('stopRecording', 
    mode: string //recording mode to stop, `stream` or `file`
);
```

### initiatePrivateChat

Opens the chat window and sets the participant with the given participant ID as the messages recipient.

```javascript
api.executeCommand('intiatePrivateChat',
    participantID: string
);
```

### cancelPrivateChat

Removes the private chat participant thus it resets the chat window to group chat.

```javascript
api.executeCommand('cancelPrivateChat');
```

### getContentSharingParticipants

Returns a promise which resolves with an array of currently sharing participants ID's.

```javascript
api.executeCommand('getContentSharingParticipants').then(res => {
    //res.sharingParticipantIds = [particId1, particId2, ...]
});
```

## Events

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

### contentSharingParticipantsChanged

Provides real-time list of currently screen sharing participant ID's.

The listener receives an object with the following structure:

```javascript
{
    data: ["particId1", "particId2", ...]
}
```

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
        name: string // the name of the datachannel event: `endpoint-text-message`
        text: string // the received text from the sender
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
    handRaised: boolean // whether hand raised or lowered
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
    avatarURL: string // the avatar URL of the local participant
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


[config.js]: https://github.com/jitsi/jitsi-meet/blob/master/config.js
[interface_config.js]: https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js
[EventEmitter]: https://nodejs.org/api/events.html

