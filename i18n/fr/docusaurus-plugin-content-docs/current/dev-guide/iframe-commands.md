---
id: dev-guide-iframe-commands
title: Commands
---

Vous pouvez contrôler la conférence Jitsi Meet intégrée en appelant **`executeCommand`** sur l'objet **`JitsiMeetExternalAPI`** :

```javascript
api.executeCommand(command, ...arguments);
```

Le paramètre de commande est une chaîne qui contient le nom de la commande.

Vous pouvez également exécuter plusieurs commandes à l'aide de la méthode **`executeCommands`** :

```javascript
api.executeCommands(commands);
```

Le paramètre **`commands`** est un objet avec les noms des commandes comme clés et les arguments des commandes comme valeurs :

```javascript
api.executeCommands({
    displayName: [ 'nickname' ],
    toggleAudio: []
});
```

Les commandes suivantes sont prises en charge :

### displayName

Définit le nom d'affichage du participant local.

  Cette commande nécessite un argument pour définir le nouveau nom d'affichage.

```javascript
api.executeCommand('displayName', 'New Nickname');
```

### password

Définit le mot de passe de la salle.

```javascript
// set new password for channel
api.addEventListener('participantRoleChanged', function(event) {
    if (event.role === "moderator") {
        api.executeCommand('password', 'The Password');
    }
});
// join a protected channel
api.on('passwordRequired', function ()
{
    api.executeCommand('password', 'The Password');
});
```

### toggleLobby

Active ou désactive le mode lobby.

Cette commande nécessite l'état du mode lobby souhaité comme argument.

```javascript
api.addEventListener('participantRoleChanged', function (event) {
    if(event.role === 'moderator') {
        api.executeCommand('toggleLobby', true);
    }
});
```

### sendTones

Lecture par tonalité tactile.

Cette commande nécessite la lecture des claviers de numérotation à tonalité sélectionnés, ainsi que la durée et l'intervalle de temps entre la lecture de la tonalité comme arguments.

```javascript
api.executeCommand('sendTones', {
    tones: string, // The dial pad touch tones to play. For example, '12345#'.
    duration: number, // Optional. The number of milliseconds each tone should play. The default is 200.
    pause: number // Optional. The number of milliseconds between each tone. The default is 200.
});
```

### startShareVideo

Commence à partager une vidéo

Cette commande nécessite une URL pointant vers une vidéo youtube ou une vidéo à diffuser à partir du Web (par exemple, un fichier mp4)

```javascript
api.executeCommand('startShareVideo', url);
```

### stopShareVideo

