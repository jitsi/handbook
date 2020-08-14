---
id: devops-guide-opensuse
title: Self-Hosting Guide - openSUSE
sidebar_label: openSUSE
---

This document describes the steps for a quick Jitsi-Meet installation on openSUSELeap 15.2.

_Note_: Many of the installation steps require `root` or `sudo` access. 

## Installation

```shell
zypper ar https://download.opensuse.org/repositories/home:/SchoolGuy:/jitsi/openSUSE_Leap_15.2/home:SchoolGuy:jitsi.repo
zypper ref
zypper in nginx prosody lua51-zlib jitsi-meet jitsi-videobridge jitsi-jicofo
```

## Configuration

The following sections describe how to configure the different packages. Replace `<FQDN>` with your domain name.

### Prosody

* Open and adjust the Prosody configuration file under `/etc/prosody/prosody.cfg.lua`:

```lua
---------- Server-wide settings ----------
admins = { "focus@auth.<FQDN>" }
cross_domain_bosh = true;
component_ports = { 5347 }
modules_enabled = {
        -- HTTP modules
                "bosh"; -- Enable BOSH clients, aka "Jabber over HTTP"
        -- jitsi
                "smacks";
                "mam";
                "lastactivity";
                "offline";
                "pubsub";
                "adhoc";
                "websocket";
                "http_altconnect";
                "compression";
}
```
* Create a new config file named `<FQDN>.cfg.lua` in `/etc/prosody/conf.avail/` with the following
content:

```lua
plugin_paths = { "/usr/share/jitsi-meet/prosody-plugins/" }

-- As per https://prosody.im/doc/setting_up_bosh#proxying_requests
consider_bosh_secure = true

-- domain mapper options, must at least have domain base set to use the mapper
muc_mapper_domain_base = "<FQDN>";

turncredentials_secret = "YOURSECRET3";

turncredentials = {
  { type = "stun", host = "<FQDN>", port = "3478" },
  { type = "turn", host = "<FQDN>", port = "3478", transport = "udp" },
  --  { type = "turns", host = "<FQDN>", port = "443", transport = "tcp" }
};

VirtualHost "<FQDN>"
    authentication = "anonymous"
    ssl = {
        key = "/var/lib/prosody/<FQDN>.key";
        certificate = "/var/lib/prosody/<FQDN>.crt";
    }
    speakerstats_component = "speakerstats.<FQDN>"
    conference_duration_component = "conferenceduration.<FQDN>"
    modules_enabled = {
        "bosh";
        "pubsub";
	"speakerstats";
	"turncredentials";
        "conference_duration";
    }
    c2s_require_encryption = false

Component "conference.<FQDN>" "muc"
    modules_enabled = {
        "muc_meeting_id";
        "muc_domain_mapper";
    }
    admins = { "focus@auth.<FQDN>" }
    muc_room_locking = false
    muc_room_default_public_jids = true

-- internal muc component
Component "internal.auth.<FQDN>" "muc"
    modules_enabled = {
      "ping";
    }
    admins = { "focus@auth.<FQDN>" }
    muc_room_locking = false
    muc_room_default_public_jids = true
    muc_room_cache_size = 1000

Component "jitsi-videobridge.<FQDN>"
    component_secret = "YOURSECRET3"

VirtualHost "auth.<FQDN>"
    ssl = {
        key = "/var/lib/prosody/auth.<FQDN>.key";
        certificate = "/var/lib/prosody/auth.<FQDN>.crt";
    }
    authentication = "internal_plain"

Component "focus.<FQDN>"
    component_secret = "YOURSECRET3"

Component "speakerstats.<FQDN>" "speakerstats_component"
    muc_component = "conference.<FQDN>"

Component "conferenceduration.<FQDN>" "conference_duration_component"
    muc_component = "conference.<FQDN>"

Component "callcontrol.<FQDN>"
    component_secret = "YOURSECRET3"

VirtualHost "recorder.<FQDN>"
  modules_enabled = {
    "ping";
  }
  authentication = "internal_plain"
```

* Create a symlink for the configuration:

`ln -s /etc/prosody/conf.avail/<FQDN>.cfg.lua /etc/prosody/conf.d/<FQDN>.cfg.lua`



### Nginx

Edit the file `jitsi-meet.conf` in `/etc/nginx/vhosts.d/` and do the following:

* check the `server_name` value
* check the TLS certificates (Let's Encrypt for production use, Prosody for testing, for example)


### Jitsi-Meet

### Jitsi-Videobridge

### Jitsi-Jicofo


