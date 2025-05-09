---
id: dev-guide-web-jitsi-meet
title: Developer Guide for Jitsi Meet
sidebar_label: Jitsi Meet development
---

This guide will help you setup a development environment to start working on the Jitsi Meet web app itself.

## Building the sources

:::note
Node.js >= 22 and npm >= 10 are required.
:::

:::caution
Windows is not supported.
:::

Make sure you have Node.js installed. If you don't, follow [these instructions](https://nodejs.org/en/download/).

Then go ahead:
```bash
# Clone the repository
git clone https://github.com/jitsi/jitsi-meet
cd ./jitsi-meet

npm install

# To build the Jitsi Meet production application:
make

# For development:
make dev
```

:::warning
**DO NOT** run `npm update` or use `yarn` or delete `package-lock.json`. Dependencies are pinned for a reason.
:::

### Running with webpack-dev-server for development

Use the following command in your terminal:

```bash
make dev
```

By default the backend deployment used is `alpha.jitsi.net`. You can point the Jitsi Meet app at a different backend by using a proxy server. To do this, set the WEBPACK_DEV_SERVER_PROXY_TARGET variable:

```bash
export WEBPACK_DEV_SERVER_PROXY_TARGET=https://your-example-server.com
make dev
```

The app should be running at https://localhost:8080/

#### Certificate Error

Browsers may show a certificate error since the development certificate is self-signed. It's safe to disregard those
warning and continue to your site.

### Building .debs

To make a deb you can easily deploy to a public test server, ensure you have the lib-jitsi-meet sources you wish, then:
```
npm install
make
dpkg-buildpackage -A -rfakeroot -us -uc -tc
```

You'll have a bunch of .deb files in the parent directory, and can push the updated source to your server and install it with the jitsi-meet-web deb file.

### Running from source on existing deployment

Follow the document https://community.jitsi.org/t/how-to-how-to-build-jitsi-meet-from-source-a-developers-guide/75422
