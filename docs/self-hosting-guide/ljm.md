---
id: dev-guide-ljm
title: Modifying lib-jitsi-meet
---

# Modifying `lib-jitsi-meet`

By default the library is built from its git repository sources. The default dependency path in package.json is:

```json
"lib-jitsi-meet": "jitsi/lib-jitsi-meet#commit-hash",
```

To work with local copy you may change the path to:

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

:::note
Linking will not work when building the mobile applications.
:::

After changes in your local `lib-jitsi-meet` repository, you can rebuild it with `npm run install` and your `jitsi-meet` repository will use that modified library.

If you do not want to use local repository anymore you should run:

```bash
cd jitsi-meet
npm unlink lib-jitsi-meet
npm install
```
