---
id: devops-guide-opensuse
title: Self-Hosting Guide - openSUSE
sidebar_label: openSUSE
---

Ce document décrit les étapes d'une installation rapide de Jitsi-Meet, associée à un seul Videobridge et un seul Jicofo sur openSUSE Leap 15.2.

__Remarque__: De nombreuses étapes d'installation nécessitent un accès root.

## Installation

1.   Ajoutez le dépôt OBS :
   __Remarque_:__ Lorsque Jitsi-Meet sera fusionné avec openSUSE Factory, cela deviendra obsolète.

```shell
zypper addrepo https://download.opensuse.org/repositories/home:/SchoolGuy:/jitsi/openSUSE_Leap_15.2/home:SchoolGuy:jitsi.repo
```

2. Actualisez les dépôts :

```shell
zypper refresh
```

3. Installez Jitsi-Meet et ses dépendances :

```shell
zypper install nginx prosody lua51-zlib jitsi-meet jitsi-videobridge jitsi-jicofo
```

### Suppléments facultatifs

* Installer le module complémentaire Jibri: `zypper install jitsi-jibri`
* Installer le module complémentaire Jigasi: `zypper install jitsi-jigasi`

## Configuration

Les sections suivantes décrivent comment configurer les différents packages.
Remplacez `<FQDN>` par votre nom de domaine et `YOURSECRET3` par un mot de passe fort.

### Prosodie

* Ouvrez et ajustez le fichier de configuration de Prosody sous `/etc/prosody/prosody.cfg.lua` :

```lua
---------- Server-wide settings ----------
admins = { "focus@auth.<FQDN>" }
cross_domain_bosh = true;
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

* Créez un nouveau fichier de configuration nommé `<FQDN>.cfg.lua` dans `/etc/prosody/conf.avail/` avec le contenu suivant :

```lua title="/etc/prosody/conf.avail/meet.example.org.cfg.lua"
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
```

*  Créez un lien symbolique pour la configuration :
`ln --symbolic /etc/prosody/conf.avail/<FQDN>.cfg.lua /etc/prosody/conf.d/<FQDN>.cfg.lua`

* Créez les certificats via `prosodyctl cert generate <DOMAIN>`.
La valeur `<DOMAIN>` représente les URL suivantes.

    * `auth.<FQDN>`
    * `conference.<FQDN>`
    * `conferenceduration.<FQDN>`
    * `internal.auth.<FQDN>`
    * `FQDN`
    * `focus.<FQDN>`
    * `jitsi-videobridge.<FQDN>`
    * `callcontrol.<FQDN>` __Note:__ This is only needed if you deploy Jigasi
    * `recorder.<FQDN>` __Note:__ This is only needed if you deploy Jibri
* `/var/lib/prosody/` : créez un lien symbolique pour tous les fichiers `*.crt` et `*.key` générés vers `/etc/prosody/certs/`.

:::note
Veuillez ne pas lier d'autres certificats.
:::

* Ajoutez les certificats au keystore du système :
    * `ln --symbolic --force /var/lib/prosody/auth.<FQDN>.crt /usr/local/share/ca-certificates/auth.<FQDN>.crt`
    * `update-ca-certificates --fresh`
* Créer un utilisateur cible de la conférence : `prosodyctl register focus auth.<FQDN> YOURSECRET3`

### Nginx

Modifiez le fichier `jitsi-meet.conf` dans `/etc/nginx/vhosts.d/` (qui a été installé avec `jitsi-meet`) et procédez comme suit :

* Vérifiez la valeur de `server_name`.
* Vérifiez les certificats TLS (Let's Encrypt pour une utilisation en production, Prosody pour les tests, par exemple).

__Remarque:__ Si vous utilisez un serveur existant, assurez-vous également d'ajuster la partie websocket et bosh.

### Jitsi-Meet

* Go to `/srv/jitsi-meet` and edit `config.js`:

```js title="/srv/jitsi-meet/config.js"
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

__Remarque:__ Veuillez noter qu'il s'agit de la configuration minimale.

### Jitsi-Videobridge

