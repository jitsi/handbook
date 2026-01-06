---
id: mobile-feature-flags
title: Feature Flags
---

The Jitsi Meet mobile SDK supports feature flags that allow you to customize UI aspects and behavior for your mobile applications. These flags enable or disable specific features, modify UI elements, and control app behavior without modifying the core SDK code.

## Overview

Feature flags provide a powerful way to:
- **Enable/Disable Features**: Control which features are available in your app
- **Customize UI**: Show or hide specific interface elements
- **Control Behavior**: Modify how the app responds to user actions
- **A/B Testing**: Test different configurations with different user groups
- **Gradual Rollouts**: Enable features for specific users or regions

All flags are defined in the Jitsi Meet codebase: [constants.ts](https://github.com/jitsi/jitsi-meet/blob/master/react/features/base/flags/constants.ts)

## Using Feature Flags

### Android SDK

```java
JitsiMeetConferenceOptions options = new JitsiMeetConferenceOptions.Builder()
    .setRoom("TestRoom")
    .setFeatureFlag("welcomepage.enabled", false)
    .setFeatureFlag("calendar.enabled", false)
    .setFeatureFlag("call-integration.enabled", true)
    .setFeatureFlag("chat.enabled", true)
    .setFeatureFlag("invite.enabled", true)
    .setFeatureFlag("ios.recording.enabled", false)
    .setFeatureFlag("live-streaming.enabled", false)
    .setFeatureFlag("meeting-name.enabled", true)
    .setFeatureFlag("meeting-password.enabled", true)
    .setFeatureFlag("pip.enabled", true)
    .setFeatureFlag("raise-hand.enabled", true)
    .setFeatureFlag("recording.enabled", false)
    .setFeatureFlag("tile-view.enabled", true)
    .setFeatureFlag("toolbox.alwaysVisible", false)
    .setFeatureFlag("video-share.enabled", true)
    .build();
```

### iOS SDK

```objc
JitsiMeetConferenceOptions *options = [JitsiMeetConferenceOptions fromBuilder:^(JitsiMeetConferenceOptionsBuilder *builder) {
    builder.room = @"TestRoom";
    [builder setFeatureFlag:@"welcomepage.enabled" withBoolean:NO];
    [builder setFeatureFlag:@"calendar.enabled" withBoolean:NO];
    [builder setFeatureFlag:@"call-integration.enabled" withBoolean:YES];
    [builder setFeatureFlag:@"chat.enabled" withBoolean:YES];
    [builder setFeatureFlag:@"invite.enabled" withBoolean:YES];
    [builder setFeatureFlag:@"pip.enabled" withBoolean:YES];
    [builder setFeatureFlag:@"tile-view.enabled" withBoolean:YES];
}];
```

### React Native SDK

```javascript
<JitsiMeeting
    room="TestRoom"
    flags={{
        'welcomepage.enabled': false,
        'calendar.enabled': false,
        'call-integration.enabled': true,
        'chat.enabled': true,
        'invite.enabled': true,
        'pip.enabled': true,
        'raise-hand.enabled': true,
        'tile-view.enabled': true,
        'toolbox.alwaysVisible': false,
        'video-share.enabled': true
    }}
/>
```

## Common Feature Flags

### UI & Interface

#### welcomepage.enabled
- **Type**: Boolean
- **Default**: `true`
- **Description**: Show or hide the welcome page before joining a meeting
- **Use Case**: Disable for direct-join experiences in embedded apps

```java
.setFeatureFlag("welcomepage.enabled", false)
```

#### toolbox.alwaysVisible
- **Type**: Boolean
- **Default**: `false`
- **Description**: Keep the toolbar always visible instead of auto-hiding
- **Use Case**: Useful for presentations or when users need constant access to controls

```java
.setFeatureFlag("toolbox.alwaysVisible", true)
```

#### tile-view.enabled
- **Type**: Boolean
- **Default**: `true`
- **Description**: Enable tile view (grid layout) for participants
- **Use Case**: Disable for webinar-style meetings with focus on speaker

```java
.setFeatureFlag("tile-view.enabled", true)
```

#### filmstrip.enabled
- **Type**: Boolean
- **Default**: `true`
- **Description**: Show or hide the video thumbnail filmstrip
- **Use Case**: Hide for cleaner UI in small-screen devices

```java
.setFeatureFlag("filmstrip.enabled", false)
```

### Communication Features

#### chat.enabled
- **Type**: Boolean
- **Default**: `true`
- **Description**: Enable or disable in-meeting chat
- **Use Case**: Disable for presentation-only meetings or security reasons

```java
.setFeatureFlag("chat.enabled", true)
```

#### raise-hand.enabled
- **Type**: Boolean
- **Default**: `true`
- **Description**: Allow participants to raise hands
- **Use Case**: Essential for classrooms and large meetings

```java
.setFeatureFlag("raise-hand.enabled", true)
```

#### invite.enabled
- **Type**: Boolean
- **Default**: `true`
- **Description**: Show the invite button to add more participants
- **Use Case**: Disable for private or controlled-access meetings

```java
.setFeatureFlag("invite.enabled", false)
```

#### reactions.enabled
- **Type**: Boolean
- **Default**: `true`
- **Description**: Enable emoji reactions (👍, 👏, ❤️, etc.)
- **Use Case**: Disable for formal meetings

```java
.setFeatureFlag("reactions.enabled", true)
```

### Recording & Streaming

#### recording.enabled
- **Type**: Boolean
- **Default**: `false` (platform dependent)
- **Description**: Enable local recording functionality
- **Use Case**: Allow users to record meetings to device

```java
.setFeatureFlag("recording.enabled", true)
```

#### ios.recording.enabled
- **Type**: Boolean
- **Default**: `false`
- **Description**: Specifically enable recording on iOS
- **Use Case**: iOS requires special permissions for recording

```objc
[builder setFeatureFlag:@"ios.recording.enabled" withBoolean:YES];
```

#### live-streaming.enabled
- **Type**: Boolean
- **Default**: `true`
- **Description**: Enable streaming to YouTube, Facebook, etc.
- **Use Case**: Disable if streaming is not allowed in your use case

```java
.setFeatureFlag("live-streaming.enabled", false)
```

### Mobile-Specific Features

#### call-integration.enabled
- **Type**: Boolean
- **Default**: `true`
- **Description**: Integrate with native phone call system (CallKit on iOS)
- **Use Case**: Show Jitsi calls in native phone interface

```java
.setFeatureFlag("call-integration.enabled", true)
```

#### pip.enabled (Picture-in-Picture)
- **Type**: Boolean
- **Default**: `true`
- **Description**: Allow picture-in-picture mode when app is backgrounded
- **Use Case**: Let users multitask while in meeting

```java
.setFeatureFlag("pip.enabled", true)
```

#### calendar.enabled
- **Type**: Boolean
- **Default**: `true`
- **Description**: Show calendar integration features
- **Use Case**: Disable if your app doesn't need calendar access

```java
.setFeatureFlag("calendar.enabled", false)
```

### Sharing Features

#### video-share.enabled
- **Type**: Boolean
- **Default**: `true`
- **Description**: Allow sharing video files in meeting
- **Use Case**: Disable to simplify interface

```java
.setFeatureFlag("video-share.enabled", false)
```

#### screen-sharing.enabled
- **Type**: Boolean
- **Default**: `true`
- **Description**: Enable screen sharing functionality
- **Use Case**: Disable for privacy or performance reasons

```java
.setFeatureFlag("screen-sharing.enabled", true)
```

### Security & Moderation

#### lobby-mode.enabled
- **Type**: Boolean
- **Default**: `true`
- **Description**: Enable lobby/waiting room feature
- **Use Case**: Control who joins meetings

```java
.setFeatureFlag("lobby-mode.enabled", true)
```

#### meeting-password.enabled
- **Type**: Boolean
- **Default**: `true`
- **Description**: Allow setting meeting passwords
- **Use Case**: Essential for secure meetings

```java
.setFeatureFlag("meeting-password.enabled", true)
```

#### meeting-name.enabled
- **Type**: Boolean
- **Default**: `true`
- **Description**: Show meeting name in UI
- **Use Case**: Disable for cleaner interface

```java
.setFeatureFlag("meeting-name.enabled", false)
```

## Use Case Examples

### Example 1: Webinar Mode (Speaker Focus)

```java
JitsiMeetConferenceOptions options = new JitsiMeetConferenceOptions.Builder()
    .setRoom("WebinarRoom")
    .setFeatureFlag("tile-view.enabled", false)        // Disable grid view
    .setFeatureFlag("raise-hand.enabled", true)        // Allow questions
    .setFeatureFlag("chat.enabled", true)              // Enable Q&A
    .setFeatureFlag("invite.enabled", false)           // Host controls invites
    .setFeatureFlag("reactions.enabled", true)         // Allow reactions
    .setFeatureFlag("live-streaming.enabled", true)    // Enable streaming
    .build();
```

### Example 2: Private Meeting (High Security)

```java
JitsiMeetConferenceOptions options = new JitsiMeetConferenceOptions.Builder()
    .setRoom("PrivateRoom")
    .setFeatureFlag("invite.enabled", false)           // No invites
    .setFeatureFlag("recording.enabled", false)        // No recording
    .setFeatureFlag("live-streaming.enabled", false)   // No streaming
    .setFeatureFlag("chat.enabled", false)             // No chat history
    .setFeatureFlag("lobby-mode.enabled", true)        // Require approval
    .setFeatureFlag("meeting-password.enabled", true)  // Require password
    .build();
```

### Example 3: Classroom (Education)

```java
JitsiMeetConferenceOptions options = new JitsiMeetConferenceOptions.Builder()
    .setRoom("Classroom")
    .setFeatureFlag("tile-view.enabled", true)         // See all students
    .setFeatureFlag("raise-hand.enabled", true)        // Students can ask
    .setFeatureFlag("chat.enabled", true)              // Class discussion
    .setFeatureFlag("reactions.enabled", true)         // Quick feedback
    .setFeatureFlag("recording.enabled", true)         // Record lectures
    .setFeatureFlag("screen-sharing.enabled", true)    // Share presentations
    .build();
```

### Example 4: Quick Call (Minimal UI)

```java
JitsiMeetConferenceOptions options = new JitsiMeetConferenceOptions.Builder()
    .setRoom("QuickCall")
    .setFeatureFlag("welcomepage.enabled", false)      // Skip welcome
    .setFeatureFlag("toolbox.alwaysVisible", false)    // Auto-hide toolbar
    .setFeatureFlag("meeting-name.enabled", false)     // Hide name
    .setFeatureFlag("invite.enabled", false)           // No invites
    .setFeatureFlag("pip.enabled", true)               // Allow multitasking
    .setFeatureFlag("call-integration.enabled", true)  // Native call UI
    .build();
```

### Example 5: Customer Support

```javascript
<JitsiMeeting
    room="SupportCall"
    flags={{
        'welcomepage.enabled': false,              // Direct join
        'chat.enabled': true,                      // Support chat
        'recording.enabled': true,                 // Record for quality
        'tile-view.enabled': false,                // Focus on customer
        'screen-sharing.enabled': true,            // Show customer issue
        'reactions.enabled': false,                // Professional
        'invite.enabled': false                    // 1-on-1 only
    }}
/>
```

## Dynamic Flag Configuration

### Runtime Configuration

```java
public class MeetingConfig {
    public static JitsiMeetConferenceOptions getWebinarConfig() {
        return new JitsiMeetConferenceOptions.Builder()
            .setRoom("Webinar")
            .setFeatureFlag("tile-view.enabled", false)
            .setFeatureFlag("raise-hand.enabled", true)
            .build();
    }
    
    public static JitsiMeetConferenceOptions getPrivateConfig() {
        return new JitsiMeetConferenceOptions.Builder()
            .setRoom("Private")
            .setFeatureFlag("recording.enabled", false)
            .setFeatureFlag("invite.enabled", false)
            .build();
    }
}

// Usage
JitsiMeetConferenceOptions options;
if (meetingType.equals("webinar")) {
    options = MeetingConfig.getWebinarConfig();
} else {
    options = MeetingConfig.getPrivateConfig();
}
```

### User-Specific Flags

```java
// Based on user role
String userRole = getCurrentUserRole(); // "moderator" or "participant"

JitsiMeetConferenceOptions.Builder builder = new JitsiMeetConferenceOptions.Builder()
    .setRoom("Meeting");

if (userRole.equals("moderator")) {
    builder.setFeatureFlag("recording.enabled", true);
    builder.setFeatureFlag("live-streaming.enabled", true);
    builder.setFeatureFlag("lobby-mode.enabled", true);
} else {
    builder.setFeatureFlag("recording.enabled", false);
    builder.setFeatureFlag("live-streaming.enabled", false);
    builder.setFeatureFlag("invite.enabled", false);
}

JitsiMeetConferenceOptions options = builder.build();
```

## Best Practices

### ✅ Do's

1. **Test Combinations**: Test feature flag combinations thoroughly
2. **Document Choices**: Document why certain flags are enabled/disabled
3. **User Preferences**: Allow users to customize some flags
4. **Platform Differences**: Consider iOS vs Android differences
5. **Performance**: Disable unused features to improve performance

### ❌ Don'ts

1. **Don't Over-Disable**: Disabling too many features reduces functionality
2. **Don't Ignore Security**: Always enable security features when needed
3. **Don't Hardcode**: Use configuration files for flag management
4. **Don't Skip Testing**: Always test on actual devices
5. **Don't Forget Updates**: Review flags when updating SDK versions

## Troubleshooting

### Flag Not Working

**Problem:** Feature flag doesn't have expected effect

**Solutions:**
1. Verify flag name spelling (case-sensitive)
2. Check SDK version supports the flag
3. Some flags require specific config.js settings
4. Restart app after changing flags
5. Check platform-specific requirements

### Conflicting Flags

**Problem:** Flags conflict with each other

**Solutions:**
1. Review flag dependencies in documentation
2. Test flags individually first
3. Check console logs for warnings
4. Some features require multiple flags enabled

### Performance Issues

**Problem:** Too many features enabled causing lag

**Solutions:**
1. Disable unused features
2. Test on low-end devices
3. Profile performance with different flag sets
4. Consider device capabilities

## Additional Resources

- 📖 **[Android SDK Guide](dev-guide-android-sdk)** - Android integration
- 📱 **[iOS SDK Guide](dev-guide-ios-sdk)** - iOS integration
- ⚛️ **[React Native SDK](dev-guide-react-native-sdk)** - React Native integration
- 🔧 **[Configuration Options](dev-guide-configuration)** - All config options
- 💬 **[GitHub Constants](https://github.com/jitsi/jitsi-meet/blob/master/react/features/base/flags/constants.ts)** - Complete flag list

---

**Note:** Feature flags are subject to change with SDK updates. Always check the latest documentation for your SDK version.
