---
id: dev-guide-electron-sdk
title: Electron SDK
---

The Jitsi Meet Electron SDK provides a toolkit for adding Jitsi Meet into electron applications with additional features for a better desktop experience.

Supported Electron versions: >= 16.

## Sample Application

The Jitsi Meet Electron Application is created using the Electron SDK and makes use of all its available features. The source code is available here: [jitsi-meet-electron application repository](https://github.com/jitsi/jitsi-meet-electron).

## Installation

Install from npm:

    npm install @jitsi/electron-sdk

Note: This package contains native code on Windows for the remote control module. Binary prebuilds are packaged with prebuildify as part of the npm package.

## Usage

### Screen Sharing

**Requirements**:
The screen sharing utility requires iframe HTML Element that will load Jitsi Meet.

**Enable the screen sharing:**

In the **render** electron process of the window where Jitsi Meet is displayed:

```js
const {
    setupScreenSharingRender
} = require("@jitsi/electron-sdk");

// api - The Jitsi Meet iframe api object.
setupScreenSharingRender(api);
```
In the **main** electron process:

```js
const {
    setupScreenSharingMain
} = require("@jitsi/electron-sdk");

// jitsiMeetWindow - The BrowserWindow instance of the window where Jitsi Meet is loaded.
// appName - Application name which will be displayed inside the content sharing tracking window
// i.e. [appName] is sharing your screen.
// osxBundleId - Mac Application bundleId for which screen capturer permissions will be reset if user denied them.  
setupScreenSharingMain(mainWindow, appName, osxBundleId);
```

**Note**:
An example using screensharing in Electron without the SDK is available here: [screensharing example without the sdk](https://github.com/gabiborlea/jitsi-meet-electron-example).

### Remote Control

**Requirements**:
The remote control utility requires iframe HTML Element that will load Jitsi Meet.

**Enable the remote control:**

In the **render** electron process of the window where Jitsi Meet is displayed:

```js
const {
    RemoteControl
} = require("@jitsi/electron-sdk");

// iframe - the Jitsi Meet iframe
const remoteControl = new RemoteControl(iframe);
```

To disable the remote control:
```js
remoteControl.dispose();
```

NOTE: `dispose` method will be called automatically when the Jitsi Meet iframe unload.

In the **main** electron process:

```js
const {
    RemoteControlMain
} = require("@jitsi/electron-sdk");

// jitsiMeetWindow - The BrowserWindow instance of the window where Jitsi Meet is loaded.
const remoteControl = new RemoteControlMain(mainWindow);
```

### Always On Top
Displays a small window with the current active speaker video when the main Jitsi Meet window is not focused.

**Requirements**:
1. Jitsi Meet should be initialized through our [iframe API](https://github.com/jitsi/jitsi-meet/blob/master/doc/api.md)
2. The `BrowserWindow` instance where Jitsi Meet is displayed should use the [Chrome's window.open implementation](https://github.com/electron/electron/blob/master/docs/api/window-open.md#using-chromes-windowopen-implementation) (set `nativeWindowOpen` option of `BrowserWindow`'s constructor to `true`).
3. If you have a custom handler for opening windows you have to filter the always on top window. You can do this by its `frameName` argument which will be set to `AlwaysOnTop`.

**Enable the aways on top:**

In the **main** electron process:
```js
const {
    setupAlwaysOnTopMain
} = require("@jitsi/electron-sdk");

// jitsiMeetWindow - The BrowserWindow instance
// of the window where Jitsi Meet is loaded.
setupAlwaysOnTopMain(jitsiMeetWindow);
```

In the **render** electron process of the window where Jitsi Meet is displayed:
```js
const {
    setupAlwaysOnTopRender
} = require("@jitsi/electron-sdk");

const api = new JitsiMeetExternalAPI(...);
const alwaysOnTop = setupAlwaysOnTopRender(api);

alwaysOnTop.on('will-close', handleAlwaysOnTopClose);
```

`setupAlwaysOnTopRender` return an instance of EventEmitter with the following events:

* _dismissed_ - emitted when the always on top window is explicitly dismissed via its close button

* _will-close_ - emitted right before the always on top window is going to close


### Power Monitor

Provides a way to query electron for system idle and receive power monitor events.

**enable power monitor:**
In the **main** electron process:
```js
const {
    setupPowerMonitorMain
} = require("@jitsi/electron-sdk");

// jitsiMeetWindow - The BrowserWindow instance
// of the window where Jitsi Meet is loaded.
setupPowerMonitorMain(jitsiMeetWindow);
```

In the **render** electron process of the window where Jitsi Meet is displayed:
```js
const {
    setupPowerMonitorRender
} = require("@jitsi/electron-sdk");

const api = new JitsiMeetExternalAPI(...);
setupPowerMonitorRender(api);
```

### NOTE:
You'll need to add 'disable-site-isolation-trials' switch because of [https://github.com/electron/electron/issues/18214](https://github.com/electron/electron/issues/18214):
```
app.commandLine.appendSwitch('disable-site-isolation-trials')
```

For more information please checkout the SDK's repository [https://github.com/jitsi/jitsi-meet-electron-sdk](https://github.com/jitsi/jitsi-meet-electron-sdk).