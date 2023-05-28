---
id: dev-guide-iframe-functions
title: Functions
---

Utilisez les fonctions API suivantes pour contrôler votre conférence Jitsi Meet intégrée.

### captureLargeVideoScreenshot

Capture une capture d'écran pour le participant dans la grande vue vidéo (sur scène).

```javascript
api.captureLargeVideoScreenshot().then(data => {
    // data is an Object with only one param, dataURL
    // data.dataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAA..."
});
```

### getAvailableDevices

Récupère une liste des périphériques disponibles.

```javascript
api.getAvailableDevices().then(devices => {
    // devices = {
    //     audioInput: [{
    //         deviceId: 'ID'
    //         groupId: 'grpID'
    //         kind: 'audioinput'
    //         label: 'label'
    //     },....],
    //     audioOutput: [{
    //         deviceId: 'ID'
    //         groupId: 'grpID'
    //         kind: 'audioOutput'
    //         label: 'label'
    //     },....],
    //     videoInput: [{
    //         deviceId: 'ID'
    //         groupId: 'grpID'
    //         kind: 'videoInput'
    //         label: 'label'
    //     },....]
    // }
    ...
});
```

### getContentSharingParticipants

Renvoie une promesse qui se résout avec un tableau d'ID de participants partageant actuellement.

```javascript
api.getContentSharingParticipants().then(res => {
    //res.sharingParticipantIds = [particId1, particId2, ...]
});
```

### getCurrentDevices

Récupère une liste des appareils actuellement sélectionnés.

```javascript
api.getCurrentDevices().then(devices => {
    // devices = {
    //     audioInput: {
    //         deviceId: 'ID'
    //         groupId: 'grpID'
    //         kind: 'videoInput'
    //         label: 'label'
    //     },
    //     audioOutput: {
    //         deviceId: 'ID'
    //         groupId: 'grpID'
    //         kind: 'videoInput'
    //         label: 'label'
    //     },
    //     videoInput: {
    //         deviceId: 'ID'
    //         groupId: 'grpID'
    //         kind: 'videoInput'
    //         label: 'label'
    //     }
    // }
    ...
});
```

### getDeploymentInfo

Récupère un objet contenant des informations sur le déploiement.

```javascript
api.getDeploymentInfo().then(deploymentInfo => {
    // deploymentInfo = {
    //     region: 'deployment-region',
    //     shard: 'deployment-shard',
    //     ...
    // }
    ...
});
```

### getLivestreamUrl

Récupère un objet contenant des informations sur livestreamUrl du flux en direct actuel.

```javascript
api.getLivestreamUrl().then(livestreamData => {
    // livestreamData = {
    //     livestreamUrl: 'livestreamUrl'
    // }
    ...
});
```

### getParticipantsInfo

__DEPRECATED__ Use `getRoomsInfo` instead.

Renvoie un tableau contenant des informations sur les participants telles que l'ID, le nom d'affichage, l'URL de l'avatar et l'adresse e-mail.

```javascript
api.getParticipantsInfo();
```

### getRoomsInfo

Renvoie un tableau des pièces disponibles et leurs détails :
- `isMainRoom` (true,false), `id`, `jid`
- participants: `Participant[]`
    - `id`
    - `jid`
    - `role`
    - `displayName`



```javascript
api.getRoomsInfo().then(rooms => {
    ... // see response example structure
})
```

Exemple de structure de réponse :

```json
{
  "rooms": [
    {
      "isMainRoom": true,
      "id": "room_name@conference.jitsi",
      "jid": "room_name@conference.jitsi/aaaaaa",
      "participants": [
        {
          "jid": "room_name@conference.jitsi/bbbbbb",
          "role": "participant",
          "displayName": "p1",
          "id": "bbbbbb"
        },
        {
          "jid": "room_name@conference.jitsi/cccccc",
          "role": "participant",
          "displayName": "p2",
          "id": "cccccc"
        }
      ]
    },
    {
    "isMainRoom": false,
    "id": "aaaaaa-bbb-cccc-dddd-qwertyuiopas",
    "jid": "aaaaaa-bbb-cccc-dddd-qwertyuiopas@breakout.jitsi",
    "participants": [{
        "jid": "aaaaaa-cccc-dddd-eeee-qwertyuiopas@jitsi/abcd1234",
        "role": "moderator",
        "displayName": "Participant name",
        "avatarUrl": "",
        "id": "abcd1234"
    }]
    },
  ]
}
```

### getVideoQuality

Renvoie le paramètre de qualité vidéo actuel.

```javascript
api.getVideoQuality();
```

### isDeviceChangeAvailable

Se résout à vrai si le changement de périphérique est disponible et à faux sinon.

```javascript
// The accepted deviceType values are - 'output', 'input' or undefined.
api.isDeviceChangeAvailable(deviceType).then(isDeviceChangeAvailable => {
    ...
});
```

### isDeviceListAvailable

Se résout à true si la liste des périphériques est disponible et à false sinon.

```javascript
api.isDeviceListAvailable().then(isDeviceListAvailable => {
    ...
});
```

### isMultipleAudioInputSupported

Se résout à true si plusieurs entrées audio sont prises en charge et à false sinon.

```javascript
api.isMultipleAudioInputSupported().then(isMultipleAudioInputSupported => {
    ...
});
```

### pinParticipant

Sélectionne l'ID du participant comme participant épinglé afin de toujours recevoir la vidéo pour ce participant.

