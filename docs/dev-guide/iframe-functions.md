---
id: dev-guide-iframe-functions
title: Functions
---

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

### getContentSharingParticipants

Returns a promise which resolves with an array of currently sharing participants ID's.

```javascript
api.getContentSharingParticipants().then(res => {
    //res.sharingParticipantIds = [particId1, particId2, ...]
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

### getDeploymentInfo

Retrieves an object containing information about the deployment.

```javascript
api.getDeploymentInfo().then(deploymentInfo => {
    // deploymentInfo = {
    //     region: 'deployment-region',
    //     shard: 'deployment-shard',
    //     ...
    // }
    ...
});
```

### getLivestreamUrl

Retrieves an object containing information about livestreamUrl of the current live stream.

```javascript
api.getLivestreamUrl().then(livestreamData => {
    // livestreamData = {
    //     livestreamUrl: 'livestreamUrl'
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

### isAudioDisabled

Returns a Promise which resolves to the current audio disabled state:

```javascript
api.isAudioDisabled().then(disabled => {
    ...
});
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

### isModerationOn

Returns a Promise which resolves to the current moderation state of the given media type.

`mediaType` can be either `audio` (default) or `video`.

```javascript
api.isModerationOn(mediaType).then(isModerationOn => {
    ...
});
```

### isParticipantForceMuted

Returns a Promise which resolves to the current force mute state of the given participant for the given media type.

`mediaType` can be either `audio` (default) or `video`.

Force muted - moderation is on and participant is not allowed to unmute the given media type.

```javascript
api.isParticipantForceMuted(participantId, mediaType).then(isForceMuted => {
    ...
});
```

### isParticipantsPaneOpen

Returns a Promise which resolves with the current participants pane state.

```javascript
api.isParticipantsPaneOpen().then(state => {
    ...
});
```

### isStartSilent

Returns a Promise which resolves with whether meeting was started in view only.

```javascript
api.isStartSilent().then(startSilent => {
    ...
});
```

### listBreakoutRooms

Returns a Promise which resolves with the map of breakout rooms.

```javascript
api.listBreakoutRooms().then(breakoutRooms => {
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

SIP invite objects have the following structure:

```javascript
{
    type: 'sip',
    address: <string> // the sip address
}
```

### dispose

Removes the embedded Jitsi Meet conference:

```javascript
api.dispose();
```

**NOTE:** Jitsi recommends removing the conference before the page is unloaded.
