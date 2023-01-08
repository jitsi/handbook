---
id: user-guide-advanced
title: Guide de l'utilisateur (avancé)
sidebar_label: Options avancées
---

Il existe quelques options pour modifier le lien d'invitation afin de débloquer plus de fonctionnalités dans Jitsi. Les paramètres suivants s'appliquent aux versions Web, iframe et mobile.

Toutes les clés listées ici sont préfixées par `config.`.
Vous choisissez une clé, la combinez avec sa valeur en utilisant `=` et liez les paramètres avec `&`, par ex. `#config.defaultLanguage=fr&config.minParticipants=3`.

<!--
  See also for implementation:
  https://github.com/jitsi/jitsi-meet/blob/b0188a71841c966122c3cce8c7023b7de8e32a82/config.js
  https://github.com/jitsi/jitsi-meet/blob/b0188a71841c966122c3cce8c7023b7de8e32a82/react/features/base/config/configWhitelist.js
  https://github.com/jitsi/jitsi-meet/blob/b0188a71841c966122c3cce8c7023b7de8e32a82/react/features/base/config/functions.any.js#L70
-->

## Invitations

Ces paramètres affectent la façon dont vous pouvez inviter des personnes avant ou pendant une session.

Key                             | Évaluer  | Effet
------------------------------- | ------ | -----------------------------------
`disableInviteFunctions`        | `true` | désactiver la fonction d'invitation de l'application
`minParticipants`               | `2`    | remplacer le nombre minimum de participants avant de démarrer un appel
`prejoinPageEnabled`            | `true` | afficher une page intermédiaire avant de rejoindre pour permettre le réglage des appareils

## UI

Ces paramètres ont un effet sur l'interface utilisateur.

Key                             | Évaluer  | Effet
------------------------------- | ------ | -----------------------------------
`defaultLanguage`               | `en`   | changer la langue par défaut de l'interface utilisateur
`disableThirdPartyRequests`     | `true` | générer des avatars localement et désactiver l'intégration de callstats
`enableDisplayNameInStats`      | `true` | envoyer les noms d'affichage des participants à callstats
`enableEmailInStats`            | `true` | envoyer un e-mail (si disponible) à callstats et à d'autres analyses
`enableInsecureRoomNameWarning` | `true` | afficher une étiquette d'avertissement si le nom de la salle est considéré comme non sécurisé

## Video

Utilisez ces paramètres pour influencer la vidéo d'une session.

Key                             | Évaluer  | Effet
------------------------------- | ------ | -----------------------------------
`desktopSharingFrameRate.min`   | `5`    | remplacer la fréquence d'images minimale pour le partage de bureau
`desktopSharingFrameRate.max`   | `5`    | remplacer la fréquence d'images maximale pour le partage de bureau
`startWithVideoMuted`           | `true` | désactiver la vidéo lors de l'adhésion

## Audio

Utilisez ces paramètres pour influencer l'audio d'une session.

Key                             | Évaluer  | Effet
------------------------------- | ------ | -----------------------------------
`disableAudioLevels`            | `true` | désactiver l'interrogation des statistiques audio (améliorant ainsi peut-être les performances)
`disableRemoteMute`             | `true` | désactiver toutes les opérations de mise en sourdine des participants distants
`startWithAudioMuted`           | `true` | désactiver l'entrée audio lors de l'adhésion
`startSilent`                   | `true` | couper l'entrée et la sortie audio