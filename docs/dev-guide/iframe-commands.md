---
id: dev-guide-iframe-commands
title: Commands
---

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

## Command Categories

**Participant Management:**
- `displayName`, `email`, `avatarUrl`
- `password`, `toggleLobby`, `answerKnockingParticipant`

**Audio/Video Controls:**
- `toggleAudio`, `toggleVideo`, `setAudioOnly`
- `muteEveryone`, `askToUnmute`, `approveVideo`
- `setVideoQuality`, `setVirtualBackground`, `setBlurredBackground`

**Layout & UI:**
- `toggleFilmStrip`, `toggleTileView`, `setTileView`
- `setLargeVideoParticipant`, `pinParticipant`
- `toggleParticipantsPane`, `resizeFilmStrip`, `resizeLargeVideo`

**Recording & Streaming:**
- `startRecording`, `stopRecording`

**Breakout Rooms:** 🔒
- `addBreakoutRoom`, `autoAssignToBreakoutRooms`
- `joinBreakoutRoom`, `sendParticipantToRoom`
- `closeBreakoutRoom`, `removeBreakoutRoom`

**Moderation:** 🔒
- `muteEveryone`, `endConference`, `password`
- `toggleModeration`, `askToUnmute`, `approveVideo`, `rejectParticipant`

**Other:**
- `hangup`, `subject`, `sendChatMessage`
- `showNotification`, `hideNotification`
- `toggleWhiteboard`

🔒 = Moderator only

---

## Commands

### displayName

Sets the display name of the local participant.

**Parameters:**
- `displayName` (string) - Required. The new display name.

```javascript
api.executeCommand('displayName', 'John Doe');
```

**See also:** `displayNameChange` event, `getDisplayName()` function

### password

**🔒 Moderator only** (for setting password)

Sets the room password or provides password to join a protected room.

**Parameters:**
- `password` (string) - Required. The password string.

```javascript
// Set new password for the room (requires moderator role)
api.addEventListener('participantRoleChanged', function(event) {
    if (event.role === 'moderator') {
        api.executeCommand('password', 'SecurePassword123');
    }
});

// Join a password-protected room
api.on('passwordRequired', function() {
    api.executeCommand('password', 'SecurePassword123');
});
```

### toggleLobby

**🔒 Moderator only**

Enables or disables the lobby mode.

**Parameters:**
- `enabled` (boolean) - Required. `true` to enable lobby mode, `false` to disable.

