---
id: dev-guide-configuration
title: Configuration
---

:::note
Les options marquées d'un 🚫 ne peuvent pas être écrasées via `configOverwrite`
:::

:::warning
Cette page est un travail en cours. Toutes les options ne sont pas encore décrites ici.
:::

## API

### apiLogLevels

type: `Array`

Les journaux qui doivent passer par l'événement 'log' si un gestionnaire est défini pour celui-ci

Par défaut : **non défini**

```javascript
apiLogLevels: ['warn', 'log', 'error', 'info', 'debug']
```

### buttonsWithNotifyClick

type: `Array`

Boutons de la barre d'outils dont l'événement click/tap est exposé via l'API sur
`toolbarButtonClicked`. Passer une chaîne pour la touche du bouton
empêcher l'exécution de la routine cliquer/appuyer ; passer un objet avec `key` et
Le drapeau `preventExecution` sur false n'empêchera pas l'exécution du click/tap
routine. Ci-dessous tableau avec mode mixte pour le passage des boutons.

Défaut: **unset**

```javascript
buttonsWithNotifyClick: [
    'camera',
    {
        key: 'chat',
        preventExecution: false
    },
    {
        key: 'closedcaptions',
        preventExecution: true
    },
    'desktop',
    'download',
    'embedmeeting',
    'etherpad',
    'feedback',
    'filmstrip',
    'fullscreen',
    'hangup',
    'help',
    {
        key: 'invite',
        preventExecution: false
    },
    'livestreaming',
    'microphone',
    'mute-everyone',
    'mute-video-everyone',
    'participants-pane',
    'profile',
    {
        key: 'raisehand',
        preventExecution: true
    },
    'recording',
    'security',
    'select-background',
    'settings',
    'shareaudio',
    'sharedvideo',
    'shortcuts',
    'stats',
    'tileview',
    'toggle-camera',
    'videoquality',
    // Le bouton Ajouter un mot de passe dans la boîte de dialogue de sécurité.
    {
        key: 'add-passcode',
        preventExecution: false
    },
    '__end'
]
```

### mouseMoveCallbackInterval

type: `Number`

Intervalle par défaut (millisecondes) pour le déclenchement de l'événement API iframe `mouseMoved`.

Défaut: `1000`

```javascript
mouseMoveCallbackInterval: 1000
```

### useHostPageLocalStorage

type: `Boolean`

Cette propriété est liée au cas d'utilisation lorsque Jitsi Meet est utilisé via l'API IFrame. Lorsque la propriété est vraie
Jitsi Meet utilisera le stockage local de la page hôte au lieu du sien. Cette option est utile si le navigateur
ne conserve pas le stockage local à l'intérieur de l'iframe.

Défaut: **unset**

```javascript
useHostPageLocalStorage: true
```

## Audio

### audioLevelsInterval

type: `Number`

L'intervalle (millisecondes) auquel les niveaux audio sont calculés.

Défaut: `200`

```javascript
audioLevelsInterval: 200
```

### audioQuality

type: `Object`

Spécifiez les valeurs de qualité audio stéréo et opusMaxAverageBitrate afin d'activer l'audio HD.
Attention, ce faisant, vous désactivez l'annulation d'écho, la suppression du bruit et l'AGC.

Défaut: **unset**

```javascript
audioQuality: {
    stereo: false,
    opusMaxAverageBitrate: null // Valeur adaptée à la plage de 6 000 à 510 000.
}
```

### disableAudioLevels

type: `Boolean`

Désactiver la mesure des niveaux audio.

Défaut: `false`

```javascript
disableAudioLevels: false
```

### ~~disableSpeakerStatsSearch~~

type: `Boolean`

Spécifie s'il y aura ou non un champ de recherche dans les statistiques des intervenants.

__DEPRECATED__ Utilisez `speakerStats.disableSearch` à la place.

Défaut: false

```javascript
disableSpeakerStatsSearch: false
```

### disabledSounds

type: `Array`

Les sons passés dans ce tableau seront désactivés.

Défaut: **unset**

```javascript
disabledSounds: [
    // 'ASKED_TO_UNMUTE_SOUND'
    // 'E2EE_OFF_SOUND'
    // 'E2EE_ON_SOUND'
    // 'INCOMING_MSG_SOUND'
    // 'KNOCKING_PARTICIPANT_SOUND'
    // 'LIVE_STREAMING_OFF_SOUND'
    // 'LIVE_STREAMING_ON_SOUND'
    // 'NO_AUDIO_SIGNAL_SOUND'
    // 'NOISY_AUDIO_INPUT_SOUND'
    // 'OUTGOING_CALL_EXPIRED_SOUND'
    // 'OUTGOING_CALL_REJECTED_SOUND'
    // 'OUTGOING_CALL_RINGING_SOUND'
    // 'OUTGOING_CALL_START_SOUND'
    // 'PARTICIPANT_JOINED_SOUND'
    // 'PARTICIPANT_LEFT_SOUND'
    // 'RAISE_HAND_SOUND'
    // 'REACTION_SOUND'
    // 'RECORDING_OFF_SOUND'
    // 'RECORDING_ON_SOUND'
    // 'TALK_WHILE_MUTED_SOUND'
]
```

