---
id: faq
title: FAQ
---

## Comment migrer hors du multiplexage et activer les websockets de pont

Pendant un certain temps, nous utilisions le multiplexage nginx pour diffuser le contenu de Jitsi Meet sur https (port 443) et utilisions le même port pour exécuter un serveur tournant. Cela s'est avéré problématique (vous ne pouvez pas utiliser les websockets avec cette configuration) et nous nous en sommes éloignés. Voici comment supprimer le multiplexage et activer les websockets en faveur des canaux de données WebRTC.
1. Suppression du multiplexage dans nginx
  - supprimer `/etc/nginx/modules-enabled/60-jitsi-meet.conf`
  - Allez ensuite dans `/etc/nginx/sites-available/your-conf` et changez votre hôte virtuel pour écouter sur 443 au lieu de 4444.
2. Modifier la configuration de TurnServer
  - assurez-vous que votre turnserver écoute sur le port standard tls port `5349`. Assurez-vous que dans `/etc/turnserver.conf` vous avez ce qui suit : `tls-listening-port=5349`
  - Dans `/etc/prosody/conf.avail/your-conf.cfg.lua` prosody est chargé d'annoncer `turns` turn server on port `5349` en ayant cette ligne :
    `{ type = "tourne", host = "votre-domaine", port = "5349", transport = "tcp" }`. Assurez-vous de remplacer "votre-domaine" par le DNS de votre déploiement.
3. Ajoutez l'emplacement du bridge websocket dans votre configuration nginx (ajoutez-le après la section `location = /xmpp-websocket`):
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
4. Activez les websockets dans Jitsi Videobridge. Assurez-vous que dans `/etc/jitsi/videobridge/jvb.conf` vous avez :
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
Assurez-vous de remplacer "votre-domaine" par le DNS de votre déploiement.
5. Après avoir redémarré le pont (`systemctl restart jitsi-videobridge2`) et nginx (`systemctl restart nginx`), vous êtes prêt à partir !
