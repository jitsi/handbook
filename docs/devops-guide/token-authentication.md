---
id: token-authentication
title: Token Authentication
sidebar_label: Authentication (Token)
---

It is possible to allow only users with a valid token to create new conference
rooms. After the room is created, others will be able to join from anonymous
domain. Here's what has to be configured:

## Token package

Install `jitsi-meet-tokens` packages.

```
apt-get install jitsi-meet-tokens
```

Set `Application ID` and `Application Secret` when asked. This command will add
`app_id` and `app_secret` into the Prosody config and set `authentication`.

## Prosody configuration

If you have installed Jitsi Meet from the Debian package, the changes should be
made in `/etc/prosody/conf.avail/[your-hostname].cfg.lua`

In the example below, this hostname is assumed to be `jitsi.example.com`.

After installing the package you will see the following lines in your Prosody
config:

```
VirtualHost "jitsi.example.com"
    authentication = "token"
    app_id="myappid"
    app_secret="myappsecret"
---
---

Component "conference.jitsi.example.com" "muc"
    ---
    ---
    modules_enabled = {
        ---
        ---
        "token_verification";
        ---
        ---
    }
```

### allow_empty_token

Add `allow_empty_token` into `VirtualHost`:

```
VirtualHost "jitsi.example.com"
    authentication = "token"
    app_id="myappid"
    app_secret="myappsecret"
    allow_empty_token = true
```

### persistent_lobby

Add `persistent_lobby` as module into `VirtualHost`:

```
VirtualHost "jitsi.example.com"
    ---
    ---
    modules_enabled = {
        ---
        ---
        "muc_lobby_rooms";
        "persistent_lobby";
```

### muc_wait_for_host

Add `muc_wait_for_host` as module into `Component`:

```
Component "conference.jitsi.example.com" "muc"
    ---
    ---
    modules_enabled = {
        ---
        "token_verification";
        "muc_wait_for_host";
    }
```

### Enable anonymous login for guests

Add this section **after the previous VirtualHost** to enable the anonymous
login method for guests:

```
VirtualHost "guest.jitsi.example.com"
    authentication = "jitsi-anonymous"
    c2s_require_encryption = false
```

_Note that `guest.jitsi.example.com` is internal to Jitsi, and you do not need
to (and should not) create a DNS record for it, or generate an SSL/TLS
certificate, or do any web server configuration. While it is internal, you
should still replace `jitsi.example.com` with your hostname._

## Jitsi Meet configuration

In config.js, the `anonymousdomain` options has to be set.

If you have installed jitsi-meet from the Debian package, these changes should
be made in `/etc/jitsi/meet/[your-hostname]-config.js`.

```
var config = {
    hosts: {
        domain: 'jitsi.example.com',
        anonymousdomain: 'guest.jitsi.example.com',
        // ...
    },
    // ...
}
```

You will see your own hostname instead of `jitsi.example.com` in your config
file. You should add only the `anonymousdomain` line. Be carefull of commas.

## Jicofo configuration

No need to update anything in Jicofo config. Some out-dated documents recommend
to enable the authentication in `jicofo.conf`. Don't do that. The authentication
must be disabled in `jicofo.conf` when the `token` authentication is active.

Simply keep `jicofo.conf` as it is without changing anything.

## Restart the services

Restart prosody, jicofo and jitsi-videobridge2 as `root`.

```
systemctl restart prosody
systemctl restart jicofo
systemctl restart jitsi-videobridge2
```
