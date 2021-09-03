---
id: secure-domain
title: Secure Domain setup
sidebar_label: Authentication (Secure Domain)
---

It is possible to allow only authenticated users to create new conference
rooms. Whenever a new room is about to be created, Jitsi Meet will prompt for
a user name and password. After the room is created, others will be able to join
from anonymous domain. Here's what has to be configured:

## Prosody configuration

If you have installed Jitsi Meet from the Debian package, these changes should be made in `/etc/prosody/conf.avail/[your-hostname].cfg.lua`

### Enable authentication

Inside the `VirtualHost "[your-hostname]"` block, replace anonymous authentication with hashed password authentication:

```
VirtualHost "jitsi-meet.example.com"
    authentication = "internal_hashed"
```

Replace `jitsi-meet.example.com` with your hostname.

### Enable anonymous login for guests

Add this block **after the previous VirtualHost** to enable the anonymous login method for guests:

```
VirtualHost "guest.jitsi-meet.example.com"
    authentication = "anonymous"
    c2s_require_encryption = false
```

_Note that `guest.jitsi-meet.example.com` is internal to Jitsi, and you do not need to (and should not) create a DNS record for it, or generate an SSL/TLS certificate, or do any web server configuration. While it is internal, you should still replace `jitsi-meet.example.com` with your hostname._

## Jitsi Meet configuration

In config.js, the `anonymousdomain` options has to be set.

If you have installed jitsi-meet from the Debian package, these changes should be made in `/etc/jitsi/meet/[your-hostname]-config.js`.

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

## Jicofo configuration

When running Jicofo, specify your main domain in an additional configuration
property. Jicofo will accept conference allocation requests only from the
authenticated domain.

```
org.jitsi.jicofo.auth.URL=XMPP:jitsi-meet.example.com
```

If you have installed Jicofo from the Debian package, this should go as a new 'authentication' section in `/etc/jitsi/jicofo/jicofo.conf`:

```
jicofo {
  authentication: {
    enabled: true
    type: XMPP
    login-url: jitsi-meet.example.com
 }
 ...
```

When using token based authentication, the type must use `EXT_JWT` as the scheme instead:

```
jicofo {
  authentication: {
    enabled: true
    type: EXT_JWT
    login-url: jitsi-meet.example.com
 }
 ...
```

## Create users in Prosody (internal auth)

Finally, run `prosodyctl` to create a user in Prosody:

```
sudo prosodyctl register <username> jitsi-meet.example.com <password>
```
and then restart prosody, jicofo and jitsi-videobridge2
```
systemctl restart prosody
systemctl restart jicofo
systemctl restart jitsi-videobridge2
```
## Optional: Jigasi configuration

### Enable Authentication

If you are using Jigasi, set it to authenticate by editing the following lines in `/etc/jitsi/jigasi/sip-communicator.properties`:

````
org.jitsi.jigasi.xmpp.acc.USER_ID=SOME_USER@SOME_DOMAIN
org.jitsi.jigasi.xmpp.acc.PASS=SOME_PASS
org.jitsi.jigasi.xmpp.acc.ANONYMOUS_AUTH=false
````

Note that the password is the actual plaintext password, not a base64 encoding.

### Debugging

If you experience problems with a certificate chain, you may need to uncomment the following line, also in `sip-communicator.properties`:

````
net.java.sip.communicator.service.gui.ALWAYS_TRUST_MODE_ENABLED=true
````

:::note
This should only be used for testing/debugging purposes, or in controlled environments. If you confirm that this is the problem, you should then solve it in another way (e.g. get a signed certificate for Prosody, or add the particular certificate to Jigasi’s trust store).
:::
