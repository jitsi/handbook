---
id: dev-guide-iframe-events
title: Événements
---

L'objet `JitsiMeetExternalAPI` implémente l'API [EventEmitter] pour émettre et écouter des événements.

Vous pouvez ajouter des écouteurs d'événements au Jitsi Meet intégré à l'aide de la méthode **`addListener`** :

```javascript
api.addListener(event, listener);
```

Si vous souhaitez supprimer un écouteur, vous pouvez utiliser le**`removeListener`** method:

```javascript
api.removeListener(event, listener);
```

Le paramètre **`event`** est un objet chaîne avec le nom de l'événement.

Le paramètre **`listener`** est un objet fonction avec un argument qui crée une notification lorsque l'événement se produit avec les données d'événement associées.

Les événements suivants sont actuellement pris en charge :

### cameraError

Fournit des notifications d'événement sur Jitsi Meet n'ayant pas réussi à accéder à la caméra de réunion.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    type: string, //Une constante représentant le type global de l'erreur.
    message: string // Informations supplémentaires sur l'erreur.
}
```

### avatarChanged

Provides event notifications about changes to a participant's avatar.

The listener receives an object with the following structure:

```javascript
{
    id: string, // l'identifiant du participant qui a changé son avatar.
    avatarURL: string // la nouvelle URL de l'avatar.
}
```

### audioAvailabilityChanged

Fournit des notifications d'événement sur les modifications apportées à l'état de disponibilité audio.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    available: boolean // nouveau statut disponible - booléen
}
```

### audioMuteStatusChanged

Fournit des notifications d'événement sur les modifications apportées à l'état de sourdine audio.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    muted: boolean // nouveau statut muet - booléen
}
```

### breakoutRoomsUpdated

Fournit des notifications sur les modifications apportées aux salles de sous-commission.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    [roomId]: {
        id: string,
        jid: string,
        name: string,
        isMainRoom: true | undefined,
        participants: {
            [participantJid]: {
                displayName: string,
                jid: string,
                role: string
            }
        }
    },
    ...
}
```


### browserSupport

Fournit des notifications d'événements sur la prise en charge actuelle du navigateur.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    supported: boolean
}
```

### contentSharingParticipantsChanged

Fournit une liste en temps réel des identifiants des participants partageant actuellement l'écran.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    data: ["particId1", "particId2", ...]
}
```

### dataChannelOpened

Indique que le canal de données est ouvert et que des messages peuvent donc y être envoyés.

### endpointTextMessageReceived

Fournit des notifications d'événement sur un message texte reçu via des canaux de données.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    senderInfo: {
        jid: string, // le jid de l'expéditeur
        id: string // l'identifiant de participant de l'expéditeur
    },
    eventData: {
        name: string, // le nom de l'événement datachannel : `endpoint-text-message`
        text: string // le texte reçu de l'expéditeur
    }
}
```

### faceLandmarkDetected

Fournit des notifications d'événement lorsqu'un repère de visage est détecté

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    faceBox: {
        left: number, // distance de la boîte englobante de la face en pourcentage à partir du bord gauche de la vidéo
        right: number // distance de la boîte englobante de la face en pourcentage à partir du bord droit de la vidéo
        width: number // largeur de la boîte englobante du visage en pourcentage de la largeur totale de la vidéo
    }, // cela peut être indéfini si config.faceLandmarks.faceCenteringThreshold n'est pas passé
    faceExpression: string // vérifiez https://github.com/jitsi/jitsi-meet/blob/master/react/features/face-landmarks/constants.js#L3 pour les valeurs disponibles
}
```

### errorOccurred

