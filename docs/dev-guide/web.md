---
id: dev-guide-web
title: Developer Guide (Web)
sidebar_label: Start
---

Welcome to the developers guide for web! This guide will help you setup a development
environment to start working on the Jitsi Meet codebase.

## Building the sources

:::note
Node.js >= 12 and npm >= 6 are required.
:::

On Debian/Ubuntu systems, the required packages can be installed with:
```
sudo apt-get install npm nodejs
cd jitsi-meet
npm install
```

To build the Jitsi Meet application, just type
```
make
```

### Working with the library sources (lib-jitsi-meet)

By default the library is built from its git repository sources. The default dependency path in package.json is:
```json
"lib-jitsi-meet": "jitsi/lib-jitsi-meet",
```

To work with local copy you must change the path to:
```json
"lib-jitsi-meet": "file:///Users/name/local-lib-jitsi-meet-copy",
```

To make the project you must force it to take the sources as 'npm update':
```
npm install lib-jitsi-meet --force && make
```

Or if you are making only changes to the library:
```
npm install lib-jitsi-meet --force && make deploy-lib-jitsi-meet
```

Alternative way is to use [npm link](https://docs.npmjs.com/cli/link).
It allows to link `lib-jitsi-meet` dependency to local source in few steps:

```bash
cd lib-jitsi-meet

#### create global symlink for lib-jitsi-meet package
npm link

cd ../jitsi-meet

#### create symlink from the local node_modules folder to the global lib-jitsi-meet symlink
npm link lib-jitsi-meet
```

 After changes in local `lib-jitsi-meet` repository, you can rebuild it with `npm run install` and your `jitsi-meet` repository will use that modified library.
Note: when using node version 4.x, the make file of jitsi-meet do npm update which will delete the link. It is no longer the case with version 6.x.

If you do not want to use local repository anymore you should run
```bash
cd jitsi-meet
npm unlink lib-jitsi-meet
npm install
```
### Running with webpack-dev-server for development

Use it at the CLI, type
```
make dev
```

By default the backend deployment used is `alpha.jitsi.net`. You can point the Jitsi-Meet app at a different backend by using a proxy server. To do this, set the WEBPACK_DEV_SERVER_PROXY_TARGET variable:
```
export WEBPACK_DEV_SERVER_PROXY_TARGET=https://your-example-server.com
make dev
```

The app should be running at https://localhost:8080/

#### Chrome Privacy Error

Newer versions of Chrome may block localhost under https and show `NET::ERR_CERT_INVALID` on the page. To solve this open [chrome://flags/#allow-insecure-localhost](chrome://flags/#allow-insecure-localhost) and select Enable, then press Relaunch or quit and restart Chrome.

#### Building .debs

To make a deb you can easily deploy to a public test server, ensure you have the lib-jitsi-meet sources you wish, then:
```
make
dpkg-buildpackage -A -rfakeroot -us -uc -tc
```

You'll have a bunch of .deb files in the parent directory, and can push the updated source to your server and install it with the jitsi-meet-web deb file.
