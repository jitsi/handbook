---
id: third-party-software
title: Logiciel tiers
---

Cette page contient des liens vers des projets autour de Jitsi Meet, qui ne sont pas maintenus
par l'équipe Jitsi.

Veuillez conserver cette liste par ordre alphabétique.

:::warning
Comme ces packages ne sont pas maintenus par l'équipe Jitsi, veuillez demander
leurs forums/outils de suivi des problèmes respectifs pour obtenir de l'aide si vous rencontrez des problèmes.
:::

## Cketti's Jitsi Hacks

Quelques fonctionnalités supplémentaires utilisant des scripts injectés.

https://jitsi-hacks.cketti.eu/

## Flutter plugin

Plugin pour Flutter.

https://pub.dev/packages/jitsi_meet

## Galaxy

Galaxy est une application Web permettant aux administrateurs et aux utilisateurs de Jitsi d'organiser leur Jitsi
les réunions, les horaires des réunions et les participants.

https://github.com/emrahcom/galaxy

## GStreamer pipelinee integration

Intégrez les conférences Jitsi Meet aux pipelines GStreamer.

https://github.com/avstack/gst-meet

## Jitok: Jitsi Token generator

Outil Web d'assistance et API pour générer un JWT compatible avec Jitsi Meet.

GitHub: https://github.com/jitsi-contrib/jitok

Démo: https://jitok.emrah.com/

Discussion: https://community.jitsi.org/t/jitok-jitsi-token-generator/94683

## Jitsi-Admin

Une plateforme opensource pour organiser vos réunions. Comprend toutes les fonctions que nous connaissons
des grands outils de conférence

- Plan your Meeting
- Secure your Meeting with user login credentials
- Create a Report of each user visiting your conference
- Creating an appointment poll and transfer it into a conference with one click
- Dockerised for easy installation

Github: https://github.com/H2-invent/jitsi-admin

Démo: https://jitsi-admin.de

Docker:
https://github.com/H2-invent/jitsi-admin/wiki/Install-jitsi-admin-in-docker

## Jitsi Config Differ

Application Web pour comparer les configurations de référence entre les différentes versions de Jitsi. Il vise à aider les utilisateurs à identifier modifications potentielles des clés de configuration et des valeurs par défaut lors de la mise à niveau de leur déploiement.

https://shawnchin.github.io/jitsi-config-differ/

Github: https://github.com/shawnchin/jitsi-config-differ

## Jitsi URL Generator

Un outil simple pour illustrer comment les paramètres d'URL peuvent être composés pour personnaliser Jitsi.
Il n'expose qu'une petite fraction de ce qui est possible, mais devrait, espérons-le, aider
créer une familiarité que les utilisateurs peuvent ensuite appliquer à d'autres valeurs de configuration dans le
liste blanche.

https://shawnchin.github.io/jitsi-url-generator/

Github: https://github.com/shawnchin/jitsi-url-generator

## KeyCloak adapter

Autorisez Jitsi à utiliser Keycloak comme fournisseur d'identité et OIDC.

https://github.com/nordeck/jitsi-keycloak-adapter

## KeyCloak integration

Intégration de KeyCloak pour l'authentification.

https://github.com/D3473R/jitsi-keycloak

## Outlook Plugin

Plugin pour ajouter un bouton "Planifier une réunion Jitsi" à Microsoft Outlook.

GitHub: https://github.com/timetheoretical/jitsi-meet-outlook

## Prosody Plugins

Collection de plugins de prosodie fournis par la communauté qui peuvent être ajoutés à
déploiements Jitsi auto-hébergés.

https://github.com/jitsi-contrib/prosody-plugins

- **event_sync**: Envoie HTTP POST à ​​l'API externe lors d'événements d'occupant ou de chambre sont déclenchés.
- **frozen_nick**: Empêche les utilisateurs de modifier leur nom d'affichage si l'authentification JWT
  is used and name is provided in token context.
- **jibri_autostart**: Démarre automatiquement l'enregistrement lorsque le modérateur entre dans la salle.
- **lobby_autostart**: Active automatiquement le lobby pour toutes les pièces.
- **per_room_max_occupants**: Définissez différents occupants maximum en fonction du nom de la pièce et du sous-domaine.
- **secure_domain_lobby_bypass**: Permet aux utilisateurs authentifiés par domaine sécurisé de contourner le lobby.
- **time_restricted**: Définit une limite de temps pour les salles et met fin à la conférence lorsque le temps est écoulé.
- **token_affiliation**: Promeut les utilisateurs au rang de modérateurs en fonction de la propriété d'affiliation dans le jeton (JWT).
- **token_lobby_bypass**: Permet à certains utilisateurs de contourner le lobby en fonction d'un indicateur dans le jeton (JWT).
- **token_lobby_ondemand**: Activates lobby based on a flag in
  token (JWT).
- **token_owner_party**: Empêche les utilisateurs non autorisés de créer une salle et met fin à la conférence lorsque le propriétaire quitte.

## React Native plugin

Plugin pour React Native.

https://github.com/skrafft/react-native-jitsi-meet

## SAML to Jitsi JWT Authentification

Intégration de l'authentification SAML avec Shibboleth pour un générateur Jitsi Meet JWT.

Github: https://github.com/Renater/Jitsi-SAML2JWT

## Unity plugin

Plugin pour utiliser lib-jitsi-meet dans un environnement Unity (WebGL).

https://github.com/avstack/jitsi-meet-unity-demo

Plugin pour utiliser lib-jitsi-meet dans un environnement Unity (Android et iOS).

https://github.com/SariskaIO/Sariska-Media-Unity-Demo
