---
id: dev-guide-ljm-api
title: lib-jitsi-meet API (low level)
---

Vous pouvez utiliser l'API Jitsi Meet pour créer des visioconférences Jitsi Meet avec une interface graphique personnalisée.

## Installation

Pour intégrer l'API Jitsi Meet dans votre application, vous devez ajouter la bibliothèque d'API Jitsi Meet

```html
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://meet.jit.si/libs/lib-jitsi-meet.min.js"></script>
```

Vous pouvez maintenant accéder à l'API Jitsi Meet via l'objet global `JitsiMeetJS`.

## Getting Started

1. La première chose que vous devez faire pour utiliser l'API Jitsi Meet est d'initialiser l'objet `JitsiMeetJS` :

```javascript
JitsiMeetJS.init();
```

2. Ensuite, vous devez créer l'objet de connexion :


```javascript
var connection = new JitsiMeetJS.JitsiConnection(null, null, options);
```


3. Nous pouvons maintenant attacher des écouteurs à l'objet de connexion et établir la connexion au serveur :

```javascript
connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, onConnectionSuccess);
connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, onConnectionFailed);
connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, disconnect);

connection.connect();
```

4. Après avoir reçu l'événement `CONNECTION_ESTABLISHED`, vous devez créer l'objet `JitsiConference` et vous pouvez également attacher des écouteurs pour les événements de conférence (nous allons ajouter des gestionnaires pour la piste distante, la conférence jointe, etc.):


```javascript
room = connection.initJitsiConference("conference1", confOptions);
room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);
room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, onConferenceJoined);
```

5. Vous souhaiterez peut-être également obtenir vos pistes locales à partir de la caméra et du microphone :
```javascript
JitsiMeetJS.createLocalTracks().then(onLocalTracks);
```

REMARQUE: L'ajout d'écouteurs et la création de flux locaux ne sont pas des étapes obligatoires.

6. Vous êtes alors prêt à créer/rejoindre une conférence :

```javascript
room.join();
```

Après cette étape, vous êtes dans la conférence. Vous pouvez maintenant continuer en ajoutant du code qui gérera les événements et gérera la conférence.

## Components

L'API Jitsi Meet comprend les composants suivants :

* JitsiMeetJS

* JitsiConnection

* JitsiConference

* JitsiTrack

* JitsiTrackError

## Usage

:::note REMARQUE
Clients JaaS, veuillez suivre [cet exemple](https://github.com/jitsi/ljm-jaas-example) ou consulter la [démo en direct](https://jitsi.github.io/ljm-jaas-example).

:::

### JitsiMeetJS

Vous pouvez accéder aux méthodes et objets suivants via l'objet `JitsiMeetJS`.

*  `JitsiMeetJS.init(options)` - cette méthode a initialisé l'API Jitsi Meet.
Le paramètre `options` est un objet JS avec les propriétés suivantes :
    - `useIPv6` - boolean property
    - `disableAudioLevels` - boolean property. Active/désactive les niveaux audio.
    - `disableSimulcast` - boolean property. Active/désactive la diffusion simultanée.
    - `enableWindowOnErrorHandler` - boolean property (default false). Active/désactive l'attachement du gestionnaire d'erreur global (window.onerror).
    - `disableThirdPartyRequests` - si vrai - callstats sera désactivé et l'API callstats ne sera pas incluse.
    - `enableAnalyticsLogging` - boolean property (default false). Active/désactive la journalisation analytique.
    - `externalStorage` - Objet qui implémente l'interface de stockage. S'il est spécifié, cet objet sera utilisé pour stocker des données au lieu de `localStorage`.
    - `callStatsCustomScriptUrl` - (facultatif) URL personnalisée pour accéder au script client callstats
    - `disableRtx` - (optional) boolean property (default to false).  Active/désactive l'utilisation de RTX.
    - `disabledCodec` - le type MIME du code qui ne doit pas être négocié sur la connexion homologue.
    - `preferredCodec` - le type mime du codec qui doit devenir le codec préféré pour la connexion.
    - `useTurnUdp` - propriété booléenne (false par défaut). Active l'utilisation de turn over udp pour jvb. Il est désactivé car pas très utile (si le client peut utiliser udp, il peut probablement se connecter à jvb directement via udp aussi; mais il peut être utile de toujours activer le virage udp lorsqu'un virage udp est connu pour être en liste blanche sur un réseau)

* `JitsiMeetJS.JitsiConnection` - le constructeur `JitsiConnection`. Vous pouvez l'utiliser pour créer une nouvelle connexion au serveur.

* `JitsiMeetJS.setLogLevel` - modifie le niveau de journalisation de la bibliothèque. Par exemple pour n'avoir que des messages d'erreur il faut faire :
```javascript
JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
```