__Remarque:__ Nous utilisons une combinaison de la [nouvelle configuration Videobridge](https://github.com/jitsi/jitsi-videobridge/blob/master/doc/muc.md#videobridge-configuration) et de l'ancienne avec le fichier `sip-communicator.properties`. Nous devons le faire à cause de la propriété `STATISTICS_TRANSPORT`.

Si nous supprimons `org.jitsi.videobridge.STATISTICS_TRANSPORT=muc,colibri`
depuis `sip-communicator.properties`, le pont vidéo ne fonctionnera pas !

* Allez dans le répertoire `/etc/jitsi/videobridge`
* Éditez le fichier `jitsi-videobridge.conf`
    * Définissez `JVB_HOSTNAME` sur votre `<FQDN>`.
    * Définissez `JVB_SECRET` sur votre propre secret.
* Éditez le fichier `application.conf` et ajustez les valeurs sous `apis`
  et `websockets`, en particulier définir un identifiant unique comme `muc_nickname`
  avec `uuidgen` par exemple.

```HUCON
apis {
    xmpp-client {
      configs {
        xmpp-server-1 {
          hostname="localhost"
          domain = "auth.${FQDN}"
          username = "focus"
          password = "YOURSECRET3"
          muc_jids = "JvbBrewery@internal.auth.${FQDN}"
          # The muc_nickname must be unique across all jitsi-videobridge instances
          muc_nickname = "unique-id"
          disable_certificate_verification = true
        }
      }
    }
}
websockets {
  enabled=true
  server-id="default-id"
  domain="${FQDN}"
}
```

### Jitsi-Jicofo

* Allez dans le répertoire `/etc/jitsi/jicofo`
* Editez le fichier `jitsi-jicofo.conf`
    * Définissez la propriété `JICOFO_HOSTNAME` sur `<FQDN>`.
    * Définissez la propriété `JICOFO_SECRET` sur le mot de passe que l'utilisateur Prosody a obtenu dans la configuration ci-dessus.
    * Définissez la propriété `JICOFO_AUTH_DOMAIN` sur `auth.<FQDN>`.
    * Définissez la propriété `JICOFO_AUTH_USER` sur l'utilisateur Prosody à partir de la configuration ci-dessus.
* Modifier le fichier `sip-cmmunicator.properties`
    * Définissez la propriété `org.jitsi.jicofo.BRIDGE_MUC` sur `JvbBrewery@internal.auth.<FQDN>`.
    * Définissez la propriété `org.jitsi.jicofo.jibri.BREWERY` sur `JibriBrewery@internal.auth.<FQDN>`.
    * Selon la configuration de votre certificat, définissez `org.jitsi.jicofo.ALWAYS_TRUST_MODE_ENABLED` sur `true` ou `false`.

## Add-On: Jitsi-Jibri

* Ajoutez au fichier `/etc/prosody/conf.avail/<FQDN>.cfg.lua` l'extrait suivant à la fin du fichier.

```lua
VirtualHost "recorder.<FQDN>"
  modules_enabled = {
    "ping";
  }
  authentication = "internal_plain"
```

* Exécutez `prosodyctl register jibri auth.<FQDN> YOURSECRET3` et remplacez `YOURSECRET3` par un nom approprié.
* `prosodyctl register recorder recorder.<FQDN> YOURSECRET3` et remplacez `YOURSECRET3` par un nom approprié.
* Allez dans le répertoire `/etc/jitsi/jibri` et modifiez les propriétés suivantes que vous voyez ci-dessous. Le reste peut être laissé tel quel.

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

* Modifiez le fichier `/etc/jitsi/jicofo/sip-communicator.properties` et ajoutez les propriétés suivantes :

```HUCON
org.jitsi.jicofo.jibri.BREWERY=JibriBrewery@internal.auth.<FQDN>
org.jitsi.jicofo.jibri.PENDING_TIMEOUT=90
```

* Modifiez le fichier `/srv/jitsi-meet/config.js` et définissez les propriétés suivantes :

```js
fileRecordingsEnabled: true, // If you want to enable file recording
liveStreamingEnabled: true, // If you want to enable live streaming
hiddenDomain: 'recorder.<FQDN>',
```

* Modifiez `/srv/jitsi-meet/interface_config.js` et assurez-vous que le tableau `TOOLBAR_BUTTONS` contient les valeurs `recording` et `livestreaming` si vous souhaitez ces fonctionnalités.

```js
TOOLBAR_BUTTONS: [
        'microphone', 'camera', 'closedcaptions', 'desktop', 'embedmeeting', 'fullscreen',
        'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
        'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
        'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
        'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone', 'security'
],
```

## Add-On: Jitsi-Jigasi

__Remarque des empaqueteurs openSUSE:__ Nous l'avons emballé mais nous n'avons pas l'infrastructure pour mettre en place ce composant. Par conséquent, nous ne pouvons pas fournir de guide pour cela jusqu'à présent.

## Prestations de service

Maintenant, tout devrait fonctionner. Cela signifie que vous êtes prêt à tout démarrer :

1. `systemctl start prosodie`
1. `systemctl start jitsi-videbridge`
1. `systemctl start jitsi-jicofo`
1. `systemctl start jitsi-jibri` (si configuré et installé au préalable)
1. `systemctl start jitsi-jigasi` (si configuré et installé au préalable)
1. `systemctl démarrer nginx`

## Remarques finales

* Le logiciel Jitsi a beaucoup de dépendances et nous vous recommandons donc de l'exécuter sur un hôte dédié pour Jitsi.
* La mise à jour de Jitsi est cruciale pour se débarrasser des bogues et des dépendances mises à jour avec d'éventuels correctifs de sécurité.
* Bien que tenté par Chrome : n'installez pas une pile X11 complète comme KDE ou Gnome pour cela.
* Ne mélangez pas `rpms` ou `debs` avec une installation source du même composant.
* Sauvegardez votre configuration en toute sécurité, de préférence dans un VCS. Cela permet d'économiser du temps et de la douleur lors des restaurations ou de la résolution d'autres problèmes.