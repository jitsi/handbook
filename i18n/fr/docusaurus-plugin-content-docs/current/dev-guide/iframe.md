---
id: dev-guide-iframe
title: IFrame API
---

L'intégration de l'API Jitsi Meet dans votre site ou votre application vous permet d'héberger et de fournir des réunions vidéo sécurisées avec vos collègues, équipes et parties prenantes. L'API Meet fournit un ensemble complet de fonctionnalités de réunion complètes.

Vos réunions Jitsi peuvent être hébergées et suivies à l'aide de n'importe quel appareil tout en protégeant vos données et votre vie privée. Vous pouvez joindre les participants à votre réunion partout dans le monde, éliminant ainsi le besoin de voyager et les inconvénients associés.

L'API IFrame vous permet d'intégrer la fonctionnalité Jitsi Meet dans votre application de réunion afin que vous puissiez profiter de toutes les fonctionnalités du déploiement mondialement distribué et hautement disponible disponible avec [meet.jit.si](https://meet.jit.si/).

Vous pouvez également intégrer et intégrer le déploiement mondialement distribué et hautement disponible sur la plate-forme [meet.jit.si](https://meet.jit.si/) elle-même platform. 

:::note REMARQUE
Clients JaaS, assurez-vous de lire également [ceci](https://developer.8x8.com/jaas/docs/iframe-api-overview)!
:::

:::tip
Si vous utilisez React dans votre application Web, vous voudrez peut-être utiliser notre [React SDK](dev-guide-react-sdk) à la place.
:::

## L'intégration

Pour activer l'API Jitsi Meet dans votre application, vous devez utiliser l'un des scripts de bibliothèque d'API Jitsi Meet JavaScript (JS) suivants et l'intégrer à votre application :

Pour l'auto-hébergement dans votre domaine :

```javascript
<script src='https://<your-domain>/external_api.js'></script>
```

meet.jit.si:
```javascript
<script src='https://meet.jit.si/external_api.js'></script>

```

## Assistance mobile

L'API iframe fonctionne sur les navigateurs mobiles de la même manière que sur les navigateurs de bureau.

### Ouvrir des réunions dans l'application Jitsi Meet

Afin d'ouvrir des réunions avec l'application Jitsi Meet, vous pouvez utiliser notre schéma d'URL personnalisé comme suit :

(supposons que la réunion est https://meet.jit.si/test123)

* Android: `intent://meet.jit.si/test123#Intent;scheme=org.jitsi.meet;package=org.jitsi.meet;end`
* iOS: `org.jitsi.meet://meet.jit.si/test123`

Cela fonctionne également avec les serveurs personnalisés, remplacez simplement "meet.jit.si" par l'URL de votre serveur personnalisé.

## Création de l'objet API Jitsi Meet

Après avoir intégré la bibliothèque de l'API Meet, vous devez ensuite créer l'objet API Jitsi Meet.

L'objet de l'API Meet prend la forme suivante :

**`api = new JitsiMeetExternalAPI(domain, options)`**

Le constructeur d'objet API utilise les options suivantes :

* `domain`: Le domaine utilisé pour créer l'URL de la conférence (e.g., **`meet.jit.si`**).
* `options`: L'objet avec des propriétés.

    Les arguments facultatifs incluent :
  
    * `roomName`: Le nom de la salle à rejoindre.

    * `width`: La largeur de l'IFrame créée.
    
      L'argument largeur a les caractéristiques suivantes :
    
      - Une valeur numérique indique la largeur en pixels.
    
      - Si une chaîne est spécifiée, le format est un nombre suivi de **`px`**, **`em`**, **`pt`** ou **`%`**.
    
    * `height` : la hauteur de l'IFrame créé. 
    
      L'argument hauteur a les caractéristiques suivantes :
    
      - Une valeur numérique indique la hauteur en pixels.
    
      - Si une chaîne est spécifiée, le format est un nombre suivi de **`px`**, **`em`**, **`pt`** ou **`%`**.
    
    * `parentNode`: L'élément HTML DOM où l'IFrame est ajouté en tant qu'enfant.
    
    * `configOverwrite`: L'objet JS avec des remplacements pour les options définies dans le fichier [config.js].
    
    * `interfaceConfigOverwrite`: L'objet JS avec des remplacements pour les options définies dans le fichier [interface_config.js].
    
    * `jwt`: Le jeton [JWT](https://jwt.io/).
    
    * `onload`: Le gestionnaire d'événements IFrame onload.
    
    * `invitees`: Tableaux d'objets contenant des informations sur les participants invités à un appel.
    
    * `devices`: Carte d'informations sur les appareils utilisés lors d'un appel.
    
    * `userInfo`: L'objet JS qui contient des informations sur le participant qui démarre la réunion (par exemple, e-mail).

    * `lang`: La langue de réunion par défaut.

      Par exemple:

```javascript
const domain = 'meet.jit.si';
const options = {
    roomName: 'JitsiMeetAPIExample',
    width: 700,
    height: 700,
    parentNode: document.querySelector('#meet'),
    lang: 'de'
};
const api = new JitsiMeetExternalAPI(domain, options);
```

Vous pouvez définir les périphériques multimédias initiaux pour l'appel en utilisant les éléments suivants :

```javascript
const domain = 'meet.jit.si';
const options = {
    ...
    devices: {
        audioInput: '<deviceLabel>',
        audioOutput: '<deviceLabel>',
        videoInput: '<deviceLabel>'
    },
    ...
};
const api = new JitsiMeetExternalAPI(domain, options);
```

Vous pouvez remplacer les options définies dans le fichier [config.js] et le fichier [interface_config.js] à l'aide des objets **`configOverwrite`** et **`interfaceConfigOverwrite`**, respectivement.

Par exemple:

```javascript
const options = {
    ...
    configOverwrite: { startWithAudioMuted: true },
    interfaceConfigOverwrite: { DISABLE_DOMINANT_SPEAKER_INDICATOR: true },
    ...
};
const api = new JitsiMeetExternalAPI(domain, options);
```
Pour transmettre un jeton JWT à Jitsi Meet, utilisez ce qui suit :

 ```javascript
const options = {
    ...
    jwt: '<jwt_token>',
    ...
};
const api = new JitsiMeetExternalAPI(domain, options);
 ```

Vous pouvez définir **`userInfo`** (par exemple, e-mail, nom d'affichage) pour l'appel en utilisant ce qui suit :

```javascript
var domain = "meet.jit.si";
var options = {
    ...
    userInfo: {
        email: 'email@jitsiexamplemail.com',
        displayName: 'John Doe'
    }
}
var api = new JitsiMeetExternalAPI(domain, options);
```

Configuration de la vue en mosaïque :

Vous pouvez configurer le nombre maximal de colonnes dans la vue en mosaïque en remplaçant la propriété **`TILE_VIEW_MAX_COLUMNS`** du fichier [interface_config.js] via l'objet **`interfaceConfigOverwrite`** :

```javascript
const options = {
    ...
    interfaceConfigOverwrite: { TILE_VIEW_MAX_COLUMNS: 2 },
    ...
};
const api = new JitsiMeetExternalAPI(domain, options);
```
:::note
**`TILE_VIEW_MAX_COLUMNS`** accepte les valeurs de 1 à 5. La valeur par défaut est 5.
:::


## Functions

Toutes les fonctions sont documentées [ici](/handbook/docs/dev-guide/dev-guide-iframe-functions) now.

## Commands

Toutes les commandes sont documentées [ici](/handbook/docs/dev-guide/dev-guide-iframe-commands) now.

## Events

Tous les événements sont documentés [ici](/handbook/docs/dev-guide/dev-guide-iframe-events) now.

[config.js]: https://github.com/jitsi/jitsi-meet/blob/master/config.js
[interface_config.js]: https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js
