---
id: secure-domain
title: Secure Domain setup
sidebar_label: Authentication (Secure Domain)
---

It is possible to allow only authenticated users for creating new conference
rooms. Whenever new room is about to be created Jitsi Meet will prompt for
user name and password. After room is created others will be able to join
from anonymous domain. Here's what has to be configured:

## Prosody configuration

(If you have installed jitsi-meet from the Debian package, these changes should be made in /etc/prosody/conf.avail/[your-hostname].cfg.lua)

 a) Enable authentication on your main domain:<br/>
 ```
 VirtualHost "jitsi-meet.example.com"
     authentication = "internal_plain"
 ```
 b) Add new virtual host with anonymous login method for guests:<br/>
 ```
 VirtualHost "guest.jitsi-meet.example.com"
     authentication = "anonymous"
     c2s_require_encryption = false
 ```
(Note that guest.jitsi-meet.example.com is internal to jitsi, and you do not need to (and should not) create a DNS record for it, or generate an SSL/TLS certificate, or do any web server configuration.)

:::note
Make sure you enable desired modules to the guest virtual host like `turncredentials` (if you use STUN/TURN together with secure domain) and/or `conference_duration` etc., by adding the `modules_enabled` option.
```
VirtualHost "guest.jitsi-meet.example.com"
    authentication = "anonymous"
    modules_enabled = {
     "turncredentials";
    }
    c2s_require_encryption = false
```
:::

## Jitsi Meet configuration

In config.js, the `anonymousdomain` options has to be set.

(If you have installed jitsi-meet from the Debian package, these changes should be made in /etc/jitsi/meet/[your-hostname]-config.js)

```
var config = {
    hosts: {
            domain: 'jitsi-meet.example.com',
            anonymousdomain: 'guest.jitsi-meet.example.com',
            ...
        },
        ...
}
```

## Jicofo

When running Jicofo specify your main domain in an additional configuration
property. Jicofo will accept conference allocation requests only from
authenticated domain.
```
-Dorg.jitsi.jicofo.auth.URL=XMPP:jitsi-meet.example.com
```

If you have Jicofo installed from the Debian package this should go directly on a new line in
the **/etc/jitsi/jicofo/sip-communicator.properties** file:
```
org.jitsi.jicofo.auth.URL=XMPP:jitsi-meet.example.com
```

When using token based authentication, the URL must use `EXT_JWT` as the scheme instead:
```
org.jitsi.jicofo.auth.URL=EXT_JWT:jitsi-meet.example.com
```

## Create users in Prosody (internal auth)

```
prosodyctl register <username> jitsi-meet.example.com <password>
```

## Jigasi configuration (optional)

If you are using jigasi:

a) Set jigasi to authenticate by editing the following lines in sip-communicator.properties.

If you have jigasi installed from the Debian package this should go directly to
**/etc/jitsi/jigasi/sip-communicator.properties**

org.jitsi.jigasi.xmpp.acc.USER_ID=SOME_USER@SOME_DOMAIN
org.jitsi.jigasi.xmpp.acc.PASS=SOME_PASS
org.jitsi.jigasi.xmpp.acc.ANONYMOUS_AUTH=false

The password is the actual plaintext password, not a base64 encoding.

b) If you experience problems with a certificate chain, you may also need to uncomment the following line, also in sip-communicator.properties:

net.java.sip.communicator.service.gui.ALWAYS_TRUST_MODE_ENABLED=true

:::note
This should only be used for testing/debugging purposes, or in controlled environments. If you confirm that this is the problem, you should then solve it in another way (e.g. get a signed certificate for prosody, or add the particular certificate to jigasi’s trust store).
:::
