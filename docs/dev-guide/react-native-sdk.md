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


### Android permissions

- In `android/app/src/debug/AndroidManifest.xml` and `android/app/src/main/AndroidManifest.xml`, under the `</application>` tag, include
  ```xml
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.BLUETOOTH" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.MANAGE_OWN_CALLS" />
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
  ```

### iOS permissions

- React Native SDK requests camera and microphone access, make sure to include the required entries for `NSCameraUsageDescription` and `NSMicrophoneUsageDescription`in your `Info.plist` file.
- React Native SDK shows and hides the status bar based on the conference state,
  you may want to set `UIViewControllerBasedStatusBarAppearance` to `NO` in your
  `Info.plist` file.
- For starting screen sharing React Native SDK provides the UI to present the `RPSystemBroadcastPickerView` to the user. By default, the picker will display a list of all the available broadcast providers. In order to limit the picker to our particular broadcast provider, we have to set `preferredExtension` to the bundle identifier of the broadcast extension. We are doing this by adding a new key named `RTCScreenSharingExtension` to the app's Info.plist and setting the broadcast extension bundle identifier as the value.
- Make sure `voip` is added to `UIBackgroundModes`, in the app's `Info.plist`, in order to work when the app is in the background.

## JitsiMeeting props

Our JitsiMeeting component renders the full meeting experience. This has some customizable properties:


### config
`Object` - Updates [configuration](https://github.com/jitsi/jitsi-meet/blob/master/config.js).


### flags
`Object` - Add different feature [flags](https://github.com/jitsi/jitsi-meet/blob/master/react/features/base/flags/constants.ts)
that your meeting experience would like to have. 
- For example: 
```javascript
<JitsiMeeting flags={{
    'call-integration.enabled': true, 
    'fullscreen.enabled': false, 
    'invite.enabled': true }} />
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

 - onConferenceLeft
   `Function` - Takes a function that gets triggered when ```CONFERENCE_LEFT``` action is dispatched, more exactly when a conference was left.

 - onConferenceWillJoin
`Function` - Takes a function that gets triggered when ```CONFERENCE_WILL_JOIN``` action is dispatched, more exactly when a conference will be joined.

 - onEnterPictureInPicture
   `Function` - Takes a function that gets triggered when ```ENTER_PICTURE_IN_PICTURE``` action is dispatched, more exactly when entering picture-in-picture is initiated.

 - onParticipantJoined
`Function` - Takes a function that gets triggered when ```PARTICIPANT_JOINED``` action is dispatched, more exactly when a specific participant joined a conference.

 - onReadyToClose
   `Function` - Takes a function that gets triggered when ```READY_TO_CLOSE``` action is dispatched, more exactly when one exits a conference.

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

- avatarUrl
`string` - Path to participant's avatar.

- displayName
`string` - Default participant name to be displayed.

- email
`string` - Default email for participant.
