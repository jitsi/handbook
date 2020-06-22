---
id: architecture
title: Architecture
---

Jitsi comprises a [collection of projects](https://jitsi.org/projects/):

* Jitsi Meet - WebRTC JavaScript application that uses Jitsi Videobridge to provide high quality, scalable video conferences
* Jitsi COnference Focus (jicofo) - server-side focus component used in Jitsi Meet conferences that manages media sessions between each of the participants and the videobridge
* JItsi GAteway to SIP (jigasi) - server-side application that allows regular SIP clients to join Jitsi Meet conferences hosted by Jitsi Videobridge
* Jibri - set of tools for recording and/or streaming a Jitsi Meet conference that works by launching a Chrome instance rendered in a virtual framebuffer and capturing and encoding the output with ffmpeg
* Jitsi Videobridge (jvb) - WebRTC compatible XMPP server component designed to run thousands of video streams from a single server
* ice4j - The Interactive Connectivity Establishment (ICE) protocol combines various NAT traversal utilities to offer a mechanism for Offer/Answer based protocols such as SIP and XMPP to traverse NATs.
* prosody - TBD

Check back soon for an [architecture diagram](/handbook/docs/devops-guide/devops-guide-manual#network-description)!
