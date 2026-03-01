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

First make sure the following dependencies are installed:

* `watchman`
* `nodejs`
* `npm`

:::warning Node version
Node 20.x and npm 10.x are required. Any other version may result in runtime errors.
:::

:::note Xcode
Xcode 15 or higher is required.
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

### Building and running with Android Studio

1. Install [Android Studio].

2. Set the JDK to at least Java 11: **Android Studio → Settings → Build, Execution, Deployment → Build Tools → Gradle → Gradle JDK**.

   See also: https://developer.android.com/studio/intro/studio-config#jdk

3. Install JavaScript dependencies from the **repository root**:

   ```bash
   npm install
   ```

4. Open the project in Android Studio:

   - Choose **Open** and select the `android/` folder inside the repository.
   - Wait for the Gradle sync to complete. Android Studio will download all required SDK components automatically on the first run.

   :::tip
   If Gradle sync fails, go to **File → Invalidate Caches / Restart** and try again. Make sure your JDK is set correctly (step 2).
   :::

5. Select your target device from the device drop-down in the top toolbar (a connected physical device or a configured AVD emulator).

6. Click the **Run ▶️** button (or press `Shift + F10`). Android Studio will build the APK and deploy it to the selected device.

7. Start the Metro bundler from the **repository root**:

   ```bash
   npm start
   ```

   The app will automatically connect to Metro once it launches on the device.

   :::note
   If the app cannot find the Metro bundler (e.g., on a physical device), run:
   ```bash
   adb reverse tcp:8081 tcp:8081
   ```
   :::

### Building and running without Android Studio

:::note
This section describes a fully command-line based workflow that works on **Linux**, **macOS**, and **WSL** (Windows Subsystem for Linux). You do not need Android Studio installed.
:::

#### 1. Download the Android SDK command-line tools

Download the **Command-line tools only** package (not Android Studio) from the [official Android developer site](https://developer.android.com/studio#command-tools).

After extracting the archive, the expected directory structure should look like this:

```
~/Android/Sdk/
└── cmdline-tools/
    └── latest/          ← rename the extracted folder to "latest" if it isn't already
        ├── bin/
        ├── lib/
        ├── NOTICE.txt
        └── source.properties
```

:::tip
If the extracted folder has a name like `cmdline-tools-<version>`, rename it to `latest` so that `sdkmanager` and other tools resolve paths correctly:
```bash
mv ~/Android/Sdk/cmdline-tools/cmdline-tools-<version> ~/Android/Sdk/cmdline-tools/latest
```
:::

#### 2. Configure environment variables

Add the following lines to your `~/.bashrc` or `~/.zshrc`, then reload the shell:

```bash
export ANDROID_HOME="$HOME/Android/Sdk"
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"
```

```bash
source ~/.bashrc   # or source ~/.zshrc
```

#### 3. Install required SDK packages and accept licenses

Use `sdkmanager` to install the necessary SDK components:

```bash
sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
sdkmanager --licenses
```

Accept all prompts by pressing `y` when asked.

#### 4. Install JavaScript dependencies

From the **repository root**, run:

```bash
npm install
```

#### 5. Build the debug APK

Navigate to the `android/` directory and run the Gradle wrapper:

```bash
cd android
./gradlew assembleDebug
```

:::note
The first build may take several minutes as Gradle downloads its own dependencies. Subsequent builds are faster due to caching.
:::

On success, the debug APK is produced at:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

#### 6. Install on a physical device

1. Enable **USB debugging** on your Android device (**Settings → Developer options → USB debugging**).
2. Connect the device via USB and verify it is detected:

   ```bash
   adb devices
   ```

   You should see your device listed with the status `device`. If it shows `unauthorized`, unlock your phone and accept the RSA key fingerprint prompt.

3. Install the APK:

   ```bash
   adb install android/app/build/outputs/apk/debug/app-debug.apk
   ```

#### 7. Start the Metro bundler

From the **repository root**, start the React Native bundler:

```bash
npm start
```

The app will automatically connect to the Metro bundler running on your machine. You do not need to configure anything extra — as long as the device and your machine are on the same network (or connected via USB), Metro will serve the JavaScript bundle on demand.

:::tip
If the app cannot reach Metro over the network, you can forward the bundler port over the USB connection:
```bash
adb reverse tcp:8081 tcp:8081
```
:::

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
supported JavaScript features. Also note Jitsi Meet does not support Flipper.
:::

## Enabling extra features

- [Dropbox Integration](mobile-dropbox.md)
- [Google Sign-In Integration (For YouTube Live Streaming)](mobile-google-auth.md)

[Android Studio]: https://developer.android.com/studio/index.html
[debugging]: https://facebook.github.io/react-native/docs/debugging/
[React Native]: https://facebook.github.io/react-native/
