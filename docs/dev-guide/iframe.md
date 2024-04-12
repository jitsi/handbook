---
id: dev-guide-iframe
title: IFrame API
---

Embedding the Jitsi Meet API into your site or app enables you to host and provide secure video meetings with your colleagues, teams, and stakeholders. The Meet API provides a full complement of comprehensive meeting features.

Your Jitsi meetings can be hosted and attended using any device while keeping your data and privacy protected. You can reach your meeting participants anywhere in the world eliminating the need for travel and the associated inconvenience.

The IFrame API enables you to embed Jitsi Meet functionality into your meeting application so you can experience the full functionality of the globally distributed and highly available deployment available with [meet.jit.si](https://meet.jit.si/).

You can also embed and integrate the globally distributed and highly available deployment on the [meet.jit.si](https://meet.jit.si/) platform itself. 

:::note NOTE
JaaS customers, please make sure you also read [this](https://developer.8x8.com/jaas/docs/iframe-api-overview)!
:::

:::tip
If you use React in your web application you might want to use our [React SDK](dev-guide-react-sdk) instead.
:::

## Integration

To enable the Jitsi Meet API in your application you must use one of the following JavaScript (JS) Jitsi Meet API library scripts and integrate it into your application:

For self-hosting in your domain:

```javascript
<script src='https://<your-domain>/external_api.js'></script>
```

meet.jit.si:
```javascript
<script src='https://meet.jit.si/external_api.js'></script>

```

## Mobile support

The iframe API works on mobile browsers the same way as it does on desktop browsers.

### Opening meetings in the Jitsi Meet app

In order to open meetings with the Jitsi Meet app you can use our custom URL scheme as follows:

(let's assume the meeting is https://meet.jit.si/test123)

* Android: `intent://meet.jit.si/test123#Intent;scheme=org.jitsi.meet;package=org.jitsi.meet;end`
* iOS: `org.jitsi.meet://meet.jit.si/test123`

This works with custom servers too, just replace `meet.jit.si` with your custom server URL.

## Creating the Jitsi Meet API object

After you have integrated the Meet API library, you must then create the Jitsi Meet API object.

The Meet API object takes the following form:

**`api = new JitsiMeetExternalAPI(domain, options)`**

The API object constructor uses the following options:

* `domain`: The domain used to build the conference URL (e.g., **`meet.jit.si`**).
* `options`: The object with properties. 

  IFrame arguments include:
  
    * `roomName`: The name of the room to join.

    * `width`: _Optional._ The created IFrame width.
    
      The width argument has the following characteristics:
    
      - A numerical value indicates the width in pixel units.
    
      - If a string is specified the format is a number followed by **`px`**, **`em`**, **`pt`**, or **`%`**.
    
    * `height`: _Optional._ The height for the created IFrame. 
    
      The height argument has the following characteristics: 
    
      - A numerical value indicates the height in pixel units.
    
      - If a string is specified the format is a number followed by **`px`**, **`em`**, **`pt`**, or **`%`**. 
    
    * `parentNode`: The HTML DOM Element where the IFrame is added as a child.
    
    * `configOverwrite`: _Optional._ The JS object with overrides for options defined in the [config.js] file.
    
    * `interfaceConfigOverwrite`: _Optional._ The JS object with overrides for options defined in the [interface_config.js] file.
    
    * `jwt`: _Optional._ The [JWT](https://jwt.io/) token.
    
    * `onload`: _Optional._ The IFrame onload event handler.
    
    * `invitees`: _Optional._ Object arrays that contain information about participants invited to a call.
    
    * `devices`: _Optional._ Information map about the devices used in a call.
    
    * `userInfo`: _Optional._ The JS object that contains information about the participant starting or joining the meeting (e.g., email).

    * `lang`: _Optional._ The default meeting language.

    * `iceServers`: _Optional._ Object with rules that will be used to modify/remove the existing ice server configuration. **NOTE: This property is currently experimental and may be removed in the future!**


For example:

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

You can set the initial media devices for the call using the following:

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

You can override options set in the [config.js] file and the [interface_config.js] file using the **`configOverwrite`** and **`interfaceConfigOverwrite`** objects, respectively.

For example:

```javascript
const options = {
    ...
    configOverwrite: { startWithAudioMuted: true },
    interfaceConfigOverwrite: { DISABLE_DOMINANT_SPEAKER_INDICATOR: true },
    ...
};
const api = new JitsiMeetExternalAPI(domain, options);
```
To pass a JWT token to Jitsi Meet use the following:

 ```javascript
const options = {
    ...
    jwt: '<jwt_token>',
    ...
};
const api = new JitsiMeetExternalAPI(domain, options);
 ```

You can set the **`userInfo`** (e.g., email, display name) for the call using the following:

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

<a name="ice-servers"></a>You can modify the default ice servers configuration with the **`iceServers`** property (**NOTE: This property is currently experimental and may be removed in the future!**) using the following:
```javascript
var domain = "meet.jit.si";
var options = {
    ...
    iceServers: {
        replace: [
            { // replace the URL of all existing ice servers with type matching targetType 
                targetType: 'turn',
                urls: 'turn:example.com:443'
            },
            { // replace the URL of all existing ice servers with type matching targetType 
                targetType: 'turns',
                urls: 'turns:example.com:443?transport=tcp'
            },
            { // remove all existing ice servers with type matching targetType 
                targetType: 'stun',
                urls: null
            }
        ]
    },
    ...
}
var api = new JitsiMeetExternalAPI(domain, options);
```

Configuring the tile view:

You can configure the maximum number of columns in the tile view by overriding the **`TILE_VIEW_MAX_COLUMNS`** property from the [interface_config.js] file via the **`interfaceConfigOverwrite`** object:

```javascript
const options = {
    ...
    interfaceConfigOverwrite: { TILE_VIEW_MAX_COLUMNS: 2 },
    ...
};
const api = new JitsiMeetExternalAPI(domain, options);
```
:::note
**`TILE_VIEW_MAX_COLUMNS`** accepts values from 1 to 5. The default value is 5.
:::


## Functions

All functions are documented [here](/handbook/docs/dev-guide/dev-guide-iframe-functions) now.

## Commands

All commands are documented [here](/handbook/docs/dev-guide/dev-guide-iframe-commands) now.

## Events

All events are documented [here](/handbook/docs/dev-guide/dev-guide-iframe-events) now.

[config.js]: https://github.com/jitsi/jitsi-meet/blob/master/config.js
[interface_config.js]: https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js
