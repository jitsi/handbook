---
id: architecture
title: Architecture
---

Jitsi comprises a [collection of projects](https://jitsi.org/projects/):

* Jitsi Meet - WebRTC compatible JavaScript application that uses Jitsi Videobridge to provide high quality, scalable video conferences
* Jitsi COnference Focus (jicofo) - server-side focus component used in Jitsi Meet conferences that manages media sessions between each of the participants and the videobridge
* Jitsi Videobridge (jvb) - WebRTC compatible server designed to route video streams amongst participants in a conference
* JItsi GAteway to SIP (jigasi) - server-side application that allows regular SIP clients to join Jitsi Meet conferences
* Jibri - set of tools for recording and/or streaming a Jitsi Meet conference that works by launching a Chrome instance rendered in a virtual framebuffer and capturing and encoding the output with ffmpeg
* Prosody - XMPP server used for sigalling

Check back soon for an [architecture diagram](/handbook/docs/devops-guide/devops-guide-manual#network-description)!
