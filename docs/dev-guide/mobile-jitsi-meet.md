---
id: dev-guide-mobile-jitsi-meet
title: Developer Guide for Jitsi Meet
sidebar_label: Jitsi Meet development
---

This guide will help you setup a development environment to start working on the Jitsi Meet applications.

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
Node 12.X and npm 6.X are required. Any other version may result in runtime errors.
:::

:::note macOS
Xcode >= 12 is required.
:::

## iOS

1. Install dependencies

  - Install main dependencies:

    ```bash
    npm install
    ```

  - Install the required pods (CocoaPods must be installled first, it can
    be done with Homebrew: `brew install cocoapods`)

    ```bash
    cd ios
    pod install
    cd ..
    ```

2. Build the app using Xcode

    - Open **ios/jitsi-meet.xcworkspace** in Xcode. Make sure it's the workspace
      file!

    - Select your device from the top bar and hit the "play" button.

    When the app is launched from Xcode the Debug console will show the output
    logs the application creates.


3. Other remarks

    It's likely you'll need to change the bundle ID for deploying to a device.
    This can be changed in the "General" tab.  Under "Identity" set
    "Bundle Identifier" to a different value, and adjust the "Team" in the
    "Signing" section to match your own.


## Android

The [React Native dependencies] page has very detailed information on how to
setup [Android Studio] and the required components for getting the necessary
build environment.  Make sure you follow it closely.

1. Building the app

    The app can be built using the CLI utility as follows:

    ```bash
    react-native run-android
    ```

    It will be launched on the connected Android device.

## Debugging

The official documentation on [debugging] is quite extensive and specifies the
preferred method for debugging.

**NOTE**: When using Chrome Developer Tools for debugging the JavaScript source
code is being interpreted by Chrome's V8 engine, instead of JSCore which React
Native uses. It's important to keep this in mind due to potential differences in
supported JavaScript features.

## Enabling extra features

* [Dropbox integration](mobile-dropbox.md)
* [Google sign-in integration (for YouTube live streaming)](mobile-google-auth.md)

[Android Studio]: https://developer.android.com/studio/index.html
[debugging]: https://facebook.github.io/react-native/docs/debugging.html
[React Native]: https://facebook.github.io/react-native/
[React Native dependencies]: https://reactnative.dev/docs/environment-setup