### enableNoAudioDetection

type: `Boolean`

Activer ceci exécutera le module de détection audio lib-jitsi-meet no qui
avertira l'utilisateur si le microphone actuellement sélectionné n'a pas d'audio
entrée et suggérera un autre périphérique valide s'il y en a un.

Défaut: `true`

```javascript
enableNoAudioDetection: true
```

### enableNoisyMicDetection

type: `Boolean`

Activer ceci exécutera le module de détection de bruit lib-jitsi-meet qui
avertir l'utilisateur s'il y a du bruit, autre que la voix, provenant du courant
micro sélectionné. Le but est de faire savoir à l'utilisateur que l'entrée pourrait
être potentiellement désagréable pour les autres participants à la réunion.

Défaut: `true`

```javascript
enableNoisyMicDetection: true
```

### speakerStats

type: `Object`

Options liées à la fonction de statistiques des haut-parleurs.

Properties: 

* `disabled` - Spécifie si les statistiques du haut-parleur sont activées ou non.
* `disableSearch` - Spécifie s'il y aura ou non un champ de recherche dans les statistiques des intervenants.
* `order` - Spécifie si les participants aux statistiques des intervenants doivent être classés ou non, et avec quelle priorité.

Défaut:

```javascript
speakerStats: {
    disabled: false,
    disableSearch: false,
    order: [
        'role', // Modérateurs au top.
        'name', // Par ordre alphabétique de nom.
        'hasLeft', // Ceux qui sont restés en bas.
    ], // l'ordre des éléments du tableau détermine la priorité.
}
```

### ~~speakerStatsOrder~~

type: `Array`

Spécifie si les participants aux statistiques des intervenants doivent être classés ou non, et avec quelle priorité.

__DEPRECATED__ Use `speakerStats.order` instead.

Défaut:
 ```javascript
    speakerStatsOrder: [
        'role', // Modérateurs au top.
        'name', // Par ordre alphabétique de nom.
        'hasLeft', // Ceux qui sont restés en bas.
    ], // l'ordre des éléments du tableau détermine la priorité.
```

### startAudioMuted

type: `Number`

Chaque participant après le Nième commencera le son en sourdine.

Défaut: **unset**

```javascript
startAudioMuted: 10
```

### startAudioOnly

type: `Boolean`

