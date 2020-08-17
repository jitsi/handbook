---
id: devops-guide-opensuse
title: Self-Hosting Guide - openSUSE
sidebar_label: openSUSE
---

This document describes the steps for a quick Jitsi-Meet installation paired with a single Videobridge and a single
Jicofo on openSUSELeap 15.2.

_Note_: Many of the installation steps require `root` or `sudo` access. 

## Installation

```shell
# Add the OBS repository. When Jitsi is merged into openSUSE Factory this will be obsolete.
zypper ar https://download.opensuse.org/repositories/home:/SchoolGuy:/jitsi/openSUSE_Leap_15.2/home:SchoolGuy:jitsi.repo

# Refresh the repositories
zypper ref

zypper in nginx prosody lua51-zlib jitsi-meet jitsi-videobridge jitsi-jicofo
```

To install the Jibri Add-On execute the following:

```shell
zypper in jitsi-jibri
```

To install the Jigasi Add-On execute the following:

```shell
zypper in jitsi-jigasi
```

## Configuration

The following sections describe how to configure the different packages. Replace `<FQDN>` with your domain name
and `YOURSECRET3` with a strong password.

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
* Create a new configuration file named `<FQDN>.cfg.lua` in `/etc/prosody/conf.avail/` with the following
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
```

* Create a symlink for the configuration:

`ln -s /etc/prosody/conf.avail/<FQDN>.cfg.lua /etc/prosody/conf.d/<FQDN>.cfg.lua`

* Now create the certificates via `prosodyctl cert generate <DOMAIN>`. The value `<DOMAIN>` stands for the following
  URLs, `<FQDN>` has the same meaning as everywhere else on this page:
    * `auth.<FQDN>`
    * `callcontrol.<FQDN>` --> This is only needed if you deploy Jigasi
    * `conference.<FQDN>`
    * `conferenceduration.<FQDN>`
    * `internal.auth.<FQDN>`
    * `FQDN`
    * `focus.<FQDN>`
    * `jitsi-videobridge.<FQDN>`
    * `recorder.<FQDN>` --> This is only needed if you deploy Jibri
* `/var/lib/prosody/`: Symlink all generated `*.crt` and `*.key` files to `/etc/prosody/certs/`. Please do not link
  other certificates!
* Add the certificates to the system keystore:
    * `ln -sf /var/lib/prosody/auth.<FQDN>.crt /usr/local/share/ca-certificates/auth.<FQDN>.crt`
    * `update-ca-certificates -f`
* Create conference focus user: `prosodyctl register focus auth.<FQDN> YOURSECRET3`

### Nginx

Edit the file `jitsi-meet.conf` in `/etc/nginx/vhosts.d/` (which was installed along with `jitsi-meet`) and do the following:

* check the `server_name` value
* check the TLS certificates (Let's Encrypt for production use, Prosody for testing, for example)

Beware: If you are using an existing server please make sure to adjust the websocket and bosh part, too.

### Jitsi-Meet

* Go to `/srv/jitsi-meet` and open `config.js`

```js
var config = {
    hosts: {
        domain: '<FQDN>',
        muc: 'conference.<FQDN>',
        bridge: 'jitsi-videobridge.<FQDN>',
        focus: 'focus.<FQDN>'
    },
    useNicks: false,
    bosh: '//<FQDN>/http-bind',
};
```

Note: Please be aware that this is the minimal configuration!

### Jitsi-Videobridge

Note: We were not able to get the [new Videobridge configuration](https://github.com/jitsi/jitsi-videobridge/blob/master/doc/muc.md#videobridge-configuration)
up an running. We will divide this part into two when we are able to do so. In the following the [legacy configuraiton](https://github.com/jitsi/jitsi-videobridge/blob/master/doc/muc.md#legacy-videobridge-configuration) is covered.

* Go to the folder `/etc/jitsi/videobridge`
* Edit the file `jitsi-videobridge.conf`
    * Edit `JVB_HOSTNAME` to your `<FQDN>`.
    * Edit the `JVB_SECRET` to your own secret.
    * Save and close the file
* Edit the file `sip-communicator.properties`
    * Edit the property `org.jitsi.videobridge.xmpp.user.xmppserver1.DOMAIN` and set it to `auth.<FQDN>`.
    * Edit the property `org.jitsi.videobridge.xmpp.user.xmppserver1.PASSWORD` and set it to the password of your prosody user focus.
    * Edit the property `org.jitsi.videobridge.xmpp.user.xmppserver1.MUC_JIDS` to `JvbBrewery@internal.auth.<FQDN>`.
    * Edit the property `org.jitsi.videobridge.xmpp.user.xmppserver1.MUC` and set it to the same as above property.
    * Depending on your cert setup set `org.jitsi.videobridge.xmpp.user.xmppserver1.DISABLE_CERTIFICATE_VERIFICATION` to `true` or `false`.


### Jitsi-Jicofo

* Got to the folder `/etc/jitsi/jicofo`
* Edit the file `jitsi-jicofo.conf`
    * Set the property `JICOFO_HOSTNAME` to `<FQDN>`.
    * Set the property `JICOFO_SECRET` to the password the Prosody user got in above setup.
    * Set the property `JICOFO_AUTH_DOMAIN` to `auth.<FQDN>`.
    * Set the property `JICOFO_AUTH_USER` to the Prosody user from above setup.
* Edit the file `sip-cmmunicator.properties`
    * Set the property `org.jitsi.jicofo.BRIDGE_MUC` to `JvbBrewery@internal.auth.<FQDN>`.
    * Set the property `org.jitsi.jicofo.jibri.BREWERY` to `JibriBrewery@internal.auth.<FQDN>`.
    * Depending on your cert setup set `org.jitsi.jicofo.ALWAYS_TRUST_MODE_ENABLED` to `true` or `false`.

## Add-On: Jitsi-Jibri

* Add to the file `/etc/prosody/conf.avail/<FQDN>.cfg.lua` the following snippet at the end of the file.

```lua
VirtualHost "recorder.<FQDN>"
  modules_enabled = {
    "ping";
  }
  authentication = "internal_plain"
