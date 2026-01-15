---
id: mobile-dropbox
title: Setting up Dropbox Integration
---

Integrate Dropbox with your Jitsi Meet mobile app to enable recording directly to Dropbox cloud storage. This allows users to save meeting recordings without consuming local device storage.

## Prerequisites

- Dropbox account (free or paid)
- Jitsi Meet mobile SDK integrated in your app
- iOS: Xcode project setup
- Android: Android Studio project setup

## Step 1: Create Dropbox App

1. Go to [Dropbox App Console](https://www.dropbox.com/developers/apps)
2. Click **Create app**
3. Choose API: Select **Scoped access**
4. Choose type of access:
   - **Full Dropbox** (for flexibility)
   - Or **App folder** (for isolated storage)
5. Name your app (must be unique)
6. Click **Create app**

## Step 2: Configure Dropbox Permissions

1. In your app settings, note the **App key**
2. Under **Permissions** tab:
   - Enable `files.metadata.write`
   - Enable `files.content.write`
   - Enable `files.content.read`
3. Click **Submit** to save permissions

## Step 3: Configure iOS

### Update Info.plist

Add the following to `ios/app/src/Info.plist`, replacing `<APP_KEY>` with your actual Dropbox app key:

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLName</key>
    <string></string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>db-<APP_KEY></string>
    </array>
  </dict>
</array>

<key>LSApplicationQueriesSchemes</key>
<array>
  <string>dbapi-2</string>
  <string>dbapi-8-emm</string>
</array>
```

### Example with Actual App Key

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLName</key>
    <string></string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>db-abc123xyz456</string>
    </array>
  </dict>
</array>

<key>LSApplicationQueriesSchemes</key>
<array>
  <string>dbapi-2</string>
  <string>dbapi-8-emm</string>
</array>
```

## Step 4: Android Configuration

**Important:** Both Android and iOS builds parse the Dropbox app key from `ios/app/src/Info.plist`. No additional Android-specific configuration is needed.

The SDK automatically:
- Reads app key from Info.plist
- Handles Dropbox authentication
- Manages upload process

## Step 5: Find Your App Key

To get your Dropbox app key:

1. Go to [Dropbox App Console](https://www.dropbox.com/developers/apps)
2. Select your app
3. Copy the **App key** value (e.g., `abc123xyz456`)

## Testing

### iOS Testing

1. Build and run in Xcode
2. Start a Jitsi meeting
3. Start recording
4. Authenticate with Dropbox when prompted
5. Check Dropbox for uploaded file

### Android Testing

1. Build Android app
2. Install on device
3. Start recording
4. Authenticate with Dropbox
5. Verify upload in Dropbox

## File Location

Recordings are saved in:

**Full Dropbox Access:**
```
Dropbox/Apps/YourAppName/recordings/
```

**App Folder Access:**
```
Dropbox/Apps/YourAppName/
```

File naming format:
```
JitsiMeet_YYYY-MM-DD_HH-MM-SS.mp4
```

## Troubleshooting

### iOS: "Could not connect to Dropbox"

**Solutions:**
1. Verify app key in Info.plist is correct
2. Check URL scheme format: `db-<APP_KEY>`
3. Ensure `LSApplicationQueriesSchemes` includes `dbapi-2` and `dbapi-8-emm`
4. Rebuild app after Info.plist changes

### Android: "Dropbox not available"

**Solutions:**
1. Verify app key exists in `ios/app/src/Info.plist`
2. Android reads from iOS plist file
3. Rebuild both iOS and Android projects

### "Permission denied" Error

**Solutions:**
1. Go to Dropbox App Console
2. Check **Permissions** tab
3. Ensure write permissions are enabled
4. Click **Submit** to save
5. User must re-authenticate app

### "Invalid App Key" Error

**Solutions:**
1. Double-check app key in Info.plist
2. Ensure no spaces or extra characters
3. Format should be: `db-YOUR_APP_KEY`
4. Verify app key in Dropbox App Console

## Security Considerations

### ✅ Do's

1. **Secure App Key**: Don't hardcode in public locations
2. **Use OAuth**: Rely on Dropbox OAuth flow (handled by SDK)
3. **Minimum Permissions**: Only request necessary scopes
4. **App Folder Access**: Consider app folder for better isolation
5. **User Control**: Let users choose when to use Dropbox

### ❌ Don'ts

1. **Don't Share App Secret**: Never commit to version control
2. **Don't Cache Tokens**: Let SDK handle token management
3. **Don't Auto-Upload**: Always get user consent first
4. **Don't Store Passwords**: Use OAuth only

## FAQ

**Q: Do users need Dropbox app installed?**  
A: No, but having it installed improves authentication experience.

**Q: What's the maximum file size?**  
A: Limited by Dropbox account limits (typically several GB for free accounts).

**Q: Can I use personal Dropbox account for testing?**  
A: Yes, during development you can use your personal account.

**Q: Is Dropbox integration free?**  
A: The integration itself is free, but users need Dropbox accounts.

**Q: How do I revoke app access?**  
A: Users can revoke via Dropbox.com → Settings → Connected apps.

## Additional Resources

- 📖 **[Dropbox Developer Guide](https://www.dropbox.com/developers/reference/developer-guide)** - Complete documentation
- 🔧 **[App Console](https://www.dropbox.com/developers/apps)** - Manage your apps
- 📱 **[iOS SDK Guide](dev-guide-ios-sdk)** - iOS integration
- 🤖 **[Android SDK Guide](dev-guide-android-sdk)** - Android integration
- 🎥 **[Web Integrations](dev-guide-web-integrations)** - Other storage options

---

**Note:** Both Android and iOS apps read the Dropbox app key from `ios/app/src/Info.plist`. Make sure this file is properly configured for cross-platform support.
