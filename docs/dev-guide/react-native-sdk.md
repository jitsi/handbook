---
id: dev-guide-react-native-sdk
title: React Native SDK
---

The Jitsi React Native SDK provides the same user experience as the Jitsi Meet app,
in a customizable way which you can embed in your React Native apps.

## Sample application using the React Native SDK

If you want to see how easy integrating the Jitsi React Native SDK into a React Native application is, take a look at the<br/>
[sample applications repository](https://github.com/jitsi/jitsi-meet-sdk-samples#react-native).

## Usage

While this is a published library, you can `npm i @jitsi/react-native-sdk`.<br/>
Dependency conflicts may occur between RNSDK and your app. <br/>If that is the case, please run `npm i @jitsi/react-native-sdk --force`.<br/>
To check if some dependencies need to be added, please run the following script `node node_modules/@jitsi/react-native-sdk/update_dependencies.js`.<br/>
This will sync all of our peer dependencies with your dependencies. <br/>
Next you will need to do `npm install`.

Because our SDK uses SVG files, you will need to update your metro bundler configuration accordingly:

```config title="metro.config"
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: {
      sourceExts,
      assetExts
    }
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg']
    }
  }
})();
```

### Android

#### Permissions
- In `android/app/src/debug/AndroidManifest.xml` and `android/app/src/main/AndroidManifest.xml`, above the `</application>` tag, please include
  ```xml
   <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
   <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
   <uses-permission android:name="android.permission.BLUETOOTH" />
   <uses-permission android:name="android.permission.CAMERA" />
   <uses-permission android:name="android.permission.INTERNET" />
   <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
   <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
   <uses-permission android:name="android.permission.RECORD_AUDIO" />
   <uses-permission android:name="android.permission.WAKE_LOCK" />
  ```
- If you enable the `call-integration.enabled` flag on Android (native `ConnectionService` integration, off by default on this platform), also add:
  ```xml
   <uses-permission android:name="android.permission.MANAGE_OWN_CALLS" />
  ```
- Starting with Android 14, the ongoing-conference notification and screen share each start a foreground service of a specific type, which requires these permissions:
  ```xml
   <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
   <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MICROPHONE" />
   <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK" />
   <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PROJECTION" />
  ```

#### Services
- To enable the screen share feature you need to go to your `MainApplication.java` file and:
  1. `import com.oney.WebRTCModule.WebRTCModuleOptions;` that comes from `react-native-webrtc` dependency.
  2. `WebRTCModuleOptions options = WebRTCModuleOptions.getInstance();` instance it.
  3. `options.enableMediaProjectionService = true;` enable foreground service that takes care of screen-sharing feature.

#### Build configuration
- In your app's `build.gradle`, target at least `minSdkVersion = 26`.
- Use `gradlePluginVersion = "8.4.2"` or higher.
- Target `compileSdkVersion`/`targetSdkVersion` **33 or higher**, so the `POST_NOTIFICATIONS` runtime-permission model (Android 13+) and the foreground-service-type permissions above (Android 14+) behave correctly.

### iOS

#### Permissions
- React Native SDK requests camera and microphone access, make sure to include the required entries for `NSCameraUsageDescription` and `NSMicrophoneUsageDescription` in your `Info.plist` file.
- React Native SDK shows and hides the status bar based on the conference state,
  you may want to set `UIViewControllerBasedStatusBarAppearance` to `NO` in your
  `Info.plist` file.
- In Signing & Capabilities, add Background Modes: **Audio**, **Voice over IP**, and **Background fetch**.

#### Install

Run:
```console
cd ios && pod install && cd ..
```

#### Build Phases

##### Run Script Phases
- For the sounds to work, please add the following script in Xcode:
  ```shell
    SOUNDS_DIR="${PROJECT_DIR}/../node_modules/@jitsi/react-native-sdk/sounds"
    cp $SOUNDS_DIR/* ${CONFIGURATION_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/
  ```

#### Screen share

Screen share on iOS needs a Broadcast Upload Extension in your app. The SDK does not include one.
Screen share works on a physical device with iOS 14 or newer. It does not work in the simulator.

For background, see the handbook section
[Creating the Broadcast Upload Extension](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-ios-sdk/#creating-the-broadcast-upload-extension)
and the [swift-screensharing sample](https://github.com/jitsi/jitsi-meet-sdk-samples/tree/master/ios/swift-screensharing).

**1. Create the extension target**

1. In Xcode, choose File > New > Target.
2. Select the Broadcast Upload Extension template.
3. Set the language to Swift.
4. Clear the "Include UI Extension" checkbox.
5. Click Finish. Xcode creates a folder that contains `SampleHandler.swift`.
6. In the new target, set the iOS Deployment Target to 14.0 or newer.

**2. Add the extension code**

1. Copy these five files from the sample into the extension folder:
   `SampleHandler.swift`, `SampleUploader.swift`, `SocketConnection.swift`,
   `DarwinNotificationCenter.swift`, `Atomic.swift`. Replace the generated `SampleHandler.swift`.
2. Make sure that all five files belong to the extension target. Check File Inspector > Target
   Membership.

**3. Create the app group**

1. Choose an app group id, for example `group.com.example.myapp`.
2. In the Apple Developer portal, register the app group.
3. Assign the app group to the App ID of the app and to the App ID of the extension.
4. In Xcode, add the App Groups capability to the app target. Select the group.
5. Add the App Groups capability to the extension target. Select the same group.
6. In `SampleHandler.swift`, set `Constants.appGroupIdentifier` to the same app group id.

**4. Configure the app**

1. Add two keys to the app `Info.plist`:
   - `RTCAppGroupIdentifier`: the app group id.
   - `RTCScreenSharingExtension`: the bundle id of the extension, for example
     `com.example.myapp.broadcast`.
2. Make sure Background Modes has Audio and Voice over IP (see Permissions above).
3. Pass the feature flag to `JitsiMeeting`. The toolbar then shows the screen share button.
   ```jsx
   <JitsiMeeting flags = {{ 'ios.screensharing.enabled': true }} ... />
   ```

> **Important**
> - The app group id must be the same in three places: `Constants.appGroupIdentifier` in
>   `SampleHandler.swift`, the App Groups capability of both targets, and `RTCAppGroupIdentifier`.
>   If they are different, the picker opens and the red status bar appears, but no video reaches
>   the meeting. The SDK cannot detect this.
> - Do not change the notification names `iOS_BroadcastStarted` and `iOS_BroadcastStopped` in
>   `DarwinNotificationCenter.swift`. The SDK listens for these exact names.

**5. Test**

1. Run the app on a physical device.
2. Join a meeting.
3. Tap the screen share button. The system picker opens.
4. Tap Start Broadcast. After the countdown, the red status bar appears and the other
   participants see your screen.
5. Tap the red status bar and stop the broadcast. The screen share ends.

If you want to test all the steps before applying them to your app, you can check our React Native SDK sample app here:
https://github.com/jitsi/jitsi-meet-sdk-samples/tree/master/react-native

## JitsiMeeting props

Our JitsiMeeting component renders the full meeting experience. This has some customizable properties:

### config
`Object` - Overwrite different [config](https://github.com/jitsi/jitsi-meet/blob/master/config.js) options.
- For example:
```javascript
<JitsiMeeting
    config = {{
        hideConferenceTimer: true,
        subject: "React Native SDK",
        customToolbarButtons: [
            {
                icon: "https://w7.pngwing.com/pngs/987/537/png-transparent-download-downloading-save-basic-user-interface-icon-thumbnail.png",
                id: "btn1",
                text: "Button one"
            }, {
                icon: "https://w7.pngwing.com/pngs/987/537/png-transparent-download-downloading-save-basic-user-interface-icon-thumbnail.png",
                id: "btn2",
                text: "Button two"
            }
        ]
    }} />
```

### flags
`Object` - Add different feature [flags](https://github.com/jitsi/jitsi-meet/blob/master/react/features/base/flags/constants.ts)
that your meeting experience would like to have.
- For example:
```javascript
<JitsiMeeting
    flags={{
    'call-integration.enabled': true,
    'invite.enabled': true,
    'tile-view.enabled': false }} />
```

### eventListeners
`Object` - Options that personalize your meeting experience:

 - onConferenceBlurred
`Function` - Takes a function that gets triggered when ```CONFERENCE_BLURRED``` action is dispatched, more exactly when a conference screen is out of focus, more exactly when navigation to another screen is initiated.

 - onConferenceFocused
`Function` - Takes a function that gets triggered when ```CONFERENCE_FOCUSED``` action is dispatched, more exactly when a conference screen is focused.

 - onAudioMutedChanged
`Function` - Takes a function that gets triggered when ```SET_AUDIO_MUTED``` action is dispatched, more exactly when audio mute state is changed.

 - onConferenceJoined
`Function` - Takes a function that gets triggered when ```CONFERENCE_JOINED``` action is dispatched, more exactly when a conference was joined.

 - onConferenceWillJoin
`Function` - Takes a function that gets triggered when ```CONFERENCE_WILL_JOIN``` action is dispatched, more exactly when a conference will be joined.

 - onEndpointMessageReceived
`Function` - Takes a function that gets triggered when ```ENDPOINT_MESSAGE_RECEIVED``` action is dispatched, more exactly when an endpoint message is received. Called with `{ data, participant }`.

 - onEnterPictureInPicture
   `Function` - Takes a function that gets triggered when ```ENTER_PICTURE_IN_PICTURE``` action is dispatched, more exactly when entering picture-in-picture is initiated.

 - onParticipantJoined
`Function` - Takes a function that gets triggered when ```PARTICIPANT_JOINED``` action is dispatched, more exactly when a specific participant joined a conference.

 - onParticipantLeft
`Function` - Takes a function that gets triggered when ```PARTICIPANT_LEFT``` action is dispatched, more exactly when a specific participant left a conference. Called with `{ id }`.

 - onReadyToClose
   `Function` - Takes a function that gets triggered when ```READY_TO_CLOSE``` action is dispatched, more exactly when one exits a conference.

- onScreenShareToggled
  `Function` - Takes a function that gets triggered when the local screen share state changes, from the toolbar button or, on iOS, the red status bar. Called with `{ sharing: boolean }`. Does not fire if the user dismisses the iOS picker or the Android consent dialog without starting.

- onVideoMutedChanged
  `Function` - Takes a function that gets triggered when ```SET_VIDEO_MUTED``` action is dispatched, more exactly when video mute state is changed.

### room
`string` - Name of the room where the conference takes place.

### serverURL
`string` - Server where the conference should take place.

### style
`Object` - CSS your meeting experience.

### token
`string` - JWT token used for authentication.

### userInfo

- avatarURL
`string` - Path to participant's avatar.

- displayName
`string` - Default participant name to be displayed.

- email
`string` - Default email for participant.

## Controlling the conference imperatively

`JitsiMeeting` also exposes an imperative API through `ref`:

```javascript
const meeting = useRef(null);

<JitsiMeeting ref={ meeting } ... />
```

- close
`Function` - Leaves/closes the current conference.

- setAudioMuted
`(muted: boolean) => void` - Mutes or unmutes the local audio.

- setVideoMuted
`(muted: boolean) => void` - Mutes or unmutes the local video.

- setLowBandwidthMode
`(value: boolean) => void` - Toggles low bandwidth mode for the conference.

- getRoomsInfo
`() => IRoomsInfo` - Returns information about the current breakout rooms, if any.
