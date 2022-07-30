---
id: faq
title: FAQ
---

## How to migrate away from multiplexing and enable bridge websockets

For a while, we were using nginx multiplexing to serve Jitsi Meet's content on https(port 443) and use the same port for running a turn server.
This proved to be problematic(you cannot use websockets with this setup) and we moved away from it.
Here is how to remove multiplexing and enable websockets in favor of WebRTC Data Channels.
1. Dropping multiplexing in nginx
  - delete `/etc/nginx/modules-enabled/60-jitsi-meet.conf`
  - Then go to `/etc/nginx/sites-available/your-conf` and change your virtual host to listen on 443 instead of 4444.
2. Edit turnserver config
  - make sure your turnserver is listening on standard port tls port `5349`. Make sure in `/etc/turnserver.conf` you have the following: `tls-listening-port=5349`
  - In `/etc/prosody/conf.avail/your-conf.cfg.lua` prosody is instructed to announce `turns` turn server on port `5349` by having this line:
    `{ type = "turns", host = "your-domain", port = "5349", transport = "tcp" }`. Make sure you replace `your-domain` with the DNS of your deployment.
3. Add the bridge websocket location in your nginx config (add it after the `location = /xmpp-websocket` section):
  ```
    # colibri (JVB) websockets for jvb1
    location ~ ^/colibri-ws/default-id/(.*) {
       proxy_pass http://127.0.0.1:9090/colibri-ws/default-id/$1$is_args$args;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection "upgrade";
       tcp_nodelay on;
    }
  ```
4. Enable the websockets in Jitsi Videobridge. Make sure in `/etc/jitsi/videobridge/jvb.conf` you have:
  ```
  videobridge {
    http-servers {
        public {
            port = 9090
        }
    }
    websockets {
        enabled = true
        domain = "your-domain:443"
        tls = true
    }
}
  ```
  Make sure you replace `your-domain` with the DNS of your deployment.
5. After restarting the bridge (`systemctl restart jitsi-videobridge2`) and nginx (`systemctl restart nginx`) you are good to go!
