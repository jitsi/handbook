---
id: videosipgw
title: Configuration d'une passerelle SIP vidéo
sidebar_label: Video SIP gateway
---

Ce document décrit comment vous pouvez configurer jitsi-meet pour utiliser sipgw jibri et activer les salles dans la "boîte de dialogue Ajouter des personnes". Vous aurez besoin d'un déploiement fonctionnel de jibri configuré pour utiliser un périphérique vidéo SIP standard. Pour plus d'informations, consultez la [documentation jibri] (https://github.com/jitsi/jibri/blob/master/README.md).

Cette fonctionnalité est disponible pour les non-invités du système, donc cela repose sur le réglage dans config.js `` enableUserRolesBasedOnToken: true`` et la fourniture d'un jeton jwt lors de l'accès à la conférence.

*Configuration Jicofo :
modifiez /etc/jitsi/jicofo/sip-communicator.properties (ou similaire), définissez le MUC approprié pour rechercher les contrôleurs Jibri. Cela devrait être le même MUC que celui référencé dans le fichier config.json de jibri. Redémarrez Jicofo après avoir défini cette propriété.

```
  org.jitsi.jicofo.jibri.SIP_BREWERY=TheSipBrewery@conference.yourdomain.com
 ```

* Jitsi Meet configuration:
 - config.js: add 
```
  enableUserRolesBasedOnToken: true,
  peopleSearchQueryTypes: ['conferenceRooms'],
  peopleSearchUrl: 'https://api.yourdomain.com/testpath/searchpeople',
```

La combinaison des paramètres ci-dessus et la fourniture d'un jeton jwt activeront un bouton sous l'option d'invitation qui affichera la boîte de dialogue "Ajouter des personnes".

## Service de recherche de personnes

Lors de la recherche dans la boîte de dialogue, une demande de résultats est envoyée au service `peopleSearchUrl`.

La demande est au format suivant :
```
https://api.yourdomain.com/testpath/searchpeople?query=testroomname&queryTypes=[%22conferenceRooms%22]&jwt=somejwt
```
Les paramètres sont :
 - requête - Le texte saisi par l'utilisateur.
 - queryTypes - Quel type de résultats nous voulons personnes, salles, salles de conférence. Ceci est la valeur de config.js `peopleSearchQueryTypes`
 - jwt - Le jeton utilisé par l'utilisateur pour accéder à la conférence.

La réponse du service est un json au format suivant :
```
[
   {
       "id": "address@sip.domain.com",
       "name": "Some room name",
       "type": "videosipgw"
   },
  {
      "id": "address2@sip.domain.com",
      "name": "Some room name2",
      "type": "videosipgw"
  }
]
```
Le type doit être `videosipgw`, `name` est le nom affiché à l'utilisateur et `id` est l'adresse SIP à appeler par le jibri sipgw.