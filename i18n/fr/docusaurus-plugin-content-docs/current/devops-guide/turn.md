---
id: turn
title: Setting up TURN
sidebar_label: TURN setup
---

Les appels un à un doivent éviter de passer par le JVB pour des performances optimales et une utilisation optimale des ressources. C'est pourquoi nous avons ajouté le mode peer-to-peer où les deux participants se connectent directement l'un à l'autre. Malheureusement, une connexion directe n'est pas toujours possible entre les participants. Dans ces cas, vous pouvez utiliser un serveur TURN pour relayer le trafic (n.b. le JVB fait bien plus que simplement relayer le trafic, donc ce n'est pas la même chose que d'utiliser le JVB pour "relais" le trafic).

Ce document décrit comment activer la prise en charge du serveur TURN dans les appels individuels dans Jitsi Meet. Même s'il donne quelques conseils pour configurer [prosody](https://prosody.im) et [coTURN](https://github.com/coturn/coturn), il suppose un serveur TURN correctement configuré et un serveur XMPP configuré.

Une façon de configurer la prise en charge de TURN dans meet consiste à utiliser une configuration statique. Vous pouvez simplement remplir l'option `p2p.stunServers` avec les valeurs appropriées, par exemple :

    [
        { urls: 'turn:turn.example.com1', username: 'user', credential: 'pass' },
    ]

:::caution
Cette technique ne nécessite aucune configuration spéciale sur le serveur XMPP, mais elle expose les informations d'identification à votre serveur TURN et d'autres personnes peuvent utiliser votre bande passante librement, donc bien qu'elle soit simple à mettre en œuvre, elle n'est pas recommandée.
:::

Ce [projet](https://tools.ietf.org/html/draft-uberti-behave-turn-rest-00) décrit une API REST standard proposée pour obtenir l'accès aux services TURN via des identifiants éphémères (c'est-à-dire limités dans le temps) . Ces informations d'identification sont vendues par un service Web via HTTP, puis fournies et vérifiées par un serveur TURN à l'aide du protocole TURN standard. L'utilisation d'informations d'identification éphémères garantit que l'accès au serveur TURN peut être contrôlé même si les informations d'identification peuvent être découvertes par l'utilisateur.

Jitsi Meet peut récupérer les informations d'identification TURN du serveur XMPP via [XEP-0215](https://xmpp.org/extensions/xep-0215.html) et ceci est configuré par défaut en utilisant [mod_external_services](https://prosody .im/doc/modules/mod_external_services). Le turnserver configuré par défaut utilise les ports par défaut pour le protocole UDP 3478 et TCP(TLS) sur 5349.

## Utiliser le serveur TURN sur le port 443

Par défaut, le serveur TURN écoute sur les ports standards UDP 3478 et TCP 5349 (pour les connexions TLS).
Certains réseaux d'entreprise n'autorisent que les connexions TCP utilisant le port 443 (https) et pour couvrir
ce genre de scénarios, il est utile que le serveur TURN écoute sur le port 443 pour les connexions TLS.
Voici comment exécuter le serveur nginx et TURN sur le même port de partage de machine. Pour cela, vous aurez besoin d'un deuxième enregistrement DNS pour votre domaine tournant pointant vers la même machine (comme référence ci-dessous, nous utiliserons `turn-jitsi-meet.example.com`).

- Vous devez activer le multiplexage basé sur ce nouvel enregistrement DNS. Vous devez créer un fichier dans `/etc/nginx/modules` ou `/etc/nginx/modules-available`. Si vous placez le fichier dans `/etc/nginx/modules-available`, vous devez ajouter un lien symbolique dans `/etc/nginx/modules-enabled`.
Le contenu du fichier doit être :
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
Assurez-vous de modifier le fichier et de remplacer `jitsi-meet.example.com` par votre domaine de déploiement, `turn-jitsi-meet.example.com` par le nom DNS que vous utiliserez pour le serveur TURN et `__your_public_ip__` par votre IP publique du déploiement.
Si vous avez plus d'hôtes virtuels, assurez-vous de les ajouter ici et faites le changement de port pour eux (l'étape suivante).

- Allez ensuite dans `/etc/nginx/site-available/your-conf` et changez votre hôte virtuel pour écouter sur le port 4444 au lieu de 443.
```
server {
    listen 4444 ssl;
    listen [::]:4444 ssl;
    server_name jitsi-meet.example.com;
```

- Ensuite, vous devez vous assurer que Prosody annonce le nom DNS et le port corrects pour le serveur TURN. Vous devez modifier la ligne en utilisant le port "5349" et la faire ressembler à (modifier le port et l'adresse) :
```
{ type = "turns", host = "turn-jitsi-meet.example.com", port = "443", transport = "tcp" }
```
- Vous devez maintenant vous assurer que le serveur TURN (coturn) utilise des certificats de confiance. Voici comment les demander à Let's Encrypt (assurez-vous de définir des valeurs correctes pour le domaine et l'e-mail) :
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
- Après avoir redémarré prosody (`systemctl restart prosody`), vous êtes prêt à partir !