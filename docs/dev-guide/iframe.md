---
id: dev-guide-iframe
title: IFrame API
---

Embedding the Jitsi 8x8 Meet API into your site or app enables you to host and provide secure video meetings with your colleagues, teams, and stakeholders. The API provides a full compliment of comprehensive meeting features.

Your Jitsi 8x8 meetings can be hosted and attended using any device while keeping your data and privacy protected. You can reach your meeting participants anywhere in the world eliminating the need for any travel and the associated inconvenience.

The IFrame API enables you to embed Jitsi Meet functionality into your meeting application so you can experience the full functionality of the globally distributed and highly available deployment available with [meet.jit.si](meet.jit.si).

You can use the Jitsi Meet API to embed Jitsi Meet in to your application. You are also welcome to use it for embedding the . The only thing we ask for in that case is that you please DO NOT remove the jitsi.org logo from the top left corner.

Additional functionality includes embedding the globally distributed and highly available deployment on meet.jit.si itself. 

Note: Jitsi ask that you not remove the jitsi.org logo from the top left corner of the implementation.

You can find all you need to get started and managing your Jitsi implementation on this page. It includes the following topics:

* [Installation](#Installation)

* [Creating the Jitsi Meet API object](#Creating the Jitsi Meet API object)

* []

## **Installation** ????

To enable the Jitsi Meet API in your application you must use one of the following JavaScript (JS) Jitsi Meet API library scripts and integrate it into your appication:

For self-hosted on your domain:
```javascript
<script src='https://<your-domain>/external_api.js'></script>
```

meet.jit.si:
```javascript
<script src='https://meet.jit.si/external_api.js'></script>

```

For example:

```javascript
```

## **Creating the Jitsi Meet API object**

After you have installed the Meet API library, you must then create the Jitsi Meet API object.

The Meet API object takes the following form:

**`api = new JitsiMeetExternalAPI(domain, options)`**

The API object constructor uses the following options:

* **domain**: The domain used to build the conference URL (e.g., **`meet.jit.si`**).

* **options**: The object with properties. 

  Optional arguments include:
  
    * **roomName**: The name of the room to join.
    
    * **width**: The created IFrame width.
    
    The width argument has the following characteristics:
    
    -- A numerical value indicates the width in pixel units.
    
    -- If a string is specified the format is a number followed by **`px`, `em`, `pt`, or `%`**.
    
    * **height**: The height for the created IFrame. 
    
    The height argument has the following characteristics: 
    
    -- A numerical value indicates the height in pixel units.
    
    -- If a string is specified the format is a number followed by **`px`, `em`, `pt`, or `%`**. 
    
    * **parentNode**: The HTML DOM Element where the IFrame is added as a child.
    
    * **configOverwrite**: The JS object with overrides for options defined in the [config.js] file.
    
    * **interfaceConfigOverwrite**: The JS object with overrides for options defined in the [interface_config.js] file.
    
    * **noSSL**: (Boolean) Indicates if the server should be contacted using HTTP or HTTPS. The default value is **`false`**.
    
    * **jwt**: The [JWT](https://jwt.io/) token.
    
    * **onload**: The IFrame onload event handler.
    
    * **invitees**: Object arrays that contain information about participants invited to a call.
    
    * **devices**: Information map about the devices used in a call.
    
    * **userInfo**: The JS object that contains information about the participant starting the meeting (e.g.,email).

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

You can override options set in the [config.js] file and the [interface_config.js] file using the **configOverwrite** and **interfaceConfigOverwrite** objects, respectively.

For example, to enable the **`filmstripOnly`** interface mode use the following:

```javascript
const options = {
    ...
    configOverwrite: { startWithAudioMuted: true },
    interfaceConfigOverwrite: { filmStripOnly: true },
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
**Configuring the tile view**

You can configure the maximum number of columns in the tile view by overriding the **`TILE_VIEW_MAX_COLUMNS`** property from the [interface_config.js] file via the **interfaceConfigOverwrite** object:

```javascript
const options = {
    ...
    interfaceConfigOverwrite: { TILE_VIEW_MAX_COLUMNS: 2 },
    ...
};
const api = new JitsiMeetExternalAPI(domain, options);
```
Note: **`TILE_VIEW_MAX_COLUMNS`** accepts values from 1 to 5. The default value is 5.

## **Controlling the embedded Jitsi Meet Conference**

Use the following objects to control your embedded Jitsi Meet Conference.

* **captureLargeVideoScreenshot** - Captures the screenshot for a large video.

```javascript
api.captureLargeVideoScreenshot().then(dataURL => {
    // dataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAA..."
});
```
* **getAvailableDevices** - Retrieves a list of available devices.

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
* **getCurrentDevices** - Retrieve a list of currently selected devices.

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
* **getParticipantsInfo** - Returns an array containing participant information such as ID, display name, avatar URL. and email.

```javascript
api.getParticipantsInfo();
```
* **getVideoQuality** - Returns the current video quality setting.

```javascript
api.getVideoQuality();
```
* **isDeviceChangeAvailable** - Resolves to true if the device change is available and to false if not.

```javascript
// The accepted deviceType values are - 'output', 'input' or undefined.
api.isDeviceChangeAvailable(deviceType).then(isDeviceChangeAvailable => {
    ...
});
```
* **isDeviceListAvailable** - Resolves to true if the device list is available and to false if not.

```javascript
api.isDeviceListAvailable().then(isDeviceListAvailable => {
    ...
});
```
* **isMultipleAudioInputSupported** - Resolves to true if multiple audio input is supported and to false if not.

```javascript
api.isMultipleAudioInputSupported().then(isMultipleAudioInputSupported => {
    ...
});
```
* **pinParticipant** - ???? Elects the participant with the given id to be the pinned participant in order to always receive video for this participant (even when last n is enabled).

```javascript
api.pinParticipant(participantId);
```
* **resizeLargeVideo** - Resizes the large video container per the provided dimensions.

```javascript
api.resizeLargeVideo(width, height);
```
* **setAudioInputDevice** - Sets the audio input device to the one with the passed label or ID.

```javascript
api.setAudioInputDevice(deviceLabel, deviceId);
```
* **setAudioOutputDevice** - Sets the audio output device to the one with the passed label or ID.

```javascript
api.setAudioOutputDevice(deviceLabel, deviceId);
```
* **setLargeVideoParticipant** - Displays the participant with the participant ID (Jid) that is passed on the large video.

If no participant ID is passed, a particpant is picked based on the dominant/pinned speaker settings.

```javascript
api.setLargeVideoParticipant(participantId);
```
* **setVideoInputDevice** - Sets the video input device to the one with the passed label or ID.

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

You can control the embedded Jitsi Meet conference by calling **`executeCommand`** on the **`JitsiMeetExternalAPI`** object:

```javascript
api.executeCommand(command, ...arguments);
```
## **Commands**

The command parameter is a string which contains the command name. 

The following commands are currently supported:

* **displayName** - Sets the display name of the local participant. 

This command requires one argument to set the new display name.

```javascript
api.executeCommand('displayName', 'New Nickname');
```
* **password** - Sets the password for the room. 

Set the password name as the command's single argument.

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
* **toggleLobby** - Toggles the lobby mode on or off. 

This command requires the desired lobby mode state as the argument.

```javascript
api.addEventListener('participantRoleChanged', function (event) {
    if(event.role === 'moderator') {
        api.executeCommand('toggleLobby', true);
    }
});
```

* **sendTones** - Enables touch tone playing.

```javascript
api.executeCommand('sendTones', {
    tones: string, // The dial pad touch tones to play. For example, '12345#'.
    duration: number, // Optional. The number of milliseconds each tone should play. The default is 200.
    pause: number // Optional. The number of milliseconds between each tone. The default is 200.
});
```

* **subject** - Sets the subject of the conference. 

This command requires the new subject to be set as the argument.

```javascript
api.executeCommand('subject', 'New Conference Subject');
```

* **toggleAudio** - Mutes and unmutes the audio for the local participant. 

No arguments are required.

```javascript
api.executeCommand('toggleAudio');
```

* **toggleVideo** - Mutes and unmutes the video for the local participant. 

No arguments are required.

```javascript
api.executeCommand('toggleVideo');
```

* **toggleFilmStrip** - Hide or show the filmstrip. 

No arguments are required.

```javascript
api.executeCommand('toggleFilmStrip');
```

* **toggleChat** - Hide or show chat messaging. 

No arguments are required.

```javascript
api.executeCommand('toggleChat');
```

* **toggleShareScreen** - Start or stop screen sharing. 

No arguments are required.

```javascript
api.executeCommand('toggleShareScreen');
```

* **toggleTileView** - Enter or exit the tile view layout mode. 

No arguments are required.

```javascript
api.executeCommand('toggleTileView');
```

* **hangup** - Hangups (concludes) the call. 

No arguments are required.

```javascript
api.executeCommand('hangup');
```

* **email** - Changes the local email address. 

This command requires the new email address as the single argument.

```javascript
api.executeCommand('email', 'example@example.com');
```

* **avatarUrl** - Changes the local avatar URL. 

This command requires the new avatar URL to be set as the single argument.

```javascript
api.executeCommand('avatarUrl', 'https://avatars0.githubusercontent.com/u/3671647');
```

* **sendEndpointTextMessage** - Sends a text message to another participant through the data channels.

```javascript
api.executeCommand('sendEndpointTextMessage', 'receiverParticipantId', 'text');
```

* **setLargeVideoParticipant** - Displays the participant on the large video display.

The particpant ID (Jid), if specified, is displayed on the large video. If no argument is passed, the participant to be displayed on the large video is automatically selected based on the dominant/pinned speaker settings.

```javascript
api.executeCommand('setLargeVideoParticipant', 'abcd1234');
```

* **setVideoQuality** - Sets the send and receive video resolution. 

The resolution height setting is implemented using a single argument.

```javascript
api.executeCommand('setVideoQuality', 720);
```

* **muteEveryone** - Mute all meeting participants. 

This command can only be executed by the meeting moderator. No arguments are required.

```javascript
api.executeCommand('muteEveryone');
```

* **startRecording** - Starts a file recording or streaming session using passed parameters:

  - **RTMP streaming** - Recording mode set to **`stream`** with an **`rtmpStreamKey`**. The **`rtmpBroadcastID`** value is optional.
  
  - **YouTube streams** - Recording mode set to **`stream`** with an **`youtubeStreamKey`**. The **`youtubeBroadcastID`** value is optional.
  
  - **Dropbox recording** - Recording mode set to **`file`** with a Dropbox OAuth2 token. Additionally, Dropbox saving should be enabled on the  jitsi meet deploy config you are using.
  
  - **File recording** - Recording mode set to **`file`**. Optionally, **`shouldShare`** should be passed on. No other params are required.
  
  
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

* **stopRecording** - Stops an ongoing **`stream`** or **`file`** recording.

```javascript
api.executeCommand('stopRecording', 
    mode: string //recording mode to stop, `stream` or `file`
);
```

## **Multiple command execution**

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

## **Event listeners**
You can add event listeners to the embedded Jitsi Meet using the **`addEventListener`** method.

**NOTE**: The **`addEventListener`** still exists but it is deprecated.  The JitsiMeetExternalAPI class extends [EventEmitter]. Use [EventEmitter] methods (`addListener` or `on`).

```javascript
api.addEventListener(event, listener);
```

The **`event`** parameter is a string object with the name of the event.

The **`listener`** parameter is a Function object with one argument that will be notified when the event occurs with data related to the event.

### **Supported listener events**

The following listener events are currently supported:

* **`cameraError`** - provides event notifications about Jitsi-Meet having failed to access the camera. 

The listener will receive an object with the following structure:

```javascript
{
    type: string, // A constant representing the overall type of the error.
    message: string // Additional information about the error.
}
```

* **`avatarChanged`** - provides event notifications about changes to a meeting avatar. 

The listener will receive an object with the following structure:

```javascript
{
    id: string, // the id of the participant that changed his avatar.
    avatarURL: string // the new avatar URL.
}
```

* **`audioAvailabilityChanged`** - provides event notifications about changes to audio availability status. 

The listener will receive an object with the following structure:

```javascript
{
    available: boolean // new available status - boolean
}
```

* **`audioMuteStatusChanged`** - provides event notifications about changes to audio mute status.

The listener will receive an object with the following structure:

```javascript
{
    muted: boolean // new muted status - boolean
}
```

* **`endpointTextMessageReceived`** - provides event notifications about a text messages received through data channels.

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

* **`largeVideoChanged`** - provides event notifications about changes in the large video display. 

The listener receives an object with the following structure:

```javascript
{
    id: string // id of the participant that is now on large video in the stage view.
}
```

* **`log`** - provides log event notifications with the log level being one of the values specified in the [config.js] file in the **`apiLogLevels`** property (if not specified the event does not fire). 

The listener receives an object with the following structure:

```javascript
{
    logLevel: string, // A constant representing the log type (info, error, debug, warn).
    args: string // Additional log information.
}
```

* **`micError`** - provides event notifications about Jitsi-Meet issues with mic access. 

The listener receives an object with the following structure:

```javascript
{
    type: string, // A constant representing the overall type of the error.
    message: string // Additional information about the error.
}
```

* **`screenSharingStatusChanged`** - provides event notifications about either turning on or off local user screen sharing. 

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

* **`dominantSpeakerChanged`** - provides event notifications about dominant speaker changes.

The listener receives an object with the following structure:

```javascript
{
    id: string //participantId of the new dominant speaker
}
```

* **`tileViewChanged`** - provides event notifications about entrance or exit from the tile view layout mode.

The listener receives an object with the following structure:

```javascript
{
    enabled: boolean, // whether tile view is not displayed or not
}
```

* **`incomingMessage`** - provides event notifications about incoming messages. 

The listener receives an object with the following structure:

```javascript
{
    from: string, // The id of the user that sent the message
    nick: string, // the nickname of the user that sent the message
    message: string // the text of the message
}
```

* **`outgoingMessage`** - provides event notifications about outgoing messages. 

The listener receives an object with the following structure:

```javascript
{
    message: string // the text of the message
}
```

* **displayNameChange** - provides event notifications about display name changes. 

The listener receives an object with the following structure:

```javascript
{
    id: string, // the id of the participant that changed his display name
    displayname: string // the new display name
}
```

* **deviceListChanged** - provides event notifications about device list changes. 

The listener will receive an object with the following structure:
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

You can remove the embedded Jitsi Meet Conference using the following function:
```javascript
api.dispose();
```

NOTE: Jitsi recommends removing the before the page is unloaded.

[config.js]: https://github.com/jitsi/jitsi-meet/blob/master/config.js
[interface_config.js]: https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js
[EventEmitter]: https://nodejs.org/api/events.html