Démarrez la conférence en mode audio uniquement (aucune vidéo n'est reçue ni envoyée).

Défaut: **unset**

```javascript
startAudioOnly: false
```

### startSilent

type: `Boolean`

L'activer (avec #params) désactivera la sortie audio locale de la télécommande
participants et pour le réactiver, un rechargement est nécessaire.

Défaut: **unset**

```javascript
startSilent: false
```

### startWithAudioMuted

type: `Boolean`

Démarrez les appels avec le son coupé. Cette option n'est appliquée que localement.

Défaut: **unset**

```javascript
startWithAudioMuted: false
```

## Breakout rooms

### breakoutRooms

type: `Object`

Options liées à la fonctionnalité des salles de sous-commission.

Défaut: **unset**

Properties:
* `hideAddRoomButton` - Masque le bouton Ajouter une salle de sous-commission. Ceci remplace `hideAddRoomButton`.
* `hideAutoAssignButton` - Masque le bouton d'attribution automatique des participants.
* `hideJoinRoomButton` - Masque le bouton Rejoindre la salle de discussion.
* `hideModeratorSettingsTab` - Masque le bouton pour ouvrir l'onglet des paramètres du modérateur.
* `hideMoreActionsButton` - Masque le bouton Plus d'actions.
* `hideMuteAllButton` - Masque le bouton Tout désactiver.

```javascript
breakoutRooms: {
    hideAddRoomButton: false,
    hideAutoAssignButton: false,
    hideJoinRoomButton: false
}
```

### ~~hideAddRoomButton~~

type: `Boolean`

__DEPRECATED__ Utilisez `breakoutRooms.hideAddRoomButton` à la place.

Cache le bouton d'ajout de salle de sous-commission.

Défaut: `false`

```javascript
hideAddRoomButton: false
```

## Callstats

### callStatsConfigParams

type: `Object`

Les callstats initialisent les paramètres de configuration comme décrit dans l'API [ici](https://docs.callstats.io/docs/javascript#callstatsinitialize-with-app-secret).

```javascript
callStatsConfigParams: {
    disableBeforeUnloadHandler: true, // désactive le paramètre window.onbeforeunload de callstats.js.
    applicationVersion: "app_version", // Version de l'application spécifiée par le développeur.
    disablePrecalltest: true, // désactive le test de pré-appel, il est activé par Défaut.
    siteID: "siteID", // Le nom/ID du site/campus à partir duquel le test d'appel/pré-appel est effectué.
    additionalIDs: { // objet additionalIDs, contient les ID liés à l'application.
        customerID: "Customer Identifier. Example, walmart.",
        tenantID: "Tenant Identifier. Example, monster.",
        productName: "Product Name. Example, Jitsi.",
        meetingsName: "Meeting Name. Example, Jitsi loves callstats.",
        serverName: "Server/MiddleBox Name. Example, jvb-prod-us-east-mlkncws12.",
        pbxID: "PBX Identifier. Example, walmart.",
        pbxExtensionID: "PBX Extension Identifier. Example, 5625.",
        fqExtensionID: "Fully qualified Extension Identifier. Example, +71 (US) +5625.",
        sessionID: "Session Identifier. Example, session-12-34"
    },
    collectLegacyStats: true, // permet la collecte de statistiques héritées dans le navigateur Chrome
    collectIP: true // active l'adresse IP locale de collecte
}
```

### callStatsID

type: `String`

Vous devez fournir l'ID d'application pour permettre l'envoi de statistiques à callstats.io

```javascript
callStatsID: 'my-callstats-app-id'
```

### callStatsSecret

type: `String`

Vous devez fournir le secret pour permettre l'envoi de statistiques à callstats.io

```javascript
callStatsSecret: 'my-callstats-secret'
```

### enableDisplayNameInStats

type: `Boolean`

Permet d'envoyer les noms d'affichage des participants à callstats.

```javascript
enableDisplayNameInStats: false
```

### enableEmailInStats

type: `Boolean`

Permet d'envoyer les e-mails des participants (si disponible) à callstats et à d'autres analyses

```javascript
enableEmailInStats: false
```

### feedbackPercentage

type: `Number`

Contrôle le pourcentage de commentaires automatiques affichés aux participants lorsque callstats est activé.
La valeur de défaut est de 100 %. S'il est défini sur 0, aucun retour automatique ne sera demandé

```javascript
feedbackPercentage: 100
```

## Closed captions

### autoCaptionOnRecord*

type: `Boolean`

Active l'activation automatique des sous-titres au démarrage de l'enregistrement

Défaut: `false`

```javascript
autoCaptionOnRecord: false
```

### preferredTranscribingLanguage 🚫

type: `Boolean`

Langue du transcripteur. Ce paramètre ne fonctionnera que si `transcribeWithAppLanguage` est explicitement défini sur `false`.
Les langues disponibles peuvent être trouvées [ici](https://github.com/jitsi/jitsi-meet/blob/master/react/features/transcribing/transcriber-langs.json).

Défaut: `'en-US'`

```javascript
preferredTranscribeLanguage: 'en-CA'
```

### transcribeWithAppLanguage 🚫

type: `Boolean`

Si `true` le transcripteur utilisera la langue de l'application.
La langue de l'application est soit définie explicitement par les participants dans leurs paramètres, soit automatiquement
détecté en fonction de l'environnement, par ex. si l'application est ouverte dans une instance chrome qui utilise le français comme
Langue par défaut alors les transcriptions pour ce participant seront en français.

Défaut: `true`

```javascript
transcribeWithAppLanguage: false
```

### transcribingEnabled

type: `Boolean`

Activer la transcription (dans interface_config, les sous-titres et les boutons peuvent être configurés).

Défaut: `false`

```javascript
transcribingEnabled: true
```

## Connection

### bosh*

type: `String`

The BOSH URL.

```javascript
bosh: '//jitsi-meet.example.com/http-bind'
```

### disableRtx

type: `Boolean`

Désactive ou active RTX (RFC 4588).

Défaut: `false`

```javascript
disableRtx: true
```

### disableSimulcast

type: `Boolean`

Activer/désactiver la prise en charge de la diffusion simultanée.

Défaut: `false`

```javascript
disableSimulcast: true
```

### e2ee

type: `Object`

Configurez le chiffrement de bout en bout.

```javascript
e2ee: {
    labels: {
        labelTooltip: 'Tooltip',
        description: 'Description',
        label: 'E2EE',
        warning: 'Warning'
    },
    externallyManagedKey: false
}
```

### e2eping

type: `Object`

Options liées au ping de bout en bout (participant à participant).

Properties:
* `enabled` - Indique si les pings de bout en bout doivent être activés.
* `numRequests` - Le nombre de réponses à attendre.
* `maxConferenceSize` - La taille maximale de la conférence dans laquelle les pings e2e seront envoyés.
* `maxMessagesPerSecond` - Le nombre maximum de messages e2e ping par seconde pour l'ensemble de la conférence à viser.
    Ceci est utilisé pour contrôler le rythme des messages afin de réduire la charge sur le backend.

```javascript
e2eping: {
    enabled: false,
    numRequests: 5,
    maxConferenceSize: 200,
    maxMessagesPerSecond: 250
}
```

### enableEncodedTransformSupport

type: `Boolean`

Activez la prise en charge de la transformation codée dans les navigateurs pris en charge. Ceci permet
E2EE pour fonctionner dans Safari si le drapeau correspondant est activé dans le navigateur.
**Experimental**.

```javascript
enableEncodedTransformSupport: false
```

### enableForcedReload 🚫

type: `Boolean`

Active le rechargement forcé du client lorsque l'appel est migré suite à
le pont qui descend.

```javascript
enableForcedReload: true
```

### enableIceRestart

type: `Boolean`

Active la logique de redémarrage ICE dans LJM et affiche la superposition de rechargement de page sur
Défaillance ICE. Courant désactivé par Défaut car il cause des problèmes avec
signalant quand Octo est activé. De plus, lorsque nous effectuons un "redémarrage ICE" (qui est
pas un vrai redémarrage ICE), le client conserve le numéro de séquence TCC
compteur, mais le pont le réinitialise. Le pont envoie des paquets multimédia avec
Numéros de séquence TCC à partir de 0.

```javascript
enableIceRestart: true
```

### gatherStats

type: `Boolean`

Activer ou non la collecte de statistiques dans `TraceablePeerConnection`.
Cela peut être utile à des fins de débogage (post-traitement/analyse de
les statistiques WebRTC) comme cela se fait dans la bande passante jitsi-meet-torture
essais d'estimation.

```javascript
gatherStats: false
```

### hosts

type: `Object`

URLs for the app connection.

Properties
* `domain` - Domaine XMPP
* `anonymousdomain` - Lors de l'utilisation de l'authentification, domaine pour les utilisateurs invités.
* `authdomain` - Domaine pour les utilisateurs authentifiés. Défauts à 'domaine'.
* `focus` - Focus sur le domaine des composants. Par défaut à **focus.`domain`**.
* `muc` - Domaine XMPP MUC.

```javascript
hosts: {
    domain: 'jitsi-meet.example.com',
    anonymousdomain: 'guest.example.com',
    authdomain: 'jitsi-meet.example.com',
    focus: 'focus.jitsi-meet.example.com',
    muc: 'conference.jitsi-meet.example.com'
}
```

### p2p

type: `Object`

Mode Peer-To-Peer : utilisé (si activé) lorsqu'il n'y a que 2 participants.

Properties:
* `enabled` - Active le mode poste à poste. Lorsqu'il est activé, le système essaie d'établir une connexion directe lorsqu'il y a exactement 2 participants dans la salle. Si cela réussit, la conférence cessera d'envoyer des données via le JVB et utilisera la connexion poste à poste à la place. Lorsqu'un troisième participant rejoindra la conférence, il reviendra à la connexion JVB.
* `enableUnifiedOnChrome` - Activez la prise en charge de la mise en œuvre du plan unifié sur Chromium pour la connexion p2p.
* `iceTransportPolicy` - Définit la politique de transport ICE pour la connexion p2p. Au moment d'écrire ces lignes, la liste des valeurs possibles est "toutes" et "relais", mais cela est susceptible de changer à l'avenir. L'énumération est définie dans la [norme WebRTC](https://www.w3.org/TR/webrtc/#rtcicetransportpolicy-enum). S'il n'est pas défini, la valeur effective est "tout".
* `preferH264` - __DEPRECATED__ Utilisez `preferredCodec` à la place.
* `preferredCodec` - Fournit un moyen de définir la préférence du codec vidéo sur la connexion p2p. Les valeurs de codec acceptables sont `VP8`, `VP9` et `H264`.
* `disableH264` - __DEPRECATED__ Utilisez `disabledCodec` à la place.
* `disabledCodec` - Fournit un moyen d'empêcher la négociation d'un codec vidéo sur la connexion p2p
* `backToP2PDelay` - Combien de temps on va attendre, avant de revenir en P2P après que le 3ème participant ait quitté la conférence (pour filtrer le rechargement de page).
* `stunServers` - Les serveurs STUN qui seront utilisés dans les connexions peer to peer.

```javascript
p2p: {
    enabled: true,
    enableUnifiedOnChrome: false,
    iceTransportPolicy: 'all',
    preferredCodec: 'H264',
    disabledCodec: '',
    backToP2PDelay: 5,
    stunServers: [
        { urls: 'stun:jitsi-meet.example.com:3478' },
        { urls: 'stun:meet-jit-si-turnrelay.jitsi.net:443' }
    ]
}
```

### pcStatsInterval

type: `Number`

L'intervalle auquel PeerConnection.getStats() est appelé.

Défaut: `10000`

```javascript
pcStatsInterval: 50000
```

### useTurnUdp

type: `Boolean`

Utiliser les serveurs TURN/UDP pour la connexion jitsi-videobridge (par Défaut
nous filtrons TURN/UDP car il n'est généralement pas nécessaire puisque le
pont lui-même est accessible via UDP)

```javascript
useTurnUdp: false
```

### webrtcIceTcpDisable

type: `Boolean`

Désactive ICE/TCP en filtrant les candidats TCP locaux et distants dans la signalisation.

```javascript
webrtcIceTcpDisable: false
```

### webrtcIceUdpDisable

type: `Boolean`

Désactive ICE/UDP en filtrant les candidats UDP locaux et distants dans la signalisation.

```javascript
webrtcIceUdpDisable: false
```

### websocket 🚫

type: `String`

Websocket URL

```javascript
websocket: 'wss://jitsi-meet.example.com/xmpp-websocket'
```

## Etherpad

### etherpad_base

type: `String`

S'il est défini, il ajoute un lien "Ouvrir le document partagé" dans le menu en bas à droite qui ouvrira un document Etherpad.

```javascript
etherpad_base: 'https://your-etherpad-installati.on/p/'
```

### openSharedDocumentOnJoin

type: `Boolean`

Si l'intégration d'etherpad est activée, le définir sur "true"
ouvrir automatiquement l'etherpad lorsqu'un participant se joint. Cette
n'affecte pas l'application mobile depuis l'ouverture d'un etherpad
masque les commandes de la conférence : il est préférable de laisser les utilisateurs
choisir d'ouvrir le pad par eux-mêmes dans ce cas.

```javascript
openSharedDocumentOnJoin: false
```

## Filmstrip

### disableFilmstripAutohiding

type: `Boolean`

Empêche la pellicule de se masquer automatiquement lorsque la largeur de l'écran est inférieure à un certain seuil

Défaut: `false`

```javascript
disableFilmstripAutohiding: true
```

### filmstrip

type: `Object`

Options liées à la pellicule.

Défaut: **unset**

Properties:
* `disableResizable` - Désactive la pellicule redimensionnable par l'utilisateur. Cela permet également la configuration de la pellicule (largeur, ratios d'aspect des tuiles) via les options interfaceConfig.
* `disableStageFilmstrip` - Désactive la pellicule de scène (affichant plusieurs participants sur scène en plus de la pellicule verticale)

```javascript
filmstrip: {
    disableResizable: true,
    disableStageFilmstrip: false
}
```

## Face Landmarks

### faceLandmarks

type: `Object`

Options liées aux fonctionnalités des points de repère du visage.

Properties:
* `enableFaceCentering` - Permet de centrer les visages dans une vidéo en partageant les coordonnées des visages.
* `enableFaceExpressionsDetection` - Permet de détecter les expressions faciales à partir de la vidéo.
* `enableDisplayFaceExpressions` - Active l'affichage des expressions faciales dans les statistiques des haut-parleurs.
* `enableRTCStats` - Active la collecte de statistiques anonymes pour les points de repère du visage.
* `faceCenteringThreshold` - Seuil de pourcentage de mouvement de visage minimum requis pour l'envoi de nouvelles données de coordonnées de centrage du visage.
* `captureInterval` - Millisecondes pour le traitement d'une nouvelle capture d'image afin de détecter les repères du visage.

```javascript
faceLandmarks: {
        enableFaceCentering: false,
        enableFaceExpressionsDetection: false,
        enableDisplayFaceExpressions: false,
        enableRTCStats: false,
        faceCenteringThreshold: 20,
        captureInterval: 1000
},
```

## Giphy

### giphy

type: `Object`

Configuration de l'intégration Giphy.

Properties:
* `enabled` - Que la fonctionnalité soit activée ou non.
* `sdkKey` - Clé API SDK de Giphy.
* `displayMode` - Le mode d'affichage peut être l'un des suivants :
    - `tile` - affichez le GIF sur la tuile du participant qui l'a envoyé.
    - `chat` - afficher le GIF sous forme de message dans le chat.
    - `all` - Tout ce qui précède. C'est l'option Défaut.
* `tileTime` - Combien de temps le GIF doit être affiché sur la vignette (en millisecondes).
* `rating` - Limiter les résultats par cote d'audience :
    - `g` - largement accepté comme approprié dans un environnement public. C'est l'option Défaut.
    - `pg` - couramment observés dans un environnement public, mais pas aussi largement acceptés qu'appropriés.
    - `pg-13` - généralement pas vu à moins d'être recherché, mais toujours souvent observé.
    - `r` - généralement pas vu à moins d'être recherché, et pourrait être considéré comme alarmant s'il en est témoin.

```javascript
giphy: {
    enabled: true,
    sdkKey: 'example-key',
    displayMode: 'tile',
    tileTime: 7000,
    rating: 'pg'
}
```

## Gravatar

### gravatar

type: `Object`

Configuration des services compatibles Gravatar.

Properties:
* `baseUrl` 🚫 - URL de base pour un service compatible Gravatar. Défauts à Gravatar.
* `disabled` - Vrai si Gravatar doit être désactivé.

```javascript
gravatar: {
    baseUrl: 'https://www.gravatar.com/avatar/',
    disabled: false
}
```

### ~~gravatarBaseURL~~ 🚫

type: `String`

__DEPRECATED__ Utilisez plutôt `gravatar.baseUrl`.

URL de base pour un service compatible Gravatar.

Défaut: 'https://www.gravatar.com/avatar/'

```javascript
gravatarBaseURL: 'https://www.gravatar.com/avatar/'
```

## LastN

### channelLastN

type: `Number`

Valeur par défaut pour l'attribut "dernier N" du canal. -1 pour illimité.

```javascript
channelLastN: -1
```

### lastNLimits 🚫

type: `Object`

Fournit un moyen d'utiliser différentes valeurs de "dernier N" en fonction du nombre de participants à la conférence.
Les clés d'un objet représentent le nombre de participants et les valeurs sont "dernier N" à utiliser lorsque le nombre de
les participants atteignent ou dépassent le nombre.


Pour l'exemple de mappage donné, "dernier N" sera défini sur 20 tant qu'il y en aura au moins 5, mais moins de
29 participants à l'appel et il sera abaissé à 15 lorsque le 30e participant se joindra. Le 'channelLastN'
sera utilisé comme Défaut jusqu'à ce que le premier seuil soit atteint.

```javascript
lastNLimits: {
    5: 20,
    30: 15,
    50: 10,
    70: 5,
    90: 2
}
```

### startLastN

type: `Number`

Fournit un moyen de contrôler la valeur lastN via l'interface utilisateur.
Lorsque startLastN est présent, la conférence démarre avec une valeur last-n de startLastN et channelLastN
sera utilisée lorsque le niveau de qualité est sélectionné à l'aide du curseur "Gérer la qualité vidéo".

```javascript
startLastN: 1
```

## Lobby

### autoKnockLobby

type: `Boolean`

Si Lobby est activé, commence à frapper automatiquement.

```javascript
autoKnockLobby: false
```

### enableLobbyChat

type: `Boolean`

Activer le chat du lobby.

```javascript
enableLobbyChat: false
```

### hideLobbyButton

type: `Boolean`

Masquez le bouton du lobby.

```javascript
hideLobbyButton: false
```

## Moderator

### disableModeratorIndicator

type: `Boolean`

Masque les indicateurs du modérateur.

Défaut: `false`

```javascript
disableModeratorIndicator: true
```

### disableReactionsModeration

type: `Boolean`

Désactive la fonction de modération des réactions.

Défaut: `false`

```javascript
disableReactionsModeration: true
```

### disableRemoteMute

type: `Boolean`

Désactive les opérations de mise en sourdine des participants distants.

Défaut: `false`

```javascript
disableRemoteMute: true
```

## Notifications

### notifications

type: `Array`

Utilisez ce tableau pour configurer les notifications qui seront présentées à l'utilisateur.
Les éléments correspondent au titre ou à la clé de description de cette notification.
Certaines de ces notifications dépendent également d'une autre logique interne pour être affichées ou non,
donc les ajouter ici ne garantira pas qu'ils seront toujours affichés.

Une valeur fausse pour cette prop entraînera l'activation de toutes les notifications (par exemple, null, undefined, false).

```javascript
notifications: []
```

### disabledNotifications

type: `Array`

Liste des notifications à désactiver. Fonctionne en tandem avec le réglage ci-dessus.

```javascript
disabledNotifications: [
    'notify.chatMessages', // affiché lors de la réception de messages de chat alors que la fenêtre de chat est fermée
    'notify.grantedTo', // affiché lorsque les droits de modérateur ont été accordés à un participant
]
```

## Participants Pane

### participantsPane

type: `Object`

Options liées au volet des participants.

Défaut: **unset**

Properties:
* `hideModeratorSettingsTab` - Masque le bouton pour ouvrir l'onglet des paramètres du modérateur.
* `hideMoreActionsButton` - Masque le bouton Plus d'actions.
* `hideMuteAllButton` - Masque le bouton Tout désactiver.

```javascript
participantsPane: {
    hideModeratorSettingsTab: false,
    hideMoreActionsButton: false,
    hideMuteAllButton: false
}
```

## Recording

### dropbox

type: `Object`

Activez l'intégration de la boîte de dépôt.

Properties:
* `appKey` - Votre clé d'application.
* `redirectURI` - Une URL vers laquelle rediriger l'utilisateur, après s'authentifier par Défaut utilise

```javascript
dropbox: {
    appKey: 'DROPBOX_APP_KEY',
    redirectURI: 'https://jitsi-meet.example.com/subfolder/static/oauth.html'
}
```

### fileRecordingsEnabled

type: `Boolean`

Activer ou non l'enregistrement de fichiers.

```javascript
fileRecordingsEnabled: false
```

### fileRecordingsServiceEnabled 🚫

type: `Boolean`

Lorsque des intégrations comme dropbox sont activées, seules celles-ci seront affichées,
en activant fileRecordingsServiceEnabled, nous montrons à la fois les intégrations
et le service d'enregistrement générique (sa configuration et son type de stockage
dépend de la configuration du jibri)