```javascript
api.addEventListener('participantRoleChanged', function(event) {
    if (event.role === 'moderator') {
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

### startShareVideo

Starts sharing a video

This command requires the an url pointing to either a youtube video or a video to be streamed from web (e.g an mp4 file)

```javascript
api.executeCommand('startShareVideo', url);
```

### stopShareVideo

Stops sharing a video (if the user is the one who started the video)

No arguments are required.

```javascript
api.executeCommand('stopShareVideo');
```

### subject

**🔒 Moderator only**

Sets the conference subject/title.

**Parameters:**
- `subject` (string) - Required. The new conference subject.

```javascript
api.executeCommand('subject', 'Team Standup Meeting');
```

### localSubject

Sets the conference subject locally (only visible to the local participant).

**Parameters:**
- `subject` (string) - Required. The local conference subject.

**Note:** This can be used by any participant, not just moderators.

```javascript
api.executeCommand('localSubject', 'My Personal Meeting Notes');
```

### toggleAudio

Mutes or unmutes the local participant's audio (microphone).

No arguments are required.

```javascript
api.executeCommand('toggleAudio');
```

**See also:** `audioMuteStatusChanged` event, `audioAvailabilityChanged` event

### toggleVideo

Mutes or unmutes the local participant's video (camera).

No arguments are required.

```javascript
api.executeCommand('toggleVideo');
```

**See also:** `videoMuteStatusChanged` event, `videoAvailabilityChanged` event

### toggleFilmStrip

Toggles the visibility of the filmstrip (participant thumbnails).

No arguments are required.

```javascript
api.executeCommand('toggleFilmStrip');
```

**See also:** `filmstripDisplayChanged` event

### toggleChat

Hide or show chat messaging.

No arguments are required.

```javascript
api.executeCommand('toggleChat');
```

### toggleRaiseHand

Hide or show the raised hand.

No arguments are required.

```javascript
api.executeCommand('toggleRaiseHand')
```

### toggleShareScreen

Start or stop screen sharing.

No arguments are required.

```javascript
api.executeCommand('toggleShareScreen');
```

### setNoiseSuppressionEnabled

Enable or disable noise suppression on the current audio track.

```javascript
api.executeCommand('setNoiseSuppressionEnabled', {
    enabled: boolean // Enable or disable noise suppression.
});
```

### toggleSubtitles

Start or stop subtitles.

No arguments are required.

```javascript
api.executeCommand('toggleSubtitles');
```

### toggleTileView

Toggles between tile view (grid layout) and stage view (speaker focus).

No arguments are required.

```javascript
api.executeCommand('toggleTileView');
```

**See also:** `setTileView`, `tileViewChanged` event

### hangup

Leaves the conference (disconnects the local participant).

No arguments are required.

```javascript
api.executeCommand('hangup');
```

**See also:** `readyToClose` event, `videoConferenceLeft` event

### endConference

**🔒 Moderator only**

Ends the conference for all participants.

**Note:** This requires End Conference support to be enabled in the deployment configuration.

No arguments are required.

```javascript
api.executeCommand('endConference');
```

### email

Sets the local participant's email address.

**Parameters:**
- `email` (string) - Required. The email address to set.

```javascript
api.executeCommand('email', 'user@example.com');
```

### sendCameraFacingMode

Requests a participant to change their camera facing mode (mobile devices).

**Parameters:**
- `receiverParticipantId` (string) - Required. The ID of the participant to send the request to.
- `facingMode` (string) - Optional. Either `'user'` (front camera) or `'environment'` (back camera). If omitted, toggles between cameras.

**Note:** The receiving participant will see a confirmation dialog.

```javascript
api.executeCommand('sendCameraFacingMode', 'participantId123', 'environment');
```

### sendEndpointTextMessage

Sends a text message directly to another participant via data channels.

**Parameters:**
- `receiverParticipantId` (string) - Required. The ID of the receiving participant.
- `text` (string) - Required. The message text to send.

```javascript
api.executeCommand('sendEndpointTextMessage', 'participantId123', 'Hello!');
```

### setLargeVideoParticipant

Displays a specific participant on the large video display.

**Parameters:**
- `participantId` (string) - Optional. The participant ID to display. If omitted, automatically selects based on dominant/pinned speaker.
- `videoType` (string) - Optional. Type of video to display: `'camera'` (default) or `'desktop'`. Only effective when multistream is enabled.

```javascript
api.executeCommand('setLargeVideoParticipant', 'abcd1234', 'desktop');
```

### setVideoQuality

Sets the preferred send and receive video resolution height.

**Parameters:**
- `height` (number) - Required. The video height in pixels (e.g., `180`, `360`, `720`, `1080`).

```javascript
api.executeCommand('setVideoQuality', 720);
```

### muteEveryone

**🔒 Moderator only**

Mutes all meeting participants for the specified media type.

**Parameters:**
- `mediaType` (string) - Optional. Either `'audio'` (default) or `'video'`.

```javascript
api.executeCommand('muteEveryone', 'audio');
```

### startRecording

Starts recording, streaming, or transcription with various options.

**Parameters:**
- `options` (object) - Required. Configuration object with the following properties:
  - `mode` (string) - Required. Recording mode: `'local'`, `'file'`, or `'stream'`
  - `dropboxToken` (string) - Optional. Dropbox OAuth2 token (for Dropbox recording)
  - `onlySelf` (boolean) - Optional. Record only local streams (local mode only)
  - `shouldShare` (boolean) - Optional. Share recording with participants
  - `rtmpStreamKey` (string) - Optional. RTMP stream key (for RTMP streaming)
  - `rtmpBroadcastID` (string) - Optional. RTMP broadcast ID
  - `youtubeStreamKey` (string) - Optional. YouTube stream key (for YouTube streaming)
  - `youtubeBroadcastID` (string) - Optional. YouTube broadcast ID
  - `extraMetadata` (object) - Optional. Additional metadata for file recording
  - `transcription` (boolean) - Optional. Start transcription

**Recording Modes:**

1. **Local Recording** - Records locally in the browser
```javascript
// Record full conference
api.executeCommand('startRecording', {
    mode: 'local'
});

