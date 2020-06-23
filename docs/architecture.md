---
id: architecture
title: Architecture
---

Jitsi comprises a [collection of projects](https://jitsi.org/projects/):

* [Jitsi Meet](https://jitsi.org/jitsi-meet) - WebRTC compatible JavaScript application that uses Jitsi Videobridge to provide high quality, scalable video conferences
* [Jitsi Videobridge (jvb)](https://jitsi.org/jitsi-videobridge) - WebRTC compatible server designed to route video streams amongst participants in a conference
* [Jitsi Conference Focus (jicofo)](https://github.com/jitsi/jicofo) - server-side focus component used in Jitsi Meet conferences that manages media sessions between each of the participants and the videobridge
* [Jitsi Gateway to SIP (jigasi)](https://github.com/jitsi/jigasi) - server-side application that allows regular SIP clients to join Jitsi Meet conferences
* [Jibri](https://github.com/jitsi/jibri) - set of tools for recording and/or streaming a Jitsi Meet conference that works by launching a Chrome instance rendered in a virtual framebuffer and capturing and encoding the output with ffmpeg

External Software used by Jitsi:

* [Prosody](https://prosody.im/) - XMPP server used for signalling

Check back soon for an [architecture diagram](/handbook/docs/devops-guide/devops-guide-manual#network-description)!
