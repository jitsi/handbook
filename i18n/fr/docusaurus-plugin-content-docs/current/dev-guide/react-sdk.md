---
id: dev-guide-react-sdk
title: React SDK
---

Le SDK Jitsi Meet React offre la même expérience utilisateur que l'application Jitsi Meet, d'une manière personnalisable que vous pouvez intégrer dans vos applications.

:::important
React 16 ou supérieur est requis.
:::

## Sample application using the SDK
Si vous voulez voir à quel point il est facile d'intégrer le SDK Jitsi Meet React dans une application React, jetez un œil à notre [exemple](https://github.com/jitsi/jitsi-meet-react-sdk/tree/main/example).

## Installation
Pour accéder aux modules React SDK dans votre application, vous devez l'installer en tant que dépendance :
```bash
npm install @jitsi/react-sdk
```

## Modules
Le SDK expose deux composants aux propriétés similaires, destinés à différents cas d'utilisation.

### JitsiMeeting
À utiliser avec les domaines personnalisés tels quels dans les projets React :
```jsx
<JitsiMeeting
    domain = { YOUR_DOMAIN }
    roomName = "PleaseUseAGoodRoomName"
    configOverwrite = {{
        startWithAudioMuted: true,
        disableModeratorIndicator: true,
        startScreenSharing: true,
        enableEmailInStats: false
    }}
    interfaceConfigOverwrite = {{
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
    }}
    userInfo = {{
        displayName: 'YOUR_USERNAME'
    }}
    onApiReady = { (externalApi) => {
        // ici, vous pouvez attacher des écouteurs d'événements personnalisés à l'API externe Jitsi Meet
        // vous pouvez également le stocker localement pour exécuter des commandes
    } }
    getIFrameRef = { (iframeRef) => { iframeRef.style.height = '400px'; } }
/>
```
#### Propriétés spécifiques au composant `JitsiMeeting`
* `domain`: Facultatif. Champ permettant de récupérer le fichier external_api.js qui initialise l'IFrame. Si omis, la valeur par défaut est `meet.jit.si`.

### JaaSMeeting
À utiliser avec le domaine `8x8.vc` tel quel dans les projets React :
```jsx
<JaaSMeeting
    appId = { YOUR_APP_ID }
    roomName = "PleaseUseAGoodRoomName"
    jwt = { YOUR_VALID_JWT }
    configOverwrite = {{
        disableThirdPartyRequests: true,
        disableLocalVideoFlip: true,
        backgroundAlpha: 0.5
    }}
    interfaceConfigOverwrite = {{
        VIDEO_LAYOUT_FIT: 'nocrop',
        MOBILE_APP_PROMO: false,
        TILE_VIEW_MAX_COLUMNS: 4
    }}
    spinner = { SpinnerView }
    onApiReady = { (externalApi) => { ... } }
/>
```
...or with the `stage.8x8.vc` domain:
```js
<JaaSMeeting
    appId = { YOUR_APP_ID }
    roomName = "PleaseUseAGoodRoomName"
    ...
    useStaging = { true }
/>
```
#### Propriétés spécifiques au composant `JaaSMeeting`
* `appId`: Obligatoire. Fournit un contexte isolé et préfixe le nom de la salle.
* `useStaging`: Facultatif. Indique s'il faut utiliser l'environnement de staging ou non.

## Common properties
Les modules de composants prennent en charge un type de personnalisation similaire à celui de Jitsi Meet IFrame. Les propriétés suivantes peuvent être transmises à vos instances de `JitsiMeeting` ou `JaaSMeeting`.

* `roomName`: Obligatoire. Le nom de la salle à rejoindre.

* `configOverwrite`: Facultatif. L'objet JS avec des remplacements pour les options définies dans le fichier [config.js].

* `interfaceConfigOverwrite`: Facultatif. L'objet JS avec des remplacements pour les options définies dans le fichier [interface_config.js].

* `jwt`: Facultatif. Le jeton [JWT](https://jwt.io/).

* `invitees`: Facultatif. Tableaux d'objets contenant des informations sur les participants invités à un appel.

* `devices`: Facultatif. Carte d'informations sur les appareils utilisés lors d'un appel.

* `userInfo`: Facultatif. L'objet JS qui contient des informations sur le participant qui démarre la réunion (par exemple, e-mail).

* `release`: Facultatif. Informations concernant la version de `stage.8x8.vc` ou `8x8.vc`. Attend le format suivant : `release-1234`.

* `spinner`: Facultatif. Le spinner personnalisé à afficher pendant le chargement de l'IFrame.

* `onApiReady`: Facultatif. La référence d'API externe pour les événements et les commandes.

* `onReadyToClose`: Facultatif. Le rappel lorsque la réunion est prête à être fermée.

* `getIFrameRef`: Facultatif. Le nœud parent utilisé par l'IFrame.

[config.js]: https://github.com/jitsi/jitsi-meet/blob/master/config.js
[interface_config.js]: https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js