// Record only your own streams
api.executeCommand('startRecording', {
    mode: 'local',
    onlySelf: true
});
```

2. **File Recording** - Server-side recording (requires Jibri)
```javascript
// Basic file recording
api.executeCommand('startRecording', {
    mode: 'file',
    shouldShare: true
});

// File recording with metadata
api.executeCommand('startRecording', {
    mode: 'file',
    shouldShare: true,
    extraMetadata: {
        meetingTitle: 'Q4 Planning',
        organizerEmail: 'admin@example.com'
    }
});
```

3. **Dropbox Recording** - Save to Dropbox (requires configuration)
```javascript
api.executeCommand('startRecording', {
    mode: 'file',
    dropboxToken: 'YOUR_DROPBOX_OAUTH2_TOKEN',
    shouldShare: false
});
```

4. **RTMP Streaming** - Stream to custom RTMP server
```javascript
api.executeCommand('startRecording', {
    mode: 'stream',
    rtmpStreamKey: 'your-stream-key',
    rtmpBroadcastID: 'broadcast-123'  // Optional
});
```

5. **YouTube Streaming** - Stream to YouTube Live
```javascript
api.executeCommand('startRecording', {
    mode: 'stream',
    youtubeStreamKey: 'your-youtube-stream-key',
    youtubeBroadcastID: 'broadcast-id-456'  // Optional
});
```

6. **Transcription** - Start live transcription
```javascript
api.executeCommand('startRecording', {
    transcription: true
});
```

**See also:** `stopRecording`, `recordingStatusChanged` event
```

### stopRecording

Stops an ongoing recording, stream, or transcription.

**Parameters:**
- `mode` (string) - Required. The recording mode to stop: `'local'`, `'stream'`, or `'file'`
- `transcription` (boolean) - Optional. Set to `true` to stop transcription

```javascript
// Stop file recording
api.executeCommand('stopRecording', 'file');

// Stop streaming
api.executeCommand('stopRecording', 'stream');

// Stop transcription
api.executeCommand('stopRecording', 'file', true);
```

