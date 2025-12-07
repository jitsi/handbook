---
id: mobile-feature-flags
title: Feature flags
---

The mobile SDK supports a number of feature flags which allow for customizing certain
UI aspects and behavior.

Below is a generated list of exported feature flags from the source file with their defaults and short descriptions.

| Flag Key | Default | Description |
| --- | --- | --- |
| `add-people.enabled` | enabled (true) | Flag indicating if add-people functionality should be enabled. |
| `android.screensharing.enabled` | enabled (true) | Flag indicating if screen sharing should be enabled in android. |
| `audio-device-button.enabled` | enabled (true) | Flag indicating if the audio device button should be displayed. |
| `audio-focus.disabled` | disabled (false) | Flag indicating if the SDK should not require the audio focus (used by apps that do not use Jitsi audio). |
| `audio-mute.enabled` | enabled (true) | Flag indicating if the audio mute button should be displayed. |
| `audio-only.enabled` | enabled (true) | Flag indicating that the Audio only button in the overflow menu is enabled. |
| `breakout-rooms.enabled` | enabled (true) | Flag indicating that the Breakout Rooms button in the overflow menu is enabled. |
| `calendar.enabled` | enabled (true) on Android, auto-detected on iOS | Flag indicating if calendar integration should be enabled. |
| `call-integration.enabled` | enabled (true) | Flag indicating if call integration (CallKit on iOS, ConnectionService on Android) should be enabled. |
| `car-mode.enabled` | enabled (true) | Flag indicating if car mode should be enabled. |
| `chat.enabled` | enabled (true) | Flag indicating if chat should be enabled. |
| `close-captions.enabled` | enabled (true) | Flag indicating if close captions should be enabled. |
| `conference-timer.enabled` | enabled (true) | Flag indicating if conference timer should be enabled. |
| `filmstrip.enabled` | enabled (true) | Flag indicating if the filmstrip should be enabled. |
| `help.enabled` | enabled (true) | Flag indicating if the Help button should be enabled. |
| `invite-dial-in.enabled` | enabled (true) | Flag indicating if dial-in invite functionality should be enabled. |
| `invite.enabled` | enabled (true) | Flag indicating if invite functionality should be enabled. |
| `ios.recording.enabled` | disabled (false) | Flag indicating if recording should be enabled in iOS. |
| `ios.screensharing.enabled` | disabled (false) | Flag indicating if screen sharing should be enabled in iOS. |
| `kick-out.enabled` | enabled (true) | Flag indicating if kickout is enabled. |
| `lobby-mode.enabled` | enabled | Flag indicating if lobby mode button should be enabled. |
| `live-streaming.enabled` | auto-detected | Flag indicating if live-streaming should be enabled. |
| `meeting-name.enabled` | enabled (true) | Flag indicating if displaying the meeting name should be enabled. |
| `meeting-password.enabled` | enabled (true) | Flag indicating if the meeting password button should be enabled. |
| `notifications.enabled` | enabled (true) | Flag indicating if the notifications should be enabled. |
| `overflow-menu.enabled` | enabled (true) | Flag indicating if the audio overflow menu button should be displayed. |
| `participants.enabled` | enabled (true) | Flag indicating if participants should be enabled. |
| `pip.enabled` | auto-detected | Flag indicating if Picture-in-Picture should be enabled. |
| `prejoinpage.enabled` | enabled (true) | Flag indicating if the prejoin page should be enabled. |
| `prejoinpage.hideDisplayName` | disabled (false) | Flag indicating if the participant name editing field should be displayed on the prejoin page. |
| `raise-hand.enabled` | enabled | Flag indicating if raise hand feature should be enabled. |
| `reactions.enabled` | enabled (true) | Flag indicating if the reactions feature should be enabled. |
| `recording.enabled` | auto-detected | Flag indicating if recording should be enabled. |
| `replace.participant` | disabled (false) | Flag indicating if the user should join the conference with the replaceParticipant functionality. |
| `resolution` | unset | Flag indicating the local and (maximum) remote video resolution. Overrides the server configuration. |
| `security-options.enabled` | enabled (true) | Flag indicating if the security options button should be enabled. |
| `server-url-change.enabled` | enabled (true) | Flag indicating if server URL change is enabled. |
| `settings.enabled` | enabled (true) | Flag indicating if settings should be enabled. |
| `speakerstats.enabled` | enabled (true) | Flag indicating if speaker statistics should be enabled. |
| `tile-view.enabled` | enabled (true) | Flag indicating if tile view feature should be enabled. |
| `toggle-camera-button.enabled` | enabled (true) | Flag indicating if the toggle camera button should be enabled. |
| `toolbox.alwaysVisible` | disabled (false) | Flag indicating if the toolbox should always be visible. |
| `toolbox.enabled` | enabled | Flag indicating if the toolbox should be enabled. |
| `unsaferoomwarning.enabled` | disabled (false) | Flag indicating if the unsafe room warning should be enabled. |
| `video-mute.enabled` | enabled (true) | Flag indicating if the video mute button should be displayed. |
| `video-share.enabled` | enabled (true) | Flag indicating if the video share button should be enabled. |
| `welcomepage.enabled` | disabled (false) | Flag indicating if the welcome page should be enabled. |

Flags may change between releases - see source for latest updates [here](https://github.com/jitsi/jitsi-meet/blob/master/react/features/base/flags/constants.ts).
