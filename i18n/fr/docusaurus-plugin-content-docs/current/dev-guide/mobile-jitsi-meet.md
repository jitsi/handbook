---
id: dev-guide-mobile-jitsi-meet
title: Guide du développeur pour Jitsi Meet
sidebar_label: Développement de Jitsi Meet
---

Ce guide vous aidera à configurer un environnement de développement pour commencer à travailler sur les applications Jitsi Meet.

:::caution
La création des applications/SDK n'est pas prise en charge sous Windows.
:::

## Overview

:::note
Ce guide concerne la création des applications Jitsi Meet elles-mêmes. Si vous souhaitez intégrer le SDK Jitsi Meet dans votre propre application, consultez la page dédiée dans la barre latérale.
:::

Jitsi Meet peut être conçu comme une application autonome pour Android ou iOS. Il utilise le framework [React Native].

Assurez-vous d'abord que les [dépendances React Native] (React Native CLI Quickstart) sont installées.

:::warning Node version
Le nœud 16.x et npm 8.x sont requis. Toute autre version peut entraîner des erreurs d'exécution.
:::

:::note Xcode
Xcode 12 ou supérieur est requis.
:::

## iOS

1. Install dependencies

  - Installez les dépendances principales :

    ```bash
    npm install
    ```

  - Installez les pods requis (CocoaPods doit être installé en premier, cela peut être fait avec Homebrew : `brew install cocopods`)

    ```bash
    cd ios
    pod install
    cd ..
    ```

2. Créez l'application à l'aide de Xcode

    - Ouvrez `ios/jitsi-meet.xcworkspace` dans Xcode. Assurez-vous qu'il s'agit du fichier de l'espace de travail !

    - Sélectionnez votre appareil dans la barre supérieure et appuyez sur le bouton **Play ▶️**.

   Lorsque l'application est lancée à partir de Xcode, la console de débogage affiche les journaux de sortie de l'application.

3. D'autres remarques

    Il est probable que vous deviez modifier l'ID de bundle pour le déploiement sur un appareil. Cela peut être modifié dans l'onglet **Général**. Sous **Identity**, définissez **Bundle Identifier** sur une valeur différente et ajustez **Team** dans la section **Signing** pour qu'elle corresponde à la vôtre.


## Android

La page [React Native dependencies] contient des informations très détaillées sur la configuration de [Android Studio] et les composants requis pour obtenir l'environnement de construction nécessaire. Assurez-vous de le suivre de près.

Définissez le JDK dans Android Studio sur au moins Java 11 : https://developer.android.com/studio/intro/studio-config#jdk

La méthode recommandée pour créer Jitsi Meet consiste à créer l'application avec Android Studio.

### Adding extra dependencies

En raison de la structure de notre projet, la liaison automatique de React Native ne fonctionnera pas, les dépendances Android doivent donc être liées manuellement.

Tout d'abord, ajoutez votre projet à `android/settings.gradle` comme suit :

```gradle title="android/settings.gradle"
include ':react-native-mydependency'
project(':react-native-mydependency').projectDir = new File(rootProject.projectDir, '../node_modules/@somenamespace/react-native-mydependency/android')
```

Ajoutez ensuite une dépendance sur `android/sdk/build.gradle` comme ceci :

```gradle title="android/sdk/build.gradle"
implementation project(':react-native-mydependency')
```

Last, link it in the `getReactNativePackages` method in `android/sdk/src/main/java/org/jitsi/meet/sdk/ReactInstanceManagerHolder.java` like so:

```java title="android/sdk/src/main/java/org/jitsi/meet/sdk/ReactInstanceManagerHolder.java"
new com.companyname.library.AwesomeLibraryPackage(),
```

Assurez-vous d'ajuster le nom complet du package.

## Debugging

La documentation officielle sur [le débogage] est assez complète et spécifie la méthode préférée pour le débogage.

:::note
Lors de l'utilisation des outils de développement Chrome pour déboguer la source JavaScript
le code est interprété par le moteur V8 de Chrome, au lieu de JSCore qui React
Utilisations natives. Il est important de garder cela à l'esprit en raison des différences potentielles dans les fonctionnalités JavaScript prises en charge.
:::

## Enabling extra features

- [Dropbox Integration](mobile-dropbox.md)
- [Google Sign-In Integration (For YouTube Live Streaming)](mobile-google-auth.md)

[Android Studio]: https://developer.android.com/studio/index.html
[debugging]: https://facebook.github.io/react-native/docs/debugging/
[React Native]: https://facebook.github.io/react-native/
[React Native dependencies]: https://reactnative.dev/docs/environment-setup
