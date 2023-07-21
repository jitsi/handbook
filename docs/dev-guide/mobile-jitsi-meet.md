---
id: dev-guide-mobile-jitsi-meet
title: Developer Guide for Jitsi Meet
sidebar_label: Jitsi Meet development
---

This guide will help you setup a development environment to start working on the Jitsi Meet mobile app itself.

:::caution
Building the apps / SDKs is not supported on Windows.
:::

## Overview

:::note
This guide is about building the Jitsi Meet apps themselves. If you want to integrate the Jitsi Meet SDK into your own application check the dedicated page on the sidebar.
:::

Jitsi Meet can be built as a standalone app for Android or iOS. It uses the
[React Native] framework.

First make sure the [React Native dependencies] (React Native CLI Quickstart) are installed.

:::warning Node version
Node 16.x and npm 8.x are required. Any other version may result in runtime errors.
:::

:::note Xcode
Xcode 12 or higher is required.
:::

## iOS

1. Install dependencies

  - Install main dependencies:

    ```bash
    npm install
    ```

  - Install the required pods (CocoaPods must be installed first, it can
    be done with Homebrew: `brew install cocoapods`)

    ```bash
    cd ios
    pod install
    cd ..
    ```

2. Build the app using Xcode

    - Open `ios/jitsi-meet.xcworkspace` in Xcode. Make sure it's the workspace
      file!

    - Select your device from the top bar and hit the **Play ▶️** button.

    When the app is launched from Xcode, the Debug Console will show the application output
    logs.

3. Other remarks

    It's likely you'll need to change the bundle ID for deploying to a device.
    This can be changed in the **General** tab. Under **Identity** set
    **Bundle Identifier** to a different value, and adjust the **Team** in the
    **Signing** section to match your own.


## Android

The [React Native dependencies] page has very detailed information on how to
setup [Android Studio] and the required components for getting the necessary
build environment. Make sure you follow it closely.

Set the JDK in Android Studio to at least Java 11: https://developer.android.com/studio/intro/studio-config#jdk

The recommended way for building Jitsi Meet is building the app with Android Studio.

### Adding extra dependencies

Due to how our project is structured, React Native's automatic linking won't work so Android dependencies need to be manually linked.

First, add your project to `android/settings.gradle` like so:

```gradle title="android/settings.gradle"
include ':react-native-mydependency'
project(':react-native-mydependency').projectDir = new File(rootProject.projectDir, '../node_modules/@somenamespace/react-native-mydependency/android')
```

Then add a dependency on `android/sdk/build.gradle` like so:

```gradle title="android/sdk/build.gradle"
implementation project(':react-native-mydependency')
```

Last, link it in the `getReactNativePackages` method in `android/sdk/src/main/java/org/jitsi/meet/sdk/ReactInstanceManagerHolder.java` like so:

```java title="android/sdk/src/main/java/org/jitsi/meet/sdk/ReactInstanceManagerHolder.java"
new com.companyname.library.AwesomeLibraryPackage(),
```

Make sure you adjust the fully qualified package name.

## Debugging

The official documentation on [debugging] is quite extensive and specifies the
preferred method for debugging.

:::note
When using Chrome Developer Tools for debugging the JavaScript source
code is being interpreted by Chrome's V8 engine, instead of JSCore which React
Native uses. It's important to keep this in mind due to potential differences in
supported JavaScript features.
:::

## Enabling extra features

- [Dropbox Integration](mobile-dropbox.md)
- [Google Sign-In Integration (For YouTube Live Streaming)](mobile-google-auth.md)

[Android Studio]: https://developer.android.com/studio/index.html
[debugging]: https://facebook.github.io/react-native/docs/debugging/
[React Native]: https://facebook.github.io/react-native/
[React Native dependencies]: https://reactnative.dev/docs/environment-setup
