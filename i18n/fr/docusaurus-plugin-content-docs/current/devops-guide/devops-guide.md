---
id: devops-guide-start
title: Guide d'auto-hébergement - Aperçu
sidebar_label: Overview
---

Bienvenue dans le guide de l'auto-hébergement !

:::note
Ces guides vous aident à **_héberger votre propre serveur Jitsi-Meet_**.
Si vous souhaitez organiser une visioconférence sans mettre en place d'infrastructure, utilisez plutôt https://meet.jit.si.
:::

Le contenu est divisé en 3 guides :

- [Debian/Ubuntu server guide](devops-guide/quickstart.md): Décrit l'installation rapide sur les distributions basées sur Debian.

- [Docker guide](devops-guide/docker.md): Décrit comment utiliser l'image Docker officielle de Jitsi-Meet.

- [Manual installation guide](devops-guide/manual.md): Décrit l'installation manuelle de tous les composants (adaptable pour d'autres distributions).

:::note First, a bit of general advice
Jitsi Meet étant basé sur [WebRTC](https://en.wikipedia.org/wiki/WebRTC), un lien de communication crypté (https) est nécessaire pour faire fonctionner le multimédia, et la configuration n'est pas toujours anodine.

La meilleure option est un serveur Internet avec un certificat pour un domaine enregistré dans le [DNS](https://en.wikipedia.org/wiki/Domain_Name_System#Domain_name_registration).

Bien qu'il soit possible de configurer un serveur sur un réseau privé et/ou un certificat auto-signé, cela peut être moins simple et vous pouvez vous attendre à des difficultés, d'abord si vous souhaitez accéder à la fois au réseau privé et à l'internet public, et ensuite lors de l'utilisation téléphones car ces clients n'acceptent souvent pas les certificats auto-signés.

En cas de problème avec les clients utilisant des téléphones, [vérifiez votre certificat](https://whatsmychaincert.com).
:::
