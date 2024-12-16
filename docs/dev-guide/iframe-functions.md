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

__DEPRECATED__ Use `getRoomsInfo` instead.

Returns an array containing participant information such as ID, display name, avatar URL, and email.

```javascript
api.getParticipantsInfo();
```

### getRoomsInfo

Returns an array of available rooms and details of it:
- `isMainRoom` (true,false), `id`, `jid`
- participants: `Participant[]`
    - `id`
    - `jid`
    - `role`
    - `displayName`



```javascript
api.getRoomsInfo().then(rooms => {
    ... // see response example structure
})
```

Response example structure:

```json
{
  "rooms": [
    {
      "isMainRoom": true,
      "id": "room_name@conference.jitsi",
      "jid": "room_name@conference.jitsi/aaaaaa",
      "participants": [
        {
          "jid": "room_name@conference.jitsi/bbbbbb",
          "role": "participant",
          "displayName": "p1",
          "id": "bbbbbb"
        },
        {
          "jid": "room_name@conference.jitsi/cccccc",
          "role": "participant",
          "displayName": "p2",
          "id": "cccccc"
        }
      ]
    },
    {
    "isMainRoom": false,
    "id": "aaaaaa-bbb-cccc-dddd-qwertyuiopas",
    "jid": "aaaaaa-bbb-cccc-dddd-qwertyuiopas@breakout.jitsi",
    "participants": [{
        "jid": "aaaaaa-cccc-dddd-eeee-qwertyuiopas@jitsi/abcd1234",
        "role": "moderator",
        "displayName": "Participant name",
        "avatarUrl": "",
        "id": "abcd1234"
    }]
    },
  ]
}
```

### getSessionId

Returns the meting's unique Id (`sessionId`). 
Please note that the `sessionId` is not available when in prejoin screen and it's not guaranteed to be available immediately after joining - in which cases it will be empty.

```javascript
api.getSessionId().then(sessionId => {
    //sessionId: string
    ...
});
```

### getVideoQuality

Returns the current video quality setting.

```javascript
api.getVideoQuality();
```

### getSupportedCommands

Returns array of commands supported by `api.executeCommand(command, ...arguments)`;

```javascript
api.getSupportedCommands();
```

### getSupportedEvents

Returns array of events supported by `api.addListener(event, listener)`;

```javascript
api.getSupportedEvents();
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

The second parameter is optional and can be used to specify a `videoType`. When multistream support is enabled by passing this parameter you can specify whether the desktop or the camera video for the specified participant should be pinned. The accepted values are `'camera'` and `'desktop'`. The default is `'camera'`. Any invalid values will be ignored and default will be used.

```javascript
api.pinParticipant(participantId, videoType);
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

### setVirtualBackground

Set your virtual background with a base64 image.

```javascript
/**
 * @param {boolean} enabled - Enable or disable the virtual background.
 * @param {string} backgroundImage - Base64 image string, eg. "data:image/png;base64, iVBOR...".
 */
api.setVirtualBackground(enabled, backgroundImage);
```

### startRecording

Starts a file recording or streaming session. See the `startRecording` command for more details.

```javascript
api.startRecording(options);
```

### stopRecording

Stops an ongoing file recording, streaming session or transcription. See the `stopRecording` command for more details.

```javascript
api.stopRecording(mode, transcription);
```

### getNumberOfParticipants

Returns the number of conference participants:

```javascript
const numberOfParticipants = api.getNumberOfParticipants();
```

### getAvatarURL

__DEPRECATED__ Use `getRoomsInfo` instead.

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

### isVisitor

Returns a whether the current user is a visitor or not.

```javascript
const isVisitor = api.isVisitor();
```

### isModerationOn

Returns a Promise which resolves to the current moderation state of the given media type.

`mediaType` can be either `audio` (default) or `video`.

```javascript
api.isModerationOn(mediaType).then(isModerationOn => {
    ...
});
```

### isP2pActive

Returns a Promise which resolves to a Boolean or null, when there is no conference.

```javascript
api.isP2pActive().then(isP2p => {
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

PSTN invite objects have the following structure:

```javascript
{
    type: 'phone',
    number: <string> // the phone number in E.164 format  (ex. +31201234567)
}
```

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