Fournit des notifications d'événement sur une erreur qui s'est produite.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    details: Object?, // détails supplémentaires sur l'erreur
    message: string?, // le message d'erreur
    name: string, // le nom codé de l'erreur
    type: string, // type/source d'erreur, parmi : 'CONFIG', 'CONNEXION', 'CONFERENCE'
    isFatal: boolean // s'il s'agit d'une erreur fatale qui a déclenché une superposition de reconnexion ou non
}
```

### knockingParticipant

Fournit des notifications d'événement sur un participant frappant dans le hall.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    participant: {
        // l'identifiant et le nom du participant qui frappe actuellement dans le hall
        id: string,
        name: string
    }
}
```

### largeVideoChanged

Fournit des notifications d'événement sur les modifications apportées au grand écran vidéo.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    id: string // id du participant qui est maintenant sur une grande vidéo dans la vue de la scène.
}
```

### log

Fournit des notifications d'événement de journal avec le niveau de journalisation étant l'une des valeurs spécifiées dans le fichier [config.js] dans la propriété **`apiLogLevels`** (s'il n'est pas spécifié, l'événement ne se déclenche pas).

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    logLevel: string, // Une constante représentant le type de journal (info, erreur, débogage, avertissement).
    args: string // Informations de journal supplémentaires.
}
```

### micError

Fournit des notifications d'événements sur les problèmes Jitsi Meet avec l'accès au micro.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    type: string, // Une constante représentant le type global de l'erreur
    message: string //Informations supplémentaires sur l'erreur.
}
```

### screenSharingStatusChanged

Fournit des notifications d'événement sur l'activation ou la désactivation du partage d'écran de l'utilisateur local.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    on: boolean, //whether screen sharing is on
    details: {

        // D'où le partage d'écran est-il capturé, s'il est connu. Des valeurs qui sont
        // passé inclure 'window', 'screen', 'proxy', 'device'. La valeur indéfinie
        // sera transmis si le type de source est inconnu ou si le partage d'écran est désactivé.
        sourceType: string|undefined
    }
}
```

### dominantSpeakerChanged

Fournit des notifications d'événement sur les changements de locuteur dominant.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    id: string // participantId du nouveau locuteur dominant
}
```

### raiseHandUpdated

Fournit des notifications d'événement sur le participant qui lève/baisse la main.

L'écouteur recevra un objet avec la structure suivante :

```javascript
{
    id: string,         // participantId de l'utilisateur qui lève/baisse la main
    handRaised: number  // 0 lorsque la main est abaissée et l'horodatage de la main levée lorsqu'elle est levée.
}
```

### tileViewChanged

Fournit des notifications d'événement sur l'entrée ou la sortie du mode de présentation de la vue en mosaïque.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    enabled: boolean, // si la vue en mosaïque n'est pas affichée ou non
}
```

### chatUpdated

Fournit des notifications d'événement sur l'état du chat en cours de mise à jour.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    isOpen: boolean, // Que le panneau de discussion soit ouvert ou non
    unreadCount: number // Le compteur de messages non lus
}
```

### incomingMessage

Fournit des notifications d'événement sur les messages de discussion entrants.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    from: string, // L'identifiant de l'utilisateur qui a envoyé le message
    nick: string, // le pseudo de l'utilisateur qui a envoyé le message
    privateMessage: boolean, // s'il s'agit d'un message privé ou de groupe
    message: string // le texte du message
}
```

### mouseEnter

Fournit des notifications d'événement lorsque la souris entre dans l'iframe.
L'écouteur reçoit un objet avec la structure suivante basée sur [MouseEvent] :

```javascript
{
    event: {
        clientX,
        clientY,
        movementX,
        movementY,
        offsetX,
        offsetY,
        pageX,
        pageY,
        x,
        y,
        screenX,
        screenY
    }
}
```

### mouseLeave

Fournit des notifications d'événement lorsque la souris entre dans l'iframe.
L'écouteur reçoit un objet avec la structure suivante basée sur [MouseEvent] :

```javascript
{
    event: {
        clientX,
        clientY,
        movementX,
        movementY,
        offsetX,
        offsetY,
        pageX,
        pageY,
        x,
        y,
        screenX,
        screenY
    }
}
```

### mouseMove

