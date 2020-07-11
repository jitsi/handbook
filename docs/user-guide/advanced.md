---
id: user-guide-advanced
title: User Guide (advanced)
sidebar_label: Advanced options
---

There are some options to tweak the invitation link to unlock more features in
Jitsi. The following parameters apply to the web version only.
They can be combined using `&`, e.g. `#config.defaultLanguage=en&config.minParticipants=3`.

<!--
  See also for implementation:
  https://github.com/jitsi/jitsi-meet/blob/b0188a71841c966122c3cce8c7023b7de8e32a82/config.js
  https://github.com/jitsi/jitsi-meet/blob/b0188a71841c966122c3cce8c7023b7de8e32a82/react/features/base/config/configWhitelist.js
  https://github.com/jitsi/jitsi-meet/blob/b0188a71841c966122c3cce8c7023b7de8e32a82/react/features/base/config/functions.any.js#L70
-->

* `#config.defaultLanguage=en` will change the UI default language
* `#config.desktopSharingFrameRate.min=5` will override the minimum framerate for desktop sharing
* `#config.desktopSharingFrameRate.max=5` will override the maximum framerate for desktop sharing
* `#config.disableAudioLevels=true` will disable audio statistics polling (thereby perhaps improving performance)
* `#config.disableInviteFunctions=true` will disable invite function of the app
* `#config.disableRemoteMute=true` will disable all muting operations of remote participants
* `#config.disableThirdPartyRequests=true` will generate avatars locally and disable callstats integration
* `#config.enableDisplayNameInStats=true` will send display names of participants to callstats
* `#config.enableEmailInStats=true` will send email (if available) to callstats and other analytics
* `#config.enableInsecureRoomNameWarning=true` will show a warning label if the room name is deemed insecure
* `#config.minParticipants=2` will override the minimum number of participants before starting a call
* `#config.prejoinPageEnabled=true` will show an intermediate page before joining to allow for adjustment of devices
* `#config.startAudioMuted=true` will turn off audio input when joining
* `#config.startSilent=true` will mute audio input and output
* `#config.startVideoMuted=true` will disable video when joining
