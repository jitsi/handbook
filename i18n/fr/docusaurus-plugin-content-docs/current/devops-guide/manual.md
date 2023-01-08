---
id: devops-guide-manual
title: Self-Hosting Guide - Manual installation
sidebar_label: Manual installation
---

:::warning L'installation manuelle n'est pas recommandée
Nous vous recommandons de suivre le document [installation rapide](https://jitsi.github.io/handbook/docs/devops-guide/devops-guide-quickstart/). Le document actuel décrit les étapes nécessaires pour installer un déploiement fonctionnel, mais les étapes sont faciles à gâcher et les paquets debian sont plus à jour, où ce document n'est parfois pas mis à jour pour refléter les dernières modifications.
:::

Ceci décrit la configuration d'un serveur `jitsi.example.com` sur une distribution basée sur Debian.
**Pour les autres distributions**, vous pouvez adapter les étapes (en particulier en modifiant les installations des packages de dépendances (par exemple pour nginx) et les chemins en conséquence) afin qu'elles correspondent à la distribution de votre hôte.
Vous devrez également générer des mots de passe pour `YOURSECRET1`, `YOURSECRET2` et `YOURSECRET3`.

Il existe également des [exemples de fichiers de configuration](https://github.com/jitsi/jitsi-meet/tree/master/doc/debian/) complets disponibles, mentionnés dans chaque section.

Il y a des configurations supplémentaires à faire pour une [installation évolutive](devops-guide-scalable).

## Network description

<!-- Replace below diagram with [Mermaid](http://mermaid-js.github.io/mermaid/) diagram in future... -->

This is how the network looks:
```
                   +                           +
                   |                           |
                   |                           |
                   v                           |
                  443                          |
               +-------+                       |
               |       |                       |
               | Nginx |                       |
               |       |                       |
               +--+-+--+                       |
                  | |                          |
+------------+    | |    +--------------+      |
|            |    | |    |              |      |
| Jitsi Meet +<---+ +--->+ prosody/xmpp |      |
|            |files 5280 |              |      |
+------------+           +--------------+      v
                         5222 ^    ^ 5222    10000
                +--------+    |    |    +-------------+
                |        |    |    |    |             |
                | jicofo +----^    ^----+ videobridge |
                |        |              |             |
                +--------+              +-------------+
```

## Installer la prosodie
```bash
apt-get install prosody
```

## Configurer la prosodie
Ajoutez le fichier de configuration dans `/etc/prosody/conf.avail/jitsi.example.com.cfg.lua` :

- ajoutez votre section d'hôte virtuel de domaine :

```
VirtualHost "jitsi.example.com"
    authentication = "anonymous"
    ssl = {
        key = "/var/lib/prosody/jitsi.example.com.key";
        certificate = "/var/lib/prosody/jitsi.example.com.crt";
    }
    modules_enabled = {
        "bosh";
        "pubsub";
    }
    c2s_require_encryption = false
```
- ajouter un domaine avec authentification pour l'utilisateur focus conférence :
```
VirtualHost "auth.jitsi.example.com"
    ssl = {
        key = "/var/lib/prosody/auth.jitsi.example.com.key";
        certificate = "/var/lib/prosody/auth.jitsi.example.com.crt";
    }
    authentication = "internal_hashed"
```
- ajouter un utilisateur focus aux administrateurs du serveur :
```
admins = { "focus@auth.jitsi.example.com" }
```
- et enfin configurer les composants :
```
Component "conference.jitsi.example.com" "muc"
Component "jitsi-videobridge.jitsi.example.com"
    component_secret = "YOURSECRET1"
Component "focus.jitsi.example.com"
    component_secret = "YOURSECRET2"
```

Ajouter un lien pour la configuration ajoutée
```bash
ln -s /etc/prosody/conf.avail/jitsi.example.com.cfg.lua /etc/prosody/conf.d/jitsi.example.com.cfg.lua
```

Générez des certificats pour le domaine :
```bash
prosodyctl cert generate jitsi.example.com
prosodyctl cert generate auth.jitsi.example.com
```

Ajoutez auth.jitsi.example.com aux certificats de confiance sur la machine locale :
```bash
ln -sf /var/lib/prosody/auth.jitsi.example.com.crt /usr/local/share/ca-certificates/auth.jitsi.example.com.crt
update-ca-certificates -f
```
Notez que le drapeau `-f` est nécessaire s'il reste des liens symboliques d'une installation précédente.

Si vous utilisez un package JDK non fourni par Debian, comme ceux d'adoptjdk, vous devez également informer votre JDK du nouveau magasin de clés de certificat Debian remplaçant ou liant le JDK `cacerts`. Exemple, si vous utilisez le JDK d'adoptjdk :
```
cd /usr/lib/jvm/adoptopenjdk-8-hotspot-amd64/jre
ln -sf /etc/ssl/certs/java/cacerts lib/security/cacerts
```

Créer un utilisateur cible de la conférence :
```bash
prosodyctl register focus auth.jitsi.example.com YOURSECRET3
```

Redémarrez le serveur Prosody XMPP avec la nouvelle configuration
```bash
prosodyctl restart
```

## Installer Nginx
```bash
apt-get install nginx
```

Ajoutez un nouveau fichier `jitsi.example.com` dans `/etc/nginx/sites-available` (voir aussi l'exemple de fichier de configuration) :
```
server_names_hash_bucket_size 64;

server {
    listen 0.0.0.0:443 ssl http2;
    listen [::]:443 ssl http2;
    # tls configuration that is not covered in this guide
    # we recommend the use of https://certbot.eff.org/
    server_name jitsi.example.com;
    # set the root
    root /srv/jitsi-meet;
    index index.html;
    location ~ ^/([a-zA-Z0-9=\?]+)$ {
        rewrite ^/(.*)$ / break;
    }
    location / {
        ssi on;
    }
    # BOSH, Bidirectional-streams Over Synchronous HTTP
    # https://en.wikipedia.org/wiki/BOSH_(protocol)
    location /http-bind {
        proxy_pass      http://localhost:5280/http-bind;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header Host $http_host;
    }
    # external_api.js must be accessible from the root of the
    # installation for the electron version of Jitsi Meet to work
    # https://github.com/jitsi/jitsi-meet-electron
    location /external_api.js {
        alias /srv/jitsi-meet/libs/external_api.min.js;
    }
}
```

Ajouter un lien pour la configuration ajoutée
```bash
cd /etc/nginx/sites-enabled
ln -s ../sites-available/jitsi.example.com jitsi.example.com
```

## Installer Jitsi Videobridge

:::warning
Cette méthode n'est plus prise en charge.
Vous pouvez soit installer le JVB à partir de https://download.jitsi.org/stable/ et suivre ces [Instructions](https://jitsi.org/downloads/ubuntu-debian-installations-instructions/) ou [cloner le dépôt ](https://github.com/jitsi/jitsi-videobridge) et créez-le manuellement.
:::

Visitez https://download.jitsi.org/jitsi-videobridge/linux pour déterminer le numéro de build actuel, téléchargez-le et décompressez-le :
```bash
wget https://download.jitsi.org/jitsi-videobridge/linux/jitsi-videobridge-linux-{arch-buildnum}.zip
unzip jitsi-videobridge-linux-{arch-buildnum}.zip
```

Installer JRE s'il est manquant:
```
apt-get install openjdk-8-jre
```

_REMARQUE: Lors de l'installation sur des versions plus anciennes de Debian, gardez à l'esprit que vous avez besoin de JRE >= 1.7._

Créez `~/.sip-communicator/sip-communicator.properties` dans le dossier personnel de l'utilisateur qui lancera Jitsi Videobridge :
```bash
mkdir -p ~/.sip-communicator
cat > ~/.sip-communicator/sip-communicator.properties << EOF
org.jitsi.impl.neomedia.transform.srtp.SRTPCryptoContext.checkReplay=false
# The videobridge uses 443 by default with 4443 as a fallback, but since we're already
# running nginx on 443 in this example doc, we specify 4443 manually to avoid a race condition
org.jitsi.videobridge.TCP_HARVESTER_PORT=4443
EOF
```

Démarrez le pont vidéo avec :
```bash
./jvb.sh --host=localhost --domain=jitsi.example.com --secret=YOURSECRET1 &
```
Or autostart it by adding the line in `/etc/rc.local`:
```bash
/bin/bash /root/jitsi-videobridge-linux-{arch-buildnum}/jvb.sh --host=localhost --domain=jitsi.example.com --secret=YOURSECRET1 </dev/null >> /var/log/jvb.log 2>&1
```

## Installer Jitsi Conference Focus (jicofo)

Installez JDK et Maven s'ils sont manquants :
```
apt-get install openjdk-8-jdk maven
```

_REMARQUE: Lors de l'installation sur des versions plus anciennes de Debian, gardez à l'esprit que vous avez besoin de JDK >= 1.7._

Cloner la source du dépôt Github :
```bash
git clone https://github.com/jitsi/jicofo.git
```
Construire le paquet.
```bash
cd jicofo
mvn package -DskipTests -Dassembly.skipAssembly=false
```
Run jicofo:
```bash
=======
unzip target/jicofo-1.1-SNAPSHOT-archive.zip
cd jicofo-1.1-SNAPSHOT-archive'
./jicofo.sh --host=localhost --domain=jitsi.example.com --secret=YOURSECRET2 --user_domain=auth.jitsi.example.com --user_name=focus --user_password=YOURSECRET3
```

## Déployer Jitsi Meet
Commander et configurer Jitsi Meet :
```bash
cd /srv
git clone https://github.com/jitsi/jitsi-meet.git
cd jitsi-meet
npm install
make
```

_REMARQUE: Lors de l'installation sur des distributions plus anciennes, gardez à l'esprit que vous avez besoin de Node.js >= 12 et npm >= 6._

Modifiez les noms d'hôtes dans `/srv/jitsi-meet/config.js` (voir aussi l'exemple de fichier de configuration) :
```
var config = {
    hosts: {
        domain: 'jitsi.example.com',
        muc: 'conference.jitsi.example.com',
        bridge: 'jitsi-videobridge.jitsi.example.com',
        focus: 'focus.jitsi.example.com'
    },
    useNicks: false,
    bosh: '//jitsi.example.com/http-bind', // FIXME: use xep-0156 for that
    //chromeExtensionId: 'diibjkoicjeejcmhdnailmkgecihlobk', // Id of desktop streamer Chrome extension
    //minChromeExtVersion: '0.1' // Required version of Chrome extension
};
```

Vérifiez que la configuration nginx est valide et rechargez nginx :
```bash
nginx -t && nginx -s reload
```

## Courir derrière NAT
Jitsi Videobridge peut fonctionner derrière un NAT, à condition que les deux ports requis soient routés (transférés) vers la machine sur laquelle il s'exécute. Par défaut, ces ports sont `TCP/4443` et `UDP/10000`.

Si vous n'acheminez pas ces deux ports, Jitsi Meet ne fonctionnera qu'avec la vidéo pour deux personnes, interrompant 3 personnes ou plus essayant de montrer la vidéo.

`TCP/443` est requis pour le serveur Web qui peut être exécuté sur une autre machine que celle sur laquelle le Jitsi Videobrige est exécuté.

Les lignes supplémentaires suivantes doivent être ajoutées au fichier `~/.sip-communicator/sip-communicator.properties` (dans le répertoire personnel de l'utilisateur exécutant le pont vidéo) :
```
org.ice4j.ice.harvest.NAT_HARVESTER_LOCAL_ADDRESS=<Local.IP.Address>
org.ice4j.ice.harvest.NAT_HARVESTER_PUBLIC_ADDRESS=<Public.IP.Address>
```

## Organisez votre première conférence
Vous êtes maintenant prêt à organiser votre première rencontre en vous rendant sur http://jitsi.example.com

## Activation de l'enregistrement
[Jibri](https://github.com/jitsi/jibri) est un ensemble d'outils pour enregistrer et/ou diffuser une conférence Jitsi Meet.