* `JitsiMeetJS.createLocalTracks(options)` - Crée les pistes multimédias et les renvoie via l'objet `Promise`. Si rejeté, passe l'instance `JitsiTrackError` au bloc catch.
    - `options` - Objet JS avec options de configuration pour les pistes multimédias locales. Vous pouvez y modifier les propriétés suivantes :
        1. `devices` - tableau avec les périphériques - "desktop", "video" et "audio" qui seront transmis à GUM. Si cette propriété n'est pas définie, GUM essaiera d'obtenir tous les périphériques disponibles.
        2. `resolution` - la résolution préférée pour la vidéo locale.
        3. `constraints` - les propriétés d'encodage préférées pour la piste créée (remplace la "résolution" dans les nouvelles versions des navigateurs)
        4. `cameraDeviceId` - le deviceID du périphérique vidéo qui va être utilisé
        5. `micDeviceId` - le deviceID du périphérique audio qui va être utilisé
        6. `minFps` - la fréquence d'images minimale pour le flux vidéo (transmise à GUM)
        7. `maxFps` - la fréquence d'images maximale pour le flux vidéo (transmise à GUM)
        8. `desktopSharingSourceDevice` - L'identifiant ou l'étiquette de l'appareil pour une source d'entrée vidéo qui doit être utilisée pour le partage d'écran.
        9. `facingMode` - mode face pour une caméra (valeurs possibles - 'utilisateur', 'environnement')
        10. `firePermissionPromptIsShownEvent` - paramètre booléen facultatif. S'il est défini sur `true`, `JitsiMediaDevicesEvents.PERMISSION_PROMPT_IS_SHOWN` sera déclenché lorsque le navigateur affichera l'invite d'autorisation gUM.
        11. `fireSlowPromiseEvent` - paramètre booléen facultatif. Si défini sur `true`, `JitsiMediaDevicesEvents.USER_MEDIA_SLOW_PROMISE_TIMEOUT` sera déclenché lorsque le navigateur met trop de temps à résoudre la promesse gUM. Cet événement est mutuellement exclusif avec l'événement `JitsiMediaDevicesEvents.PERMISSION_PROMPT_IS_SHOWN` ci-dessus
    - `firePermissionPromptIsShownEvent` - __DEPRECATED__. Utilisez plutôt options.firePermissionPromptIsShownEvent

