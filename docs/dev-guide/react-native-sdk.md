---
id: dev-guide-react-native-sdk
title: React Native SDK
---

The Jitsi React Native SDK provides the same user experience as the Jitsi Meet app,
in a customizable way which you can embed in your React Native apps.

## Sample application using the React Native SDK

If you want to see how easy integrating the Jitsi React Native SDK into a React Native application is, take a look at the<br/>
[sample applications repository](https://github.com/jitsi/jitsi-meet-sdk-samples/react-native).

## Usage

While this is a published library, you can `npm i @jitsi/react-native-sdk`.<br/>
Also, some dependencies need will maybe need to be added and this will be done by running the following script `node node_modules/@jitsi/react-native-sdk/update_dependencies.js`.
This will sync all of our peer dependencies with your dependencies. Next you need to do `npm install`.

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

## JitsiMeeting props

Our JitsiMeeting component renders the full meeting experience. This has some customizable properties:

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

### meetingOptions
`Object` - Options that personalize your meeting experience:

 - domain
`string` - Address where you would like to have your meeting experiences.

 - roomName
`string` - Name of the room where the conference takes place.

 - onReadyToClose
`Function` - Takes a function that gets triggered when ```READY_TO_CLOSE``` action is dispatched, more exactly when one exits a conference.

 - onConferenceJoined
`Function` - Takes a function that gets triggered when ```CONFERENCE_JOINED``` action is dispatched, more exactly when a conference was joined.

 - onConferenceWillJoin
`Function` - Takes a function that gets triggered when ```CONFERENCE_WILL_JOIN``` action is dispatched, more exactly when a conference will be joined.

 - onConferenceLeft
`Function` - Takes a function that gets triggered when ```CONFERENCE_LEFT``` action is dispatched, more exactly when a conference was left.

 - onParticipantJoined
`Function` - Takes a function that gets triggered when ```PARTICIPANT_JOINED``` action is dispatched, more exactly when a specific participant joined a conference.

 - settings
`Object` - Accepts different ways to start a conference:

   - `boolean` - startWithAudioMuted - Enables or disables starting a conference with audio muted. 
   - `boolean` - startAudioOnly - Enables or disables starting a conference with audio only. 
   - `boolean` - startWithVideoMuted - Enables or disables starting a conference with video muted. 

 - style
`Object` - CSS your meeting experience.
