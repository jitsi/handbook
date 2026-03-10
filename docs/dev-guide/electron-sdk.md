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
An example using screensharing in Electron without the SDK is available here: [screensharing example without the SDK](https://github.com/gabiborlea/jitsi-meet-electron-example).

### Remote Control

**Requirements**:
The remote control utility requires an iframe HTML Element that will load Jitsi Meet.

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

NOTE: The `dispose` method will be called automatically when the Jitsi Meet iframe unloads.

In the **main** electron process:

```js
const {
    RemoteControlMain
} = require("@jitsi/electron-sdk");

// jitsiMeetWindow - The BrowserWindow instance of the window where Jitsi Meet is loaded.
const remoteControl = new RemoteControlMain(mainWindow);
```

### Always On Top
Displays a small window with the currently active speaker video when the main Jitsi Meet window is not focused.

**Requirements**:
1. Jitsi Meet should be initialized through our [iframe API](https://github.com/jitsi/jitsi-meet/blob/master/doc/api.md)
2. The `BrowserWindow` instance where Jitsi Meet is displayed should use the [Chrome's window.open implementation](https://github.com/electron/electron/blob/master/docs/api/window-open.md#using-chromes-windowopen-implementation) (set `nativeWindowOpen` option of `BrowserWindow`'s constructor to `true`).
3. If you have a custom handler for opening windows you have to filter the always-on-top window. You can do this by its `frameName` argument which will be set to `AlwaysOnTop`.

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

`setupAlwaysOnTopRender` returns an instance of EventEmitter with the following events:

* _dismissed_ - emitted when the always-on-top window is explicitly dismissed via its close button

* _will-close_ - emitted right before the always-on-top window is going to close


### Power Monitor

Provides a way to query Electron for system idle and receive power monitor events.

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

For more information please check out the SDK's repository [https://github.com/jitsi/jitsi-meet-electron-sdk](https://github.com/jitsi/jitsi-meet-electron-sdk).

## Contributing and Local Development

This section explains how the Electron SDK and the Electron app are structured as separate repositories, how to decide where a fix or feature belongs, and how to develop them together locally without publishing to npm.

### SDK vs Electron App — which layer owns what?

The Electron desktop experience is split across two repositories:

| Repository | Responsibility |
|---|---|
| [`jitsi-meet-electron-sdk`](https://github.com/jitsi/jitsi-meet-electron-sdk) | Native OS integrations: screen sharing, remote control, always-on-top window, power monitor |
| [`jitsi-meet-electron`](https://github.com/jitsi/jitsi-meet-electron) | The application shell: window management, app menus, auto-updates, packaging and distribution |
| [`jitsi-meet`](https://github.com/jitsi/jitsi-meet) | The meeting logic itself, rendered inside an iframe inside the Electron shell |

Use this as a quick guide when triaging a bug or planning a feature:

- **Always-on-top / PiP window layout or lifecycle** → fix in `jitsi-meet-electron-sdk`
- **Remote control or screen sharing capture** → fix in `jitsi-meet-electron-sdk`
- **App window size, tray icon, menu, auto-update** → fix in `jitsi-meet-electron`
- **In-meeting UI or conference behaviour** → fix in `jitsi-meet`

:::tip
If a bug is visible in the Electron app but not in the web browser, it is almost always the SDK or the Electron shell. Start with `jitsi-meet-electron-sdk`.
:::

### Local development with a linked SDK

When you need to test SDK changes against the Electron app without publishing a new npm release, use `npm link` to symlink your local SDK clone into the app.

#### Step 1 — Clone and build the SDK

```bash
git clone https://github.com/jitsi/jitsi-meet-electron-sdk
cd jitsi-meet-electron-sdk
npm install
npm run build
```

#### Step 2 — Register the local SDK globally

```bash
# Still inside jitsi-meet-electron-sdk/
npm link
```

This creates a global symlink named `@jitsi/electron-sdk` pointing to your local clone.

#### Step 3 — Link it into the Electron app

```bash
git clone https://github.com/jitsi/jitsi-meet-electron
cd jitsi-meet-electron
npm install
npm link @jitsi/electron-sdk
```

#### Step 4 — Start the app

```bash
npm start
```

Any changes you make in `jitsi-meet-electron-sdk/` are reflected immediately in the running app (after a rebuild of the SDK if it uses a compile step).

### Verifying the linked version is active

After linking, confirm the symlink is in place:

```bash
# In the jitsi-meet-electron/ directory
ls -la node_modules/@jitsi/electron-sdk
```

The output should show an arrow (`->`) pointing to your local SDK path, for example:

```
node_modules/@jitsi/electron-sdk -> /home/user/jitsi-meet-electron-sdk
```

If it shows a regular directory instead, re-run `npm link @jitsi/electron-sdk`.

### Restoring the published package

When you are done with local development, unlink and restore the npm-published version:

```bash
# In the jitsi-meet-electron/ directory
npm unlink @jitsi/electron-sdk
npm install
```

To also remove the global symlink created in Step 2:

```bash
# In the jitsi-meet-electron-sdk/ directory
npm unlink
```