**See also:** `startRecording`, `recordingStatusChanged` event
```

### initiatePrivateChat

Opens the chat window and starts a private conversation with a specific participant.

**Parameters:**
- `participantId` (string) - Required. The ID of the participant to chat with.

**See also:** `sendChatMessage`, `incomingMessage` event, `chatUpdated` event

```javascript
api.executeCommand('initiatePrivateChat',
    participantID: string
);
```

### cancelPrivateChat

Removes the private chat participant thus it resets the chat window to group chat.

```javascript
api.executeCommand('cancelPrivateChat');
```

### kickParticipant

Kicks the participant with the given participant ID from the meeting.

```javascript
api.executeCommand('kickParticipant',
    participantID: string
);
```

### grantModerator

Grants moderator rights to the participant with the given ID.

```javascript
api.executeCommand('grantModerator',
    participantID: string
);
```

### overwriteConfig

Overwrite config.js props with values from the config object passed on to the command.

```javascript
api.executeCommand('overwriteConfig',
    config: Object
);
```
For example:
```javascript
api.executeCommand('overwriteConfig',
    {
      toolbarButtons: ['chat']
    }
);
```
will overwrite the `toolbarButtons` config value with `[chat]`, resulting in UI only showing the `chat` button.

### sendChatMessage

Sends a chat message either to a specific participant or as a group chat message.

**Parameters:**
- `message` (string) - Required. The text message to send.
- `to` (string) - Optional. The receiving participant ID. Use empty string or omit for group chat.
- `ignorePrivacy` (boolean) - Optional. Set to `true` to ignore the privacy notification. Defaults to `false`.

```javascript
api.executeCommand('sendChatMessage', 'Hello!', 'participantId123', false);
```

### setFollowMe

Allows moderators to toggle the follow me functionality

**Parameters:**
- `value` (boolean) - Required. `true` to enable follow me mode, `false` to disable.
- `recorderOnly` (boolean) - Optional. When `true`, only the recorder follows. Defaults to `false`.

```javascript
api.executeCommand('setFollowMe', true, false);
```

### setSubtitles

Enables or disables the subtitles.

**Parameters:**
- `enabled` (boolean) - Required. `true` to enable subtitles, `false` to disable.
- `displaySubtitles` (boolean) - Optional. Whether to display subtitles. Defaults to `true`.
- `language` (string | null) - Optional. Language code (e.g., `'en'`, `'es'`). Defaults to `'en'`.

```javascript
api.executeCommand('setSubtitles', true, true, 'en');
```

### setTileView

Enables or disables the tileview mode.

**Parameters:**
- `enabled` (boolean) - Required. `true` to enable tile view, `false` to disable.

```javascript
api.executeCommand('setTileView', true);
```

### answerKnockingParticipant

Approves or rejects the knocking participant in the lobby.

**Parameters:**
- `id` (string) - Required. The ID of the knocking participant.
- `approved` (boolean) - Required. `true` to admit, `false` to reject.

```javascript
api.executeCommand('answerKnockingParticipant', 'participantId123', true);
```

### toggleCamera

Sets the camera facing mode on mobile devices.

**Parameters:**
- `facingMode` (string) - Optional. Either `'user'` (front camera) or `'environment'` (back camera). If omitted, toggles between cameras.

```javascript
api.executeCommand('toggleCamera', 'environment');
```

### toggleCameraMirror

Toggles the mirroring of the local video.

```javascript
api.executeCommand('toggleCameraMirror');
```

### toggleVirtualBackgroundDialog

Toggles the virtual background selection dialog.

```javascript
api.executeCommand('toggleVirtualBackgroundDialog');
```

### pinParticipant

Pins a conference participant.

**Parameters:**
- `id` (string | null) - Optional. The participant ID to pin. Pass `null` or omit to unpin all participants.

```javascript
api.executeCommand('pinParticipant', 'participantId123');
```

### setParticipantVolume

Change volume of the participant with the given participant ID.

**Parameters:**
- `participantID` (string) - Required. The ID of the participant.
- `volume` (number) - Required. Volume level between `0` (muted) and `1` (maximum).

```javascript
api.executeCommand('setParticipantVolume', 'participantId123', 0.5);
```

### toggleParticipantsPane

Changes the visibility status of the participants pane.

**Parameters:**
- `enabled` (boolean) - Required. `true` to show the participants pane, `false` to hide.

```javascript
api.executeCommand('toggleParticipantsPane', true);
```

### toggleModeration

**🔒 Moderator only**

Changes the moderation status for a specific media type.

**Parameters:**
- `enable` (boolean) - Required. `true` to enable moderation, `false` to disable.
- `mediaType` (string) - Required. Either `'audio'` (default) or `'video'`.

```javascript
api.executeCommand('toggleModeration', true, 'audio');
```

### askToUnmute

Asks a participant to unmute. If audio moderation is enabled, also approves the participant for audio.

**Parameters:**
- `participantId` (string) - Required. The ID of the participant to ask to unmute.

```javascript
api.executeCommand('askToUnmute', 'participantId123');
```

### approveVideo

Approves a participant to share video when video moderation is enabled.

**Parameters:**
- `participantId` (string) - Required. The ID of the participant to approve for video.

```javascript
api.executeCommand('approveVideo', 'participantId123');
```

### rejectParticipant

Rejects a participant's request to unmute for the specified media type.

**Parameters:**
- `participantId` (string) - Required. The ID of the participant to reject.
- `mediaType` (string) - Required. Either `'audio'` (default) or `'video'`.

```javascript
api.executeCommand('rejectParticipant', 'participantId123', 'audio');
```

### addBreakoutRoom

**🔒 Moderator only**

Creates a new breakout room.

**Parameters:**
- `name` (string) - Optional. The name or subject of the breakout room.

```javascript
api.executeCommand('addBreakoutRoom', 'Breakout Room 1');
```

### autoAssignToBreakoutRooms

**🔒 Moderator only**

Automatically assigns all participants to breakout rooms.

No arguments are required.

```javascript
api.executeCommand('autoAssignToBreakoutRooms');
```

### closeBreakoutRoom

**🔒 Moderator only**

Closes a breakout room and sends all participants back to the main room.

**Parameters:**
- `roomId` (string) - Required. The ID of the breakout room to close.

```javascript
api.executeCommand('closeBreakoutRoom', 'room-id-12345');
```

### joinBreakoutRoom

Joins a specific breakout room or returns to the main room.

**Parameters:**
- `roomId` (string) - Optional. The ID of the breakout room to join. Omit to return to the main room.

```javascript
api.executeCommand('joinBreakoutRoom', 'room-id-12345');
```

### removeBreakoutRoom

**🔒 Moderator only**

Permanently removes a breakout room.

**Parameters:**
- `breakoutRoomJid` (string) - Required. The JID (Jabber ID) of the breakout room to remove.

```javascript
api.executeCommand('removeBreakoutRoom', 'room-jid@breakout.meet.jitsi');
```

### resizeFilmStrip

Resizes the filmstrip to a specific width.

**Parameters:**
- `options` (object) - Required. Configuration object:
  - `width` (number) - Required. The desired filmstrip width in pixels.

```javascript
api.executeCommand('resizeFilmStrip', { width: 200 });
```

### resizeLargeVideo

Resizes the large video container to specific dimensions.

**Parameters:**
- `width` (number) - Required. The desired width in pixels.
- `height` (number) - Required. The desired height in pixels.

```javascript
api.executeCommand('resizeLargeVideo', 1280, 720);
```

### sendParticipantToRoom

**🔒 Moderator only**

Moves a participant to a specific breakout room.

**Parameters:**
- `participantId` (string) - Required. The ID of the participant to move.
- `roomId` (string) - Required. The ID of the destination room.

```javascript
api.executeCommand('sendParticipantToRoom', 'participantId123', 'room-id-12345');
```

### overwriteNames

Overwrites participant display names locally (only visible to the participant executing this command).

**Parameters:**
- `participants` (array) - Required. Array of objects with:
  - `id` (string) - Required. The participant ID.
  - `name` (string) - Required. The new display name.

```javascript
api.executeCommand('overwriteNames', [
    { id: 'participantId123', name: 'Custom Name 1' },
    { id: 'participantId456', name: 'Custom Name 2' }
]);
```

### showNotification

Displays a custom notification to the local user only.

**Parameters:**
- `options` (object) - Required. Configuration object:
  - `title` (string) - Required. The notification title.
  - `description` (string) - Required. The notification content/message.
  - `uid` (string) - Optional. Unique identifier. Use to replace existing notifications with the same `uid` or to hide it later with `hideNotification`.
  - `type` (string) - Optional. Notification style: `'normal'`, `'success'`, `'warning'`, or `'error'`. Defaults to `'normal'`.
  - `timeout` (string) - Optional. Display duration: `'short'`, `'medium'`, `'long'`, or `'sticky'`. Defaults to `'short'`.
  - `customActions` (array) - Optional. Array of custom action buttons with `label` (string) and `uuid` (string). Triggers [customNotificationActionTriggered](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe-events#customnotificationactiontriggered) event when clicked.

```javascript
api.executeCommand('showNotification', {
  title: 'Meeting Reminder',
  description: 'The meeting will end in 5 minutes',
  uid: 'reminder-1',
  type: 'warning',
  timeout: 'medium',
  customActions: [
    { label: 'Extend', uuid: 'extend-meeting' },
    { label: 'Dismiss', uuid: 'dismiss-reminder' }
  ]
});
```

### hideNotification

Hides a notification with a specific unique identifier.

**Parameters:**
- `uid` (string) - Required. The unique identifier of the notification to hide (must match the `uid` used in `showNotification`).

```javascript
api.executeCommand('hideNotification', 'reminder-1');
```

### toggleWhiteboard

Toggles the whiteboard to open or close. Repeated toggling will hide the whiteboard.

No arguments are required.

```javascript
api.executeCommand('toggleWhiteboard');
```

### setAssumedBandwidthBps

Sets the assumed bandwidth in bits per second.

**Parameters:**
- `assumedBandwidthBps` (number) - Required. The bandwidth value in bps (bits per second).

```javascript
api.executeCommand('setAssumedBandwidthBps', 500000); // Set to 500 kbps
```

### setBlurredBackground

Sets or removes the blurred virtual background for the local video.

**Parameters:**
- `blurType` (string) - Required. The blur intensity to apply. Accepted values:
  - `'slight-blur'` - Light blur effect
  - `'blur'` - Strong blur effect
  - `'none'` - Remove blur effect

```javascript
api.executeCommand('setBlurredBackground', 'blur');
```

### setAudioOnly

Enables or disables audio-only mode (disables video transmission).

**Parameters:**
- `enable` (boolean) - Required. `true` to enable audio-only mode, `false` to disable.

```javascript
api.executeCommand('setAudioOnly', true);
```

### setVirtualBackground

Sets a custom virtual background using a base64-encoded image.

**Parameters:**
- `enabled` (boolean) - Required. `true` to enable, `false` to disable virtual background.
- `backgroundImage` (string) - Required when enabling. Base64-encoded image string (e.g., `"data:image/png;base64,iVBOR..."`).

```javascript
api.executeCommand('setVirtualBackground', true, 'data:image/png;base64,iVBORw0KGgo...');
```

---

## Troubleshooting

### Common Issues

#### Commands not executing

**Problem:** Commands don't seem to work or have no effect.

**Solutions:**
- Ensure the API is ready before executing commands. Use `api.on('videoConferenceJoined', ...)` to wait for the conference to be fully loaded.
- Check that you're using the correct command name (case-sensitive).
- Verify command is supported by checking `api.getSupportedCommands()`.

```javascript
api.on('videoConferenceJoined', () => {
    // Now safe to execute commands
    api.executeCommand('toggleAudio');
});
```

#### Moderator-only commands failing

**Problem:** Commands like `muteEveryone` or `endConference` don't work.

**Solution:** These commands require moderator role. Check participant role:

```javascript
api.on('participantRoleChanged', (event) => {
    if (event.role === 'moderator') {
        // Now you can use moderator commands
        api.executeCommand('toggleLobby', true);
    }
});
```

#### Recording fails to start

**Problem:** `startRecording` doesn't work.

**Common causes:**
- Jibri not configured (for file/stream recording)
- Incorrect RTMP/YouTube keys
- Dropbox token expired or invalid
- Missing required parameters for the recording mode

**Solution:** Verify your recording configuration and check browser console for errors.

#### Virtual background not applying

**Problem:** `setVirtualBackground` or `setBlurredBackground` doesn't work.

**Common causes:**
- Browser doesn't support virtual backgrounds
- Image size too large (base64 string should be reasonable size)
- Invalid base64 format

**Solution:**
```javascript
// Test with blur first
api.executeCommand('setBlurredBackground', 'blur');

