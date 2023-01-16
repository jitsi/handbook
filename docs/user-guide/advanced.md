---
id: user-guide-advanced
title: User Guide (advanced)
sidebar_label: Advanced options
---

There are some options to tweak the invitation link to unlock more features in
Jitsi. The following parameters apply to the web, iframe and mobile version.

All keys listed here are prefixed with `config.`.
You pick a key, combine it with its value using `=` and link parameters
with `&`, e.g. `#config.defaultLanguage=en&config.minParticipants=3`.

<!--
  See also for implementation:
  https://github.com/jitsi/jitsi-meet/blob/b0188a71841c966122c3cce8c7023b7de8e32a82/config.js
  https://github.com/jitsi/jitsi-meet/blob/b0188a71841c966122c3cce8c7023b7de8e32a82/react/features/base/config/configWhitelist.js
  https://github.com/jitsi/jitsi-meet/blob/b0188a71841c966122c3cce8c7023b7de8e32a82/react/features/base/config/functions.any.js#L70
-->

## Invitations

These parameters affect how you can invite people either before or within a session.

Key                             | Value  | Effect
------------------------------- | ------ | -----------------------------------
`disableInviteFunctions`        | `true` | disable invite function of the app
`minParticipants`               | `2`    | override the minimum number of participants before starting a call
`prejoinConfig.enabled`         | `true` | show an intermediate page before joining to allow for adjustment of devices

## UI

These parameters have an effect on the user interface.

Key                             | Value  | Effect
------------------------------- | ------ | -----------------------------------
`defaultLanguage`               | `en`   | change the UI default language
`disableThirdPartyRequests`     | `true` | generate avatars locally and disable callstats integration
`enableDisplayNameInStats`      | `true` | send display names of participants to callstats
`enableEmailInStats`            | `true` | send email (if available) to callstats and other analytics
`enableInsecureRoomNameWarning` | `true` | show a warning label if the room name is deemed insecure

## Video

Use these parameters to influence the video of a session.

Key                             | Value  | Effect
------------------------------- | ------ | -----------------------------------
`desktopSharingFrameRate.min`   | `5`    | override the minimum framerate for desktop sharing
`desktopSharingFrameRate.max`   | `5`    | override the maximum framerate for desktop sharing
`startWithVideoMuted`           | `true` | disable video when joining

## Audio

Use these parameters to influence the audio of a session.

Key                             | Value  | Effect
------------------------------- | ------ | -----------------------------------
`disableAudioLevels`            | `true` | disable audio statistics polling (thereby perhaps improving performance)
`disableRemoteMute`             | `true` | disable all muting operations of remote participants
`startWithAudioMuted`           | `true` | turn off audio input when joining
`startSilent`                   | `true` | mute audio input and output
