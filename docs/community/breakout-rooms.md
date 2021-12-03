---
id: breakout-rooms
title: Breakout rooms
---

:::note
Jitsi Meet now has native support for breakout rooms. You can see it in action [here](https://www.youtube.com/watch?v=ubYYZ0daw10). This page is kept here for historical purposes and will receive no further updates.
:::

~~Jitsi does not natively support breakout rooms (e.g. see [#4787](https://github.com/jitsi/jitsi-meet/issues/4787) and [#5550](https://github.com/jitsi/jitsi-meet/issues/5550));~~ however there are various solutions for this functionality built on top of Jitsi:

| Name | License | Cost model | Admin can move participants | Comments |
| --- | --- | --- | --- | --- |
| "DIY" - manually combine Jitsi with other comms tools | Depends on what you use | Depends on what you use | No | Not a great solution, since no native integration; everyone needs to follow a pre-agreed workflow and which Jitsi rooms to use, e.g. [https://meet.jit.si/&lt;eventname&gt;-&lt;roomname&gt;](https://github.com/jitsi/jitsi-meet/issues/5550#issuecomment-620747815) |
| [Veertly](https://veertly.com/) | [Apache 2.0](https://github.com/veertly/app/blob/stage/LICENSE) | Cannot currently be self-hosted as it [requires firebase](https://github.com/veertly/app/issues/68) (also [SaaS](https://en.wikipedia.org/wiki/Software_as_a_service) - free for now?) | [No](https://github.com/jitsi/jitsi-meet/issues/4787#issuecomment-624868307) | Try the [online demo](https://app.veertly.com/v/demo) |
| [Wurk.app](https://www.wurk.app/) | Apache 2.0 | [Open Source](https://github.com/puthli/breakout-rooms) | Yes | [Original comment](https://github.com/jitsi/jitsi-meet/issues/5550#issuecomment-625891995) Uses a Main room. The meeting host can add unlimited other rooms and move web-based participants to them. Moving participants away from the main room is not yet supported on mobile. Supports timeboxes and broadcast messages. Meeting hosts can unmute / mute others. Wurk uses a self hosted Jitsi meet installation |
| [VideoFacilitator](https://www.videofacilitator.com/) | Proprietary [SaaS](https://en.wikipedia.org/wiki/Software_as_a_service) | Subscription (see [pricing](https://www.videofacilitator.com/pricing)) | ? | [Issues with navigating rooms on mobile?](https://github.com/jitsi/jitsi-meet/issues/5550#issuecomment-612262313) |
| [Plugin for Openfire Meetings](https://github.com/jitsi/jitsi-meet/issues/5550#issuecomment-617670291) | [Apache 2.0](https://github.com/igniterealtime/openfire-pade-plugin/blob/master/LICENSE) | Free (self-hosting) | ? | More info [here](https://github.com/jitsi/jitsi-meet/issues/5550#issuecomment-618461856) |