// If that works, try with image
api.executeCommand('setVirtualBackground', true, 'data:image/png;base64,...');
```

### Best Practices

1. **Wait for conference to load** before executing commands:
```javascript
api.addEventListener('videoConferenceJoined', () => {
    // Execute commands here
});
```

2. **Handle errors gracefully**:
```javascript
api.addEventListener('errorOccurred', (error) => {
    console.error('Jitsi error:', error);
});
```

3. **Check participant role** before moderator commands:
```javascript
api.addEventListener('participantRoleChanged', (event) => {
    if (event.role === 'moderator') {
        // Can use moderator commands now
    }
});
```

4. **Use executeCommands for multiple commands**:
```javascript
api.executeCommands({
    displayName: ['John Doe'],
    email: ['john@example.com'],
    avatarUrl: ['https://example.com/avatar.jpg']
});
```

5. **Validate input before sending**:
```javascript
const participantId = 'abc123';
if (participantId && participantId.trim() !== '') {
    api.executeCommand('setLargeVideoParticipant', participantId);
}
```

### Getting Help

- Check browser console for error messages
- Use `api.getSupportedCommands()` to verify command availability
- Listen to `errorOccurred` event for runtime errors
- Review [Jitsi Community Forum](https://community.jitsi.org) for similar issues