Fournit des notifications d'événement lorsque la souris se déplace à l'intérieur de l'iframe.
Cet événement est déclenché sur un intervalle qui peut être configuré en remplaçant la propriété config.js mouseMoveCallbackInterval.

L'écouteur reçoit un objet avec la structure suivante basée sur [MouseEvent] :

```javascript
{
    event: {
        clientX,
        clientY,
        movementX,
        movementY,
        offsetX,
        offsetY,
        pageX,
        pageY,
        x,
        y,
        screenX,
        screenY
    }
}
```

### toolbarButtonClicked

Fournit des notifications d'événement sur un bouton de barre d'outils cliqué et si la routine de clic a été exécutée ou non.
Pour remplacer le clic d'un bouton, veuillez utiliser le remplacement de configuration suivant :
https://github.com/jitsi/jitsi-meet/blob/042a2cb447bd9ff39ab3904e493952787bd30924/config.js#L547

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    key: string, // la touche du bouton enfoncé. La clé est telle que définie dans la configuration de `toolbarButtons`,
    preventExecution: boolean // si l'exécution de la routine de clic a été empêchée ou non.
}
```

### outgoingMessage

Fournit des notifications d'événement sur les messages de discussion sortants.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    message: string, // le texte du message
    privateMessage: boolean // s'il s'agit d'un message privé ou de groupe
}
```

### displayNameChange

Fournit des notifications d'événement sur les changements de nom d'affichage.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    id: string, // l'identifiant du participant qui a changé son nom d'affichage
    displayname: string // le nouveau nom d'affichage
}
```

### deviceListChanged

Fournit des notifications d'événement sur les modifications de la liste des périphériques.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    devices: Object // la nouvelle liste des appareils disponibles.
}
```

**:REMARQUE** L'objet **`device`** a le même format que le format de résultat **`getAvailableDevices`**.

### emailChange

Fournit des notifications d'événement sur les modifications apportées aux e-mails.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    id: string, // l'identifiant du participant qui a changé son email
    email: string // le nouveau mail
}
```

### feedbackSubmitted

Fournit des notifications d'événement sur les soumissions de commentaires de conférence :

```javascript
{
    error: string // L'erreur qui s'est produite lors de la soumission, le cas échéant.
}
```

### filmstripDisplayChanged

Fournit des notifications de visibilité d'événement pour la pellicule en cours de mise à jour :

```javascript
{
    visible: boolean // Si oui ou non la pellicule est affichée ou masquée.
}
```

### moderationStatusChanged

Fournit des notifications d'événement sur les modifications apportées au statut de modération.

```javascript
{
    mediaType: string, // Le type de média pour lequel la modération a changé.
    enabled: boolean // Si la modération a été activée ou non.
}
```

### moderationParticipantApproved

Fournit des notifications d'événement sur les approbations des participants pour la modération.

```javascript
{
    id: string, // L'ID du participant qui a été approuvé.
    mediaType: string // Le type de média pour lequel le participant a été approuvé.
}
```

### moderationParticipantRejected

Fournit des notifications d'événements sur les rejets de participants pour la modération.

```javascript
{
    id: string, // L'ID du participant qui a été rejeté.
    mediaType: string // Le type de média pour lequel le participant a été rejeté.
}
```

### participantJoined

Fournit des notifications d'événement sur les nouveaux participants qui rejoignent la salle.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    id: string, // l'identifiant du participant
    displayName: string // le nom d'affichage du participant
}
```

### participantKickedOut

Fournit des notifications d'événement sur les participants retirés de la salle.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    kicked: {
        id: string, // l'identifiant du participant retiré de la salle
        local: boolean // si le participant est ou non le participant local
    },
    kicker: {
        id: string // l'identifiant du participant qui a expulsé l'autre participant
    }
}
```

### participantLeft

Fournit des notifications d'événement sur les participants qui quittent la salle de réunion.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    id: string // l'identifiant du participant
}
```

### participantRoleChanged

