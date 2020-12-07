---
id: dev-guide-iframe
title: IFrame API
---

You can use the Jitsi Meet API to embed Jitsi Meet in to your application. You are also welcome to use it for embedding the globally distributed and highly available deployment on meet.jit.si itself. The only thing we ask for in that case is that you please DO NOT remove the jitsi.org logo from the top left corner.

## Installation

To embed Jitsi Meet in your application you need to add the Jitsi Meet API library:

Self-hosted:
```javascript
<script src='https://<your-domain>/external_api.js'></script>
```

meet.jit.si:
```javascript
<script src='https://meet.jit.si/external_api.js'></script>
```

## Creating the Jitsi Meet API object

**`api = new JitsiMeetExternalAPI(domain, options)`**

After you have installed the Meet API library, you need to create the Jitsi Meet API object.

The API object constructor can use the following options:

* **domain**: The domain used to build the conference URL (e.g., **`meet.jit.si`**).

* **options**: The object with properties. 

  Optional arguments include:
  
    * **roomName**: The name of the room to join.
    
    * **width**: The width for the created Iframe. If a number is specified it is treated as pixel units. If a string is specified the format is number followed by **`px`, `em`, `pt`, or `%`**.
    
    * **height**: The height for the created Iframe. If a number is specified it is treated as pixel units. If a string is specified the format is number followed by **`px`, `em`, `pt`, or `%`**. 
    
    * **parentNode**: The HTML DOM Element where the iframe will be added as a child.
    
    * **configOverwrite**: The JavaScript (JS) object with overrides for options defined in the **`config.js`** file.
    
    * **interfaceConfigOverwrite**: The JS object with overrides for options defined in the **`interface_config.js`** file.
    
    * **noSSL**: The Boolean data type which indicates if the server should be contacted using HTTP or HTTPS. The default value is **`false`**.
    
    * **jwt**: The [JWT](https://jwt.io/) token.
    
    * **onload**: The handler for the IFrame onload event.
    
    * **invitees**: An array of objects containing information about new participants who will be invited to the call.
    
    * **devices**: A map containing information about the initial devices that will be used in the call.
    
    * **userInfo**: The JS object containing information about the participant opening the meeting (e.g.,email).

Example:

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

You can set the initial media devices for the call:

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

You can override options set in the **`config.js`** file and the **`interface_config.js`** using **configOverwrite** and **interfaceConfigOverwrite**, respectively.

For example, to enable the filmstrip-only interface mode, you can use the following:

```javascript
const options = {
    ...
    configOverwrite: { startWithAudioMuted: true },
    interfaceConfigOverwrite: { filmStripOnly: true },
    ...
};
const api = new JitsiMeetExternalAPI(domain, options);
```

You can also pass a JWT token to Jitsi Meet using the follwoing:

 ```javascript
const options = {
    ...
    jwt: '<jwt_token>',
    ...
};
const api = new JitsiMeetExternalAPI(domain, options);
 ```

You can set the **`userInfo`** (e.g., email, display name) for the call:

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
**Configuring the tile view**

You can configure the maximum number of columns in tile view by overriding the ```TILE_VIEW_MAX_COLUMNS``` property from [interface_config.js] via **interfaceConfigOverwrite**:

```javascript
const options = {
    ...
    interfaceConfigOverwrite: { TILE_VIEW_MAX_COLUMNS: 2 },
    ...
};
const api = new JitsiMeetExternalAPI(domain, options);
```
Note: ```TILE_VIEW_MAX_COLUMNS``` accepts values from 1 to 5. The default value is 5.


### Controlling the embedded Jitsi Meet Conference

* **captureLargeVideoScreenshot** - Captures the screenshot of the large video.
```javascript
api.captureLargeVideoScreenshot().then(dataURL => {
    // dataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAA..."
});
```
* **getAvailableDevices** - Retrieve a list of available devices.

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
* **getCurrentDevices** - Retrieve a list with the devices that are currently selected.

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
* **getParticipantsInfo** - Returns an array containing participants information like participant id, display name, avatar URL and email.

```javascript
api.getParticipantsInfo();
```
* **getVideoQuality** - Returns the current video quality setting.

```javascript
api.getVideoQuality();
```
* **isDeviceChangeAvailable** - Resolves with true if the device change is available and with false if not.

```javascript
// The accepted deviceType values are - 'output', 'input' or undefined.
api.isDeviceChangeAvailable(deviceType).then(isDeviceChangeAvailable => {
    ...
});
```
* **isDeviceListAvailable** - Resolves with true if the device list is available and with false if not.

```javascript
api.isDeviceListAvailable().then(isDeviceListAvailable => {
    ...
});
```
* **isMultipleAudioInputSupported** - Resolves with true if multiple audio input is supported and with false if not.

```javascript
api.isMultipleAudioInputSupported().then(isMultipleAudioInputSupported => {
    ...
});
```
* **pinParticipant** - Elects the participant with the given id to be the pinned participant in order to always receive video for this participant (even when last n is enabled).

```javascript
api.pinParticipant(participantId);
```
* **resizeLargeVideo** - Resizes the large video container as per the dimensions provided.

```javascript
api.resizeLargeVideo(width, height);
```
* **setAudioInputDevice** - Sets the audio input device to the one with the label or id that is passed.

```javascript
api.setAudioInputDevice(deviceLabel, deviceId);
```
* **setAudioOutputDevice** - Sets the audio output device to the one with the label or id that is passed.

```javascript
api.setAudioOutputDevice(deviceLabel, deviceId);
```
* **setLargeVideoParticipant** - Displays the participant with the participant id (Jid) that is passed on the large video. If no participant id is passed, a particpant will be picked based on the dominant/pinned speaker settings.

```javascript
api.setLargeVideoParticipant(participantId);
```
* **setVideoInputDevice** - Sets the video input device to the one with the label or id that is passed.

```javascript
api.setVideoInputDevice(deviceLabel, deviceId);
```
* **startRecording** - Starts a file recording or streaming session.

```javascript
api.startRecording(options);
```

* **stopRecording** - Stops an ongoing file recording or streaming session.

```javascript
api.startRecording(mode);
```

You can control the embedded Jitsi Meet conference by calling `executeCommand` on the `JitsiMeetExternalAPI` object:

```javascript
api.executeCommand(command, ...arguments);
```

The `command` parameter is a string containing the name of the command. The following commands are currently supported:

* **displayName** - Sets the display name of the local participant. This command requires one argument - the new display name to be set.
```javascript
api.executeCommand('displayName', 'New Nickname');
```

* **password** - Sets the password for the room. This command requires one argument - the password name to be set.
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

* **toggleLobby** - Toggles the lobby mode on or off. This command requires one argument - the desired state of lobby mode.
```javascript
api.addEventListener('participantRoleChanged', function (event) {
    if(event.role === 'moderator') {
        api.executeCommand('toggleLobby', true);
    }
});
```

* **sendTones** - Play touch tones.
```javascript
api.executeCommand('sendTones', {
    tones: string, // The dial pad touch tones to play. For example, '12345#'.
    duration: number, // Optional. The number of milliseconds each tone should play. The default is 200.
    pause: number // Optional. The number of milliseconds between each tone. The default is 200.
});
```

* **subject** - Sets the subject of the conference. This command requires one argument - the new subject to be set.
```javascript
api.executeCommand('subject', 'New Conference Subject');
```

* **toggleAudio** - Mutes / unmutes the audio for the local participant. No arguments are required.
```javascript
api.executeCommand('toggleAudio');
```

* **toggleVideo** - Mutes / unmutes the video for the local participant. No arguments are required.
```javascript
api.executeCommand('toggleVideo');
```

* **toggleFilmStrip** - Hides / shows the filmstrip. No arguments are required.
```javascript
api.executeCommand('toggleFilmStrip');
```

* **toggleChat** - Hides / shows the chat. No arguments are required.
```javascript
api.executeCommand('toggleChat');
```

* **toggleShareScreen** - Starts / stops screen sharing. No arguments are required.
```javascript
api.executeCommand('toggleShareScreen');
```

* **toggleTileView** - Enter / exit tile view layout mode. No arguments are required.
```javascript
api.executeCommand('toggleTileView');
```

* **hangup** - Hangups the call. No arguments are required.
```javascript
api.executeCommand('hangup');
```

* **email** - Changes the local email address. This command requires one argument - the new email address to be set.
```javascript
api.executeCommand('email', 'example@example.com');
```

* **avatarUrl** - Changes the local avatar URL. This command requires one argument - the new avatar URL to be set.
```javascript
api.executeCommand('avatarUrl', 'https://avatars0.githubusercontent.com/u/3671647');
```

* **sendEndpointTextMessage** - Sends a text message to another participant through the datachannels.
```javascript
api.executeCommand('sendEndpointTextMessage', 'receiverParticipantId', 'text');
```

* **setLargeVideoParticipant** - Displays the given participant on the large video. The participant with the particpant id (Jid) if specified will be displayed on the large video. If no argument is passed, the participant to be displayed on the large video will be automatically selected based on the dominant/pinned speaker settings.
```javascript
api.executeCommand('setLargeVideoParticipant', 'abcd1234');
```
* **setVideoQuality** - Sets the send and receive video resolution. This command requires one argument - the resolution height to be set.
```javascript
api.executeCommand('setVideoQuality', 720);
```
* **muteEveryone** - Mute all the other participants. It can only be executed by a moderator. No arguments are required.
```javascript
api.executeCommand('muteEveryone');
```
* **startRecording** - Starts a file recording or streaming session depending on the passed on params.
  - for RTMP streaming, recording `mode` should be `stream` and `rtmpStreamKey` must be provided. `rtmpBroadcastID` is optional.
  - for YouTube streams, recording `mode` should be `stream` and `youtubeStreamKey` must be provided. `youtubeBroadcastID` is optional.
  - for Dropbox recording, recording `mode` should be `file` and a dropbox oauth2 token must be provided. Also dropbox saving should be enabled on the used jitsi meet deploy config.
  - for file recording, recording `mode` should be `file` and optionally `shouldShare` could be passed on. No other params should be passed.
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

* **stopRecording** - Stops an ongoing recording, `stream` or `file`.
```javascript
api.executeCommand('stopRecording', 
    mode: string //recording mode to stop, `stream` or `file`
);
```

You can also execute multiple commands using the `executeCommands` method:
```javascript
api.executeCommands(commands);
```
The `commands` parameter is an object with the names of the commands as keys and the arguments for the commands as values:
```javascript
api.executeCommands({
    displayName: [ 'nickname' ],
    toggleAudio: []
});
```

You can add event listeners to the embedded Jitsi Meet using the `addEventListener` method.
**NOTE: This method still exists but it is deprecated. JitsiMeetExternalAPI class extends [EventEmitter]. Use [EventEmitter] methods (`addListener` or `on`).**
```javascript
api.addEventListener(event, listener);
```

The `event` parameter is a String object with the name of the event.
The `listener` parameter is a Function object with one argument that will be notified when the event occurs with data related to the event.

The following events are currently supported:
* **cameraError** - event notifications about Jitsi-Meet having failed to access the camera. The listener will receive an object with the following structure:
```javascript
{
    type: string, // A constant representing the overall type of the error.
    message: string // Additional information about the error.
}
```

* **avatarChanged** - event notifications about avatar
changes. The listener will receive an object with the following structure:
```javascript
{
    id: string, // the id of the participant that changed his avatar.
    avatarURL: string // the new avatar URL.
}
```

* **audioAvailabilityChanged** - event notifications about audio availability status changes. The listener will receive an object with the following structure:
```javascript
{
    available: boolean // new available status - boolean
}
```

* **audioMuteStatusChanged** - event notifications about audio mute status changes. The listener will receive an object with the following structure:
```javascript
{
    muted: boolean // new muted status - boolean
}
```

* **endpointTextMessageReceived** - event notifications about a text message received through datachannels.
The listener will receive an object with the following structure:
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

* **largeVideoChanged** - receives event notification about the change in the participant displayed on the large video. The listener will receive an object with the following structure.
```javascript
{
    id: string // id of the participant that is now on large video in the stage view.
}
```

* **log** - event notifications about logs being written with the log level being one of the values specified in [config.js] on the apiLogLevels property (if none specified, this event will not fire). The listener will receive an object with the following structure:
```javascript
{
    logLevel: string, // A constant representing the log type (info, error, debug, warn).
    args: string // Additional log information.
}
```

* **micError** - event notifications about Jitsi-Meet having failed to access the mic. The listener will receive an object with the following structure:
```javascript
{
    type: string, // A constant representing the overall type of the error.
    message: string // Additional information about the error.
}
```

* **screenSharingStatusChanged** - receives event notifications about turning on/off the local user screen sharing. The listener will receive object with the following structure:
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

* **dominantSpeakerChanged** - receives event notifications about change in the dominant speaker. The listener will receive object with the following structure:
```javascript
{
    id: string //participantId of the new dominant speaker
}
```

* **tileViewChanged** - event notifications about tile view layout mode being entered or exited. The listener will receive object with the following structure:
```javascript
{
    enabled: boolean, // whether tile view is not displayed or not
}
```

* **incomingMessage** - Event notifications about incoming
messages. The listener will receive an object with the following structure:
```javascript
{
    from: string, // The id of the user that sent the message
    nick: string, // the nickname of the user that sent the message
    message: string // the text of the message
}
```

* **outgoingMessage** - Event notifications about outgoing
messages. The listener will receive an object with the following structure:
```javascript
{
    message: string // the text of the message
}
```

* **displayNameChange** - event notifications about display name
changes. The listener will receive an object with the following structure:
```javascript
{
    id: string, // the id of the participant that changed his display name
    displayname: string // the new display name
}
```

* **deviceListChanged** - event notifications about device list changes. The listener will receive an object with the following structure:
```javascript
{
    devices: Object // the new list of available devices.
}
```
NOTE: The devices object has the same format as the getAvailableDevices result format.

* **emailChange** - event notifications about email
changes. The listener will receive an object with the following structure:
```javascript
{
    id: string, // the id of the participant that changed his email
    email: string // the new email
}
```
* **feedbackSubmitted** - event notifications about conference feedback submission
```javascript
{
    error: string // The error which occurred during submission, if any.
}
```

* **filmstripDisplayChanged** - event notifications about the visibility of the filmstrip being updated.
```javascript
{
    visible: boolean // Whether or not the filmstrip is displayed or hidden.
}
```

* **participantJoined** - event notifications about new participants who join the room. The listener will receive an object with the following structure:
```javascript
{
    id: string, // the id of the participant
    displayName: string // the display name of the participant
}
```

* **participantKickedOut** - event notifications about a participants being removed from the room. The listener will receive an object with the following structure:
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

* **participantLeft** - event notifications about participants that leave the room. The listener will receive an object with the following structure:
```javascript
{
    id: string // the id of the participant
}
```

* **participantRoleChanged** - event notification fired when the role of the local user has changed (none, moderator, participant). The listener will receive an object with the following structure:
```javascript
{
    id: string // the id of the participant
    role: string // the new role of the participant
}
```

* **passwordRequired** - event notifications fired when failing to join a room because it has a password.

* **videoConferenceJoined** - event notifications fired when the local user has joined the video conference. The listener will receive an object with the following structure:
```javascript
{
    roomName: string, // the room name of the conference
    id: string, // the id of the local participant
    displayName: string, // the display name of the local participant
    avatarURL: string // the avatar URL of the local participant
}
```

* **videoConferenceLeft** - event notifications fired when the local user has left the video conference. The listener will receive an object with the following structure:
```javascript
{
    roomName: string // the room name of the conference
}
```

* **videoAvailabilityChanged** - event notifications about video availability status changes. The listener will receive an object with the following structure:
```javascript
{
    available: boolean // new available status - boolean
}
```

* **videoMuteStatusChanged** - event notifications about video mute status changes. The listener will receive an object with the following structure:
```javascript
{
    muted: boolean // new muted status - boolean
}
```

* **videoQualityChanged** -  event notifications about video quality settings changes. The listener will receive an object with the following structure:
```javascript
{
    videoQuality: number // the height of the resolution related to the new video quality setting.
}
```

* **readyToClose** - event notification fired when Jitsi Meet is ready to be closed (hangup operations are completed).

* **subjectChange** - event notifications about subject of conference changes.
The listener will receive an object with the following structure:
```javascript
{
    subject: string // the new subject
}
```

* **suspendDetected** - event notifications about detecting suspend event in host computer.

You can also add multiple event listeners by using `addEventListeners`.
This method requires one argument of type Object. The object argument must
have the names of the events as keys and the listeners of the events as values.
**NOTE: This method still exists but it is deprecated. JitsiMeetExternalAPI class extends [EventEmitter]. Use [EventEmitter] methods.**

```javascript
function incomingMessageListener(object)
{
// ...
}

function outgoingMessageListener(object)
{
// ...
}

api.addEventListeners({
    incomingMessage: incomingMessageListener,
    outgoingMessage: outgoingMessageListener
});
```

If you want to remove a listener you can use `removeEventListener` method with argument the name of the event.
**NOTE: This method still exists but it is deprecated. JitsiMeetExternalAPI class extends [EventEmitter]. Use [EventEmitter] methods( `removeListener`).**
```javascript
api.removeEventListener('incomingMessage');
```

If you want to remove more than one event you can use `removeEventListeners` method with an Array with the names of the events as an argument.
**NOTE: This method still exists but it is deprecated. JitsiMeetExternalAPI class extends [EventEmitter]. Use [EventEmitter] methods.**
```javascript
api.removeEventListeners([ 'incomingMessage', 'outgoingMessageListener' ]);
```

You can get the number of participants in the conference with the following API function:
```javascript
const numberOfParticipants = api.getNumberOfParticipants();
```

You can get the avatar URL of a participant in the conference with the following API function:
```javascript
const avatarURL = api.getAvatarURL(participantId);
```

You can get the display name of a participant in the conference with the following API function:
```javascript
const displayName = api.getDisplayName(participantId);
```

You can get the email of a participant in the conference with the following API function:
```javascript
const email = api.getEmail(participantId);
```

You can get the iframe HTML element where Jitsi Meet is loaded with the following API function:
```javascript
const iframe = api.getIFrame();
```

You can check whether the audio is muted with the following API function:
```javascript
api.isAudioMuted().then(muted => {
    ...
});
```

You can check whether the video is muted with the following API function:
```javascript
api.isVideoMuted().then(muted => {
    ...
});
```

You can check whether the audio is available with the following API function:
```javascript
api.isAudioAvailable().then(available => {
    ...
});
```

You can check whether the video is available with the following API function:
```javascript
api.isVideoAvailable().then(available => {
    ...
});
```

You can invite new participants to the call with the following API function:
```javascript
api.invite([ {...}, {...}, {...} ]).then(() => {
    // success
}).catch(() => {
    // failure
});
```
**NOTE: The format of the invitees in the array depends on the invite service used for the deployment.**

You can remove the embedded Jitsi Meet Conference with the following API function:
```javascript
api.dispose();
```

NOTE: It's a good practice to remove the conference before the page is unloaded.

[config.js]: https://github.com/jitsi/jitsi-meet/blob/master/config.js
[interface_config.js]: https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js
[EventEmitter]: https://nodejs.org/api/events.html
