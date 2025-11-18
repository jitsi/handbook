---
id: user-guide-advanced
title: User Guide (Advanced Features & URL Parameters)
sidebar_label: Advanced Features
---

This guide covers advanced features and URL customization options for power users, organizers, and administrators.

## Table of Contents

- [URL Parameters Overview](#url-parameters-overview)
- [Pre-Meeting Customization](#pre-meeting-customization)
- [UI Customization](#ui-customization)
- [Audio & Video Settings](#audio--video-settings)
- [Security & Moderation](#security--moderation)
- [Recording & Streaming](#recording--streaming)
- [Branding & Appearance](#branding--appearance)
- [Performance Optimization](#performance-optimization)
- [Advanced Examples](#advanced-examples)

---

## URL Parameters Overview

Customize Jitsi Meet meetings by adding parameters to the URL. These work for web, iframe, and mobile versions.

### Parameter Format

**Syntax:**
```
https://meet.jit.si/RoomName#config.parameter1=value1&config.parameter2=value2
```

**Key Points:**
- All parameters start with `#config.`
- Separate multiple parameters with `&`
- Boolean values: `true` or `false`
- String values: `'value'` or `"value"`
- Numeric values: just the number

**Example:**
```
https://meet.jit.si/MyMeeting#config.startWithAudioMuted=true&config.startWithVideoMuted=true&config.defaultLanguage='es'
```

---

## Pre-Meeting Customization

### Prejoin Screen

Control the pre-meeting screen where users test their devices.

| Parameter | Type | Effect |
|-----------|------|---------|
| `prejoinConfig.enabled` | `true`/`false` | Show/hide prejoin screen |
| `prejoinConfig.hideDisplayName` | `true`/`false` | Hide name input field |
| `prejoinConfig.hideExtraJoinButtons` | array | Hide specific join buttons |

**Example - Disable Prejoin:**
```
#config.prejoinConfig.enabled=false
```

**Example - Customize Prejoin:**
```
#config.prejoinConfig.enabled=true&config.prejoinConfig.hideDisplayName=true
```

### Auto-Join Settings

| Parameter | Type | Effect |
|-----------|------|---------|
| `minParticipants` | number | Minimum participants before starting (default: 1) |
| `startWithAudioMuted` | `true`/`false` | Start with mic muted |
| `startWithVideoMuted` | `true`/`false` | Start with camera off |
| `startSilent` | `true`/`false` | Mute all audio (in/out) on join |

**Example - Start muted:**
```
#config.startWithAudioMuted=true&config.startWithVideoMuted=true
```

**Use Case:** Large webinars where attendees should be muted by default.

---

## UI Customization

### Language & Localization

| Parameter | Type | Effect |
|-----------|------|---------|
| `defaultLanguage` | string | UI language ('en', 'es', 'fr', 'de', etc.) |
| `transcription.preferredLanguage` | string | Subtitle language preference |

**Example - Spanish UI:**
```
#config.defaultLanguage='es'
```

**Available Languages:** en, es, fr, de, it, pt, ru, zh, ja, ko, ar, and 50+ more

### Display Settings

| Parameter | Type | Effect |
|-----------|------|---------|
| `subject` | string | Meeting title/subject |
| `enableWelcomePage` | `true`/`false` | Show welcome screen |
| `disableInitialGUM` | `true`/`false` | Disable initial device prompts |
| `enableInsecureRoomNameWarning` | `true`/`false` | Warn if room name is insecure |
| `hideDisplayName` | `true`/`false` | Hide participant names |
| `hideEmailInSettings` | `true`/`false` | Hide email field in profile |

**Example - Set Meeting Title:**
```
#config.subject='Team Standup - Nov 18'
```

### Toolbar Customization

| Parameter | Type | Effect |
|-----------|------|---------|
| `toolbarButtons` | array | Which buttons to show (whitelist) |
| `disableModeratorIndicator` | `true`/`false` | Hide moderator crown icon |
| `hideConferenceSubject` | `true`/`false` | Hide meeting title in toolbar |
| `hideConferenceTimer` | `true`/`false` | Hide meeting duration timer |
| `disableProfile` | `true`/`false` | Disable editing display name/avatar |

**Example - Custom Toolbar:**
```javascript
#config.toolbarButtons=['microphone','camera','closedcaptions','desktop','chat','raisehand','participants-pane','tileview','hangup']
```

### Notification Settings

| Parameter | Type | Effect |
|-----------|------|---------|
| `disableJoinLeaveNotifications` | `true`/`false` | Hide join/leave messages |
| `disableShortcuts` | `true`/`false` | Disable keyboard shortcuts |
| `disableInviteFunctions` | `true`/`false` | Hide invite button |
| `doNotStoreRoom` | `true`/`false` | Don't save room to recent list |

**Example - Silent Meeting (no notifications):**
```
#config.disableJoinLeaveNotifications=true
```

---

## Audio & Video Settings

### Audio Configuration

| Parameter | Type | Effect |
|-----------|------|---------|
| `disableAudioLevels` | `true`/`false` | Disable audio level indicators |
| `enableNoAudioDetection` | `true`/`false` | Detect when mic isn't working |
| `enableNoisyMicDetection` | `true`/`false` | Warn about noisy microphone |
| `disableRemoteMute` | `true`/`false` | Prevent moderators from muting you |
| `enableOpusRed` | `true`/`false` | Enable audio redundancy (better quality) |
| `stereo` | `true`/`false` | Enable stereo audio |

**Example - High Quality Audio:**
```
#config.enableOpusRed=true&config.stereo=true
```

### Video Configuration

| Parameter | Type | Effect |
|-----------|------|---------|
| `resolution` | number | Video resolution (180-1080) |
| `constraints.video.height.ideal` | number | Ideal video height |
| `constraints.video.height.max` | number | Maximum video height |
| `constraints.video.height.min` | number | Minimum video height |
| `disableH264` | `true`/`false` | Disable H.264 codec |
| `preferH264` | `true`/`false` | Prefer H.264 over VP8/VP9 |
| `disableSimulcast` | `true`/`false` | Disable video quality layers |

**Example - Force 720p Video:**
```
#config.resolution=720&config.constraints.video.height.ideal=720
```

**Example - Low Bandwidth (360p):**
```
#config.resolution=360&config.constraints.video.height.max=360
```

### Screen Sharing

| Parameter | Type | Effect |
|-----------|------|---------|
| `desktopSharingFrameRate.min` | number | Minimum framerate (5-30) |
| `desktopSharingFrameRate.max` | number | Maximum framerate (5-30) |
| `desktopSharingChromeExtId` | string | Chrome extension ID for screen sharing |
| `disableScreensharingVirtualBackground` | `true`/`false` | Disable background during sharing |

**Example - Smooth Screen Sharing:**
```
#config.desktopSharingFrameRate.min=15&config.desktopSharingFrameRate.max=30
```

### Tile View Settings

| Parameter | Type | Effect |
|-----------|------|---------|
| `tileView.numberOfVisibleTiles` | number | Max tiles in view |
| `disableTileView` | `true`/`false` | Disable tile view feature |
| `disableTileEnlargement` | `true`/`false` | Prevent tile expansion on click |

---

## Security & Moderation

### Lobby Settings

| Parameter | Type | Effect |
|-----------|------|---------|
| `enableLobbyChat` | `true`/`false` | Allow lobby participants to chat with moderator |
| `autoKnockLobby` | `true`/`false` | Auto-request entry to lobby |
| `enableLobby` | `true`/`false` | Enable lobby feature |

**Example - Enable Lobby:**
```
#config.enableLobby=true
```

**Use Case:** Control who enters sensitive meetings

### Moderation Features

| Parameter | Type | Effect |
|-----------|------|---------|
| `disableRemoteMute` | `true`/`false` | Disable moderator mute controls |
| `startAudioMutedPolicy` | number | Auto-mute audio for N+ participants |
| `startVideoMutedPolicy` | number | Auto-mute video for N+ participants |
| `enableAutomaticUrlCopy` | `true`/`false` | Auto-copy meeting URL to clipboard |

**Example - Auto-mute in Large Meetings:**
```
#config.startAudioMutedPolicy=10&config.startVideoMutedPolicy=10
```
*Mutes audio/video for 11th+ participant*

### Privacy Settings

| Parameter | Type | Effect |
|-----------|------|---------|
| `disableThirdPartyRequests` | `true`/`false` | Block external service calls |
| `enableDisplayNameInStats` | `true`/`false` | Send names to analytics |
| `enableEmailInStats` | `true`/`false` | Send emails to analytics |
| `p2p.enabled` | `true`/`false` | Enable peer-to-peer for 1-on-1 calls |
| `analytics.disabled` | `true`/`false` | Disable all analytics |

**Example - Maximum Privacy:**
```
#config.disableThirdPartyRequests=true&config.analytics.disabled=true
```

---

## Recording & Streaming

### Recording Settings

| Parameter | Type | Effect |
|-----------|------|---------|
| `fileRecordingsEnabled` | `true`/`false` | Enable local recording |
| `fileRecordingsServiceEnabled` | `true`/`false` | Enable file recording service |
| `dropbox.appKey` | string | Dropbox app key for recording upload |
| `localRecording.disable` | `true`/`false` | Disable local recording feature |

**Example - Enable Dropbox Recording:**
```
#config.fileRecordingsEnabled=true&config.dropbox.appKey='YOUR_KEY'
```

### Live Streaming

| Parameter | Type | Effect |
|-----------|------|---------|
| `liveStreamingEnabled` | `true`/`false` | Enable YouTube live streaming |
| `hiddenDomain` | string | Hidden domain for streaming |

---

## Branding & Appearance

### Custom Branding

| Parameter | Type | Effect |
|-----------|------|---------|
| `brandingRoomAlias` | string | Custom room display name |
| `defaultLogoUrl` | string | Custom logo URL |
| `defaultLocalDisplayName` | string | Default name for local user |
| `defaultRemoteDisplayName` | string | Default name for remote users |

**Example - Company Branding:**
```
#config.brandingRoomAlias='Acme Corp Meeting'&config.defaultLogoUrl='https://example.com/logo.png'
```

### Background Options

| Parameter | Type | Effect |
|-----------|------|---------|
| `backgroundAlpha` | number | Background opacity (0-1) |
| `disableVideoBackground` | `true`/`false` | Disable virtual backgrounds |
| `videoBackgroundBlur` | `true`/`false` | Enable background blur |

**Example - Enable Blur:**
```
#config.videoBackgroundBlur=true
```

---

## Performance Optimization

### Bandwidth Management

| Parameter | Type | Effect |
|-----------|------|---------|
| `channelLastN` | number | Max video streams to receive (-1 = all) |
| `lastNLimits` | object | Limits for tile view |
| `disableSimulcast` | `true`/`false` | Disable adaptive video quality |
| `enableLayerSuspension` | `true`/`false` | Pause video layers when not visible |

**Example - Limit Incoming Streams:**
```
#config.channelLastN=4
```
*Receive only 4 video streams (saves bandwidth)*

### Quality Settings

| Parameter | Type | Effect |
|-----------|------|---------|
| `resolution` | number | Max video resolution |
| `disableAudioLevels` | `true`/`false` | Disable audio meters (saves CPU) |
| `gatherStats` | `true`/`false` | Collect performance stats |
| `pcStatsInterval` | number | Stats collection interval (ms) |

**Example - Low-End Device Settings:**
```
#config.resolution=360&config.disableAudioLevels=true&config.channelLastN=2
```

---

## Advanced Examples

### Example 1: Webinar Mode

Large presentation with many viewers:

```
https://meet.jit.si/Webinar2024#config.startWithAudioMuted=true&config.startWithVideoMuted=true&config.startAudioMutedPolicy=1&config.disableJoinLeaveNotifications=true&config.prejoinConfig.enabled=true&config.enableLobby=true
```

**Features:**
- All join muted
- No join/leave notifications
- Prejoin screen enabled
- Lobby for screening

### Example 2: Quick Team Chat

Fast, casual meeting:

```
https://meet.jit.si/TeamSync#config.prejoinConfig.enabled=false&config.startWithAudioMuted=false&config.startWithVideoMuted=false&config.resolution=720
```

**Features:**
- No prejoin (instant join)
- Audio/video enabled
- Good quality (720p)

### Example 3: Low Bandwidth Mode

For slow internet connections:

```
https://meet.jit.si/LowBandwidth#config.resolution=180&config.disableSimulcast=true&config.channelLastN=2&config.disableAudioLevels=true&config.startWithVideoMuted=true
```

**Features:**
- Lowest resolution (180p)
- Only 2 video streams
- Video starts off
- Reduced CPU usage

### Example 4: High Privacy Meeting

Maximum privacy and security:

```
https://meet.jit.si/PrivateMeeting#config.disableThirdPartyRequests=true&config.analytics.disabled=true&config.enableLobby=true&config.p2p.enabled=true&config.doNotStoreRoom=true
```

**Features:**
- No external requests
- No analytics
- Lobby enabled
- P2P for 1-on-1
- Not saved to history

### Example 5: Presentation/Demo Mode

Screen sharing focused:

```
https://meet.jit.si/ProductDemo#config.startWithVideoMuted=true&config.desktopSharingFrameRate.max=30&config.resolution=1080&config.disableTileView=true
```

**Features:**
- Video off (focus on screen)
- High framerate sharing
- High resolution
- Speaker view only

### Example 6: Language Learning Class

International classroom:

```
https://meet.jit.si/SpanishClass#config.defaultLanguage='es'&config.transcription.preferredLanguage='es'&config.startAudioMutedPolicy=5&config.enableLobby=true
```

**Features:**
- Spanish UI
- Spanish subtitles
- Auto-mute 6+ students
- Lobby for control

---

## URL Builder Tool

### Manual Construction

```javascript
// Base URL
const baseUrl = 'https://meet.jit.si/YourRoomName';

// Parameters object
const params = {
  'config.startWithAudioMuted': true,
  'config.startWithVideoMuted': true,
  'config.defaultLanguage': 'es'
};

// Build URL
const queryString = Object.entries(params)
  .map(([key, value]) => `${key}=${value}`)
  .join('&');

const fullUrl = `${baseUrl}#${queryString}`;
console.log(fullUrl);
```

**Output:**
```
https://meet.jit.si/YourRoomName#config.startWithAudioMuted=true&config.startWithVideoMuted=true&config.defaultLanguage=es
```

---

## Tips & Best Practices

### ✅ Do's

1. **Test parameters** before sharing links with attendees
2. **Use prejoin** for quality control in important meetings
3. **Enable lobby** for sensitive/private meetings
4. **Set language** when hosting international meetings
5. **Optimize bandwidth** for users with slow connections
6. **Use descriptive room names** for organization

### ❌ Don'ts

1. **Don't use too many parameters** - can break URL
2. **Don't share unencoded special characters** in URLs
3. **Don't disable all features** - users need basic controls
4. **Don't ignore mobile users** - test on mobile devices
5. **Don't forget about accessibility** - keep UI usable

---

## Parameter Compatibility

### Browser Support

| Parameter Category | Chrome | Firefox | Safari | Edge |
|-------------------|--------|---------|--------|------|
| Audio/Video | ✅ | ✅ | ✅ | ✅ |
| UI Customization | ✅ | ✅ | ✅ | ✅ |
| Screen Sharing | ✅ | ✅ | ⚠️ Limited | ✅ |
| Recording | ✅ | ✅ | ❌ | ✅ |
| Virtual Background | ✅ | ⚠️ Limited | ❌ | ✅ |

### Mobile Support

Most parameters work on mobile, but some UI customizations may not apply due to different mobile interface.

---

## Troubleshooting

### Parameters Not Working

**Check:**
1. Syntax is correct (e.g., `config.` prefix)
2. Values are properly formatted (boolean, string, number)
3. Parameter is not misspelled
4. URL is not truncated when shared
5. Browser cache is cleared

### URL Too Long

**Solutions:**
1. Use URL shortener (bit.ly, tinyurl)
2. Reduce number of parameters
3. Self-host and use config.js instead
4. Use iframe API for web integration

---

## Additional Resources

- 📖 **[Basic User Guide](user-guide-basic)** - Essential features
- 🔧 **[Configuration Reference](../dev-guide/dev-guide-configuration)** - All config options
- 💻 **[IFrame API](../dev-guide/dev-guide-iframe)** - Web integration
- 🎛️ **[Keyboard Shortcuts](keyboard-shortcuts)** - Quick actions
- 💬 **[Community Forum](https://community.jitsi.org)** - Get help

---

**Note:** This guide covers publicly available URL parameters. For self-hosted instances, see the [Configuration Guide](../dev-guide/dev-guide-configuration) for comprehensive options including server-side settings.
