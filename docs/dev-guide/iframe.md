---
id: dev-guide-iframe
title: IFrame API
---
# Introduction

Embedding the Jitsi Meet API into your site or app enables you to host and provide secure video meetings with your colleagues, teams, and stakeholders. The Meet API provides a full compliment of comprehensive meeting features.

Your Jitsi meetings can be hosted and attended using any device while keeping your data and privacy protected. You can reach your meeting participants anywhere in the world eliminating the need for travel and the associated inconvenience.

The IFrame API enables you to embed Jitsi Meet functionality into your meeting application so you can experience the full functionality of the globally distributed and highly available deployment available with [meet.jit.si](https://meet.jit.si/).

You can also embed and integrate the globally distributed and highly available deployment on the [meet.jit.si](https://meet.jit.si/) platform itself. 

## Integration

To enable the Jitsi Meet API in your application you must use one of the following JavaScript (JS) Jitsi Meet API library scripts and integrate it into your appication:

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

Configuring the tile view

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

## Controlling the embedded Jitsi Meet Conference

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

* **getCurrentDevices** - Retrieves a list of currently selected devices.

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
* **getParticipantsInfo** - Returns an array containing participant information such as ID, display name, avatar URL, and email.

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
* **pinParticipant** - Selects the participant ID to be the pinned participant in order to always receive video for this participant (even when last enabled).

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

If no participant ID is passed, a particpant is picked based on the dominant, pinned speaker settings.

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

## Commands

The command parameter is a string which contains the command name. 

The following commands are supported:

* **displayName** - Sets the display name of the local participant. 

  This command requires one argument to set the new display name.

```javascript
api.executeCommand('displayName', 'New Nickname');
```
* **password** - Sets the password for the room. 

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

  This command requires the selected touch tone dial pads to play as well as the length of and time gap between tone play as the arguments. 

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

* **hangup** - Concludes or ends the call. 

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

  The particpant ID (Jid), if specified, is displayed on the large video. If no argument is passed, the participant to be displayed on the large  video is automatically selected based on the dominant/pinned speaker settings.

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

* **stopRecording** - Stops an ongoing **`stream`** or **`file`** recording.

  No other params are required.

```javascript
api.executeCommand('stopRecording', 
    mode: string //recording mode to stop, `stream` or `file`
);
```

## Multiple command execution

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

## EventEmitter

Jitsi Meet incorporates use of [EventEmitter](https://angular.io/api/core/EventEmitter
) to receive custom event notifications synchronously or asynchronously. The **`JitsiMeetExternalAPI`** class extends [EventEmitter] methods. (e.g., **`addListener`** or **`on`**).