```javascript
fileRecordingsServiceEnabled: true
```

### fileRecordingsServiceSharingEnabled 🚫

type: `Boolean`

Afficher ou non la possibilité de partager l'enregistrement de fichiers avec d'autres personnes
(par exemple, les participants à la réunion), sur la base de la mise en œuvre réelle
sur le backend.

```javascript
fileRecordingsServiceSharingEnabled: false
```

### hideRecordingLabel

type: `Boolean`

Définissez l'étiquette d'enregistrement sur Masquer automatiquement au lieu de rester toujours à l'écran.

Défaut: `false`

```javascript
hideRecordingLabel: true
```

### localRecording

type: `Object`

Définissez la configuration d'enregistrement local.

Properties:
* `disable` - Que ce soit pour désactiver la fonctionnalité ou non.
* `notifyAllParticipants` - Indique s'il faut notifier tous les participants lorsqu'un enregistrement local démarre.

```javascript
localRecording: {
    disable: false,
    notifyAllParticipants: true
}
```

### recordingLimit 🚫

type: `Object`

Options pour la notification de limite d'enregistrement.

Properties:
* `limit` - La limite d'enregistrement en minutes. Remarque : Ce numéro apparaît dans le texte de la notification, mais n'applique pas la limite de temps d'enregistrement réelle. Cela devrait être configuré dans jibri !
* `appName` = Le nom de l'application avec des enregistrements illimités.
* `appURL` - L'URL de l'application avec des enregistrements illimités.

