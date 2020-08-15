---
id: lib-jitsi-meet-reference
title: lib-jitsi-meet API Reference
sidebar_label: Reference
---

## JitsiMeetJS 
This component is the entry-point for all other components exposed by this API. It also provides APIs to connect to the Prosody server and initializing the conference in Jicofo. It provides the following methods, events and errors:

***
### init()
This method is used for initializing the Jitsi Meet API. It accepts a single object to provide initialization options with parameters given below.


| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `useIPv6`  | -  | `boolean` | -
| `disableAudioLevels`  | Enables/disables audio levels. | `boolean` | -
| `disableSimulcast`  | Enables/disables simulcast. | `boolean` | -
| `enableWindowOnErrorHandler`  | Enables/disables attaching global onerror handler (window.onerror). | `boolean` | `false`
| `disableThirdPartyRequests`  | If true, callstats will be disabled and the callstats API won't be included. | `boolean` | -
| `enableAnalyticsLogging`  | Enables/disables analytics logging. | `boolean` | `false`
| `callStatsCustomScriptUrl`  | Custom url to access callstats client script | `string` | -
| `disableRtx`  | Enables/disable the use of RTX. | `boolean` | `false`
| `disableH264`  | If enabled, strips the H.264 codec from the local SDP. | `boolean` | `false`
| `preferH264`  | Enables/disable preferring the first instance of an h264 codec in an offer by moving it to the front of the codec list. | `boolean` | `false`

***
### JitsiConnection()
The `JitsiConnection` constructor. You can use this to create a new server connection.
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `appID`  | Identification for the provider of Jitsi Meet video conferencing services. (Optional) | `string` | -
| `token`  | The JWT token used to authenticate with the server (Optional) | `string` | -
| `options`| Object with properties/settings related to connection with the server. (Optional)| `object` | -

***
### createLocalTracks()
Creates the media tracks and returns them trough `Promise` object. If rejected, passes `JitsiTrackError` instance to catch block.
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `options`  | JS object with configuration options for the local media tracks. | `object` | -
| `options.devices`  | Devices - "desktop", "video" and "audio" that will be passed to GUM. | `[string]` | If that property is not set [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) will try to get all available devices.
| `options.resolution`  | Preferred resolution for the local video. | `string` | -
| `options.constraints`  | Preferred encoding properties for the created track (replaces `resolution` in newer releases of browsers) | `object` | -
| `options.cameraDeviceId`  | `deviceID` for the video device that is going to be used | `string` | -
| `options.micDeviceId`  | `deviceID` for the audio device that is going to be used | `string` | -
| `options.minFps`  | Minimum frame rate for the video stream (passed to GUM) | `number` | -
| `options.maxFps`  | Maximum frame rate for the video stream (passed to GUM) | `number` | -
| `options.facingMode`  | Facing mode for a camera (possible values - 'user', 'environment') | `string` | -
| `firePermissionPromptIsShownEvent`  | If true, `JitsiMediaDevicesEvents.PERMISSION_PROMPT_IS_SHOWN` will be fired when browser shows GUM permission prompt. | `boolean` | -

***
### createTrackVADEmitter()
Creates a TrackVADEmitter service that connects an audio track to a VAD (voice activity detection) processor in order to obtain VAD scores for individual PCM audio samples.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `localAudioDeviceId`  | The target local audio device. | `string` | -
| `sampleRate`  | Sample rate at which the emitter will operate. Possible values: 256, 512, 1024, 4096, 8192, 16384. Passing other values will default to closes neighbor, i.e. Providing a value of 4096 means that the emitter will process bundles of 4096 PCM samples at a time, higher values mean longer calls, lowers values mean more calls but shorter. | `number` | -
| `vadProcessor`  | VAD processor that does the actual compute on a PCM sample. | `interface` | -

VAD Processor needs to implement the following methods:
| Method | Description |
| -------- | ----------- |
| `getSampleLength()`  | Returns the sample size accepted by `calculateAudioFrameVAD(..)`. |
| `getRequiredPCMFrequency()`  | Returns the PCM frequency at which the processor operates .i.e. (16KHz, 44.1 KHz etc.) |
| `calculateAudioFrameVAD(pcmSample)`  | Process a float32 PCM sample of `getSampleLength()` size. |

