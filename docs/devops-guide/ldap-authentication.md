---
id: ldap-authentication
title: LDAP authentication
sidebar_label: LDAP Authentication
---

:::note
This is a first draft and might not work on your system. It has been tested on a Debian 11 installation with prosody 0.11 and authenticates against an OpenLDAP directory.
:::

If you want to authenticate your users against an LDAP directory instead 
of the local Prosody user database, you can use the Cyrus SASL package. 
Using this package you might be able to validate user-supplied credentials 
against other sources, such as PAM, SQL and more - but this is beyond 
this article.

## Prerequisites

Before following this article, make sure you have set up Prosody as 
described in [Authentication (Secure Domain)](secure-domain.md) first.

### Required packages

On Debian systems you need to install some required packages:

```
sudo apt-get install sasl2-bin libsasl2-modules-ldap lua-cyrussasl
sudo prosodyctl install --server=https://modules.prosody.im/rocks/ mod_auth_cyrus
```

The first two packages are necessary for Cyrus' `saslauthd` and allow it 
to connect to an LDAP directory. The `lua-cyrussasl`-package allows 
Prosody to access Cyrus SASL.

Installing the [mod_auth_cyrus](https://modules.prosody.im/mod_auth_cyrus) module is neccessary because support for Cyrus SASL has been [removed](https://prosody.im/doc/cyrus_sasl) from mainline Prosody and placed in the community module repository.

## Install and set up Cyrus SASL

The following options define a basic LDAP configuration. A full set of 
possible options can be found in [LDAP_SASLAUTHD](https://github.com/winlibs/cyrus-sasl/blob/master/saslauthd/LDAP_SASLAUTHD).

By default Cyrus' `saslauthd` searches for its LDAP configuration in 
`/etc/saslauthd.conf`. So create this file and enter something similar 
to define your LDAP environment:

```
ldap_servers: ldaps://ldap.example.com
ldap_bind_dn: admin@example.com
ldap_bind_pw: topsecret
ldap_auth_method: bind
ldap_search_base: ou=people,dc=example,dc=com
```

:::note
One omitted option you might want to look into is `ldap_filter` which defaults to `uid=%u` and should work for a lot of systems.  If you are using a Samba or Microsoft AD instance as your LDAP server you may need to change this to `ldap_filter: (sAMAccountName=%U)` as `uid` is NULL by default many configurations. You can also use the `ldap_filter` to allow only specific users access. For more details on this and other options see the `LDAP_SASLAUTHD` document linked above.

Please note that Prosody may experience issues with usernames containing the "@"-symbol. You can work around this issue by changing `uid=%u` to `uid=%U`, which is [defined](https://github.com/winlibs/cyrus-sasl/blob/d933c030ce12ec0668469d79ab8378e347a1b3ba/saslauthd/LDAP_SASLAUTHD#L126) as the "user portion of %u (%U = test when %u = test@domain.tld)"
:::

### Test LDAP authentication

To test if the LDAP configuration is working, you can start `saslauthd` in 
debug mode while specifying the mandatory LDAP authentication mechanism:

```
sudo saslauthd -d -a ldap
```

The test utility for the SASL authentication server can then be used in a 
secondary terminal. Replace `user` and `password` with credentials stored 
in LDAP.

```
sudo testsaslauthd -u user -p password
0: OK "Success."

sudo testsaslauthd -u user -p wrongpassword
0: NO "authentication failed"
```

After testing, you can stop `saslauthd` using `ctrl-c`.

### Enable the `saslauthd` service

You will need to edit the `/etc/default/saslauthd` to enable the `saslauthd` service to run at boot and have it use LDAP for authentication.  You can use sed to do this quickly.
```
sudo sed -i -e "s/START=.*/START=yes/" -e "s/MECHANISMS=.*/MECHANISMS=\"ldap\"/" /etc/default/saslauthd
```

This will make the following changes to `/etc/default/saslauthd`.
```
[...]
# Should saslauthd run automatically on startup? (default: no)
START=yes
[...]
# Example: MECHANISMS="pam"
MECHANISMS="ldap"
[...]
```


It is not necessary to point `MECH_OPTIONS` to the LDAP configuration file 
since this is the default for this mechanism.

Now you can start, restart and stop `saslauthd` using the `service` scripts:

```
sudo service saslauthd restart
```

If you experience issues, check `/var/log/auth.log` for `saslauthd` entries.

### Cyrus SASL Configuration file

Cyrus SASL requires a configuration file in order to know how to check user 
credentials. For Prosody, the file is named `prosody.conf` by default. 
Its location varies by OS and distribution as shown in the following table:

| Platform          | Location   |
| ----------------- | ---------- |
| Debian and Ubuntu | /etc/sasl  |
| Arch, RHEL/CentOS | /etc/sasl2 |

So for Debian systems, create the file `/etc/sasl/prosody.conf`. 
The directory `/etc/sasl` might not yet exist.

```
sudo mkdir /etc/sasl/

cat << 'EOF' |sudo tee /etc/sasl/prosody.conf > /dev/null
pwcheck_method: saslauthd
mech_list: PLAIN
EOF
```

:::note
The filename `prosody.conf`  corresponds to a value for `cyrus_application_name` 
in the Prosody config. Since we have not changed the default this has a value of `prosody`.

:::

The Prosody documentation has more details on a 
[Cyrus SASL-related setup](https://prosody.im/doc/cyrus_sasl).

## Set up Prosody

If you have tested the LDAP authentication successfully and enabled the `saslauthd` service, you can change Prosody's authentication to the Cyrus backend by changing the `authentication` setting in `/etc/prosody/conf.avail/$(hostname -f).cfg.lua` via the command:
```
sed -i -E -e "/^ *VirtualHost \"$(hostname -f)\"/,/^ *VirtualHost/ {s/authentication ?=.*$/authentication = \"cyrus\"/}" /etc/prosody/conf.avail/$(hostname -f).cfg.lua
```

You might also have to add the `allow_unencrypted_plain_auth` option to allow 
plain-text passwords to be sent over the network. *This is not recommended* as it 
makes the setup less secure. So please try without this line first and only add
it if you have problems authenticating.

```
        authentication = "cyrus"
        allow_unencrypted_plain_auth = true
```

### Set Permissions

Prosody will now try to access the saslauthd socket in 
`/var/run/saslauthd/` to communicate with the authentication daemon. 
This folder only allows access to user `root` and group `sasl` while prosody 
runs as the system user/group `prosody`. 

The easiest solution is to add the `sasl` group to the `prosody` user and 
restart the service.

```
sudo adduser prosody sasl
sudo service prosody restart
```