Le deuxième paramètre est facultatif et peut être utilisé pour spécifier un `videoType`. Lorsque la prise en charge multiflux est activée en transmettant ce paramètre, vous pouvez spécifier si le bureau ou la vidéo de la caméra du participant spécifié doit être épinglé. Les valeurs acceptées sont `'camera'` et `'desktop'`. La valeur par défaut est `'caméra'`. Toute valeur non valide sera ignorée et la valeur par défaut sera utilisée.

```javascript
api.pinParticipant(participantId, videoType);
```

### resizeLargeVideo

Redimensionne le grand conteneur vidéo selon les dimensions fournies.

```javascript
api.resizeLargeVideo(width, height);
```

### setAudioInputDevice

Définit le périphérique d'entrée audio sur celui avec l'étiquette ou l'ID transmis.

```javascript
api.setAudioInputDevice(deviceLabel, deviceId);
```

### setAudioOutputDevice

Définit le périphérique de sortie audio sur celui dont l'étiquette ou l'ID a été transmis.

```javascript
api.setAudioOutputDevice(deviceLabel, deviceId);
```

### setLargeVideoParticipant

Affiche le participant avec l'ID de participant donné sur la grande vidéo.

Si aucun ID de participant n'est fourni, un participant est sélectionné en fonction des paramètres de l'orateur dominant et épinglé.

```javascript
api.setLargeVideoParticipant(participantId);
```

### setVideoInputDevice

Définit le périphérique d'entrée vidéo sur celui dont l'étiquette ou l'ID a été transmis.

```javascript
api.setVideoInputDevice(deviceLabel, deviceId);
```

### startRecording

Démarre un enregistrement de fichier ou une session de streaming. Voir la commande `startRecording` pour plus de détails.

```javascript
api.startRecording(options);
```

### stopRecording

Arrête un enregistrement de fichier ou une session de streaming en cours. Voir la commande `stopRecording` pour plus de détails.

```javascript
api.stopRecording(mode);
```

### getNumberOfParticipants

Renvoie le nombre de participants à la conférence :

```javascript
const numberOfParticipants = api.getNumberOfParticipants();
```

### getAvatarURL

__DEPRECATED__ Use `getRoomsInfo` instead.

Renvoie l'URL de l'avatar d'un participant :

```javascript
const avatarURL = api.getAvatarURL(participantId);
```

### getDisplayName

Renvoie le nom d'affichage d'un participant :

```javascript
const displayName = api.getDisplayName(participantId);
```

### getEmail

Renvoie l'e-mail d'un participant :

```javascript
const email = api.getEmail(participantId);
```

### getIFrame

Renvoie l'élément HTML IFrame qui est utilisé pour charger la conférence Jitsi Meet :

```javascript
const iframe = api.getIFrame();
```

### isAudioDisabled

Renvoie une promesse qui se résout à l'état audio désactivé actuel :

```javascript
api.isAudioDisabled().then(disabled => {
    ...
});
```

### isAudioMuted

Renvoie une Promise qui se résout à l'état audio actuel coupé :

```javascript
api.isAudioMuted().then(muted => {
    ...
});
```

### isVideoMuted

Renvoie une Promise qui résout l'état actuel de la vidéo désactivée :

```javascript
api.isVideoMuted().then(muted => {
    ...
});
```

### isAudioAvailable

Renvoie une promesse qui résout l'état de disponibilité audio actuel :

```javascript
api.isAudioAvailable().then(available => {
    ...
});
```

### isVideoAvailable

Renvoie une promesse qui résout l'état actuel de disponibilité de la vidéo :

```javascript
api.isVideoAvailable().then(available => {
    ...
});
```

### isModerationOn

Renvoie une promesse qui résout l'état de modération actuel du type de média donné.



```javascript
api.isModerationOn(mediaType).then(isModerationOn => {
    ...
});
```

### isParticipantForceMuted

Renvoie une promesse qui se résout à l'état actuel de mise en sourdine forcée du participant donné pour le type de média donné.

`mediaType` peut être `audio` (par défaut) ou `video`.

Forcer le son - la modération est activée et le participant n'est pas autorisé à réactiver le type de média donné.

```javascript
api.isParticipantForceMuted(participantId, mediaType).then(isForceMuted => {
    ...
});
```

### isParticipantsPaneOpen

Renvoie une promesse qui se résout avec l'état actuel du volet des participants.

```javascript
api.isParticipantsPaneOpen().then(state => {
    ...
});
```

### isStartSilent

Renvoie une Promise qui détermine si la réunion a été démarrée en vue uniquement.

```javascript
api.isStartSilent().then(startSilent => {
    ...
});
```

### listBreakoutRooms

Renvoie une promesse qui se résout avec la carte des salles de sous-commission.

```javascript
api.listBreakoutRooms().then(breakoutRooms => {
    ...
});
```

### invite

Invitez le groupe de participants donné à la réunion :

```javascript
api.invite([ {...}, {...}, {...} ]).then(() => {
    // success
}).catch(() => {
    // failure
});
```
**REMARQUE:** Le format de l'invité dans le tableau dépend du service d'invitation utilisé dans le déploiement.

Les objets d'invitation PSTN ont la structure suivante :

```javascript
{
    type: 'phone',
    number: <string> // the phone number in E.164 format  (ex. +31201234567)
}
```

Les objets d'invitation SIP ont la structure suivante :

```javascript
{
    type: 'sip',
    address: <string> // the sip address
}
```

### dispose

Supprime la conférence Jitsi Meet intégrée :

```javascript
api.dispose();
```

**REMARQUE:** Jitsi recommande de supprimer la conférence avant le déchargement de la page.