***
### getActiveAudioDevice()
Goes through all audio devices on the system and returns information about one that is active, i.e. has audio signal. Returns a Promise resolving to an object with the following structure
- `deviceId`: string containing the device ID of the audio track found as active.
- `deviceLabel`: string containing the label of the audio device.

***
### getGlobalOnErrorHandler()
Returns function that can be used to be attached to `window.onerror` and if `options.enableWindowOnErrorHandler` is enabled returns the function used by the library.

***
### isDesktopSharingEnabled()
Returns true if desktop sharing is supported and false otherwise. 
> **Note:** This method can only be used after [`init(options)`](#initoptions) is completed otherwise the result will be always null.

***
### mediaDevices.addEventListener()
Attaches an event handler.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `event` | - | `string` | -
| `handler` | - | `function` | -

***
### mediaDevices.enumerateDevices()

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `callback`  | Callback method that accepts [`[MediaDeviceInfo]`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices) | `function` | -

***
### mediaDevices.getAudioOutputDevice()
Returns currently used audio output device id, '' stands for default device.

***
### mediaDevices.isDeviceChangeAvailable()

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `deviceType` | returns true if changing the input (camera / microphone) or output (audio) device is supported and false if not. `deviceType` is a type of device to change. Undefined or 'input' stands for input devices, 'output' - for audio output devices. | `string` | -

***
### mediaDevices.isDeviceListAvailable()
Returns true if retrieving the device list is supported and false otherwise

***
### mediaDevices.isDevicePermissionGranted()
Returns a Promise which resolves to true if user granted permission to media devices.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `type` | 'audio', 'video' or `undefined`. In case of `undefined` will check if both audio and video permissions were granted. | `string` | -

***
### mediaDevices.removeEventListener()
Removes an event handler.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `event` | - | `string` | -
| `handler` | - | `function` | -

***
### mediaDevices.setAudioOutputDevice()
Sets current audio output device.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `deviceType` | ID of 'audiooutput' device from [`mediaDevices.enumerateDevices(..)`](#mediadevicesenumeratedevicescallback-void), '' is for default device. | `string` | -

***
### setLogLevel()
Changes the log level for the library. Jitsi Meet API currently uses the [`jitsi-meet-logger`](https://github.com/jitsi/jitsi-meet-logger) for internal logging. This is the list of supported log levels (ordered): **`TRACE`**, **`DEBUG`**, **`INFO`**, **`LOG`**, **`WARN`**, **`ERROR`**

For example to have only error messages you should do:
```javascript
JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
```

***
### **events**
`events` is JS object that contains all events used by the API. You will need it when you try to subscribe for connection or conference events. We have two event types - `connection` and `conference`. You can access the events with the following code `JitsiMeetJS.events.<event_type>.<event_name>`. For example, if you want to use the `conference` event that is fired when somebody leaves the conference you can use the following code: `JitsiMeetJS.events.conference.USER_LEFT`. We support the following events:

| Event name | Event type | Description | Parameters |
| -------- | ----------- | ---- | ------- |
| `TRACK_ADDED` | `conference` | Stream received | `JitsiTrack`
| `TRACK_REMOVED` | `conference` | stream removed. | `JitsiTrack`
| `TRACK_MUTE_CHANGED` | `conference` | JitsiTrack was muted or unmuted | `JitsiTrack`
| `TRACK_AUDIO_LEVEL_CHANGED` | `conference` | audio level of JitsiTrack has changed | `participantId`: `string`, `audioLevel`: `number`
| `DOMINANT_SPEAKER_CHANGED` | `conference` | the dominant speaker is changed | `id`: `string`
| `USER_JOINED` | `conference` | new user joined a conference | `id`: `string`, `user`: `JitsiParticipant`
| `USER_LEFT` | `conference` | a participant left conference | `id`: `string`, `user`: `JitsiParticipant`
| `MESSAGE_RECEIVED` | `conference` | new text message received | `id`: `string`, `text`: `string`, `ts`: `number`
| `DISPLAY_NAME_CHANGED` | `conference` | user has changed his display name | `id`: `string`, `displayName`: `string`
| `SUBJECT_CHANGED` | `conference` | notifies that subject of the conference has changed | `subject`: `string`
| `LAST_N_ENDPOINTS_CHANGED` | `conference` | last n set was changed | `leavingEndpointIds`: `[string]`, `enteringEndpointIds`: `[string]`
| `CONFERENCE_JOINED` | `conference` | notifies the local user that he joined the conference successfully | -
| `CONFERENCE_LEFT` | `conference` | notifies the local user that he left the conference successfully | -
| `DTMF_SUPPORT_CHANGED` | `conference` | notifies if at least one user supports DTMF | `supports`: `boolean`
| `USER_ROLE_CHANGED` | `conference` | notifies that role of some user changed | `id`: `string`, `role`: `string`
| `USER_STATUS_CHANGED` | `conference` | notifies that status of some user changed | `id`: `string`, `status`:  `string`
| `CONFERENCE_FAILED` | `conference` | notifies that user failed to join the conference | `errorCode`: `JitsiMeetJS.errors.conference`
| `CONFERENCE_ERROR` | `conference` | notifies that error occurred | `errorCode`: `JitsiMeetJS.errors.conference`
| `KICKED` | `conference` | notifies that user has been kicked from the conference | -
| `START_MUTED_POLICY_CHANGED` | `conference` | notifies that all new participants will join with muted audio/video stream | `audio`: `boolean`, `video`: `boolean`
| `STARTED_MUTED` | `conference` | notifies that the local user has started muted | -
| `CONNECTION_STATS` | `conference` | __DEPRECATED__. Use ```JitsiMeetJS.connectionQuality.LOCAL_STATS_UPDATED``` instead. | -
| `BEFORE_STATISTICS_DISPOSED` | `conference` | fired just before the statistics module is disposed and it's the last chance to submit some logs to the statistics service, before it gets disconnected | -
| `AUTH_STATUS_CHANGED` | `conference` | notifies that authentication is enabled or disabled, or local user authenticated (logged in)| `isAuthEnabled`: `boolean`, `authIdentity`: `string`
| `ENDPOINT_MESSAGE_RECEIVED` | `conference` | notifies that a new message from another participant is received on a data channel. | -
| `TALK_WHILE_MUTED` | `conference` | notifies that a local user is talking while having the microphone muted. | -
| `NO_AUDIO_INPUT` | `conference` | notifies that the current selected input device has no signal. | -
| `AUDIO_INPUT_STATE_CHANGE` | `conference` | notifies that the current conference audio input switched between audio input states i.e. with or without audio input. | -
| `NOISY_MIC` | `conference` | notifies that the current microphone used by the conference is noisy. | -
| `CONNECTION_FAILED` | `connection` | indicates that the server connection failed. | -
| `CONNECTION_ESTABLISHED` | `connection` | indicates that we have successfully established server connection | -
| `CONNECTION_DISCONNECTED` | `connection` | indicates that we are disconnected | -
| `WRONG_STATE` | `connection` | indicates that the user has performed action that can't be executed because the connection is in wrong state | -
| `VAD_SCORE_PUBLISHED` | `detection` | event generated by a TackVADEmitter when it computed a VAD score for an audio PCM sample. | -
| `LOCAL_TRACK_STOPPED` | `track` |indicates that a local track was stopped. This event can be fired when `dispose()` method is called or for other reasons.  | -
| `TRACK_AUDIO_OUTPUT_CHANGED` | `track` | indicates that audio output device for track was changed | `deviceId`: `string`
| `DEVICE_LIST_CHANGED` | `mediaDevices` | indicates that list of currently connected devices has changed | `devices`: `[MediaDeviceInfo]`
| `PERMISSION_PROMPT_IS_SHOWN` | `mediaDevices` | Indicates that the environment is currently showing permission prompt to access camera and/or microphone | `environmentType`: `string` ('chrome', 'opera', 'firefox', 'safari', 'nwjs','react-native','android')
| `LOCAL_STATS_UPDATED` | `connectionQuality` | New local connection statistics are received. | `stats`: `object`
| `REMOTE_STATS_UPDATED` | `connectionQuality` | New remote connection statistics are received. | `id`: `string`, `stats`: `object`

***
### **errors**
JS object that contains all errors used by the API. You can use that object to check the reported errors from the API. We have three error types - connection, conference and track. You can access the events with the following code ```JitsiMeetJS.errors.<error_type>.<error_name>```. For example if you want to use the conference event that is fired when somebody leave conference you can use the following code - ```JitsiMeetJS.errors.conference.PASSWORD_REQUIRED```. We support the following errors:

| Error name | Error type | Description |
| ---------- | ---------- | ----------- | 
| `CONNECTION_ERROR` | `conference` | the connection with the conference is lost. |
| `SETUP_FAILED` | `conference` | conference setup failed |
| `AUTHENTICATION_REQUIRED` | `conference` | user must be authenticated to create this conference |
| `PASSWORD_REQUIRED` | `conference` | that error can be passed when the connection to the conference failed. You should try to join the conference with password. |
| `PASSWORD_NOT_SUPPORTED` | `conference` | indicates that conference cannot be locked |
| `VIDEOBRIDGE_NOT_AVAILABLE` | `conference` | video bridge issues. |
| `RESERVATION_ERROR` | `conference` | error in reservation system |
| `GRACEFUL_SHUTDOWN` | `conference` | graceful shutdown |
| `JINGLE_FATAL_ERROR` | `conference` | error in jingle (the orriginal error is attached as parameter.) |
| `CONFERENCE_DESTROYED` | `conference` | conference has been destroyed |
| `CHAT_ERROR` | `conference` | chat error happened |
| `FOCUS_DISCONNECTED` | `conference` | focus error happened |
| `FOCUS_DISCONNECTED` | `conference` | focus left the conference |
| `CONFERENCE_MAX_USERS` | `conference` | The maximum users limit has been reached |
| `CONNECTION_DROPPED_ERROR` | `connection` | indicates that the connection was dropped with an error which was most likely caused by some networking issues. |
| `PASSWORD_REQUIRED` | `connection` | passed when the connection to the server failed. You should try to authenticate with password. |
| `SERVER_ERROR` | `connection` | indicates too many 5XX errors were received from the server. |
| `OTHER_ERROR` | `connection` | all other errors |
| `GENERAL` | `track` | generic getUserMedia-related error. |
| `UNSUPPORTED_RESOLUTION` | `track` | getUserMedia-related error, indicates that requested video resolution is not supported by camera. |
| `PERMISSION_DENIED` | `track` | getUserMedia-related error, indicates that user denied permission to share requested device. |
| `NOT_FOUND` | `track` | getUserMedia-related error, indicates that requested device was not found. |
| `CONSTRAINT_FAILED` | `track` | getUserMedia-related error, indicates that some of requested constraints in getUserMedia call were not satisfied. |
| `TRACK_IS_DISPOSED` | `track` | an error which indicates that track has been already disposed and cannot be longer used. |
| `TRACK_NO_STREAM_FOUND` | `track` | an error which indicates that track has no MediaStream associated. |
| `SCREENSHARING_GENERIC_ERROR` | `track` | generic error for screensharing. |
| `SCREENSHARING_USER_CANCELED` | `track` | an error which indicates that user canceled screen sharing window selection dialog. |

***
### **errorTypes**
constructors for Error instances that can be produced by library. Are useful for checks like ```error instanceof JitsiMeetJS.errorTypes.JitsiTrackError```. Following Errors are available:

| Error type | Description |
| ---------- | ----------- |
| `JitsiTrackError` | Error that happened to a JitsiTrack. |

***
## JitsiConnection
This objects represents the server connection. You can create new `JitsiConnection` object with the constructor `JitsiMeetJS.JitsiConnection(..)`. `JitsiConnection` has the following methods:

***
### JitsiConnection()
Constructor. Creates the conference object.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `appID`  | identification for the provider of Jitsi Meet video conferencing services. **NOTE: not implemented yet. You can safely pass ```null```** | `string` | -
| `token`  | secret generated by the provider of Jitsi Meet video conferencing services. The token will be send to the provider from the Jitsi Meet server deployment for authorization of the current client. | `string` | -
| `options`  | Object with configuration options for the server connection. | `object` | -
| `options.serviceUrl`  | XMPP service URL. For  example `wss://server.com/xmpp-websocket` for Websocket or `//server.com/http-bind` for BOSH. | `string` | -
| `options.bosh`  | **DEPRECATED**. Use serviceUrl to specify either BOSH or Websocket URL. | `string` | -
| `options.hosts`  | - | `object` | -
| `options.hosts.domain`  | - | `string` | -
| `options.hosts.muc`  | - | `string` | -
| `options.hosts.anonymousdomain`  | - | `string` | -
| `options.useStunTurn`  | - | `boolean` | -
| `options.enableLipSync`  | Boolean property which enables the lipsync feature. Currently works only in Chrome and is disabled by default. (optional) | `boolean` | -

***
### addEventListener()
Subscribes the passed listener to the event.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `event`  | one of the events from `JitsiMeetJS.events.connection` object | `JitsiMeetJS.events.connection` | -
| `listener`  | listener for the event that will be added. | `function` | -

***
### addFeature()
Adds new feature to the list of supported features for the local participant.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `feature`  | the name of the feature. | `string` | -
| `submit`  | if true - the new list of features will be immediately submitted to the others. | `boolean` | `false`


***
### connect()
Establish server connection

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `options`  | Object with `id` and `password` properties. | `object` | -
| `options.id`  | - | `string` | -
| `options.password`  | - | `string` | -

***
### disconnect()
Destroys the server connection

***
### initJitsiConference()
Creates a new `JitsiConference` object.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `name`  | the name of the conference | `string` | -
| `options`  | JS object with configuration options for the conference. You can change the following properties there: | `object` | -
| `options.openBridgeChannel`  | Enables/disables bridge channel. Values can be "datachannel", "websocket", true (treat it as "datachannel"), undefined (treat it as "datachannel") and false (don't open any channel). **NOTE: we recommend to set that option to true** | `string` | `datachannel`
| `options.recordingType`  | the type of recording to be used | `string` | -
| `options.callStatsID`  | callstats credentials | `string` | -
| `options.callStatsSecret`  | callstats credentials | `string` | -
| `options.enableTalkWhileMuted`  | Enables/disables talk while muted detection, by default the value is false/disabled. | `boolean` | `false`
| `options.ignoreStartMuted`  | ignores start muted events coming from jicofo. | `string` | -
| `options.startSilent`  | enables silent mode, will mark audio as inactive will not send/receive audio | `string` | -
| `options.confID`  | Used for statistics to identify conference, if tenants are supported will contain tenant and the non lower case variant for the room name. | `string` | -
| `options.siteID`  | Used for statistics to identify the site where the user is coming from, if tenants are supported it will contain a unique identifier for that tenant. (Optional) | `string` | `confID`
| `options.statisticsId`  | The id to be used as stats instead of default callStatsUsername. | `string` | -
| `options.statisticsDisplayName`  | The display name to be used for stats, used for callstats. | `string` | -

> Please note: if `options.callStatsID` and `options.callStatsSecret` are set the library is going to send events to callstats. Otherwise the callstats integration will be disabled.

***
### removeEventListener()
Removes event listener.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `event`  | one of the events from `JitsiMeetJS.events.connection` object | `JitsiMeetJS.events.connection` | -
| `listener`  | listener for the event that will be removed. | `function` | -


***
### removeFeature()
Removes a feature from the list of supported features for the local participant

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `feature`  | the name of the feature. | `string` | -
| `submit`  | if true - the new list of features will be immediately submitted to the others. | `boolean` | `false`

## JitsiConference
The object represents a conference. We have the following methods to control the conference:

***
### addCommandListener()
Adds listener for command

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `command`  | the name of the command | `string` | -
| `handler`  | the listener that will be called when a command is received from another participant. Accepts `values` | `function` | -

***
### addEventListener()
Subscribes the passed listener to the event. Alias: `on(event, listener)`

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `event`  | one of the events from `JitsiMeetJS.events.connection` object | `JitsiMeetJS.events.conference` | -
| `listener`  | listener for the event that will be added. | `function` | -

***
### addTrack()
Adds JitsiLocalTrack object to the conference. Throws an error if adding second video stream. Returns Promise.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `track`  | the JitsiLocalTrack | `JitsiLocalTrack` | -

***
### broadcastEndpointMessage()
Sends broadcast message via the datachannels. Throws `NetworkError` or `InvalidStateError` or `Error` if the operation fails.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `payload`  | the payload of the message. | `object` | -

***
### getLocalTracks()
Returns array with JitsiTrack objects for the local streams.

***
### getRole()
Returns string with the local user role ("moderator" or "none")

***
### getStartMutedPolicy()
Returns the current policy with JS object

***
### isDTMFSupported()
Check if at least one user supports DTMF.

***
### isHidden()
Checks if local user has joined as a "hidden" user. This is a specialized role used for integrations.

***
### isModerator()
Checks if local user has "moderator" role

***
### isStartAudioMuted()
Check if audio is muted on join

***
### isStartVideoMuted()
Check if video is muted on join

***
### join()
Joins the conference

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `password`  | Password for the conference (Optional)| `string` | -

***
### kick()
Kick participant from the conference

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `id`  | Participant id | `string` | -

***
### leave()
Leaves the conference.

***
### lock()
Set password for the conference; returns Promise

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `password`  | Password for the conference | `string` | -

> Please note: available only for moderator.

***
### myUserId()
Get local user ID

***
### pinParticipant()
Elects the participant with the given id to be the pinned participant in order to always receive video for this participant (even when last n is enabled). Throws `NetworkError` or `InvalidStateError` or `Error` if the operation fails.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `participantId`  | the identifier of the participant | `string` | -

***
### removeCommand()
Removes a command for the list of the commands that are sent to the ther participants

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `name`  | the name of the command | `string` | -

***
### removeCommandListener()
Adds listener for command

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `command`  | the name of the command | `string` | -

***
### removeEventListener()
Removes event listener. Alias: `off(event, listener)`

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `event`  | one of the events from `JitsiMeetJS.events.connection` object | `JitsiMeetJS.events.conference` | -
| `listener`  | listener for the event that will be removed. | `function` | -

***
### removeTrack()
Removes JitsiLocalTrack object to the conference. Returns Promise.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `track`  | the JitsiLocalTrack | `JitsiLocalTrack` | -

***
### selectParticipant()
Elects the participant with the given id to be the selected participant in order to receive higher video quality (if simulcast is enabled). Throws `NetworkError`, `InvalidStateError` or `Error` if the operation fails.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `participantId`  | the identifier of the participant | `string` | -

***
### sendCommand()
Sends user defined system command to the other participants

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `name`  | the name of the command | `string` | -
| `values`  | - | `object` | -
| `values.value`  | the_value_of_the_command | `string` | -
| `values.attributes`  | map with keys the name of the attribute and values - the values of the attributes. | `object` | -
| `values.children`  | array with JS object with the same structure. | `[object]` | -

> Please note: When you use that method the passed object will be added in every system message that is sent to the other participants. It might be sent more than once.

***
### sendCommandOnce()
Sends only one time a user defined system command to the other participants

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `name`  | the name of the command | `string` | -
| `values`  | - | `object` | -
| `values.value`  | the_value_of_the_command | `string` | -
| `values.attributes`  | map with keys the name of the attribute and values - the values of the attributes. | `object` | -
| `values.children`  | array with JS object with the same structure. | `[object]` | -

***
### sendEndpointMessage()
Sends message via the data channels. Throws `NetworkError` or `InvalidStateError` or `Error` if the operation fails.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `to`  | the id of the endpoint that should receive the message. If "" the message will be sent to all participants. | `string` | -
| `payload`  | the payload of the message. | `object` | -

***
### sendFeedback()
Sends the given feedback through CallStats if enabled

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `overallFeedback`  | an integer between 1 and 5 indicating the user feedback | `number` | -
| `detailedFeedback`  | detailed feedback from the user. Not yet used | `object` | -

***
### sendTextMessage()
Sends the given string to other participants in the conference.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `text`  | Text to send to other participants | `string` | -

***
### setDisplayName()
Changes the display name of the local participant.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `name`  | The new display name | `string` | -

***
### setReceiverVideoConstraint()
Set the desired resolution to get from JVB (180, 360, 720, 1080, etc). You should use this method if you are using simulcast.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `resolution`  | height of desired resolution | `number` | -

***
### setSenderVideoConstraint()
Set the desired resolution to send to JVB or the peer (180, 360, 720).

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `resolution`  | height of desired resolution | `number` | -

***
### setStartMutedPolicy()
Make all new participants join with muted audio/video

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `policy`  | JS object with following properties | `object` | -
| `policy.audio`  | if audio stream should be muted | `boolean` | -
| `policy.video`  | if video stream should be muted | `boolean` | -

> Please note: available only for moderator

***
### setSubject()
Change subject of the conference

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `subject`  | New subject | `string` | -

> Please note: available only for moderator

***
### unlock()
Unset conference password; returns Promise

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `password`  | Password for the conference | `string` | -

> Please note: available only for moderator.

## JitsiTrack
The object represents single track - video or audio. They can be remote tracks (from the other participants in the call) or local tracks (from the devices of the local participant). We have the following methods for controling the tracks:

***
### attach()
Attaches the track to the given HTML container.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `container`  | HTML container to attach to | - | -

***
### detach()
Removes the track from the container.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `container`  | HTML container to attach to | - | -

***
### dispose()
Disposes the track. If the track is added to a conference the track will be removed.

> Please note: This method is implemented only for the local tracks.

***
### getDeviceId()
Returns device ID associated with track (for local tracks only)

***
### getId()
Returns unique string for the track.

***
### getParticipantId()
Returns ID of the track owner

> Please note: This method is implemented only for the remote tracks.

***
### getType()
Returns string with the type of the track( "video" for the video tracks and "audio" for the audio tracks)

***
### isEnded()
Returns true if track has ended

***
### isMuted()
Check if track is muted

***
### mute()
Mutes the track. Returns Promise.

> Please note: This method is implemented only for the local tracks.

***
### setAudioOutput()
Sets new audio output device for track's DOM elements. Video tracks are ignored.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `audioOutputDeviceId`  | Audio output device id | `string` | -

***
### setEffect()
Applies the effect by swapping out the existing MediaStream on the JitsiTrack with the new MediaStream which has the desired effect. "undefined" is passed to this function for removing the effect and for restoring the original MediaStream on the JitsiTrack. 

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `effect`  | Audio output device id | `interface` | -

The following methods have to be defined for the `effect` instance:

| Method | Description |
| -------- | ----------- |
| `startEffect`  | Starts the effect and returns a new MediaStream that is to be swapped with the existing one. Accepts `MediaStream` |
| `stopEffect`  | Stops the effect. |
| `isEnabled`  | Checks if the local track supports the effect. |

> Please note: This method is implemented only for the local tracks.

***
### unmute()
Unmutes the track. Returns Promise.

> Please note: This method is implemented only for the local tracks.

## JitsiTrackError
The object represents error that happened to a JitsiTrack. Is inherited from JavaScript base `Error` object, so `name`, `message` and `stack` properties are available. For GUM-related errors, exposes additional `gum` property, which is an object with following properties:

| Property | Description | Type |
| -------- | ----------- | ---- |
| `error`  | original GUM error | `error` |
| `constraints`  | GUM constraints object used for the call | `object` |
| `devices`  | array of devices requested in GUM call (possible values - "audio", "video", "screen", "desktop", "audiooutput") | `[string]` |