```javascript
recordingLimit: {
    limit: 60,
    appName: 'Unlimited recordings APP',
    appURL: 'https://unlimited.recordings.app.com/'
}
```

## Screen Sharing

### desktopSharingFrameRate

type: `Object`

Options facultatives de fréquence d'images de partage de bureau

Défaut: `{
    min: 5,
    max: 5
}`

```javascript
desktopSharingFrameRate: {
    min: 3,
    max: 10
}
```

### disableScreensharingVirtualBackground

type: `Boolean`

Désactive l'utilisation du partage d'écran comme arrière-plan virtuel.

```javascript
disableScreensharingVirtualBackground: false
```

### enableLayerSuspension

type: `Boolean`

Activer la suspension de couche. Si activé, les terminaux dont les couches HD ne sont pas utilisées seront suspendus
(n'est plus envoyé) jusqu'à ce qu'ils soient à nouveau demandés. Ceci doit être activé pour l'écran
le partage fonctionne comme prévu sur Chrome. La désactivation de cette option peut entraîner l'envoi d'un partage d'écran en basse résolution
par le client.

Défaut: `true`

```javascript
enableLayerSuspension: false
```

### screenshotCapture

type: `Object`

Options pour la fonction de capture d'écran.

Properties:
* `enabled` - Active la fonction
* `mode` - Le mode de la fonction de capture d'écran. Peut être soit "enregistrement" - les captures d'écran du partage d'écran sont prises uniquement lorsque l'enregistrement est également activé, soit "toujours" - les captures d'écran du partage d'écran sont toujours prises.

```javascript
screenshotCapture: {
    enabled: true,
    mode: 'recording'
}
```

## Video

### constraints

type: `Object`

Contraintes vidéo conformes aux spécifications W3C à utiliser pour la capture vidéo. Actuellement
utilisé par les navigateurs qui renvoient true à partir de lib-jitsi-meet
`util#browser#usesNewGumFlow`. Les contraintes sont indépendantes de
la valeur de résolution de cette configuration. Défauts de demander un idéal
résolution de 720p.

```javascript
constraints: {
    video: {
        height: {
            ideal: 720,
            max: 720,
            min: 240
        }
    }
}
```

### disableAddingBackgroundImages

type: `Boolean`

Lorsque la valeur est true, l'utilisateur ne peut pas ajouter d'autres images à utiliser comme arrière-plan virtuel.
Seuls les Défaut de seront disponibles.

```javascript
disableAddingBackgroundImages: true
```

### disableH264

type: `Boolean`

S'il est défini sur true, désactivez le codec vidéo H.264 en le supprimant du SDP.

```javascript
disableH264: true
```

### disableLocalVideoFlip

type: `Boolean`

Désactivez l'option Retourner la vidéo dans le menu contextuel de la vidéo locale.

```javascript
disableLocalVideoFlip: true
```

### disableSelfView

type: `Boolean`

Désactive la mosaïque d'image locale. (le masque de la vue en mosaïque et de la pellicule)

```javascript
disableSelfView: true
```

### doNotFlipLocalVideo

type: `Boolean`

Une propriété utilisée pour désactiver l'état de retournement Défaut de la vidéo locale.
Lorsqu'il est défini sur "true", la vidéo locale (auto) ne sera plus mise en miroir.

```javascript
doNotFlipLocalVideo: true
```

### maxFullResolutionParticipants

type: `Boolean`

Combien de participants en mode d'affichage en mosaïque, avant que la qualité de la vidéo de réception ne passe de HD à SD.
Utilisez `-1` pour désactiver.

```javascript
maxFullResolutionParticipants: 5
```

### ~~preferH264~~

type: `Boolean`

__DEPRECATED__ Utilisez plutôt `preferredCodec` sous la section `videoQuality`.

Préférez utiliser le codec vidéo H.264 (si pris en charge).
Notez qu'il n'est pas recommandé de le faire car la diffusion simultanée n'est pas
pris en charge lors de l'utilisation de H.264. Pour les appels 1 à 1, ce paramètre est activé par
Défaut et peut être basculé dans la section p2p.

### resolution

type: `Number`

Définit la résolution préférée (hauteur) pour la vidéo locale

Défaut: `720`

```javascript
resolution: 1080
```

### startVideoMuted

type: `Number`

Chaque participant après le Nième démarrera la vidéo en sourdine.

```javascript
startVideoMuted: 5
```

### startWithVideoMuted

type: `Boolean`

Démarrez les appels avec la vidéo en sourdine. Uniquement appliqué localement.

```javascript
startWithVideoMuted: true
```

### videoQuality

type: `Object`

Spécifiez les paramètres d'optimisation de la qualité vidéo sur le client.

Properties:
* `disabledCodec` - Fournit un moyen d'empêcher la négociation d'un codec vidéo sur la connexion JVB. Le codec spécifié ici sera supprimé de la liste des codecs présents dans la réponse SDP générée par le client. Si le même codec est spécifié pour l'option désactivée et préférée, les paramètres de désactivation prévaudront. Notez que `VP8` ne peut pas être désactivé puisqu'il s'agit d'un codec obligatoire, le paramètre sera ignoré dans ce cas.
* `preferredCodec` - Fournit un moyen de définir un codec vidéo préféré pour la connexion JVB. Si `H264` est spécifié ici, la diffusion simultanée sera automatiquement désactivée car JVB ne prend pas encore en charge la diffusion simultanée H264. Cela ne réorganisera l'ordre de préférence des codecs dans la réponse SDP générée par le navigateur que si le codec préféré spécifié ici est présent. Veuillez vous assurer que le JVB propose le codec spécifié pour que cela prenne effet.
* `enforcePreferredCodec` - Fournit un moyen d'appliquer le codec préféré pour la conférence même lorsque la conférence a des points de terminaison qui ne prennent pas en charge le codec préféré. Par exemple, les anciennes versions de Safari ne prennent pas encore en charge `VP9`. Cela empêchera Safari de décoder la vidéo des points de terminaison envoyant la vidéo "VP9". Lorsqu'il est défini sur "false", la conférence revient à "VP8" chaque fois qu'un point de terminaison ne prend pas en charge le codec préféré et revient au codec préféré lorsque ce point de terminaison quitte.
* `maxBitratesVideo` - Fournit un moyen de configurer les débits binaires maximum qui seront appliqués sur les flux de diffusion simultanée pour les pistes vidéo. Les clés de l'objet représentent le type de flux (LD, SD ou HD) et les valeurs sont les max.bitrates à définir sur ce type particulier de flux. L'envoi réel peut varier en fonction de la bande passante disponible calculée par le navigateur, mais il sera plafonné par les valeurs spécifiées ici. Ceci n'est actuellement pas implémenté sur les clients basés sur des applications sur mobile.
* `minHeightForQualityLvl` - Les options peuvent être utilisées pour remplacer les seuils de défaut des hauteurs des vignettes vidéo correspondant aux niveaux de qualité vidéo utilisés dans l'application. Au moment d'écrire ces lignes, les niveaux autorisés sont :
    *    `low` - pour le bas niveau de qualité (180p au moment d'écrire ces lignes)
    *    `standard` - pour le niveau de qualité moyen (360p)
    *    `high` - pour le haut niveau de qualité (720p)

   Les clés doivent être des nombres positifs qui représentent la hauteur minimale de la vignette pour le niveau de qualité.
    Avec la valeur de configuration Défaut en dessous, l'application utilisera une qualité "faible" jusqu'à ce que les vignettes soient
    au moins 360 pixels de haut. Si la hauteur de la vignette atteint 720 pixels, l'application passera à
    la haute qualité. 
* `resizeDesktopForPresenter` - Fournit un moyen de redimensionner la piste du bureau à 720p (si elle est supérieure à 720p)
    avant de créer un canevas pour le mode présentateur (mode image dans l'image de la caméra avec partage d'écran).

```javascript
videoQuality: {
    disabledCodec: 'H264',
    preferredCodec: 'VP8',
    maxBitratesVideo: {
        H264: {
            low: 200000,
            standard: 500000,
            high: 1500000
        },
        VP8 : {
            low: 200000,
            standard: 500000,
            high: 1500000
        },
        VP9: {
            low: 100000,
            standard: 300000,
            high: 1200000
        }
    },
    minHeightForQualityLvl: {
        360: 'standard',
        720: 'high'
    },
    resizeDesktopForPresenter: false
}
```

## Whiteboard

### whiteboard

type: `Object`

Options liées à l'intégration du tableau blanc Excalidraw.

Défaut: **unset**

Properties:
* `enabled` - Que la fonctionnalité soit activée ou non.
* `collabServerBaseUrl` - Le [serveur](https://github.com/jitsi/excalidraw-backend) utilisé pour prendre en charge la collaboration sur tableau blanc. 

```javascript
whiteboard: {
    enabled: true,
    collabServerBaseUrl: 'https://excalidraw-backend.example.com'
}