```

* Run `prosodyctl register jibri auth.<FQDN> YOURSECRET3` and replace `YOURSECRET3` with an appropiate one.
* `prosodyctl register recorder recorder.<FQDN> YOURSECRET3` and replace `YOURSECRET3` with an appropiate one.
* Go to the folder `/etc/jitsi/jibri` and edit the following properties you see listed below. The rest can be left as is.

```HUCON
jibri{
    api{
        environments = [
            {
                xmpp-domain = "<FQDN>"
                control-muc {
                    domain = "internal.<FQDN>"
                }
                control-login {
                    domain = "recorder.<FQDN>"
                    username = "recorder"
                    password = "YOURSECRET3"
                }   
                call-login {
                    domain = "recorder.<FQDN>"
                    username = "recorder"
                    password = "YOURSECRET3"
                }
            }
        ]
    }
}
```

## Add-On: Jitsi-Jigasi

```shell
zypper in jitsi-jigasi
```

Note from the openSUSE packagers: We packaged it but we don't have the infrastructure to set up this component. So
sadly we can't provide a guide for this so far.

## Final steps

Now everything should be working. That means you are ready to start everything up:

1. `systemctl start prosody`
1. `systemctl start jitsi-videbridge`
1. `systemctl start jitsi-jicofo`
1. `systemctl start jitsi-jibri` (if you configured and installed it)
1. `systemctl start jitsi-jigasi` (if you configured and installed it)
1. `systemctl start nginx`

## Final notes

* The Jitsi Software has a lot of dependencies and thus we recommend to run this on a dedicated host for Jitsi
* Updating Jitsi is crucial to get rid of bugs and updated dependencies with possible security fixes
* Although tempted through Chrome: Don't install a full X11 stack like KDE or Gnome for this.
* Don't mix the `rpms` or `debs` with a source installation of the same component
* Backup your configuration elsewhere, preferably in a VCS and not in plain. This saves time and pain when doing rollbacks
  or dealing with other problems.