Fournit des notifications d'événement qui se déclenchent lorsque le rôle de l'utilisateur local a changé (par exemple, aucun, modérateur, participant).

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    id: string // l'identifiant du participant
    role: string // le nouveau rôle du participant
}
```

### participantsPaneToggled

Fournit des notifications d'événement qui se déclenchent lorsque l'état du volet des participants change.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    open: boolean // whether the pane is open or not
}
```

### passwordRequired

Fournit des notifications d'événement qui se déclenchent lorsque les participants ne parviennent pas à rejoindre une salle protégée par mot de passe.

### videoConferenceJoined

Fournit des notifications d'événement qui se déclenchent lorsque l'utilisateur local a rejoint la vidéoconférence.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    roomName: string, // le nom de la salle de la conférence
    id: string, // l'identifiant du participant local
    displayName: string, // le nom d'affichage du participant local
    avatarURL: string, // l'URL de l'avatar du participant local
    breakoutRoom: boolean // si la salle actuelle est une salle de sous-commission
}
```

### videoConferenceLeft

Fournit des notifications d'événement qui se déclenchent lorsque l'utilisateur local a quitté la vidéoconférence.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    roomName: string // le nom de la salle de la conférence
}
```

### videoAvailabilityChanged

Fournit des notifications d'événement sur les changements d'état de disponibilité de la vidéo.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    available: boolean // nouveau statut disponible - booléen
}
```

### videoMuteStatusChanged

Fournit des notifications d'événement sur les changements d'état de mise en sourdine de la vidéo.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    muted: boolean // nouveau statut muet - booléen
}
```

### videoQualityChanged

Fournit des notifications d'événement sur les modifications apportées aux paramètres de qualité vidéo.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    videoQuality: number // la hauteur de la résolution liée au nouveau paramètre de qualité vidéo.
}
```

### readyToClose

Fournit des notifications d'événement qui se déclenchent lorsque Jitsi Meet est prêt à être fermé (c'est-à-dire que les opérations de raccrochage sont terminées).

### recordingLinkAvailable

Fournit des notifications d'événement sur le lien d'enregistrement devenant disponible.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    link: string, // le lien d'enregistrement
    ttl: number // la durée de vie du lien d'enregistrement
}
```

### recordingStatusChanged

Fournit des notifications d'événement sur les changements d'état d'enregistrement.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    on: boolean // nouveau statut d'enregistrement - booléen,
    mode: string // mode d'enregistrement, `local`, `stream` ou `file`,
    error: string | undefined // type d'erreur si l'enregistrement échoue, indéfini sinon
}
```

### subjectChange

Fournit des notifications d'événements concernant le changement de sujet d'une conférence.

L'écouteur reçoit un objet avec la structure suivante :

```javascript
{
    subject: string // le nouveau sujet
}
```

### suspendDetected

Fournit des notifications sur la détection d'événements suspendus sur l'ordinateur hôte.

### peerConnectionFailure
    
Avertir l'application externe qu'un PeerConnection a perdu la connectivité. Cet événement est déclenché uniquement si
un PC "a échoué" mais la connectivité au serveur rtcstats est toujours maintenue, signalant qu'il y a un
problème d'établissement d'un lien entre l'application et le serveur JVB ou le pair distant en cas de P2P.
Ne se déclenchera que si rtcstats est activé.

```javascript
{
    // Type de connexion PC, Peer2Peer ou JVB.
    isP2P: boolean, 

    // Cette connexion était-elle précédemment connectée ? Si c'était le cas, cela pourrait signifier
    // que la connectivité a été interrompue, sinon cela signifie très probablement que l'application n'a pas pu atteindre
    // le serveur JVB, ou l'autre pair en cas de P2P.
    wasConnected: boolean 
}
```

[config.js]: https://github.com/jitsi/jitsi-meet/blob/master/config.js
[interface_config.js]: https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js
[EventEmitter]: https://nodejs.org/api/events.html
[MouseEvent]: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
