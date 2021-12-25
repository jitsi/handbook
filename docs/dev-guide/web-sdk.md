---
id: dev-guide-web-sdk
title: Web SDK
---

The Jitsi Meet Web SDK provides the same user experience as the Jitsi Meet app, in a customizable way which you can embed in your apps.

## Sample applications using the SDK
If you want to see how easy integrating the Jitsi Meet Web SDK into a web application is, take a look at the [sample applications directory](https://github.com/jitsi/jitsi-meet-web-sdk/tree/main/examples).

## Installation
To access the Web SDK modules in your application you need to install it as a dependency:
```bash
npm install @jitsi/web-sdk
```

## Modules

### JitsiMeeting
:::important
React 16 or higher is required.
:::
To be used with custom domains as-it-is in React projects:
```jsx
<JitsiMeeting
    domain="YOUR_DOMAIN"
    roomName="PleaseUseAGoodRoomName"
    configOverwrite={{
        startWithAudioMuted: true,
        disableModeratorIndicator: true,
        startScreenSharing: true,
        enableEmailInStats: false
    }}
    interfaceConfigOverwrite={{
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
    }}
    userInfo={{
        displayName: 'YOUR_USERNAME'
    }}
    onApiReady={(externalApi) => {
        // here you can attach custom event listeners to the Jitsi Meet External API
        // you can also store it locally to execute commands
    }}
    getIFrameRef={(iframe) => { iframeRef.style.height = 400; }}
/>
```

### JaaSMeeting
:::important
React 16 or higher is required.
:::
To be used with `8x8.vc` domain as-it-is in React projects:
```jsx
<JaaSMeeting
    appId="YOUR_APP_ID"
    roomName="PleaseUseAGoodRoomName"
    jwt="YOUR_VALID_JWT"
    configOverwrite={{
        disableThirdPartyRequests: true,
        disableLocalVideoFlip: true,
        backgroundAlpha: 0.5
    }}
    interfaceConfigOverwrite={{
        VIDEO_LAYOUT_FIT: 'nocrop',
        MOBILE_APP_PROMO: false,
        TILE_VIEW_MAX_COLUMNS: 4
    }}
    spinner={SpinnerView}
    onApiReady={(externalApi) => { ... }}
/>
```
This component provides support for custom appIds.

### fetchExternalApi
To import the Jitsi Meet External API in your application, regardless of any frameworks or libraries that the application might depend on:
```javascript
window.onload = () => {
    fetchExternalApi().then(JitsiMeetExternalApi => {
        const api = new JitsiMeetExternalApi("YOUR_DOMAIN", options);
    });
}
```
More on the options parameter can be read [here](dev-guide/iframe.md#creating-the-jitsi-meet-api-object).

## Options
The component modules support a similar kind of customization to the Jitsi Meet IFrame. The following additional props can be passed down to your instances of `JitsiMeeting` or `JaaSMeeting`.

* **roomName**: The name of the room to join.

* **configOverwrite**: The JS object with overrides for options defined in the [config.js] file.

* **interfaceConfigOverwrite**: The JS object with overrides for options defined in the [interface_config.js] file.

* **jwt**: The [JWT](https://jwt.io/) token.

* **invitees**: Object arrays that contain information about participants invited to a call.

* **devices**: Information map about the devices used in a call.

* **userInfo**: The JS object that contains information about the participant starting the meeting (e.g., email).

* **spinner**: The custom spinner to be displayed while the IFrame is loading.

* **onApiReady**: The external API reference for events and commands.

* **getIFrameRef**: The parent node used by the IFrame.

[config.js]: https://github.com/jitsi/jitsi-meet/blob/master/config.js
[interface_config.js]: https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js