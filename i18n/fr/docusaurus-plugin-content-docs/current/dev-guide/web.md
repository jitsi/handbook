---
id: dev-guide-web
title: Guide du développeur (Web)
sidebar_label: Démarrer
---

Bienvenue dans le guide des développeurs pour le Web ! Ce guide vous aidera à configurer un environnement de développement pour commencer à travailler sur les applications Jitsi Meet.

:::caution
La création des applications/SDK n'est pas prise en charge sous Windows.
:::

## Building the sources

:::note
Node.js >= 16 et npm >= 8 sont requis.
:::

Sur les systèmes Debian/Ubuntu, les packages requis peuvent être installés avec :
- Téléchargez "Linux Binaries (x64)" à partir de https://nodejs.org/en/download/
- Installez Node.js en suivant ces instructions : https://github.com/nodejs/help/wiki/Installation

Alors vas-y:
```bash
# Cloner le référentiel
git clone https://github.com/jitsi/jitsi-meet
cd ./jitsi-meet
npm install
# Pour construire l'application Jitsi Meet, tapez simplement
make
```

:::warning
**NE PAS** exécuter `npm update` ou utiliser `yarn` ou supprimer `package-lock.json`. Les dépendances sont épinglées pour une raison.
:::

### Exécution avec webpack-dev-server pour le développement

Utilisez la commande suivante dans votre terminal :

```bash
make dev
```

Par défaut, le déploiement backend utilisé est `alpha.jitsi.net`. Vous pouvez faire pointer l'application Jitsi Meet vers un backend différent en utilisant un serveur proxy. Pour cela, définissez la variable WEBPACK_DEV_SERVER_PROXY_TARGET :

```bash
export WEBPACK_DEV_SERVER_PROXY_TARGET=https://your-example-server.com
make dev
```

L'application doit être exécutée sur https://localhost:8080/

#### Certificate Error

Les navigateurs peuvent afficher une erreur de certificat car le certificat de développement est auto-signé. Il est prudent de ne pas tenir compte de ceux
avertissement et continuez sur votre site.

### Building .debs

Pour créer un deb, vous pouvez facilement le déployer sur un serveur de test public, assurez-vous d'avoir les sources lib-jitsi-meet que vous souhaitez, puis :
```
npm install
make
dpkg-buildpackage -A -rfakeroot -us -uc -tc
```

Vous aurez un tas de fichiers .deb dans le répertoire parent, et vous pourrez pousser la source mise à jour sur votre serveur et l'installer avec le fichier deb jitsi-meet-web.

### Exécution à partir de la source sur un déploiement existant

Suivez le document https://community.jitsi.org/t/how-to-how-to-build-jitsi-meet-from-source-a-developers-guide/75422