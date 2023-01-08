---
id: dev-guide-ljm
title: Modification de lib-jitsi-meet
---

# Modification de `lib-jitsi-meet`

Par défaut, la bibliothèque est construite à partir de ses sources de référentiel git. Le chemin de dépendance par défaut dans package.json est :

```json
"lib-jitsi-meet": "jitsi/lib-jitsi-meet#commit-hash",
```

Pour travailler avec une copie locale, vous pouvez modifier le chemin en :

```json
"lib-jitsi-meet": "file:///Users/name/local-lib-jitsi-meet-copy",
```

Pour faire le projet, vous devez le forcer à prendre les sources comme 'npm update' :

```
npm install lib-jitsi-meet --force && make
```

Or if you are making only changes to the library:

```
npm install lib-jitsi-meet --force && make deploy-lib-jitsi-meet
```

Une autre méthode consiste à utiliser le [lien npm](https://docs.npmjs.com/cli/link).
Il permet de lier la dépendance `lib-jitsi-meet` à la source locale en quelques étapes :

```bash
cd lib-jitsi-meet
#### create global symlink for lib-jitsi-meet package
npm link
cd ../jitsi-meet
#### create symlink from the local node_modules folder to the global lib-jitsi-meet symlink
npm link lib-jitsi-meet
```

:::note
La liaison ne fonctionnera pas lors de la création des applications mobiles.
:::

Après des modifications dans votre référentiel local `lib-jitsi-meet`, vous pouvez le reconstruire avec `npm run install` et votre référentiel `jitsi-meet` utilisera cette bibliothèque modifiée.

Si vous ne souhaitez plus utiliser le référentiel local, vous devez exécuter :

```bash
cd jitsi-meet
npm unlink lib-jitsi-meet
npm install
```