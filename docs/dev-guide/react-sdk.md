---
id: dev-guide-react-sdk
title: React SDK
---

The Jitsi Meet React SDK provides the same user experience as the Jitsi Meet app, in a customizable way which you can embed in your apps.

:::important
React 16 or higher is required.
:::

## Sample application using the SDK
If you want to see how easy integrating the Jitsi Meet React SDK into a React application is, take a look at our [example](https://github.com/jitsi/jitsi-meet-react-sdk/tree/main/example/jitsiMeeting).

## Installation
To access the React SDK modules in your application you need to install it as a dependency:
```bash
npm install @jitsi/react-sdk
```

## Modules
The SDK exposes two components with similar properties, intended for different use-cases.

### JitsiMeeting
To be used with custom domains as-it-is in React projects:
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
        // here you can attach custom event listeners to the Jitsi Meet External API
        // you can also store it locally to execute commands
    } }
    getIFrameRef = { (iframe) => { iframeRef.style.height = 400; } }
/>
```

### JaaSMeeting
To be used with the `8x8.vc` domain as-it-is in React projects:
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
This component requires the `appId` prop.

## Properties
The component modules support a similar kind of customization to the Jitsi Meet IFrame. The following properties can be passed down to your instances of `JitsiMeeting` or `JaaSMeeting`.

* **roomName**: Required. The name of the room to join.

* **configOverwrite**: Optional. The JS object with overrides for options defined in the [config.js] file.

* **interfaceConfigOverwrite**: Optional. The JS object with overrides for options defined in the [interface_config.js] file.

* **jwt**: Optional. The [JWT](https://jwt.io/) token.

* **invitees**: Optional. Object arrays that contain information about participants invited to a call.

* **devices**: Optional. Information map about the devices used in a call.

* **userInfo**: Optional. The JS object that contains information about the participant starting the meeting (e.g., email).

* **spinner**: Optional. The custom spinner to be displayed while the IFrame is loading.

* **onApiReady**: Optional. The external API reference for events and commands.

* **onReadyToClose**: Optional. The callback for when the meeting is ready to be closed.

* **getIFrameRef**: Optional. The parent node used by the IFrame.

[config.js]: https://github.com/jitsi/jitsi-meet/blob/master/config.js
[interface_config.js]: https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js