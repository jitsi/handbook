---
id: mobile-google-auth
title: Setting up Google Sign-in Integration
---

This guide walks you through integrating Google Sign-in and authentication for your Jitsi Meet mobile application on Android and iOS. This enables features like Google account login, calendar integration, and YouTube live streaming.

## Prerequisites

- Active Google Cloud Platform account
- Android/iOS project with Jitsi Meet SDK integrated
- Signed Android APK (can be debug build)
- iOS app with bundle identifier

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://firebase.google.com/)
2. Click **Add Project** or **Create a Project**
3. Enter project name and click **Create Project**

## Step 2: Add Android App

1. Click Android icon in Firebase Console
2. Enter your package name from `android/app/build.gradle`
3. Add SHA-1 certificate fingerprint

### Get SHA-1 Fingerprint

**For Debug Build:**
```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

**For Release Build:**
```bash
keytool -list -v -keystore /path/to/your-release-key.keystore -alias your-key-alias
```

**From Existing APK (macOS):**
```bash
keytool -list -printcert -jarfile the-app.apk
```

4. Download `google-services.json`
5. Place in `android/app/google-services.json`

## Step 3: Add iOS App

1. Click iOS icon in Firebase Console
2. Enter your iOS bundle ID from Xcode
3. Download `GoogleService-Info.plist`
4. Place in `ios/app/GoogleService-Info.plist`

## Step 4: Configure Files

### Android Configuration

Place `google-services.json` in:
```
android/app/google-services.json
```

**Important:** Add to `.gitignore`:
```gitignore
android/app/google-services.json
```

### iOS Configuration

1. Add `GoogleService-Info.plist` to Xcode project
2. Update `ios/app/src/Info.plist`:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLSchemes</key>
        <array>
            <!-- Get REVERSED_CLIENT_ID from GoogleService-Info.plist -->
            <string>com.googleusercontent.apps.123456789-abcdefg</string>
        </array>
    </dict>
</array>
```

**Important:** Add to `.gitignore`:
```gitignore
ios/app/GoogleService-Info.plist
```

## Step 5: Get Web Client ID

1. Go to [Google Developer Console](https://console.developers.google.com/)
2. Select your Firebase project
3. Go to **Credentials**
4. Copy the **Web client ID**

## Step 6: Update config.js

```javascript
var config = {
    googleApiApplicationClientID: '123456789-abcdefg.apps.googleusercontent.com'
};
```

## Step 7: Enable YouTube API

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Select your project
3. Go to **APIs & Services** → **Library**
4. Search for and enable:
   - **YouTube Data API v3**
   - **YouTube Live Streaming API**

## Troubleshooting

### Android: Sign-in Fails

**Solutions:**
1. Verify SHA-1 fingerprint in Firebase Console
2. Check `google-services.json` location
3. Clean and rebuild project
4. Ensure Google Play Services installed

### iOS: Invalid Client ID

**Solutions:**
1. Verify REVERSED_CLIENT_ID in Info.plist
2. Check bundle identifier matches Firebase
3. Clean build folder and rebuild

### YouTube Streaming Not Working

**Solutions:**
1. Enable YouTube Data API v3
2. Enable YouTube Live Streaming API
3. Check Web Client ID in config.js
4. Verify YouTube channel is eligible

## Security Best Practices

✅ **Do:**
- Exclude config files from Git
- Use different projects for dev/prod
- Restrict API keys in Cloud Console
- Enable OAuth consent screen

❌ **Don't:**
- Commit credentials to Git
- Use same keys for dev/prod
- Share SHA-1 fingerprints publicly
- Skip API restrictions

## Additional Resources

- 📖 [Firebase Documentation](https://firebase.google.com/docs)
- 🔧 [Google Cloud Console](https://console.developers.google.com/)
- 📱 [Android SDK Guide](dev-guide-android-sdk)
- 🍎 [iOS SDK Guide](dev-guide-ios-sdk)
