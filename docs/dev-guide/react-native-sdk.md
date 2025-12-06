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
   <uses-permission android:name="android.permission.MANAGE_OWN_CALLS" />
   <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
   <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
   <uses-permission android:name="android.permission.RECORD_AUDIO" />
   <uses-permission android:name="android.permission.WAKE_LOCK" />
  ```
- Starting Android 14, specific foreground service types permissions require to be added in the manifest file: 
  ```xml
   <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
   <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK" />
   <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PROJECTION" />
  ```

#### Services
- To enables the screen share feature you now need to go to your `MainApplication.java` file and:
  1. `import com.oney.WebRTCModule.WebRTCModuleOptions;` that comes from `react-native-webrtc` dependency.
  
  2. `WebRTCModuleOptions options = WebRTCModuleOptions.getInstance();` instance it.
  3. `options.enableMediaProjectionService = true;` enable foreground service that takes care of screen-sharing feature.

#### API
- Our app use `react-native-orientation-locker` dependency that uses API 33 features. Make sure that your app, in `android\build.gradle`, targets, at least, that version:
  ```markdown
    buildscript {
        ext {
            compileSdkVersion = 33
            targetSdkVersion = 33
        }
    }
  ```

### iOS 

#### Permissions
- React Native SDK requests camera and microphone access, make sure to include the required entries for `NSCameraUsageDescription` and `NSMicrophoneUsageDescription`in your `Info.plist` file.
- React Native SDK shows and hides the status bar based on the conference state,
  you may want to set `UIViewControllerBasedStatusBarAppearance` to `NO` in your
  `Info.plist` file.
- For starting screen sharing React Native SDK provides the UI to present the `RPSystemBroadcastPickerView` to the user. By default, the picker will display a list of all the available broadcast providers. In order to limit the picker to our particular broadcast provider, we have to set `preferredExtension` to the bundle identifier of the broadcast extension. We are doing this by adding a new key named `RTCScreenSharingExtension` to the app's Info.plist and setting the broadcast extension bundle identifier as the value.
- Make sure `voip` is added to `UIBackgroundModes`, in the app's `Info.plist`, in order to work when the app is in the background.
 

#### Build Phases

##### Run Script Phases
- For the sounds to work, please add the following script in Xcode:
  ```shell
    SOUNDS_DIR="${PROJECT_DIR}/../node_modules/@jitsi/react-native-sdk/sounds"
    cp $SOUNDS_DIR/* ${CONFIGURATION_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/
  ```

 

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

---

## Complete Examples

### Basic Integration

```javascript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { JitsiMeeting } from '@jitsi/react-native-sdk';

const App = () => {
    return (
        <View style={styles.container}>
            <JitsiMeeting
                room="MyFirstMeeting"
                serverURL="https://meet.jit.si"
                userInfo={{
                    displayName: 'John Doe',
                    email: 'john@example.com',
                    avatarUrl: 'https://example.com/avatar.jpg'
                }}
                config={{
                    startWithAudioMuted: true,
                    startWithVideoMuted: true
                }}
                style={styles.meeting}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    meeting: {
        flex: 1
    }
});

export default App;
```

### With Event Listeners

```javascript
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { JitsiMeeting } from '@jitsi/react-native-sdk';

const VideoConference = () => {
    const [inMeeting, setInMeeting] = useState(false);
    const [participants, setParticipants] = useState([]);
    const [isMuted, setIsMuted] = useState(false);

    const eventListeners = {
        onConferenceJoined: () => {
            console.log('Conference joined');
            setInMeeting(true);
        },
        onConferenceLeft: () => {
            console.log('Conference left');
            setInMeeting(false);
            setParticipants([]);
        },
        onParticipantJoined: (participant) => {
            console.log('Participant joined:', participant);
            setParticipants(prev => [...prev, participant]);
        },
        onAudioMutedChanged: ({ muted }) => {
            console.log('Audio muted:', muted);
            setIsMuted(muted);
        },
        onVideoMutedChanged: ({ muted }) => {
            console.log('Video muted:', muted);
        },
        onReadyToClose: () => {
            console.log('Meeting ended');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.statusBar}>
                <Text style={styles.statusText}>
                    Status: {inMeeting ? '🟢 In Meeting' : '🔴 Not Connected'}
                </Text>
                <Text style={styles.statusText}>
                    Participants: {participants.length}
                </Text>
                <Text style={styles.statusText}>
                    Audio: {isMuted ? '🔇 Muted' : '🎤 Unmuted'}
                </Text>
            </View>
            
            <JitsiMeeting
                room="EventListenersDemo"
                serverURL="https://meet.jit.si"
                eventListeners={eventListeners}
                style={styles.meeting}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    statusBar: {
        padding: 10,
        backgroundColor: '#333'
    },
    statusText: {
        color: '#fff',
        fontSize: 14,
        marginVertical: 2
    },
    meeting: {
        flex: 1
    }
});

export default VideoConference;
```

### Custom Toolbar Buttons

```javascript
import React, { useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { JitsiMeeting } from '@jitsi/react-native-sdk';

const CustomToolbarMeeting = () => {
    const jitsiMeetingRef = useRef(null);

    const handleCustomButton = (buttonId) => {
        switch(buttonId) {
            case 'custom-recording':
                Alert.alert('Recording', 'Start recording clicked');
                break;
            case 'custom-poll':
                Alert.alert('Poll', 'Create poll clicked');
                break;
            default:
                console.log('Unknown button:', buttonId);
        }
    };

    return (
        <View style={styles.container}>
            <JitsiMeeting
                ref={jitsiMeetingRef}
                room="CustomToolbarRoom"
                serverURL="https://meet.jit.si"
                config={{
                    customToolbarButtons: [
                        {
                            icon: "https://cdn-icons-png.flaticon.com/512/1092/1092012.png",
                            id: "custom-recording",
                            text: "Record"
                        },
                        {
                            icon: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
                            id: "custom-poll",
                            text: "Poll"
                        }
                    ]
                }}
                eventListeners={{
                    onCustomButtonPress: ({ id }) => handleCustomButton(id)
                }}
                style={styles.meeting}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    meeting: {
        flex: 1
    }
});

export default CustomToolbarMeeting;
```

### With Authentication (JWT)

```javascript
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { JitsiMeeting } from '@jitsi/react-native-sdk';

const AuthenticatedMeeting = ({ userId, roomName }) => {
    const [jwt, setJwt] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch JWT from your backend
        fetch('https://your-api.com/generate-jwt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                room: roomName
            })
        })
        .then(res => res.json())
        .then(data => {
            setJwt(data.token);
            setLoading(false);
        })
        .catch(err => {
            console.error('JWT fetch failed:', err);
            setLoading(false);
        });
    }, [userId, roomName]);

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <JitsiMeeting
                room={roomName}
                serverURL="https://your-domain.com"
                token={jwt}
                userInfo={{
                    displayName: 'Authenticated User',
                    email: `user${userId}@example.com`
                }}
                style={styles.meeting}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    meeting: {
        flex: 1
    }
});

export default AuthenticatedMeeting;
```

### Navigation Integration (React Navigation)

```javascript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Button, StyleSheet } from 'react-native';
import { JitsiMeeting } from '@jitsi/react-native-sdk';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.home}>
            <Button
                title="Join Meeting"
                onPress={() => navigation.navigate('Meeting', { 
                    room: 'DemoRoom123' 
                })}
            />
        </View>
    );
};

const MeetingScreen = ({ route, navigation }) => {
    const { room } = route.params;

    return (
        <View style={styles.container}>
            <JitsiMeeting
                room={room}
                serverURL="https://meet.jit.si"
                eventListeners={{
                    onReadyToClose: () => {
                        navigation.goBack();
                    }
                }}
                style={styles.meeting}
            />
        </View>
    );
};

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen 
                    name="Meeting" 
                    component={MeetingScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    home: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1
    },
    meeting: {
        flex: 1
    }
});

export default App;
```

---

## Troubleshooting

### Common Issues

#### Android Build Fails

**Problem:** Gradle build errors or dependency conflicts

**Solutions:**

1. **Clear build cache:**
```bash
cd android
./gradlew clean
rm -rf .gradle
cd ..
```

2. **Update Gradle wrapper:**
```gradle
// android/gradle/wrapper/gradle-wrapper.properties
distributionUrl=https\://services.gradle.org/distributions/gradle-8.0-all.zip
```

3. **Force dependency resolution:**
```bash
npm i @jitsi/react-native-sdk --force
```

4. **Check Java version:**
```bash
java -version  # Should be Java 11+
```

#### iOS Build Fails

**Problem:** CocoaPods or Xcode build errors

**Solutions:**

1. **Reinstall pods:**
```bash
cd ios
rm -rf Pods Podfile.lock
pod cache clean --all
pod install
cd ..
```

2. **Update CocoaPods:**
```bash
sudo gem install cocoapods
```

3. **Clear Xcode cache:**
```bash
rm -rf ~/Library/Developer/Xcode/DerivedData
```

4. **Verify minimum iOS version:**
```ruby
# ios/Podfile
platform :ios, '15.1'
```

#### Screen Sharing Not Working (Android)

**Problem:** Screen share button disabled or crashes

**Solutions:**

1. **Enable media projection service:**
```java
// MainApplication.java
import com.oney.WebRTCModule.WebRTCModuleOptions;

public class MainApplication extends Application implements ReactApplication {
    @Override
    public void onCreate() {
        super.onCreate();
        
        WebRTCModuleOptions options = WebRTCModuleOptions.getInstance();
        options.enableMediaProjectionService = true;
    }
}
```

2. **Add foreground service permissions (Android 14+):**
```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PROJECTION" />
```

#### Audio/Video Not Working

**Problem:** No audio or video in meeting

**Solutions:**

1. **Check permissions (Android):**
```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
```

2. **Check permissions (iOS):**
```xml
<!-- ios/YourApp/Info.plist -->
<key>NSCameraUsageDescription</key>
<string>Camera is required for video calls</string>
<key>NSMicrophoneUsageDescription</key>
<string>Microphone is required for audio calls</string>
```

3. **Request runtime permissions:**
```javascript
import { PermissionsAndroid, Platform } from 'react-native';

const requestPermissions = async () => {
    if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        ]);
        
        return granted['android.permission.CAMERA'] === 'granted' &&
               granted['android.permission.RECORD_AUDIO'] === 'granted';
    }
    return true;
};
```

#### Metro Bundler SVG Errors

**Problem:** SVG files not loading

**Solution:** Update metro config:
```bash
npm install --save-dev react-native-svg-transformer
```

```javascript
// metro.config.js
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer')
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg']
    }
  };
})();
```

#### Picture-in-Picture Issues

**Problem:** PiP not working on Android

**Solutions:**

1. **Enable PiP in config:**
```javascript
<JitsiMeeting
    config={{
        'pip.enabled': true
    }}
    eventListeners={{
        onEnterPictureInPicture: () => {
            console.log('Entered PiP mode');
        }
    }}
/>
```

2. **Add AndroidManifest entry:**
```xml
<activity
    android:name=".MainActivity"
    android:supportsPictureInPicture="true"
    android:configChanges="screenSize|smallestScreenSize|screenLayout|orientation">
</activity>
```

---

## Best Practices

### ✅ Do's

1. **Handle lifecycle properly:**
```javascript
useEffect(() => {
    return () => {
        // Cleanup on unmount
        console.log('Component unmounting');
    };
}, []);
```

2. **Use event listeners for state management:**
```javascript
const eventListeners = {
    onConferenceJoined: () => setInMeeting(true),
    onConferenceLeft: () => setInMeeting(false)
};
```

3. **Implement loading states:**
```javascript
const [loading, setLoading] = useState(true);

// Show spinner until ready
{loading && <ActivityIndicator />}
```

4. **Request permissions before joining:**
```javascript
const joinMeeting = async () => {
    const hasPermissions = await requestPermissions();
    if (hasPermissions) {
        // Join meeting
    }
};
```

5. **Handle navigation properly:**
```javascript
eventListeners={{
    onReadyToClose: () => {
        navigation.goBack();
    }
}}
```

### ❌ Don'ts

1. **Don't forget dependency sync script:**
```bash
# Always run after npm install
node node_modules/@jitsi/react-native-sdk/update_dependencies.js
```

2. **Don't hardcode sensitive data:**
```javascript
// ❌ Bad
token="hardcoded-jwt-token"

// ✅ Good
token={await fetchJWT()}
```

3. **Don't ignore platform differences:**
```javascript
if (Platform.OS === 'ios') {
    // iOS-specific config
} else {
    // Android-specific config
}
```

4. **Don't skip error handling:**
```javascript
eventListeners={{
    onConferenceFailed: (error) => {
        console.error('Conference failed:', error);
        Alert.alert('Error', 'Failed to join meeting');
    }
}}
```

---

## Performance Optimization

### Reduce Bundle Size

```javascript
// Use Hermes engine for better performance
// android/app/build.gradle
project.ext.react = [
    enableHermes: true
]
```

### Optimize Re-renders

```javascript
import React, { memo } from 'react';

const MeetingComponent = memo(({ room, userInfo }) => {
    return <JitsiMeeting room={room} userInfo={userInfo} />;
});
```

### Background Mode

```javascript
// Keep meeting active in background
config={{
    'background': true,
    'callUUID': generateUUID()
}}
```

---

## Platform-Specific Configuration

### Android ProGuard Rules

```proguard
# android/app/proguard-rules.pro
-keep class org.jitsi.meet.** { *; }
-keep class org.webrtc.** { *; }
-dontwarn org.webrtc.**
```

### iOS Background Modes

```xml
<!-- ios/YourApp/Info.plist -->
<key>UIBackgroundModes</key>
<array>
    <string>voip</string>
    <string>audio</string>
</array>
```

---

## Additional Resources

- 📖 **[Android SDK Guide](dev-guide-android-sdk)** - Native Android integration
- 📱 **[iOS SDK Guide](dev-guide-ios-sdk)** - Native iOS integration
- 🎯 **[IFrame API Reference](dev-guide-iframe)** - Complete API docs
- 💬 **[GitHub Issues](https://github.com/jitsi/jitsi-meet-react-native-sdk/issues)** - Report bugs
- 📦 **[Sample Apps](https://github.com/jitsi/jitsi-meet-sdk-samples#react-native)** - Working examples
