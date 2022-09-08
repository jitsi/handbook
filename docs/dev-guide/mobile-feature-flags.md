---
id: mobile-feature-flags
title: Feature flags
---

The mobile SDK supports a number of feature flags which allow for customizing certain
UI aspects and behavior.

Here are the currently implemented flags:

* `add-people.enabled`: Flag indicating if add-people functionality should be enabled. Default: enabled (true).
* `android.audio-focus.disabled`: Flag indicating if the SDK should not require the audio focus. Used by apps that do not use Jitsi audio.  Default: disabled (false).
* `audio-mute.enabled`: Flag indicating if the audio mute button should be displayed. Default: enabled (true).
* `calendar.enabled`: Flag indicating if calendar integration should be enabled. Default: enabled (true) on Android, auto-detected on iOS.
* `call-integration.enabled`: Flag indicating if call integration (CallKit on iOS, ConnectionService on Android) should be enabled. Default: enabled (true).
* `close-captions.enabled`: Flag indicating if close captions should be enabled. Default: enabled (true).
* `conference-timer.enabled`: Flag indicating if conference timer should be enabled. Default: enabled (true).
* `chat.enabled`: Flag indicating if chat should be enabled. Default: enabled (true).
* `filmstrip.enabled`: Flag indicating if the filmstrip should be enabled. Default: enabled (true).
* `invite.enabled`: Flag indicating if invite functionality should be enabled. Default: enabled (true).
* `ios.recording.enabled`: Flag indicating if recording should be enabled in iOS. Default: disabled (false).
* `ios.screensharing.enabled`: Flag indicating if screen sharing should be enabled in iOS. Default: disabled (false).
* `android.screensharing.enabled`: Flag indicating if screen sharing should be enabled in android. Default: disabled (true).
* `kick-out.enabled`: Flag indicating if kickout is enabled. Default: enabled (true).
* `live-streaming.enabled`: Flag indicating if live-streaming should be enabled. Default: auto-detected.
* `meeting-name.enabled`: Flag indicating if displaying the meeting name should be enabled. Default: enabled (true).
* `meeting-password.enabled`: Flag indicating if the meeting password button should be enabled. Note that this flag just decides on the buttton, if a meeting has a password set, the password dialog will still show up. Default: enabled (true).
* `notifications.enabled`: Flag indicating if the notifications should be enabled. Default: enabled (true).
* `overflow-menu.enabled`: Flag indicating if the audio overflow menu button should be displayed. Default: enabled (true).
* `pip.enabled`: Flag indicating if Picture-in-Picture should be enabled. Default: auto-detected.
* `raise-hand.enabled`: Flag indicating if raise hand feature should be enabled. Default: enabled.
* `recording.enabled`: Flag indicating if recording should be enabled. Default: auto-detected.
* `resolution`: Flag indicating the local and (maximum) remote video resolution. Overrides the server configuration. Default: (unset).
* `server-url-change.enabled`: Flag indicating if server URL change is enabled. Default: enabled (true)
* `tile-view.enabled`: Flag indicating if tile view feature should be enabled. Default: enabled.
* `toolbox.alwaysVisible`: Flag indicating if the toolbox should be always be visible. Default: disabled (false).
* `toolbox.enabled`: Flag indicating if the toolbox should be enabled. Default: enabled.
* `video-mute.enabled`:  Flag indicating if the video mute button should be displayed. Default: enabled (true).
* `video-share.enabled`:  Flag indicating if the video share button should be enabled. Default: enabled (true).
* `welcomepage.enabled`: Flag indicating if the welcome page should be enabled. Default: disabled (false).

All flags are defined [here](https://github.com/jitsi/jitsi-meet/blob/master/react/features/base/flags/constants.js).
