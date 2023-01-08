---
id: devops-guide-scalable
title: DevOps Guide (scalable setup)
sidebar_label: Scalable setup
---

Une installation Jitsi à serveur unique convient à une taille limitée de conférences simultanées.
Le premier facteur limitant est le composant videobridge, qui gère le trafic vidéo et audio réel.
Il est facile de redimensionner horizontalement les ponts vidéo en en ajoutant autant que nécessaire. Dans un environnement basé sur le cloud, les ponts peuvent en outre être augmentés ou réduits selon les besoins.

:::warning
Le [tutoriel YouTube sur la mise à l'échelle](https://www.youtube.com/watch?v=LyGV4uW8km8) est obsolète et décrit une ancienne méthode de configuration. L'installation actuelle par défaut de Jitsi Meet est déjà configurée pour une évolutivité horizontale.
:::

:::note
Construire une infrastructure évolutive n'est pas une tâche pour les administrateurs Jitsi débutants. Les instructions supposent que vous avez installé avec succès une version à nœud unique et que vous êtes à l'aise pour installer, configurer et déboguer le logiciel Linux. Ce n'est pas un guide étape par étape, mais vous montrera quels packages installer et quelles configurations modifier. Utilisez [l'installation manuelle] (devops-guide-manual) pour plus de détails sur la configuration de Jitsi sur un seul hôte. Il est fortement recommandé d'utiliser des outils de gestion de configuration comme Ansible ou Puppet pour gérer l'installation et la configuration.
:::

## Architecture (Single Jitsi-Meet, plusieurs ponts vidéo)

Une première étape consiste à scinder les fonctions de l'instance centrale jitsi-meet (avec nginx, prosody et jicofo) et
ponts vidéo.

Un schéma simplifié (avec des ports réseau ouverts) d'une installation avec une instance Jitsi-Meet et trois
Les ponts vidéo dont la charge est équilibrée se présentent comme suit. Chaque box est un serveur/VM.

```
               +                                       +
               |                                       |
               |                                       |
               v                                       v
          80, 443 TCP                          443 TCP, 10000 UDP
       +--------------+                     +---------------------+
       |  nginx       |  5222 TCP           |                     |
       |  Jitsi Meet  |<-------------------+|  jitsi-videobridge  |
       |  prosody     |         |           |                     |
       |  jicofo      |         |           +---------------------+
       +--------------+         |
                                |           +---------------------+
                                |           |                     |
                                +----------+|  jitsi-videobridge  |
                                |           |                     |
                                |           +---------------------+
                                |
                                |           +---------------------+
                                |           |                     |
                                +----------+|  jitsi-videobridge  |
                                            |                     |
                                            +---------------------+
```

## Dimensionnement des machines

Le serveur Jitsi-Meet n'aura généralement pas autant de charge (sauf si vous en avez beaucoup) de conférences
aller en même temps. Une machine à 4 processeurs et 8 Go conviendra probablement.

Les ponts vidéo auront plus de charge. 4 ou 8 CPU avec 8 Go de RAM semblent être une bonne configuration.


### Installation of Jitsi-Meet

En supposant que l'installation s'exécute sous le FQDN suivant : `meet.example.com` et que vous avez
Certificat SSL et clé dans `/etc/ssl/meet.example.com.{crt,key}`

Définissez les variables DebConf suivantes avant d'installer les packages. (Nous n'installons pas le package `jitsi-meet` qui s'en chargerait pour nous)

Installez le paquet `debconf-utils`

```
$ cat << EOF | sudo debconf-set-selections
jitsi-videobridge	jitsi-videobridge/jvb-hostname	string	meet.example.com
jitsi-meet	jitsi-meet/jvb-serve	boolean	false
jitsi-meet-prosody	jitsi-videobridge/jvb-hostname	string	meet.example.com
jitsi-meet-web-config	jitsi-meet/cert-choice	select	I want to use my own certificate
jitsi-meet-web-config	jitsi-meet/cert-path-crt	string	/etc/ssl/meet.example.com.crt
jitsi-meet-web-config	jitsi-meet/cert-path-key	string	/etc/ssl/meet.example.com.key
jitsi-meet-web-config	jitsi-meet/jaas-choice	boolean	false
EOF
```

Pour activer l'intégration avec [Jitsi Meet Components](https://jaas.8x8.vc/#/components) pour la prise en charge de la téléphonie, définissez l'option `jitsi-meet/jaas-choice` ci-dessus sur `true`.

Sur le serveur jitsi-meet, installez les packages suivants :

* `nginx`
* `prosody`
* `jicofo`
* `jitsi-meet-web`
* `jitsi-meet-prosody`
* `jitsi-meet-web-config`

### Installation de vidéobridge(s)

Par souci de simplicité, définissez les mêmes variables `debconf` que ci-dessus et installez

* `jitsi-videobridge2`

### Configuration de jitsi-meet

#### Firewall

Ouvrez les ports suivants :

Ouvert au monde :

* 80TCP
* 443 TCP

Ouvert aux ponts vidéo uniquement

* 5222 TCP (for Prosody)


#### NGINX

Créez le `/etc/nginx/sites-available/meet.example.com.conf` comme d'habitude

#### Prosody

Suivez les étapes de l'[installation manuelle](devops-guide-manual) pour les tâches de configuration

#### Jitsi-Meet

Adaptez `/usr/share/jitsi-meet/config.js` et `/usr/share/jitsi-meet/interface-config.js` à vos besoins spécifiques

#### Jicofo

Aucune modification nécessaire à partir de l'installation par défaut.

### Configuration du pont vidéo

#### Firewall

Ouvrez les ports suivants :

Ouvert au monde :

* 10000 UDP (for media)

#### jitsi-videobridge2

Aucune modification nécessaire à partir de la configuration par défaut.

## Essai

Après avoir redémarré tous les services (`prosody`, `jicofo` et tous les `jitsi-videobridge2`), vous pouvez voir dans
`/var/log/prosody/prosody.log` et
`/var/log/jitsi/jicofo.log` que les ponts vidéo se connectent à Prososy et que Jicofo les récupère.

Lorsqu'une nouvelle conférence commence, Jicofo choisit un pont vidéo et programme la conférence dessus.