Arrête de partager une vidéo (si l'utilisateur est celui qui a commencé la vidéo)

Aucun argument n'est requis.

```javascript
api.executeCommand('stopShareVideo');
```

### subject

Définit le sujet de la conférence.

Cette commande nécessite que le nouveau sujet soit défini comme argument et elle ne sera appliquée que si le participant a le rôle de modérateur ou après avoir reçu ce rôle plus tard.

```javascript
api.executeCommand('subject', 'New Conference Subject');
```

### localSubject

Définit le sujet local de la conférence.

Cette commande nécessite que le nouveau sujet local soit défini comme argument et elle peut être appliquée par tous les participants, quel que soit leur rôle.

```javascript
api.executeCommand('localSubject', 'New Conference Local Subject');
```

### toggleAudio

Active/désactive le son du participant local.

Aucun argument n'est requis.

```javascript
api.executeCommand('toggleAudio');
```

### toggleVideo

Active/désactive le son de la vidéo pour le participant local.

Aucun argument n'est requis.

```javascript
api.executeCommand('toggleVideo');
```

### toggleFilmStrip

Masquez ou affichez la pellicule.

Aucun argument n'est requis.

```javascript
api.executeCommand('toggleFilmStrip');
```

### toggleChat

Masquez ou affichez la messagerie de chat.

Aucun argument n'est requis.

```javascript
api.executeCommand('toggleChat');
```

### toggleRaiseHand

Cachez ou montrez la main levée.

Aucun argument n'est requis.

```javascript
api.executeCommand('toggleRaiseHand')
```

### toggleShareScreen

Démarrer ou arrêter le partage d'écran.

Aucun argument n'est requis.

```javascript
api.executeCommand('toggleShareScreen');
```

### setNoiseSuppressionEnabled

Activez ou désactivez la suppression du bruit sur la piste audio actuelle.

```javascript
api.executeCommand('setNoiseSuppressionEnabled', {
    enabled: boolean // Enable or disable noise suppression.
});
```

### toggleSubtitles

Démarrer ou arrêter les sous-titres.

Aucun argument n'est requis.

```javascript
api.executeCommand('toggleSubtitles');
```

### toggleTileView

Entrez ou quittez le mode de disposition de la vue en mosaïque.

Aucun argument n'est requis.

```javascript
api.executeCommand('toggleTileView');
```

### hangup

Met fin à l'appel.

Aucun argument n'est requis.

```javascript
api.executeCommand('hangup');
```

### endConference

Met fin à la conférence en cours pour tout le monde.

Cette commande ne peut être exécutée que par un modérateur de réunion et nécessite que la prise en charge de la conférence de fin soit activée pour le déploiement.

```javascript
api.executeCommand('endConference');
```

### email

Modifie l'adresse e-mail locale.

Cette commande nécessite la nouvelle adresse e-mail comme argument unique.

```javascript
api.executeCommand('email', 'example@example.com');
```

### avatarUrl

Modifie l'URL de l'avatar local.

Cette commande nécessite que la nouvelle URL de l'avatar soit définie comme argument unique.

```javascript
api.executeCommand('avatarUrl', 'https://avatars0.githubusercontent.com/u/3671647');
```

### sendEndpointTextMessage

Envoie un SMS à un autre participant via les canaux de données.

```javascript
api.executeCommand('sendEndpointTextMessage', 'receiverParticipantId', 'text');
```

### setLargeVideoParticipant

Affiche le participant sur le grand écran vidéo.

L'ID du participant, s'il est spécifié, s'affiche sur la grande vidéo. Si aucun argument n'est transmis, le participant à afficher sur la grande vidéo est automatiquement sélectionné en fonction des paramètres de haut-parleur dominant/épinglé.

Le deuxième paramètre est facultatif et peut être utilisé pour spécifier un `videoType`. Lorsque la prise en charge multiflux est activée en transmettant ce paramètre, vous pouvez spécifier si le bureau ou la vidéo de la caméra pour le participant spécifié doit être sélectionné. Les valeurs acceptées sont `'camera'` et `'desktop'`. La valeur par défaut est `'caméra'`. Toute valeur non valide sera ignorée et la valeur par défaut sera utilisée.

```javascript
api.executeCommand('setLargeVideoParticipant', 'abcd1234', 'desktop');
```

### setVideoQuality

Définit la résolution vidéo d'envoi et de réception.

Le paramètre de hauteur de résolution est implémenté à l'aide d'un seul argument.

```javascript
api.executeCommand('setVideoQuality', 720);
```

### muteEveryone

Couper le son de tous les participants à la réunion.

Cette commande ne peut être exécutée que par le modérateur de la réunion et peut prendre un argument : `mediaType` - pour quel type de média couper le son de tout le monde.

`mediaType` peut être 'audio' (par défaut) ou 'video'.

```javascript
api.executeCommand('muteEveryone', 'video');
```

### startRecording

Démarre un enregistrement local, un enregistrement de fichier ou une session de streaming à l'aide des paramètres passés :

  - **RTMP streaming** - Mode d'enregistrement défini sur **`stream`** avec une **`rtmpStreamKey`**. La valeur **`rtmpBroadcastID`** est facultative.

  - **YouTube streams** - Mode d'enregistrement défini sur **`stream`** avec une **`youtubeStreamKey`**. La valeur **`youtubeBroadcastID`** est facultative.

  - **Local Recording** - Mode d'enregistrement défini sur **`local`**. La valeur **`onlySelf`** est facultative.

  - **Dropbox recording** - Mode d'enregistrement défini sur **`file`** avec un jeton Dropbox OAuth2.

  De plus, l'enregistrement Dropbox doit être activé sur la configuration de déploiement Jitsi meet que vous utilisez.

  - **File recording** - Mode d'enregistrement défini sur **`file`**.

  Facultativement, **`shouldShare`** doit être transmis. Aucun autre paramètre n'est requis.

```javascript
api.executeCommand('startRecording', {
    mode: string, //recording mode, either `local`, `file` or `stream`.
    dropboxToken: string, //dropbox oauth2 token.
    onlySelf: boolean,  //Whether to only record the local streams. Only applies to `local` recording mode.
    shouldShare: boolean, //whether the recording should be shared with the participants or not. Only applies to certain jitsi meet deploys.
    rtmpStreamKey: string, //the RTMP stream key.
    rtmpBroadcastID: string, //the RTMP broadcast ID.
    youtubeStreamKey: string, //the youtube stream key.
    youtubeBroadcastID: string //the youtube broacast ID.
});
```

### stopRecording

Arrête un enregistrement **`local`**, **`stream`** ou **`file`** en cours.

Le mode dans lequel l'enregistrement a été lancé doit être spécifié.

```javascript
api.executeCommand('stopRecording',
    mode: string //recording mode to stop, `local`, `stream` or `file`
);
```

### initiatePrivateChat

Ouvre la fenêtre de chat et définit le participant avec l'ID de participant donné comme destinataire des messages.

```javascript
api.executeCommand('initiatePrivateChat',
    participantID: string
);
```

### cancelPrivateChat

Supprime le participant au chat privé, ce qui réinitialise la fenêtre de chat sur le chat de groupe.

```javascript
api.executeCommand('cancelPrivateChat');
```

### kickParticipant

Expulse le participant avec l'ID de participant donné de la réunion.

```javascript
api.executeCommand('kickParticipant',
    participantID: string
);
```

### grantModerator

Accorde des droits de modérateur au participant avec l'ID donné.

```javascript
api.executeCommand('grantModerator',
    participantID: string
);
```

### overwriteConfig

Remplacez les accessoires config.js par les valeurs de l'objet de configuration transmis à la commande.

```javascript
api.executeCommand('overwriteConfig',
    config: Object
);
```
Par exemple:
```javascript
api.executeCommand('overwriteConfig',
    {
      toolbarButtons: ['chat']
    }
);
```
écrasera la valeur de configuration `toolbarButtons` par `[chat]`, ce qui aura pour résultat que l'interface utilisateur n'affichera que le bouton `chat`.

### sendChatMessage

Envoie un message de chat soit à un participant spécifique, soit en tant que message de chat de groupe.

```javascript
api.executeCommand('sendChatMessage',
    message: string, //the text message
    to: string, // the receiving participant ID or empty string/undefined for group chat.
    ignorePrivacy: boolean // true if the privacy notification should be ignored. Defaulted to false.
);
```

### setFollowMe

Permet aux modérateurs de basculer la fonctionnalité Suivez-moi

```javascript
api.executeCommand('setFollowMe',
    value: boolean, // set to true if participants should be following you, false otherwise
);
```

### setSubtitles

Active ou désactive les sous-titres.

```javascript
api.executeCommand('setSubtitles',
    enabled: boolean
);
```

### setTileView

Active ou désactive le mode Tileview.

```javascript
api.executeCommand('setTileView',
    enabled: boolean
);
```

### answerKnockingParticipant

Approuve ou rejette le participant qui frappe dans le hall.

```javascript
api.executeCommand('answerKnockingParticipant',
    id: string, // the participant id
    approved: boolean
);
```

### toggleCamera

Bascule la caméra avant/arrière sur le Web mobile.

```javascript
api.executeCommand('toggleCamera');
```

### toggleCameraMirror

Active/désactive la mise en miroir de la vidéo locale.

```javascript
api.executeCommand('toggleCameraMirror');
```

### toggleVirtualBackgroundDialog

Bascule la boîte de dialogue de sélection d'arrière-plan virtuel.

```javascript
api.executeCommand('toggleVirtualBackgroundDialog');
```

### pinParticipant

Pins a conference participant.

```javascript
api.executeCommand('pinParticipant',
    id?: string // The ID of the conference participant to pin or null to unpin all
);
```

### setParticipantVolume

Modifier le volume du participant avec l'ID de participant donné.

```javascript
api.executeCommand('setParticipantVolume',
    participantID: string,
    volume: number // number between 0 and 1
);
```

### toggleParticipantsPane

Modifie l'état de visibilité du volet des participants.

```javascript
api.executeCommand('toggleParticipantsPane',
    enabled: boolean // The visibility status of the participants pane.
);
```

### toggleModeration

Modifie le statut de modération du type de média donné.

Cette commande nécessite deux arguments : `enable` - s'il faut l'activer ou non, et `mediaType` - le type de média pour lequel modifier la modération.

```javascript
api.executeCommand('toggleModeration',
    enable: Boolean,
    mediaType: String // can be 'audio' (default) or 'video'
);
```

### askToUnmute

Demande au participant avec l'ID donné de réactiver le son.
Si la modération audio est activée, elle approuve également le participant pour l'audio.

```javascript
api.executeCommand('askToUnmute',
    participantId: String
);
```

### approveVideo

Si la modération vidéo est activée, il approuve le participant avec l'ID donné pour la vidéo.

```javascript
api.executeCommand('approveVideo',
    participantId: String
);
```

### rejectParticipant

Rejette le participant avec l'ID donné de la modération du type de média donné.

```javascript
api.executeCommand('rejectParticipant',
    participantId: String,
    mediaType: String // can be 'audio' (default) or 'video'
);
```

### addBreakoutRoom

Crée une salle de sous-commission.

Cette commande ne peut être exécutée que par le modérateur de la réunion.

```javascript
api.executeCommand('addBreakoutRoom',
    name: String // Optional. The name or subject of the new room.
);
```

### autoAssignToBreakoutRooms

Affecte automatiquement les participants aux salles de sous-commission.

Cette commande ne peut être exécutée que par le modérateur de la réunion.

```javascript
api.executeCommand('autoAssignToBreakoutRooms');
```

### closeBreakoutRoom

Ferme la salle de sous-commission et envoie les participants dans la salle principale.

Cette commande ne peut être exécutée que par le modérateur de la réunion.

```javascript
api.executeCommand('closeBreakoutRoom',
    roomId: String // The id of the room to close.
);
```

### joinBreakoutRoom

Rejoindre une salle de sous-commission. Si l'argument est omis, rejoint la pièce principale.

```javascript
api.executeCommand('joinBreakoutRoom',
    roomId: String // Optional. The id of the room to join.
);
```

### removeBreakoutRoom

Supprime la salle de sous-commission.

Cette commande ne peut être exécutée que par le modérateur de la réunion.

```javascript
api.executeCommand('removeBreakoutRoom',
    breakoutRoomJid: String // The jid of the breakout room to remove.
);
```

### resizeFilmStrip

Redimensionne la pellicule.

```javascript
api.executeCommand('resizeFilmStrip', {
    width: number // The desired filmstrip width
});
```

### resizeLargeVideo

Redimensionne le grand conteneur vidéo en fonction des dimensions fournies.

```javascript
api.executeCommand('resizeLargeVideo',
    width: number, // The desired width
    height: number // The desired height
);
```

### sendParticipantToRoom

Envoie un participant dans une salle.

Cette commande ne peut être exécutée que par le modérateur de la réunion.

```javascript
api.executeCommand('sendParticipantToRoom',
    participantId: String, // The id of the participant.
    roomId: String // The id of the room.
);
```

### overwriteNames

Remplace les noms des participants donnés par les noms donnés. (localement pour le participant qui envoie la commande)

```javascript
api.executeCommand('overwriteNames', [{
        id: String, // The id of the participant.
        name: String // The new name.
    }]
);
```

### showNotification

Affiche une notification personnalisée. Cela n'affecte que l'utilisateur local.

Si `uid` est fourni, la notification remplacera la notification existante par le même `uid`. Le `uid` peut également être
passé à la commande `hideNotification` pour masquer par programme la notification.

```javascript
api.executeCommand('showNotification', {
  title: String, // Title of the notification.
  description: String, // Content of the notification.
  uid: String, // Optional. Unique identifier for the notification.
  type: String, // Optional. Can be 'info', 'normal', 'success', 'warning' or 'error'. Defaults to 'normal'.
  timeout: String // optional. Can be 'short', 'medium', 'long', or 'sticky'. Defaults to 'short'.
});
```

### hideNotification

Cache la notification qui a le `uid` donné.

```javascript
api.executeCommand('hideNotification',
    uid: String // Unique identifier for the notification to be removed.
);
```
