---
id: devops-guide-bsd
title: Self-Hosting Guide - FreeBSD/NetBSD/OpenBSD
sidebar_label: BSD
---

This document is a reference point for pointing to the upstream packages provided by the FreeBSD, NetBSD and OpenBSD distributions. Jitsi only officially supports Linux, for any problems with the BSD packages you can contact their respective mailing lists.

__Note__: Many of the installation steps require root access.

## FreeBSD

FreeBSD provides ports for [Jitsi](https://www.freshports.org/net-im/jitsi-meet-full) along with documentation on how to configure it and the current limitations - https://wiki.freebsd.org/Jitsi.

Jitsi can be installed using the meta port [net-im/jitsi-meet-full](https://www.freshports.org/net-im/jitsi-meet-full) which pulls in Jitsi Videobridge, Jicofo and Jitsi Meet Web UI, along with prosody, the Jitsi prosody plugins, nginx and other required dependencies. Instructions on how to build the port can be read on the FreeBSD Foundation site - https://freebsdfoundation.org/freebsd-project/resourcesold/installing-a-port-on-freebsd/.

## NetBSD

NetBSD provides individual ports for [Jitsi Videobridge](https://pkgsrc.se/chat/jitsi-videobridge), [Jicofo](https://pkgsrc.se/chat/jicofo), [Jitsi prosody plugins](https://pkgsrc.se/chat/jitsi-meet-prosody) and [Jitsi Meet Web UI](https://pkgsrc.se/wip/jitsi-meet). They can be installed using the command `pkg_add <pkg-name>`.

## OpenBSD

OpenBSD provides ports for [Jitsi](https://cvsweb.openbsd.org/cgi-bin/cvsweb/ports/meta/jitsi/), along with a pkg-readme which details how to configure Jitsi for a single host install, located at [/usr/local/share/docs/pkg-readme/jitsi](https://cvsweb.openbsd.org/cgi-bin/cvsweb/ports/meta/jitsi/pkg/).

The meta port can be installed by the command `pkg_add jitsi`, which pulls in the individual ports, Jitsi Videobridge, Jicofo and Jitsi Meet Web UI, along with prosody, Jitsi prosody plugins and other required dependencies.

## Limitations

- Jigasi and Jibri have not yet been ported to work with any BSD systems.
