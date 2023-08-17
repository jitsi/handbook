---
id: dev-guide-ljm
title: Modifying lib-jitsi-meet
---

# Modifying `lib-jitsi-meet`

By default the library is referenced as a prebuilt artifact in a GitHub release. Packages are NOT published to npm. The default dependency path in package.json is:

```json
"lib-jitsi-meet": "https://github.com/jitsi/lib-jitsi-meet/releases/download/v<version>+<commit-hash>/lib-jitsi-meet.tgz)",
```

To work with local copy you may change the path to:

```json
"lib-jitsi-meet": "file:///Users/name/local-lib-jitsi-meet-packed-copy.tgz",
```

In order to create the packed file run `npm pack` in the lib-jitsi-meet project directory.

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

:::note
Linking will not work when building the mobile applications.
:::

After changes in your local `lib-jitsi-meet` repository, you can rebuild it with `npm run build` and your `jitsi-meet` repository will use that modified library:

```bash
cd node_modules/lib-jitsi-meet
npm run build
```

If you do not want to use local repository anymore you should run:

```bash
cd jitsi-meet
npm unlink lib-jitsi-meet
npm install
```
