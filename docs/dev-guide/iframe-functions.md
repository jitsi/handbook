---
id: dev-guide-iframe-functions
title: Functions
---

Use the following API functions to control your embedded Jitsi Meet Conference.

### captureCameraPicture

Mobile browsers only. Captures a high quality picture using the device's camera. All parameters are optional.

```javascript
api.captureCameraPicture(
        cameraFacingMode, // the facing mode: environment/user. Defaults to environment.
        descriptionText, // a custom description text to replace the default text on the consent dialog.
        titleText // a custom title to replace the default title on the consent dialog.
    ).then(data => {
    // data is an Object with only one param, either dataURL on success or error on failure.
    // - dataURL is the base64 string of the taken picture
    // - error is a string, a verbose explanation of the problem
    // data.dataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAA..."
});
```

### captureLargeVideoScreenshot

Captures a screenshot of the participant currently displayed in the large video view.

**Returns:** `Promise<{ dataURL: string }>`

```javascript
api.captureLargeVideoScreenshot().then(data => {
    // data.dataURL contains the base64-encoded PNG image
    console.log(data.dataURL); // "data:image/png;base64,iVBORw0KGgo..."
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

Retrieves the IDs of participants currently sharing their screen.

**Returns:** `Promise<{ sharingParticipantIds: string[] }>`

```javascript
api.getContentSharingParticipants().then(res => {
    console.log(res.sharingParticipantIds); // ['participantId1', 'participantId2']
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

Retrieves information about the current deployment.

**Returns:** `Promise<{ region: string, shard: string, ... }>`

```javascript
api.getDeploymentInfo().then(deploymentInfo => {
    console.log(deploymentInfo.region); // 'us-east-1'
    console.log(deploymentInfo.shard);  // 'shard-3'
});
```

### getLivestreamUrl

Retrieves the URL of the current livestream.

**Returns:** `Promise<{ livestreamUrl: string }>`

```javascript
api.getLivestreamUrl().then(livestreamData => {
    console.log(livestreamData.livestreamUrl); // 'https://youtube.com/watch?v=...'
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

Retrieves the meeting's unique session ID.

**Returns:** `Promise<string>`

**Note:** The session ID is not available in the prejoin screen and may not be immediately available after joining (returns empty string in these cases).

```javascript
api.getSessionId().then(sessionId => {
    console.log(sessionId); // 'abc123def456'
});
```

### getSharedDocumentUrl

Retrieves the URL of the meeting's shared Etherpad document.

**Returns:** `Promise<string>`

**Note:** The shared document URL is not available in the prejoin screen and may not be immediately available after joining (returns empty string in these cases).

```javascript
api.getSharedDocumentUrl().then(sharedDocumentUrl => {
    console.log(sharedDocumentUrl); // 'https://etherpad.example.com/p/meeting-123'
});
```

### getVideoQuality

Retrieves the current video quality/resolution setting.

**Returns:** `number` - The video height in pixels (e.g., `180`, `360`, `720`, `1080`).

```javascript
const quality = api.getVideoQuality();
console.log(quality); // 720
```

### getSupportedCommands

Retrieves a list of all commands supported by the External API.

**Returns:** `string[]` - Array of command names.

```javascript
const commands = api.getSupportedCommands();
console.log(commands); // ['displayName', 'toggleAudio', 'hangup', ...]
```

### getSupportedEvents

Retrieves a list of all events supported by the External API.

**Returns:** `string[]` - Array of event names.

```javascript
const events = api.getSupportedEvents();
console.log(events); // ['participantJoined', 'videoConferenceJoined', ...]
```

### isDeviceChangeAvailable

Checks if changing devices of a specific type is supported.

**Parameters:**
- `deviceType` (string) - Optional. Device type: `'output'`, `'input'`, or omit for all devices.

**Returns:** `Promise<boolean>`

```javascript
api.isDeviceChangeAvailable('output').then(isAvailable => {
    console.log(isAvailable); // true or false
});
```

### isDeviceListAvailable

Checks if device enumeration is supported by the browser.

**Returns:** `Promise<boolean>`

```javascript
api.isDeviceListAvailable().then(isAvailable => {
    console.log(isAvailable); // true or false
});
```

### isMultipleAudioInputSupported

Checks if using multiple audio input devices simultaneously is supported.

**Returns:** `Promise<boolean>`

```javascript
api.isMultipleAudioInputSupported().then(isSupported => {
    console.log(isSupported); // true or false
});
```

### pinParticipant

Pins a specific participant to always receive their video.

**Parameters:**
- `participantId` (string) - Required. The ID of the participant to pin.
- `videoType` (string) - Optional. Type of video to pin: `'camera'` (default) or `'desktop'`. Only effective when multistream is enabled.

**Returns:** `void`

```javascript
api.pinParticipant('participantId123', 'desktop');
```

### resizeLargeVideo

Resizes the large video container to specific dimensions.

**Parameters:**
- `width` (number) - Required. Width in pixels.
- `height` (number) - Required. Height in pixels.

**Returns:** `void`

```javascript
api.resizeLargeVideo(1280, 720);
```

### setAudioInputDevice

Sets the audio input device (microphone).

**Parameters:**
- `deviceLabel` (string) - Required. The device label.
- `deviceId` (string) - Required. The device ID.

**Returns:** `Promise<void>`

```javascript
api.setAudioInputDevice('Built-in Microphone', 'default');
```

### setAudioOutputDevice

Sets the audio output device (speaker/headphones).

**Parameters:**
- `deviceLabel` (string) - Required. The device label.
- `deviceId` (string) - Required. The device ID.

**Returns:** `Promise<void>`

```javascript
api.setAudioOutputDevice('External Speakers', 'abc123');
```

### setLargeVideoParticipant

Sets which participant is displayed in the large video view.

**Parameters:**
- `participantId` (string) - Optional. The participant ID to display. If omitted, automatically selects based on dominant/pinned speaker.

**Returns:** `void`

```javascript
api.setLargeVideoParticipant('participantId123');
```

### setVideoInputDevice

Sets the video input device (camera).

**Parameters:**
- `deviceLabel` (string) - Required. The device label.
- `deviceId` (string) - Required. The device ID.

**Returns:** `Promise<void>`

```javascript
api.setVideoInputDevice('HD Webcam', 'xyz789');
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

Returns the total number of participants in the conference.

**Returns:** `number`

```javascript
const count = api.getNumberOfParticipants();
console.log(count); // 5
```

### getAvatarURL

__DEPRECATED__ Use `getRoomsInfo` instead.

Returns a participant's avatar URL:

```javascript
const avatarURL = api.getAvatarURL(participantId);
```

### getDisplayName

Retrieves a participant's display name.

**Parameters:**
- `participantId` (string) - Required. The participant ID.

**Returns:** `string`

```javascript
const name = api.getDisplayName('participantId123');
console.log(name); // 'John Doe'
```

### getEmail

Retrieves a participant's email address.

**Parameters:**
- `participantId` (string) - Required. The participant ID.

**Returns:** `string`

```javascript
const email = api.getEmail('participantId123');
console.log(email); // 'john@example.com'
```

### getIFrame

Returns the IFrame HTML element containing the Jitsi Meet conference.

**Returns:** `HTMLIFrameElement`

```javascript
const iframe = api.getIFrame();
console.log(iframe.src); // 'https://meet.jit.si/...'
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

Invites an array of participants to the meeting.

**Parameters:**
- `invitees` (array) - Required. Array of invitee objects (format depends on invite service configuration).

**Returns:** `Promise<void>`

```javascript
api.invite([
    { type: 'phone', number: '+12025551234' },
    { type: 'sip', address: 'user@sip.example.com' }
]).then(() => {
    console.log('Invitations sent successfully');
}).catch(error => {
    console.error('Failed to send invitations:', error);
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

Removes the embedded Jitsi Meet conference and cleans up resources.

**Returns:** `void`

**Note:** It's recommended to call this before the page is unloaded to properly clean up resources.

```javascript
api.dispose();
```

---

## Error Handling

### Promise-based Functions

Many functions return promises. Always handle both success and error cases:

```javascript
// Good: Handle both cases
api.getAvailableDevices()
    .then(devices => {
        console.log('Available devices:', devices);
    })
    .catch(error => {
        console.error('Failed to get devices:', error);
    });

// Better: Using async/await with try-catch
async function getDevices() {
    try {
        const devices = await api.getAvailableDevices();
        console.log('Available devices:', devices);
        return devices;
    } catch (error) {
        console.error('Failed to get devices:', error);
        return null;
    }
}
```

### Common Error Scenarios

#### Device Access Errors
```javascript
// Camera/microphone access may be denied
try {
    await api.getCurrentDevices();
} catch (error) {
    if (error.name === 'NotAllowedError') {
        console.error('User denied device access');
    } else if (error.name === 'NotFoundError') {
        console.error('No devices found');
    }
}
```

#### Device Switching Failures
```javascript
// Device may not exist or be available
api.setAudioInputDevice('device-id-123')
    .catch(error => {
        console.error('Failed to switch audio device:', error);
        // Fallback to default device or show error to user
    });
```

#### Empty Results
```javascript
// Some functions may return empty arrays
const devices = await api.getAvailableDevices();
if (!devices.audioInput || devices.audioInput.length === 0) {
    console.warn('No audio input devices available');
}
```

#### Network/Connection Errors
```javascript
// Avatar URL fetching may fail
api.getAvatarURL('participant-id')
    .catch(error => {
        console.error('Failed to fetch avatar:', error);
        return 'path/to/default-avatar.png'; // Fallback
    });
```

### Best Practices

1. **Always use `.catch()` or `try-catch`**: Never leave promises unhandled
2. **Provide user feedback**: Inform users when operations fail
3. **Implement fallbacks**: Have default behavior when operations fail
4. **Log errors appropriately**: Use console.error for debugging
5. **Check return values**: Some functions may return `null` or empty results

### Debugging Tips

- Use browser DevTools to check for errors in the console
- Verify device permissions in browser settings
- Check that device IDs are valid before switching
- Test error paths by denying permissions or unplugging devices
- Use `console.log` to trace function calls and return values

**See also:** [Troubleshooting](iframe-commands.md#troubleshooting) for common issues when using commands.

---

## Error Handling

### Promise-based Functions

Many functions return promises. Always handle both success and error cases:

```javascript
// Good: Handle both cases
api.getAvailableDevices()
    .then(devices => {
        console.log('Available devices:', devices);
    })
    .catch(error => {
        console.error('Failed to get devices:', error);
    });

// Better: Using async/await with try-catch
async function getDevices() {
    try {
        const devices = await api.getAvailableDevices();
        console.log('Available devices:', devices);
        return devices;
    } catch (error) {
        console.error('Failed to get devices:', error);
        return null;
    }
}
```

### Common Error Scenarios

#### Device Access Errors
```javascript
// Camera/microphone access may be denied
try {
    await api.getCurrentDevices();
} catch (error) {
    if (error.name === 'NotAllowedError') {
        console.error('User denied device access');
    } else if (error.name === 'NotFoundError') {
        console.error('No devices found');
    }
}
```

#### Device Switching Failures
```javascript
// Device may not exist or be available
api.setAudioInputDevice('device-id-123')
    .catch(error => {
        console.error('Failed to switch audio device:', error);
        // Fallback to default device or show error to user
    });
```

#### Empty Results
```javascript
// Some functions may return empty arrays
const devices = await api.getAvailableDevices();
if (!devices.audioInput || devices.audioInput.length === 0) {
    console.warn('No audio input devices available');
}
```

#### Network/Connection Errors
```javascript
// Avatar URL fetching may fail
api.getAvatarURL('participant-id')
    .catch(error => {
        console.error('Failed to fetch avatar:', error);
        return 'path/to/default-avatar.png'; // Fallback
    });
```

### Best Practices

1. **Always use `.catch()` or `try-catch`**: Never leave promises unhandled
2. **Provide user feedback**: Inform users when operations fail
3. **Implement fallbacks**: Have default behavior when operations fail
4. **Log errors appropriately**: Use console.error for debugging
5. **Check return values**: Some functions may return `null` or empty results

### Debugging Tips

- Use browser DevTools to check for errors in the console
- Verify device permissions in browser settings
- Check that device IDs are valid before switching
- Test error paths by denying permissions or unplugging devices
- Use `console.log` to trace function calls and return values

**See also:** [Troubleshooting](iframe-commands.md#troubleshooting) for common issues when using commands.
