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

Sets the subject of the conference.

This command requires the new subject to be set as the argument and it will be applied only if the participant has the moderator role or after they receive that role later on.

```javascript
api.executeCommand('subject', 'New Conference Subject');
```

### localSubject

Sets the local subject of the conference.

This command requires the new local subject to be set as the argument and it can be applied by all participants regardless of their role.

```javascript
api.executeCommand('localSubject', 'New Conference Local Subject');
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

### endConference

Ends the current conference for everyone.

This command can only be executed by a meeting moderator, and requires End Conference support to be enabled
for the deployment.

```javascript
api.executeCommand('endConference');
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

### sendCameraFacingMode

Sends a request to a given participant to set camera facing mode as `user` or `environment`.

The receiving participant is shown a confirmation dialog. If the `facingMode` param is not sent, the camera will toggle between the two options on subsequent calls.

```javascript
api.executeCommand('sendCameraFacingMode', 'receiverParticipantId', 'facingMode');
```

### sendEndpointTextMessage

Sends a text message to another participant through the data channels.

```javascript
api.executeCommand('sendEndpointTextMessage', 'receiverParticipantId', 'text');
```

### setLargeVideoParticipant

Displays the participant on the large video display.

The participant ID, if specified, is displayed on the large video. If no argument is passed, the participant to be displayed on the large  video is automatically selected based on the dominant/pinned speaker settings.

The second parameter is optional and can be used to specify a `videoType`. When multistream support is enabled by passing this parameter you can specify whether the desktop or the camera video for the specified participant should be selected. The accepted values are `'camera'` and `'desktop'`. The default is `'camera'`. Any invalid values will be ignored and default will be used.

```javascript
api.executeCommand('setLargeVideoParticipant', 'abcd1234', 'desktop');
```

### setVideoQuality

Sets the send and receive video resolution.

The resolution height setting is implemented using a single argument.

```javascript
api.executeCommand('setVideoQuality', 720);
```

### muteEveryone

Mute all meeting participants.

This command can only be executed by the meeting moderator and can take one argument: `mediaType` - for which media type to mute everyone.

`mediaType` can be either 'audio' (default) or 'video'.

```javascript
api.executeCommand('muteEveryone', 'video');
```

### startRecording

Starts a local recording, file recording, streaming session or transcription using passed parameters:

  - **RTMP streaming** - Recording mode set to **`stream`** with an **`rtmpStreamKey`**. The **`rtmpBroadcastID`** value is optional.

  - **YouTube streams** - Recording mode set to **`stream`** with an **`youtubeStreamKey`**. The **`youtubeBroadcastID`** value is optional.

  - **Local Recording** - Recording mode set to **`local`**. The **`onlySelf`** value is optional.

  - **Dropbox recording** - Recording mode set to **`file`** with a Dropbox OAuth2 token.

  Additionally, Dropbox saving should be enabled on the Jitsi meet deploy config you are using.

  - **File recording** - Recording mode set to **`file`**. The **`extraMetadata`** value is optional.

  Optionally, **`shouldShare`** should be passed on. No other params are required.

  - **Transcription** - Set the `transcription` option to `true`.

```javascript
api.executeCommand('startRecording', {
    mode: string, //recording mode, either `local`, `file` or `stream`.
    dropboxToken: string, //dropbox oauth2 token.
    onlySelf: boolean,  //Whether to only record the local streams. Only applies to `local` recording mode.
    shouldShare: boolean, //whether the recording should be shared with the participants or not. Only applies to certain jitsi meet deploys.
    rtmpStreamKey: string, //the RTMP stream key.
    rtmpBroadcastID: string, //the RTMP broadcast ID.
    youtubeStreamKey: string, //the youtube stream key.
    youtubeBroadcastID: string, //the youtube broacast ID.
    extraMetada: Object, // any extra metada for file recording.
    transcription: boolean, // Whether a transcription should be started. 
});
```

### stopRecording

Stops an ongoing  **`local`**, **`stream`**, **`file`** recording or transcription.

The mode in which the recording was started must be specified.

```javascript
api.executeCommand('stopRecording',
    mode: string, //recording mode to stop, `local`, `stream` or `file`
    transcription: boolean // whether the transcription should be stopped
);
```

### initiatePrivateChat

Opens the chat window and sets the participant with the given participant ID as the messages recipient.

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

```javascript
api.executeCommand('sendChatMessage',
    message: string, //the text message
    to: string, // the receiving participant ID or empty string/undefined for group chat.
    ignorePrivacy: boolean // true if the privacy notification should be ignored. Defaulted to false.
);
```

### setFollowMe

Allows moderators to toggle the follow me functionality

```javascript
api.executeCommand('setFollowMe',
    value: boolean, // set to true if participants should be following you, false otherwise
);
```

### setSubtitles

Enables or disables the subtitles.

```javascript
api.executeCommand('setSubtitles',
    enabled: boolean,
    displaySubtitles: boolean = true,
    language: string | null = 'en'
);
```

### setTileView

Enables or disables the tileview mode.

```javascript
api.executeCommand('setTileView',
    enabled: boolean
);
```

