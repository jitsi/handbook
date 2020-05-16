---
id: dev-guide-mobile
title: Developer Guide (Mobile)
sidebar_label: Mobile
---

Welcome to the developers guide for mobile applications! This guide will help you setup a development
environment to start working on the Jitsi Meet applications.

**IMPORTANT:** Building the applications is not supported on Windows.

## Overview

Jitsi Meet can be built as a standalone app for Android or iOS. It uses the
[React Native] framework.

First make sure the [React Native dependencies] are installed.

**NOTE**: Node 12.X and npm 6.X are required.

## iOS

1. Install some extra dependencies

  - Install ios-deploy globally (in case you want to use the React Native CLI
    to deploy the app to the device)

    ```bash
    npm install -g ios-deploy
    ```

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

2. Build the app

    There are 2 ways to build the app: using the CLI or using Xcode.

    Using the CLI:

    ```bash
    react-native run-ios --device
    ```

    When the app is launched from the CLI the output can be checked with the
    following command:

    ```bash
    react-native log-ios
    ```

    Using Xcode

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
[React Native dependencies]: https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies
