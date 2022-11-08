---
id: turn
title: Setting up TURN
sidebar_label: TURN setup
---

One-to-one calls should avoid going through the JVB for optimal performance and for optimal resource usage. This is why we've added the peer-to-peer mode where the two participants connect directly to each other. Unfortunately, a direct connection is not always possible between the participants. In those cases you can use a TURN server to relay the traffic (n.b. the JVB does much more than just relay the traffic, so this is not the same as using the JVB to "relay" the traffic).

This document describes how to enable TURN server support in one-to-one calls in Jitsi Meet. Even though it gives some hints how to configure [prosody](https://prosody.im) and [coTURN](https://github.com/coturn/coturn), it assumes a properly configured TURN server, and a properly configured XMPP server.

One way to configure TURN support in meet is with a static configuration. You can simply fill out the `p2p.stunServers` option with appropriate values, e.g.:

    [
        { urls: 'turn:turn.example.com1', username: 'user', credential: 'pass' },
    ]

:::caution
This technique doesn't require any special configuration on the XMPP server, but it exposes the credentials to your TURN server and other people can use your bandwidth freely, so while it's simple to implement, it's not recommended.
:::

This [draft](https://tools.ietf.org/html/draft-uberti-behave-turn-rest-00) describes a proposed standard REST API for obtaining access to TURN services via ephemeral (i.e. time-limited) credentials. These credentials are vend by a web service over HTTP, and then supplied to and checked by a TURN server using the standard TURN protocol. The usage of ephemeral credentials ensures that access to the TURN server can be controlled even if the credentials can be discovered by the user.

Jitsi Meet can fetch the TURN credentials from the XMPP server via [XEP-0215](https://xmpp.org/extensions/xep-0215.html) and this is configured by default using [mod_external_services](https://prosody.im/doc/modules/mod_external_services). The default configured turnserver uses the default ports for the protocol UDP 3478 and TCP(TLS) on 5349.

## Use TURN server on port 443

By default, TURN server listens on standard ports UDP 3478 and TCP 5349 (for TLS connections). 
There are certain corporate networks which allow only TCP connections using port 443(https) and to cover 
this kind of scenarios it is useful to have TURN server listening on port 443 for TLS connections.
Here is how to run nginx and TURN server on the same machine sharing port.
For this you will need a second DNS record for your turn domain pointing to the same machine (as a reference below we will use `turn-jitsi-meet.example.com`).

- You need to enable the multiplexing based on that new DNS record. You need to create a file in `/etc/nginx/modules` or `/etc/nginx/modules-available`. If you are placing the file in `/etc/nginx/modules-available` you need to add a symlink in `/etc/nginx/modules-enabled`.
The file content should be:
```
stream {
    map $ssl_preread_server_name $name {
        jitsi-meet.example.com web_backend;
        turn-jitsi-meet.example.com turn_backend;
    }

    upstream web_backend {
        server 127.0.0.1:4444;
    }

    upstream turn_backend {
        server __your_public_ip__:5349;
    }

    server {
        listen 443;
        listen [::]:443;

        # since 1.11.5
        ssl_preread on;

        proxy_pass $name;

        # Increase buffer to serve video
        proxy_buffer_size 10m;
    }
}
```
Make sure you edit the file and replace `jitsi-meet.example.com` with your domain of deployment, `turn-jitsi-meet.example.com` with the DNS name you will use for the TURN server and `__your_public_ip__` with your public IP of the deployment.
If you have more virtual hosts make sure you add them here and do the port change for them (the next step).

- Then go to `/etc/nginx/site-available/your-conf` and change your virtual host to listen on port 4444 instead of 443.
```
server {
    listen 4444 ssl;
    listen [::]:4444 ssl;
    server_name jitsi-meet.example.com;
```

- Next you need to make sure Prosody is advertising the correct DNS name and port for the TURN server. You should edit the line using port `5349` and make it look like (change port and address):
```
{ type = "turns", host = "turn-jitsi-meet.example.com", port = "443", transport = "tcp" }
```
- Now you need to make sure the TURN server (coturn) uses trusted certificates.
Here is how to request those from Let's Encrypt (make sure you set correct values for the domain and email):
```
systemctl stop nginx
DOMAIN="turn-jitsi-meet.example.com"
apt install socat
/opt/acmesh/.acme.sh/acme.sh -f --issue -d ${DOMAIN} --standalone --server letsencrypt
/opt/acmesh/.acme.sh/acme.sh -f --install-cert \
    -d ${DOMAIN} \
    --key-file /etc/jitsi/meet/${DOMAIN}.key \
    --fullchain-file /etc/jitsi/meet/${DOMAIN}.crt \
    --reloadcmd "/usr/share/jitsi-meet/scripts/coturn-le-update.sh ${DOMAIN}"
systemctl start nginx
``` 
- After restarting prosody (`systemctl restart prosody`) you are good to go!