* `JitsiMeetJS.createTrackVADEmitter(localAudioDeviceId, sampleRate, vadProcessor)` - Crée un service TrackVADEmitter qui connecte une piste audio à un processeur VAD (détection d'activité vocale) afin d'obtenir des scores VAD pour des échantillons audio PCM individuels.
    - `localAudioDeviceId` - Le périphérique audio local cible.
    - `sampleRate` - Fréquence d'échantillonnage à laquelle l'émetteur fonctionnera. Valeurs possibles 256, 512, 1024, 4096, 8192, 16384. Passer d'autres valeurs par défaut fermera le voisin, c'est-à-dire fournir une valeur de 4096 signifie que l'émetteur traitera des paquets de 4096 échantillons PCM à la fois, des valeurs plus élevées signifient des appels plus longs, des valeurs plus basses signifient plus d'appels mais plus courts.
    - `vadProcessor` - Processeurs VAD qui effectuent le calcul réel sur un échantillon PCM. Le processeur doit implémenter les fonctions suivantes :
        - `getSampleLength()` - Renvoie la taille d'échantillon acceptée par calculateAudioFrameVAD.
        - `getRequiredPCMFrequency()` - Renvoie la fréquence PCM à laquelle le processeur fonctionne, c'est-à-dire (16 kHz, 44,1 kHz, etc.)
        - `calculateAudioFrameVAD(pcmSample)` - Traiter un échantillon pcm de 32 flottants de taille getSampleLength.
* `JitsiMeetJS.enumerateDevices(callback)` - __DEPRECATED__. Utilisez `JitsiMeetJS.mediaDevices.enumerateDevices(callback)` à la place.
* `JitsiMeetJS.isDeviceChangeAvailable(deviceType)` - __DEPRECATED__. Utilisez `JitsiMeetJS.mediaDevices.isDeviceChangeAvailable(deviceType)` à la place.
* `JitsiMeetJS.isDesktopSharingEnabled()` - renvoie true si le partage de bureau est pris en charge et false sinon. REMARQUE : cette méthode peut être utilisée une fois que `JitsiMeetJS.init(options)` est terminé, sinon le résultat sera toujours nul.
* `JitsiMeetJS.getActiveAudioDevice()` - parcourt tous les périphériques audio du système et renvoie des informations sur celui qui est actif, c'est-à-dire qui a un signal audio. Renvoie une Promise qui se résout en un Object avec la structure suivante :
    - `deviceId` - chaîne contenant l'ID de périphérique de la piste audio trouvée comme active.
    - `deviceLabel` - chaîne contenant l'étiquette du périphérique audio.
* `JitsiMeetJS.getGlobalOnErrorHandler()` - renvoie la fonction qui peut être utilisée pour être attachée à window.onerror et si options.enableWindowOnErrorHandler est activé renvoie la fonction utilisée par la bibliothèque. (fonction(message, source, lineno, colno, error)).

* `JitsiMeetJS.mediaDevices` - Objet JS qui contient des méthodes d'interaction avec les périphériques multimédias. Les méthodes suivantes sont disponibles :
    - `isDeviceListAvailable()` - renvoie true si la récupération de la liste des périphériques est prise en charge et false - sinon
    - `isDeviceChangeAvailable(deviceType)` - renvoie true si le changement de périphérique d'entrée (caméra / microphone) ou de sortie (audio) est pris en charge et false sinon. `deviceType` est un type de périphérique à modifier. Undefined ou 'input' signifie périphériques d'entrée, 'output' - pour les périphériques de sortie audio.
    - `enumerateDevices(callback)` - renvoie la liste des périphériques disponibles en tant que paramètre de la fonction de rappel. Chaque appareil est un objet MediaDeviceInfo avec les propriétés suivantes :
        - `label` - Le nom de l'appareil
        - `kind` - "audioinput", "videoinput" or "audiooutput"
        - `deviceId` - l'identifiant de l'appareil
        - `groupId` - identifiant de groupe, deux équipements ont le même identifiant de groupe s'ils appartiennent au même équipement physique ; par exemple un moniteur avec une caméra et un microphone intégrés
    - `setAudioOutputDevice(deviceId)` - définit le périphérique de sortie audio actuel. `deviceId` - id du périphérique 'audiooutput' de `JitsiMeetJS.enumerateDevices()`, '' est pour le périphérique par défaut.
    - `getAudioOutputDevice()` - renvoie l'identifiant du périphérique de sortie audio actuellement utilisé, '' représente le périphérique par défaut.
    - `isDevicePermissionGranted(type)` - renvoie une promesse qui se résout à vrai si l'utilisateur a accordé l'autorisation aux périphériques multimédias. `type` - 'audio', 'video' or `undefined`. En cas de "non défini", vérifiera si les autorisations audio et vidéo ont été accordées.
    - `addEventListener(event, handler)` - attache un gestionnaire d'événements.
    - `removeEventListener(event, handler)` - supprime un gestionnaire d'événements.

* `JitsiMeetJS.events` - Objet JS qui contient tous les événements utilisés par l'API. Vous aurez besoin de cet objet JS lorsque vous essayez de vous abonner à des événements de connexion ou de conférence.
    Nous avons deux types d'événements - connexion et conférence. Vous pouvez accéder aux événements avec le code suivant `JitsiMeetJS.events.<event_type>.<event_name>`.
    Par exemple, si vous souhaitez utiliser l'événement de conférence qui est déclenché lorsque quelqu'un quitte la conférence, vous pouvez utiliser le code suivant - `JitsiMeetJS.events.conference.USER_LEFT`.
    Nous soutenons les événements suivants :
    1. `conference`
        - `TRACK_ADDED` - stream received. (parameters - JitsiTrack)
        - `TRACK_REMOVED` - stream removed. (parameters - JitsiTrack)
        - `TRACK_MUTE_CHANGED` - JitsiTrack was muted or unmuted. (parameters - JitsiTrack)
        - `TRACK_AUDIO_LEVEL_CHANGED` - audio level of JitsiTrack has changed. (parameters - participantId(string), audioLevel(number))
        - `DOMINANT_SPEAKER_CHANGED` - the dominant speaker is changed. (parameters - id(string), previousSpeakers(`Array<string>`))
        - `USER_JOINED` - nouvel utilisateur a rejoint une conférence. (paramètres - id (chaîne), utilisateur (JitsiParticipant))
        - `USER_LEFT` - un participant a quitté la conférence. (paramètres - id (chaîne), utilisateur (JitsiParticipant))
        - `MESSAGE_RECEIVED` - nouveau SMS reçu. (paramètres - id(chaîne), texte(chaîne), ts(nombre))
        - `DISPLAY_NAME_CHANGED` - l'utilisateur a changé son nom d'affichage. (paramètres - id (chaîne), displayName (chaîne))
        - `SUBJECT_CHANGED` - notifie que le sujet de la conférence a changé (paramètres - sujet(chaîne))
        - `LAST_N_ENDPOINTS_CHANGED` - le dernier n ensemble a été modifié (paramètres - leaveEndpointIds(array) identifiants des utilisateurs quittant lastN, enterEndpointIds(array) identifiants des utilisateurs entrant lastN)
        - `CONFERENCE_JOINED` - informe l'utilisateur local qu'il a rejoint la conférence avec succès. (pas de paramètres)
        - `CONFERENCE_LEFT` - avertit l'utilisateur local qu'il a quitté la conférence avec succès. (pas de paramètres)
        - `CONFERENCE_UNIQUE_ID_SET` - avertit l'utilisateur local que l'identifiant unique d'une réunion a été défini. (paramètres - meetingId(string))
        - `DTMF_SUPPORT_CHANGED` - notifie si au moins un utilisateur prend en charge DTMF. (paramètres - prend en charge (booléen))
        - `USER_ROLE_CHANGED` - notifie que le rôle d'un utilisateur a changé. (paramètres - id(chaîne), rôle(chaîne))
        - `USER_STATUS_CHANGED` - notifie que le statut d'un utilisateur a changé. (paramètres - id(chaîne), statut(chaîne))
        - `CONFERENCE_FAILED` - notifie que l'utilisateur n'a pas pu rejoindre la conférence. (paramètres - errorCode(JitsiMeetJS.errors.conference))
        - `CONFERENCE_ERROR` - signale qu'une erreur s'est produite. (paramètres - errorCode(JitsiMeetJS.errors.conference))
        - `KICKED` - notifie que l'utilisateur a été expulsé de la conférence. (paramètres - actorParticipant(JitsiParticipant), reason(string))
        - `PARTICIPANT_KICKED` - notifie que le participant a été expulsé de la conférence par un autre participant. (paramètres - actorParticipant(JitsiParticipant), kickedParticipant(JitsiParticipant), reason(string))
        - `START_MUTED_POLICY_CHANGED` - notifie que tous les nouveaux participants rejoindront un flux audio/vidéo en sourdine (paramètres - objet JS avec 2 propriétés - audio(booléen), vidéo(booléen))
        - `STARTED_MUTED` - notifie que l'utilisateur local a démarré en mode muet
        - `CONNECTION_STATS` - __DEPRECATED__. Utilisez `JitsiMeetJS.events.connectionQuality.LOCAL_STATS_UPDATED` à la place.
        - `BEFORE_STATISTICS_DISPOSED` - déclenché juste avant que le module de statistiques ne soit supprimé et c'est la dernière chance de soumettre des journaux au service de statistiques, avant qu'il ne soit déconnecté
        - `AUTH_STATUS_CHANGED` - notifie que l'authentification est activée ou désactivée, ou que l'utilisateur local est authentifié (connecté). (paramètres - isAuthEnabled (booléen), authIdentity (chaîne))
        - `ENDPOINT_MESSAGE_RECEIVED` - notifie qu'un nouveau message
        d'un autre participant est reçu sur un canal de données.
        - `TALK_WHILE_MUTED` - avertit qu'un utilisateur local parle alors que le microphone est coupé.
        - `NO_AUDIO_INPUT` - notifie que le périphérique d'entrée actuellement sélectionné n'a pas de signal.
        - `AUDIO_INPUT_STATE_CHANGE` - notifie que l'entrée audio de la conférence en cours a basculé entre les états d'entrée audio, c'est-à-dire avec ou sans entrée audio.
        - `NOISY_MIC` - avertit que le microphone actuellement utilisé par la conférence est bruyant.
        - `PARTICIPANT_PROPERTY_CHANGED` - notifie que l'utilisateur a modifié sa propriété de participant personnalisée. (paramètres - utilisateur (JitsiParticipant), propertyKey (chaîne), oldPropertyValue (chaîne), propertyValue (chaîne))

    2. `connection`
        - `CONNECTION_FAILED` - indique que la connexion au serveur a échoué.
        - `CONNECTION_ESTABLISHED` - indique que nous avons établi avec succès la connexion au serveur.
        - `CONNECTION_DISCONNECTED` - indique que nous sommes déconnectés.
        - `WRONG_STATE` - indique que l'utilisateur a effectué une action qui ne peut pas être exécutée car la connexion est dans un état incorrect.

    3. `detection`
        - `VAD_SCORE_PUBLISHED` - événement généré par un TackVADEmitter lorsqu'il a calculé un score VAD pour un échantillon PCM audio.

    4. `track`
        - `LOCAL_TRACK_STOPPED` - indique qu'une piste locale a été arrêtée. Cet événement peut être déclenché lorsque la méthode `dispose()` est appelée ou pour d'autres raisons.
        - `TRACK_AUDIO_OUTPUT_CHANGED` - indique que le périphérique de sortie audio de la piste a été modifié (paramètres - deviceId (chaîne) - nouvel ID de périphérique de sortie audio).
        - `TRACK_VIDEOTYPE_CHANGED` -  indique que le type de vidéo ("caméra" ou "bureau") de la piste a été modifié

    5. `mediaDevices`
        - `DEVICE_LIST_CHANGED` - indique que la liste des appareils actuellement connectés a changé (paramètres - appareils (MediaDeviceInfo[])).
        - `PERMISSION_PROMPT_IS_SHOWN` - Indique que l'environnement affiche actuellement une invite d'autorisation pour accéder à la caméra et/ou au microphone (paramètres - environmentType ('chrome'|'opera'|'firefox'|'safari'|'nwjs'|'react-native'|'android' ).

    6. `connectionQuality`
        - `LOCAL_STATS_UPDATED` - De nouvelles statistiques de connexion locales sont reçues. (paramètres - stats(objet))
        - `REMOTE_STATS_UPDATED` - De nouvelles statistiques de connexion à distance sont reçues. (paramètres - id (chaîne), stats (objet))

* `JitsiMeetJS.errors` - Objet JS qui contient toutes les erreurs utilisées par l'API. Vous pouvez utiliser cet objet pour vérifier les erreurs signalées à partir de l'API
    Nous avons trois types d'erreurs : connexion, conférence et suivi. Vous pouvez accéder aux événements avec le code suivant `JitsiMeetJS.errors.<error_type>.<error_name>`.
    Par exemple, si vous souhaitez utiliser l'événement de conférence qui est déclenché lorsque quelqu'un quitte la conférence, vous pouvez utiliser le code suivant - `JitsiMeetJS.errors.conference.PASSWORD_REQUIRED`.
  Nous prenons en charge les erreurs suivantes :
    1. `conference`
        - `CONNECTION_ERROR` - la connexion avec la conférence est perdue.
        - `SETUP_FAILED` - la configuration de la conférence a échoué
        - `AUTHENTICATION_REQUIRED` - l'utilisateur doit être authentifié pour créer cette conférence
        - `PASSWORD_REQUIRED` - cette erreur peut être transmise lorsque la connexion à la conférence a échoué. Vous devriez essayer de rejoindre la conférence avec un mot de passe.
        - `PASSWORD_NOT_SUPPORTED` - indicates that conference cannot be locked
        - `VIDEOBRIDGE_NOT_AVAILABLE` - problèmes de pont vidéo.
        - `RESERVATION_ERROR` - erreur dans le système de réservation
        - `GRACEFUL_SHUTDOWN` - arrêt gracieux
        - `JINGLE_FATAL_ERROR` - erreur dans le jingle (l'erreur d'origine est jointe en paramètre.)
        - `CONFERENCE_DESTROYED` - la conférence a été détruite
        - `CHAT_ERROR` - une erreur de chat s'est produite
        - `FOCUS_DISCONNECTED` - une erreur de mise au point s'est produite
        - `FOCUS_DISCONNECTED` - focus a quitté la conférence
        - `CONFERENCE_MAX_USERS` - La limite maximale d'utilisateurs a été atteinte
    2. `connection`
        - `CONNECTION_DROPPED_ERROR` - indique que la connexion a été interrompue avec une erreur probablement causée par des problèmes de réseau.
        - `PASSWORD_REQUIRED` - passé lorsque la connexion au serveur a échoué. Vous devriez essayer de vous authentifier avec un mot de passe.
        - `SERVER_ERROR` - indique que trop d'erreurs 5XX ont été reçues du serveur.
        - `OTHER_ERROR` - toutes les autres erreurs
    3. `track`
        - `GENERAL` - erreur générique liée à getUserMedia.
        - `UNSUPPORTED_RESOLUTION` - Erreur liée à getUserMedia, indique que la résolution vidéo demandée n'est pas prise en charge par la caméra.
        - `PERMISSION_DENIED` - Erreur liée à getUserMedia, indique que l'utilisateur a refusé l'autorisation de partager l'appareil demandé.
        - `NOT_FOUND` - Erreur liée à getUserMedia, indique que le périphérique demandé n'a pas été trouvé.
        - `CONSTRAINT_FAILED` - Erreur liée à getUserMedia, indique que certaines des contraintes demandées dans l'appel getUserMedia n'ont pas été satisfaites.
        - `TRACK_IS_DISPOSED` - une erreur qui indique que la piste a déjà été éliminée et ne peut plus être utilisée.
        - `TRACK_NO_STREAM_FOUND` - une erreur qui indique que la piste n'a pas de MediaStream associé.
        - `SCREENSHARING_GENERIC_ERROR` - erreur générique pour le partage d'écran.
        - `SCREENSHARING_USER_CANCELED` - une erreur indiquant que l'utilisateur a annulé la boîte de dialogue de sélection de la fenêtre de partage d'écran.

* `JitsiMeetJS.errorTypes` - constructeurs pour les instances d'erreur qui peuvent être produites par la bibliothèque. Sont utiles pour les vérifications telles que `error instanceof JitsiMeetJS.errorTypes.JitsiTrackError`. Les erreurs suivantes sont disponibles :
    1. `JitsiTrackError` - Erreur qui est arrivée à un JitsiTrack.

* `JitsiMeetJS.logLevels` - objet avec les niveaux de log :
    1. `TRACE`
    2. `DEBUG`
    3. `INFO`
    4. `LOG`
    5. `WARN`
    6. `ERROR`

### JitsiConnection

Cet objet représente la connexion au serveur. Vous pouvez créer un nouvel objet `JitsiConnection` avec le constructeur `JitsiMeetJS.JitsiConnection`. `JitsiConnection` a les méthodes suivantes :


1. `JitsiConnection(appID, token, options)` - constructeur. Crée l'objet de conférence.

    - `appID` - identification du fournisseur de services de visioconférence Jitsi Meet. **REMARQUE : pas encore implémenté. Vous pouvez passer `null`** en toute sécurité
    - `token` - secret généré par le fournisseur des services de visioconférence Jitsi Meet. Le jeton sera envoyé au fournisseur à partir du déploiement du serveur Jitsi Meet pour l'autorisation du client actuel.
    - `options` - Objet JS avec options de configuration pour la connexion au serveur. Vous pouvez y modifier les propriétés suivantes :
        1. `serviceUrl` - URL du service XMPP. Par exemple 'wss://server.com/xmpp-websocket' pour Websocket ou '//server.com/http-bind' pour BOSH.
        2. `bosh` - DÉCONSEILLÉ, utilisez serviceUrl pour spécifier l'URL BOSH ou Websocket.
        3. `hosts` - JS Object
            - `domain`
            - `muc`
            - `anonymousdomain`
        4. `enableLipSync` - (facultatif) propriété booléenne qui active la fonction lipsync. Ne fonctionne actuellement que dans Chrome et est désactivé par défaut.
        5. `clientNode` - Le nom du nœud client annoncé dans la strophe XEP-0115 'c'
        6. xmppPing - (facultatif) Objet JS - options de ping xmpp
            - `interval` - fréquence d'envoi des requêtes ping, par défaut : 10 000 (10 secondes)
            - `timeout` - le temps d'attente pour les réponses ping, par défaut : 5000 (5 secondes)
            - `threshold` - combien d'échecs de ping seront tolérés avant que la connexion ne soit interrompue, par défaut : 2
        7. websocketKeepAlive - (facultatif) Définition de l'intervalle des requêtes GET keepalive websocket. Par défaut, la valeur est de 1 minute (ce qui signifie une minute + une minute de gigue). Utilisés pour certains déploiements où une entrée de table clé doit être maintenue active, nous utilisons ces requêtes GET.
        8. websocketKeepAliveUrl - (facultatif) URL spécifique à utiliser pour les requêtes GET keepalive du websocket.

2. `connect(options)` - établir la connexion au serveur
    - `options` - Objet JS avec les propriétés `id` et `password`.

3. `disconnect()` - détruit la connexion au serveur

4. `initJitsiConference(name, options)` - crée un nouvel objet `JitsiConference`.
    - `name` - le nom de la conférence
    - `options` - Objet JS avec options de configuration pour la conférence. Vous pouvez y modifier les propriétés suivantes :
        - `recordingType` - le type d'enregistrement à utiliser
        - `callStatsID` - identifiants callstats
        - `callStatsSecret` - callstats credentials
        - `enableTalkWhileMuted` - boolean property. Active/désactive la conversation pendant la détection en sourdine, par défaut la valeur est fausse/désactivée.
        - `ignoreStartMuted` - ignore les événements de démarrage en sourdine provenant de jicofo.
        - `startSilent` - active le mode silencieux, marquera l'audio comme inactif n'enverra/recevra pas d'audio
        - `confID` - Utilisé pour les statistiques afin d'identifier la conférence, si les locataires sont pris en charge contiendra locataire et la variante non minuscule pour le nom de la salle.
        - `siteID` - (facultatif) Utilisé pour les statistiques afin d'identifier le site d'où vient l'utilisateur, si les locataires sont pris en charge, il contiendra un identifiant unique pour ce locataire. Si non fourni, la valeur sera déduite de confID
        - `statisticsId` - L'identifiant à utiliser comme statistiques au lieu du callStatsUsername par défaut.
        - `statisticsDisplayName` - Le nom d'affichage à utiliser pour les statistiques, utilisé pour callstats.
        - `focusUserJid` - Le véritable JID du participant ciblé - peut être remplacé ici
        - `enableNoAudioDetection`
        - `enableNoisyMicDetection`
        - `enableRemb`
        - `enableTcc`
        - `useRoomAsSharedDocumentName`
        - `channelLastN`
        - `startBitrate`
        - `stereo`
        - `forceJVB121Ratio` - "Math.random() < forceJVB121Ratio" déterminera si une conférence de 2 personnes doit être déplacée vers le JVB au lieu du P2P. La décision est prise du côté du répondeur, après que ICE a réussi la connexion P2P.
        - `hiddenDomain`
        - `startAudioMuted`
        - `startVideoMuted`
        - `enableLayerSuspension` - s'il est défini sur "true", nous plafonnerons le débit binaire d'envoi de la vidéo lorsqu'on nous dira que nous n'avons été sélectionnés par aucun point de terminaison (et que, par conséquent, les flux non miniatures ne sont pas utilisés).
        - `deploymentInfo`
            - `shard`
            - `userRegion`
        - `p2p` - Options liées aux pairs
            - `enabled` - active ou désactive la connexion peer-to-peer, si elle est désactivée, tous les médias seront acheminés via le Jitsi Videobridge.
            - `stunServers` - liste des serveurs STUN, par ex. `{ URL : 'stun:meet-jit-si-turnrelay.jitsi.net:443' }`
            - `backToP2PDelay` - un délai exprimé en secondes, avant que la conférence ne repasse en P2P, après que le 3ème participant ait quitté la salle.
            - `disabledCodec` - le type mime du code qui ne doit pas être négocié sur la connexion homologue.
            - `preferredCodec` - le type mime du codec qui doit être défini comme codec préféré pour la connexion.
        - `rttMonitor`
            - `enabled`
            - `initialDelay`
            - `getStatsInterval`
            - `analyticsInterval`
            - `stunServers`
        - `e2eping`
            - `pingInterval`
        - `abTesting` - A/B testing related options
            - `enableSuspendVideoTest`
        - `testing`
            - `capScreenshareBitrate`
            - `p2pTestMode`
            - `octo`
                - `probability`

        **REMARQUE: si 4 et 5 sont définis, la bibliothèque enverra des événements à callstats. Sinon, l'intégration de callstats sera désactivée.**

5. `addEventListener(event, listener)` - Abonne l'écouteur passé à l'événement.
    - `event` - l'un des événements de l'objet `JitsiMeetJS.events.connection`.
    - `listener` - gestionnaire de l'événement.

6. `removeEventListener(event, listener)` - Supprime l'écouteur d'événement.
    - `event` - l'événement
    - `listener` - l'écouteur qui sera supprimé.

7. `addFeature` - Ajoute une nouvelle fonctionnalité à la liste des fonctionnalités prises en charge pour le participant local
    - `feature` - string, le nom de la fonctionnalité
    - `submit` - boolean, par défaut false, si true - la nouvelle liste de fonctionnalités sera immédiatement soumise aux autres.

8. `removeFeature` - Removes a feature from the list of supported features for the local participant
    - `feature` - string, le nom de la fonctionnalité
    - `submit` - boolean, par défaut false, si true - la nouvelle liste de fonctionnalités sera immédiatement soumise aux autres.

### JitsiConference

L'objet représente une conférence. Nous avons les méthodes suivantes pour contrôler la conférence :

1. `join(password)` - Rejoindre la conférence
    - password - chaîne du mot de passe. Ce paramètre n'est pas obligatoire.
2. `leave()` - quitte la conférence. Promesse de retour.

3. `myUserId()` - obtenir l'ID utilisateur local.

4. `getLocalTracks()` - Renvoie un tableau avec des objets JitsiTrack pour les flux locaux.

5. `addEventListener(event, listener)` - Abonne l'écouteur passé à l'événement.
    - `event` - l'un des événements de l'objet `JitsiMeetJS.events.conference`.
    - `listener` - gestionnaire de l'événement.

6. `removeEventListener(event, listener)` - Supprime l'écouteur d'événement.
    - `event` - l'événement
    - `listener` - l'écouteur qui sera supprimé.

7. `on(event, listener)` - alias pour removeEventListener

8. `off(event, listener)` - alias pour removeEventListener

9. `sendTextMessage(text)` - envoie la chaîne donnée aux autres participants à la conférence.

10. `setDisplayName(name)` - modifie le nom d'affichage du participant local.
    - `name` - le nouveau nom d'affichage.

11. `sendCommand(name, values)` - envoie une commande système définie par l'utilisateur aux autres participants
    - `name` - le nom de la commande.
    - `values` - Objet JS. L'objet a la structure suivante :


```javascript
            {


                value: the_value_of_the_command,


                attributes: {}, // map with keys the name of the attribute and values - the values of the attributes.


                children: [] // array with JS object with the same structure.
            }
```


    REMARQUE: Lorsque vous utilisez cette méthode, l'objet transmis sera ajouté dans chaque message système envoyé aux autres participants. Il peut être envoyé plus d'une fois.


12. `sendCommandOnce(name, values)` - Envoie une seule fois une commande système définie par l'utilisateur aux autres participants


13. `removeCommand(name)` - supprime une commande de la liste des commandes envoyées aux autres participants
    - `name` - le nom de la commande

14. `addCommandListener(command, handler)` - ajoute un auditeur
    - `command` - chaîne pour le nom de la commande
    - `handler(values)` - l'écouteur qui sera appelé lorsqu'une commande est reçue d'un autre participant.

15. `removeCommandListener(command)` - supprime les écouteurs pour la commande spécifiée
    - `command` -  le nom de la commande

16. `addTrack(track)` - Ajoute l'objet `JitsiLocalTrack` à la conférence. Génère une erreur si vous ajoutez un deuxième flux vidéo du même type de vidéo. `caméra` et `bureau` sont considérés comme deux sources vidéo distinctes. Par conséquent, lors de l'ajout d'une source vidéo (caméra ou bureau) pour la première fois à la conférence, `addTack` doit être appelé et après cela, seul `replaceTrack` doit être utilisé pour remplacer la piste existante par une autre piste de la même vidéo tapez ou pour le supprimer de la conférence. Renvoie une promesse.
    - `track` - le `JitsiLocalTrack`

17. `removeTrack(track)` - Supprime l'objet `JitsiLocalTrack` de la conférence. Promesse de retour. Cela ne déclenche plus l'événement `TRACK_REMOVED` sur l'extrémité distante. Le même SSRC sera réutilisé lorsqu'une autre piste du même type est ajoutée à la conférence pour réduire au minimum les messages de signalisation.
    - `track` - le `JitsiLocalTrack`

18. `isDTMFSupported()` - Vérifiez si au moins un utilisateur prend en charge DTMF.

19. `getRole()` - renvoie une chaîne avec le rôle d'utilisateur local ("modérateur" ou "aucun")

20. `isModerator()` - vérifie si l'utilisateur local a le rôle "modérateur"

21. `lock(password)` - définir le mot de passe pour la conférence ; renvoie la promesse
    - `password` - mot de passe de chaîne

    REMARQUE: disponible uniquement pour le modérateur

22. `unlock()` - mot de passe de conférence non défini ; renvoie la promesse

    REMARQUE: disponible uniquement pour le modérateur

23. `kickParticipant(id, reason)` - Expulser un participant de la conférence
    - `id` - ID de participant de chaîne
    - `reason` - (facultatif) chaîne, par défaut 'Vous avez été expulsé.'- raison pour laquelle le participant donne un coup de pied

24. `setStartMutedPolicy(policy)` - faire en sorte que tous les nouveaux participants se joignent à l'audio/vidéo en sourdine
    - `policy` - Objet JS avec les propriétés suivantes
        - `audio` - booléen si le flux audio doit être coupé
        - `video` - booléen si le flux vidéo doit être coupé

    REMARQUE: disponible uniquement pour le modérateur

25. `getStartMutedPolicy()` - renvoie la stratégie actuelle avec l'objet JS :
    - `policy` - Objet JS avec les propriétés suivantes
        - `audio` - booléen si le flux audio doit être coupé
        - `video` - booléen si le flux vidéo doit être coupé

26. `isStartAudioMuted()` - vérifier si le son est coupé lors de la jointure

27. `isStartVideoMuted()` - vérifier si la vidéo est en sourdine lors de la jointure

28. `sendFeedback(overallFeedback, detailedFeedback)` - Envoie les commentaires donnés via CallStats si activé.
    - `overallFeedback` - un entier entre 1 et 5 indiquant le retour de l'utilisateur
    - `detailedFeedback` - commentaires détaillés de l'utilisateur. Pas encore utilisé

29. `setSubject(subject)` - changer le sujet de la conférence
    - `subject` - chaîne nouveau sujet

    REMARQUE: disponible uniquement pour le modérateur

30. `sendEndpointMessage(to, payload)` - Envoie un message via les canaux de données.
    - `to` - l'ID du point de terminaison qui doit recevoir le message. Si "" le message sera envoyé à tous les participants.
    - `payload` - Objet JSON - la charge utile du message.

Lève NetworkError ou InvalidStateError ou Error si l'opération échoue.

31. `sendEndpointStatsMessage(payload)` - Envoie un message Colibri "EndpointStats" sur le canal pont. Cela devrait être utilisé à la place de `broadcastEndpointMessage` pour relayer les statistiques locales à tous les points de terminaison distants.
    - `payload` - Objet JSON - la charge utile du message.

Lève NetworkError, InvalidStateError ou Error si l'opération échoue.

32. `broadcastEndpointMessage(payload)` - Envoie un message de diffusion via les canaux de données.
    - `payload` - Objet JSON - la charge utile du message.

Lève NetworkError ou InvalidStateError ou Error si l'opération échoue.

33. `replaceTrack` - remplace la piste actuellement utilisée comme source de l'expéditeur par une nouvelle MediaStreamTrack. La nouvelle piste doit être du même type de média (audio, vidéo, etc.) et le changement de piste ne doit pas nécessiter de négociation. `replaceTrack(oldTrack, newTrack)`

Lève NetworkError ou InvalidStateError ou Error si l'opération échoue.

34. `setReceiverConstraints` - définir les contraintes pour la vidéo qui est demandée à partir du pont. Ce message unique doit être utilisé à la place des méthodes `setLastN`, `setReceiverVideoConstraint` et `selectParticipants`. Ces contraintes s'appliquent uniquement à la connexion de pont. Vous trouverez plus d'informations sur le format des messages de signalisation et sur la façon dont le Jitsi Videobridge alloue la bande passante [ici](https://github.com/jitsi/jitsi-videobridge/blob/master/doc/allocation.md#new-message-format).
    - `videoConstraints` - Objet qui spécifie les contraintes au format suivant.
    ```javascript
    {
       'lastN': 20, // Number of videos requested from the bridge.
       'selectedSources': ['A', 'B', 'C'], // Les noms de source des pistes vidéo prioritaires.
       'onStageSources': ['A'], // Les noms de source des pistes vidéo qui sont prioritaires jusqu'à une résolution plus élevée.
       'defaultConstraints': { 'maxHeight': 180 }, // Default resolution requested for all endpoints.
       'constraints': { // Résolution spécifique à la source.
           'A': { 'maxHeight': 720 }
       }
    }
    ```

35. `setSenderVideoConstraint(resolution)` - définissez la résolution souhaitée à envoyer à JVB ou au pair (180, 360, 720).

36. `isHidden` - vérifie si l'utilisateur local a rejoint en tant qu'utilisateur "caché". Il s'agit d'un rôle spécialisé utilisé pour les intégrations.

37. `setLocalParticipantProperty(propertyKey, propertyValue)` - utilisé pour définir une propriété personnalisée pour le participant local("fullName": "Full Name", favoriteColor: "red", "userId": 234). Cela peut également être utilisé pour modifier une propriété personnalisée déjà définie.
    - `propertyKey` - chaîne - nom de la propriété personnalisée
    - `propertyValue` - chaîne - valeur de propriété personnalisée

38. `getParticipants()` - Récupère un tableau de tous les participants à cette conférence.

39. `revokeOwner(participantId)` - Révoque les droits du propriétaire sur le participant. Le participant qui appelle la fonction doit avoir les mêmes droits ou plus que le participant ciblé. Cette vérification des droits est effectuée au niveau du serveur XMPP.

### JitsiTrack

L'objet représente une seule piste - vidéo ou audio. Il peut s'agir de pistes distantes (des autres participants à l'appel) ou de pistes locales (des appareils du participant local).
Nous avons les méthodes suivantes pour contrôler les pistes :

1. `getType()` - renvoie une chaîne avec le type de la piste ("video" pour les pistes vidéo et "audio" pour les pistes audio)

2. `mute()` - coupe la piste. Promesse de retour.

   REMARQUE: Cette méthode n'est implémentée que pour les pistes locales.

3. `unmute()` - réactive la piste. Promesse de retour.

   REMARQUE: Cette méthode n'est implémentée que pour les pistes locales.

4. `isMuted()` - vérifier si la piste est en sourdine

5. `attach(container)` - attache la piste au conteneur donné.

6. `detach(container)` - supprime la piste du conteneur.

7. `dispose()` - dispose la piste. Si la piste est ajoutée à une conférence, la piste sera supprimée. Promesse de retour.

   REMARQUE: Cette méthode n'est implémentée que pour les pistes locales.

8. `getId()` - renvoie une chaîne unique pour la piste.

9. `getParticipantId()` - renvoie l'identifiant (chaîne) du propriétaire de la piste

   REMARQUE: Cette méthode n'est implémentée que pour les pistes distantes.

10. `getSourceName()` - renvoie le nom source de la piste.

11. `setAudioOutput(audioOutputDeviceId)` - définit un nouveau périphérique de sortie audio pour les éléments DOM de la piste. Les pistes vidéo sont ignorées.

12. `getDeviceId()` - renvoie l'ID de périphérique associé à la piste (uniquement pour les pistes locales)

13. `isEnded()` - renvoie vrai si la piste est terminée

14. `setEffect(effect)` - Applique l'effet en échangeant le MediaStream existant sur le JitsiTrack avec le nouveau MediaStream qui a l'effet désiré. "undefined" est passé à cette fonction pour supprimer l'effet et pour restaurer le MediaStream d'origine sur le `JitsiTrack`.

    Les méthodes suivantes doivent être définies pour l'instance d'effet.

    `startEffect()` - Démarre l'effet et renvoie un nouveau MediaStream qui doit être remplacé par celui existant.

    `stopEffect()` - Arrête l'effet.

    `isEnabled()` - Vérifie si la piste locale prend en charge l'effet.

    REMARQUE: Cette méthode n'est implémentée que pour les pistes locales.

### JitsiTrackError

L'objet représente une erreur qui s'est produite sur un JitsiTrack. Est hérité de l'objet `Error` de base JavaScript, donc les propriétés `"name"`, `"message"` et `"stack"` sont disponibles. Pour les erreurs liées à GUM, expose la propriété `"gum"` supplémentaire, qui est un objet avec les propriétés suivantes :
 - `error` - erreur GUM d'origine
 - `constraints` - Objet de contraintes GUM utilisé pour l'appel
 - `devices` - tableau d'appareils demandés dans l'appel GUM (valeurs possibles - "audio", "video", "screen", "desktop", "audiooutput")