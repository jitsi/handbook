---
id: turn
title: Setting up TURN
sidebar_label: TURN setup
---

One-to-one calls should avoid going through the JVB for optimal performance and for optimal resource usage. This is why we've added the peer-to-peer mode where the two participants connect directly to each other. Unfortunately, a direct connection is not always possible between the participants. In those cases you can use a TURN server to relay the traffic (n.b. the JVB does much more than just relay the traffic, so this is not the same as using the JVB to "relay" the traffic).

This document describes how to enable TURN server support in one-to-one calls in Jitsi Meet, even though it gives some hints how to configure [prosody](https://prosody.im) and [coTURN](https://github.com/coturn/coturn), it assumes a properly configured TURN server, and a properly configured XMPP server.

One way to configure TURN support in meet with a static configuration. You can simply fill out the `p2p.stunServers` option with appropriate values, e.g.:

    [
        { urls: 'turn:turn.example.com1', credential: 'user', password: 'pass' },
    ]

This technique doesn't require any special configuration on the XMPP server, but it exposes the credentials to your TURN server and other people can use your bandwidth freely, so while it's simple to implement, it's not recommended.

This [draft](https://tools.ietf.org/html/draft-uberti-behave-turn-rest-00) describes a proposed standard REST API for obtaining access to TURN services via ephemeral (i.e. time-limited) credentials. These credentials are vend by a web service over HTTP, and then supplied to and checked by a TURN server using the standard TURN protocol. The usage of ephemeral credentials ensures that access to the TURN server can be controlled even if the credentials can be discovered by the user.

Jitsi Meet can fetch the TURN credentials from the XMPP server via [XEP-0215](https://xmpp.org/extensions/xep-0215.html). You can enable this functionality by setting `p2p.useStunTurn: true` in config.js. By properly configuring a common shared secret on your TURN server and your XMPP server, the XMPP server can deliver appropriate credentials and TURN urls to Jitsi Meet. coTURN natively supports shared secret authentication (--use-auth-secret-) and in prosody, you can use the [mod_turncredentials](https://modules.prosody.im/mod_turncredentials.html) module.

## Use TURN server on port 443

By default, TURN server listens on standard ports udp 3478 and tcp 5349(for tls connections). 
There are certain corporate networks which allow only tcp connections using port 443(https) and to cover 
this kind of scenarios it is useful to have TURN server listening on port 443 for tls connections.
Here is how to run nginx and TURN server on the same machine sharing port, for this you will need a second
dns for your turn domain pointing to the same machine (as a reference below we will use `turn-jitsi-meet.example.com`).

- You need to enable the multiplexing based on that new dns. You need to create a file in `/etc/nginx/modules` or `/etc/nginx/modules-available`. If you are placing the file in `/etc/nginx/modules-available` you need to add a symlink in `/etc/nginx/modules-enabled`.
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
Make sure you edit the file and replace `jitsi-meet.example.com` it your domain of deployment, `turn-jitsi-meet.example.com` with the DNS you will use for the TURN server and `__your_public_ip__` with your public ip of the deployment.
If you have more virtualhost make sure you add them here and do the port change and for them(the next step).

- Then go to /etc/nginx/site-available/your-conf and change your virtual host to listen on 4444 instead of 443.
```
server {
    listen 4444 ssl;
    listen [::]:4444 ssl;
    server_name jitsi-meet.example.com;
```

- Next you need to make sure Prosody is advertising the correct DNS and port for the TURN server. You should edit the line using port `5349` and make it look like (change port and address):
```
{ type = "turns", host = "turn-jitsi-meet.example.com", port = "443", transport = "tcp" }
```
- Now you need to make sure the TURN server (coturn) uses trusted certificates here is how to request those from 
Let's Encrypt, make sure you set correct values for the domain and email:
```
systemctl stop nginx
DOMAIN="turn-jitsi-meet.example.com"
EMAIL="myemail@example.com"
TURN_HOOK=/etc/letsencrypt/renewal-hooks/deploy/0000-coturn-certbot-deploy.sh
cp /usr/share/jitsi-meet-turnserver/coturn-certbot-deploy.sh $TURN_HOOK
chmod u+x $TURN_HOOK
sed -i "s/jitsi-meet.example.com/$DOMAIN/g" $TURN_HOOK

/usr/bin/certbot certonly --noninteractive \
    --standalone \
    -d $DOMAIN \
    --agree-tos --email $EMAIL \
    --deploy-hook $TURN_HOOK

systemctl start nginx
``` 
- After restarting prosody (systemctl restart prosody) you are good to go!