### answerKnockingParticipant

Approves or rejects the knocking participant in the lobby.

```javascript
api.executeCommand('answerKnockingParticipant',
    id: string, // the participant id
    approved: boolean
);
```

### toggleCamera

Sets the camera facing mode as `user` or `environment` on mobile web. If the `facingMode` param is not sent, a toggle between back and front camera happens on subsequent calls.

```javascript
api.executeCommand('toggleCamera', 'facingMode');
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

```javascript
api.executeCommand('pinParticipant',
    id?: string // The ID of the conference participant to pin or null to unpin all
);
```

### setParticipantVolume

Change volume of the participant with the given participant ID.

```javascript
api.executeCommand('setParticipantVolume',
    participantID: string,
    volume: number // number between 0 and 1
);
```

### toggleParticipantsPane

Changes the visibility status of the participants pane.

```javascript
api.executeCommand('toggleParticipantsPane',
    enabled: boolean // The visibility status of the participants pane.
);
```

### toggleModeration

Changes moderation status of the given media type.

This command requires two arguments: `enable` - whether to enable it or not, and `mediaType` - the media type for which to change moderation.

```javascript
api.executeCommand('toggleModeration',
    enable: Boolean,
    mediaType: String // can be 'audio' (default) or 'video'
);
```

### askToUnmute

Asks the participant with the given ID to unmute.
If audio moderation is on it also approves the participant for audio.

```javascript
api.executeCommand('askToUnmute',
    participantId: String
);
```

### approveVideo

If video moderation is on it approves the participant with the given ID for video.

```javascript
api.executeCommand('approveVideo',
    participantId: String
);
```

### rejectParticipant

Rejects the participant with the given ID from moderation of the given media type.

```javascript
api.executeCommand('rejectParticipant',
    participantId: String,
    mediaType: String // can be 'audio' (default) or 'video'
);
```

### addBreakoutRoom

Creates a breakout room.

This command can only be executed by the meeting moderator.

```javascript
api.executeCommand('addBreakoutRoom',
    name: String // Optional. The name or subject of the new room.
);
```

### autoAssignToBreakoutRooms

Auto-assigns the participants to breakout rooms.

This command can only be executed by the meeting moderator.

```javascript
api.executeCommand('autoAssignToBreakoutRooms');
```

### closeBreakoutRoom

Closes the breakout room and sends participants to the main room.

This command can only be executed by the meeting moderator.

```javascript
api.executeCommand('closeBreakoutRoom',
    roomId: String // The id of the room to close.
);
```

### joinBreakoutRoom

Joins a breakout room. If the argument is omitted, joins the main room.

```javascript
api.executeCommand('joinBreakoutRoom',
    roomId: String // Optional. The id of the room to join.
);
```

### removeBreakoutRoom

Removes the breakout room.

This command can only be executed by the meeting moderator.

```javascript
api.executeCommand('removeBreakoutRoom',
    breakoutRoomJid: String // The jid of the breakout room to remove.
);
```

### resizeFilmStrip

Resizes the filmstrip.

```javascript
api.executeCommand('resizeFilmStrip', {
    width: number // The desired filmstrip width
});
```

### resizeLargeVideo

Resizes the large video container based on the dimensions provided.

```javascript
api.executeCommand('resizeLargeVideo',
    width: number, // The desired width
    height: number // The desired height
);
```

### sendParticipantToRoom

Sends a participant to a room.

This command can only be executed by the meeting moderator.

```javascript
api.executeCommand('sendParticipantToRoom',
    participantId: String, // The id of the participant.
    roomId: String // The id of the room.
);
```

### overwriteNames

Overwrites the names of the given participants to the given names. (locally for the participant that send the command)

```javascript
api.executeCommand('overwriteNames', [{
        id: String, // The id of the participant.
        name: String // The new name.
    }]
);
```

### showNotification

Shows a custom notification. This affects only the local user.

If `uid` is provided, the notification will replace existing notification with the same `uid`. The `uid` can also be
passed to the `hideNotification` command to programmatically hide the notification.

```javascript
api.executeCommand('showNotification', {
  title: String, // Title of the notification.
  description: String, // Content of the notification.
  uid: String, // Optional. Unique identifier for the notification.
  type: String, // Optional. Can be 'info', 'normal', 'success', 'warning' or 'error'. Defaults to 'normal'.
  timeout: String // optional. Can be 'short', 'medium', 'long', or 'sticky'. Defaults to 'short'.
});
```

### hideNotification

Hides the notification which has the given `uid`.

```javascript
api.executeCommand('hideNotification',
    uid: String // Unique identifier for the notification to be removed.
);
```

### toggleWhiteboard

Toggles the whiteboard to open, repeated toggling hidden the whiteboard

```javascript
api.executeCommand('toggleWhiteboard');
```

### setAssumedBandwidthBps

Sets the assumed bandwidth bps.

```javascript
api.executeCommand('setAssumedBandwidthBps',
    assumedBandwidthBps: number // Required. The value to set as assumed bandwidth expressed in bps.
);
```
