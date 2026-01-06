---
id: iframe-migration-guide
title: IFrame API Migration Guide
---

This guide helps you migrate between different versions of the Jitsi Meet IFrame API and understand breaking changes.

## Table of Contents

- [Migration Overview](#migration-overview)
- [API Version History](#api-version-history)
- [Breaking Changes](#breaking-changes)
- [Deprecated Features](#deprecated-features)
- [New Features](#new-features)
- [Migration Checklist](#migration-checklist)

---

## Migration Overview

The Jitsi Meet IFrame API evolves continuously. This guide covers:

- **Breaking changes** that require code modifications
- **Deprecated features** that still work but should be replaced
- **New features** you can adopt for better functionality
- **Best practices** for modern implementations

### Version Compatibility

| API Version | Jitsi Meet Version | Status |
|-------------|-------------------|---------|
| Latest | Stable release | ✅ Recommended |
| Legacy | Older releases | ⚠️ Limited support |

---

## API Version History

### Recent Major Changes

#### 2024-2025 Updates

**New Features:**
- Enhanced breakout room management
- Improved recording options (transcription support)
- Better device management APIs
- Enhanced participant tracking
- Improved error handling

**Breaking Changes:**
- Some configuration options moved to `configOverwrite`
- Event payload structures updated for consistency
- Promise-based returns for more functions

**Deprecations:**
- Legacy event names (with backwards compatibility)
- Old configuration format (still supported with warnings)

---

## Breaking Changes

### 1. Event Payload Structures

**Before (Legacy):**
```javascript
api.addEventListener('participantJoined', (event) => {
    // event was sometimes just the participant ID
    console.log(event); // "participant-id-123"
});
```

**After (Current):**
```javascript
api.addEventListener('participantJoined', ({ id, displayName }) => {
    // event is now always an object with structured data
    console.log(id, displayName); // "participant-id-123", "John Doe"
});
```

**Migration:**
```javascript
// Backwards-compatible handler
api.addEventListener('participantJoined', (event) => {
    // Handle both formats
    const id = typeof event === 'string' ? event : event.id;
    const name = typeof event === 'object' ? event.displayName : 'Unknown';
    
    console.log(`Participant ${name} joined (${id})`);
});
```

---

### 2. Promise-Based Functions

**Before (Legacy):**
```javascript
// Functions returned values directly or via callbacks
const devices = api.getAvailableDevices();
console.log(devices);
```

**After (Current):**
```javascript
// Many functions now return promises
const devices = await api.getAvailableDevices();
console.log(devices);

// Or with .then()
api.getAvailableDevices()
    .then(devices => console.log(devices))
    .catch(error => console.error(error));
```

**Migration:**
```javascript
// Safe wrapper for both sync and async
async function getDevices(api) {
    try {
        const result = api.getAvailableDevices();
        
        // Check if it's a promise
        if (result && typeof result.then === 'function') {
            return await result;
        }
        
        // Direct value
        return result;
    } catch (error) {
        console.error('Failed to get devices:', error);
        return { audioInput: [], audioOutput: [], videoInput: [] };
    }
}
```

---

### 3. Configuration Structure

**Before (Legacy):**
```javascript
const api = new JitsiMeetExternalAPI('meet.jit.si', {
    roomName: 'test',
    // Some config options at root level
    startAudioMuted: true,
    startVideoMuted: true
});
```

**After (Current):**
```javascript
const api = new JitsiMeetExternalAPI('meet.jit.si', {
    roomName: 'test',
    // Config options in configOverwrite
    configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: true
    }
});
```

**Migration:**
```javascript
// Helper function to normalize config
function normalizeConfig(options) {
    const normalized = { ...options };
    const configOverwrite = normalized.configOverwrite || {};
    
    // Move legacy options to configOverwrite
    if (options.startAudioMuted !== undefined) {
        configOverwrite.startWithAudioMuted = options.startAudioMuted;
        delete normalized.startAudioMuted;
    }
    
    if (options.startVideoMuted !== undefined) {
        configOverwrite.startWithVideoMuted = options.startVideoMuted;
        delete normalized.startVideoMuted;
    }
    
    normalized.configOverwrite = configOverwrite;
    return normalized;
}

// Usage
const options = normalizeConfig({
    roomName: 'test',
    startAudioMuted: true  // Legacy format
});

const api = new JitsiMeetExternalAPI('meet.jit.si', options);
```

---

### 4. Command Parameter Changes

**Before (Legacy):**
```javascript
// Some commands accepted multiple parameter formats
api.executeCommand('startRecording', 'file');
```

**After (Current):**
```javascript
// Commands now prefer object parameters for consistency
api.executeCommand('startRecording', {
    mode: 'file'
});
```

**Migration:**
```javascript
// Wrapper function for backwards compatibility
function executeStartRecording(api, options) {
    // Normalize to object format
    const params = typeof options === 'string' 
        ? { mode: options }
        : options;
    
    return api.executeCommand('startRecording', params);
}

// Usage
executeStartRecording(api, 'file');  // Legacy
executeStartRecording(api, { mode: 'file', dropboxToken: '...' });  // New
```

---

## Deprecated Features

### 1. Legacy Event Names

Some event names have been renamed for consistency:

| Deprecated | Current | Migration |
|-----------|---------|-----------|
| `participantJoined` | `participantJoined` | ✅ No change needed |
| `incomingMessage` | `incomingMessage` | ✅ No change needed |

*Note: Most event names remain stable. Check the [Events Reference](iframe-events.md) for the complete list.*

---

### 2. Old Configuration Options

Some `interface_config.js` options are deprecated:

**Deprecated:**
```javascript
interfaceConfigOverwrite: {
    DISABLE_VIDEO_BACKGROUND: true  // Old option
}
```

**Current:**
```javascript
configOverwrite: {
    disableVideoBackground: true  // New option in config.js
}
```

**Migration:**
```javascript
// Helper to map old options to new
function migrateInterfaceConfig(interfaceConfig) {
    const config = {};
    
    if (interfaceConfig.DISABLE_VIDEO_BACKGROUND) {
        config.disableVideoBackground = interfaceConfig.DISABLE_VIDEO_BACKGROUND;
    }
    
    // Add more mappings as needed
    
    return config;
}

// Usage
const interfaceConfigOverwrite = {
    DISABLE_VIDEO_BACKGROUND: true
};

const api = new JitsiMeetExternalAPI('meet.jit.si', {
    roomName: 'test',
    interfaceConfigOverwrite,  // Still works
    configOverwrite: {
        ...migrateInterfaceConfig(interfaceConfigOverwrite),
        // Other config options
    }
});
```

---

### 3. Direct IFrame Manipulation

**Deprecated:**
```javascript
// Direct IFrame manipulation is not recommended
const iframe = document.querySelector('iframe');
iframe.contentWindow.postMessage({...}, '*');
```

**Current:**
```javascript
// Use API methods instead
api.executeCommand('command', 'param');
```

**Why:** Direct manipulation bypasses API validation and may break in future versions.

---

## New Features

### 1. Enhanced Device Management

New APIs for better device control:

```javascript
// Get available devices (Promise-based)
const devices = await api.getAvailableDevices();

// Get current devices
const current = await api.getCurrentDevices();

// Set devices with error handling
try {
    await api.setVideoInputDevice(deviceId);
} catch (error) {
    console.error('Device switch failed:', error);
}
```

**Migration from Legacy:**
```javascript
// Old: Direct device enumeration
navigator.mediaDevices.enumerateDevices()
    .then(devices => { /* manual filtering */ });

// New: Use API methods
api.getAvailableDevices()
    .then(devices => {
        // Pre-filtered and structured
        console.log(devices.audioInput);
        console.log(devices.videoInput);
        console.log(devices.audioOutput);
    });
```

---

### 2. Improved Recording Options

New recording modes and options:

```javascript
// Transcription support (NEW)
await api.executeCommand('startRecording', {
    mode: 'file',
    shouldRecordTranscription: true
});

// RTMP streaming with better control
await api.executeCommand('startRecording', {
    mode: 'stream',
    rtmpStreamKey: 'your-key',
    rtmpBroadcastID: 'your-id',
    shouldRecordAudio: true,
    shouldRecordVideo: true
});
```

**Migration:**
```javascript
// Old: Basic recording
api.executeCommand('startRecording', 'file');

// New: Enhanced with transcription
api.executeCommand('startRecording', {
    mode: 'file',
    shouldRecordTranscription: true  // New feature
});
```

---

### 3. Breakout Rooms

Full breakout room support:

```javascript
// Create breakout room
await api.executeCommand('addBreakoutRoom', 'Room 1');

// Send participant to room
await api.executeCommand('sendParticipantToRoom', participantId, 'Room 1');

// Join breakout room as moderator
await api.executeCommand('joinBreakoutRoom', 'Room 1');

// Close breakout room
await api.executeCommand('closeBreakoutRoom', 'Room 1');

// Listen for updates
api.addEventListener('breakoutRoomsUpdated', ({ rooms }) => {
    console.log('Breakout rooms:', rooms);
});
```

---

### 4. Better Error Handling

More detailed error information:

```javascript
// Old: Generic errors
api.executeCommand('startRecording', 'file')
    .catch(error => console.error(error));

// New: Structured error information
api.executeCommand('startRecording', { mode: 'file' })
    .catch(error => {
        if (error.name === 'NotAllowedError') {
            console.error('Permission denied');
        } else if (error.name === 'NotSupportedError') {
            console.error('Recording not supported');
        } else {
            console.error('Recording failed:', error.message);
        }
    });

// Event-based error handling
api.addEventListener('recordingStatusChanged', ({ on, error }) => {
    if (error) {
        console.error('Recording error:', error);
        // Show user-friendly message
    }
});
```

---

## Migration Checklist

### Phase 1: Assessment

- [ ] Identify current API version in use
- [ ] List all API methods and events used in your application
- [ ] Check for deprecated features in your code
- [ ] Review breaking changes relevant to your implementation
- [ ] Test current implementation with latest API version

### Phase 2: Preparation

- [ ] Create backwards-compatible wrapper functions
- [ ] Update event handlers to use object destructuring
- [ ] Convert callbacks to promises/async-await
- [ ] Move configuration options to `configOverwrite`
- [ ] Add error handling for all API calls

### Phase 3: Implementation

- [ ] Update API initialization code
- [ ] Migrate event listeners to new format
- [ ] Update command executions to use object parameters
- [ ] Implement new error handling patterns
- [ ] Add feature detection for new APIs

### Phase 4: Testing

- [ ] Test with new API version
- [ ] Verify backwards compatibility with older versions (if needed)
- [ ] Test error scenarios
- [ ] Verify device management functionality
- [ ] Test recording and streaming features
- [ ] Verify breakout room functionality (if used)

### Phase 5: Deployment

- [ ] Update documentation
- [ ] Deploy to staging environment
- [ ] Monitor for errors
- [ ] Gradual rollout to production
- [ ] Remove legacy code after verification

---

## Common Migration Scenarios

### Scenario 1: Basic Video Call Application

**Before:**
```javascript
// Legacy implementation
const api = new JitsiMeetExternalAPI('meet.jit.si', {
    roomName: 'test',
    startAudioMuted: true,
    parentNode: document.querySelector('#meet')
});

api.addEventListener('participantJoined', (id) => {
    console.log('Participant joined:', id);
});

api.executeCommand('toggleAudio');
```

**After:**
```javascript
// Modern implementation
const api = new JitsiMeetExternalAPI('meet.jit.si', {
    roomName: 'test',
    parentNode: document.querySelector('#meet'),
    configOverwrite: {
        startWithAudioMuted: true
    }
});

api.addEventListener('participantJoined', ({ id, displayName }) => {
    console.log(`Participant ${displayName} joined (${id})`);
});

api.addEventListener('videoConferenceJoined', async () => {
    // Modern async/await patterns
    try {
        const count = await api.getNumberOfParticipants();
        console.log(`${count} participants in the call`);
    } catch (error) {
        console.error('Failed to get participant count:', error);
    }
});

api.executeCommand('toggleAudio');
```

---

### Scenario 2: Custom Device Selector

**Before:**
```javascript
// Legacy device handling
navigator.mediaDevices.enumerateDevices().then(devices => {
    const cameras = devices.filter(d => d.kind === 'videoinput');
    // Manual rendering and selection
});
```

**After:**
```javascript
// Modern device management
async function setupDeviceSelector() {
    try {
        // Structured device list
        const devices = await api.getAvailableDevices();
        const current = await api.getCurrentDevices();
        
        // Render cameras
        renderCameraSelector(devices.videoInput, current.videoInput?.deviceId);
        
        // Render microphones
        renderMicSelector(devices.audioInput, current.audioInput?.deviceId);
        
        // Render speakers
        renderSpeakerSelector(devices.audioOutput, current.audioOutput?.deviceId);
    } catch (error) {
        console.error('Device setup failed:', error);
        showDeviceError(error);
    }
}

// Handle device changes
navigator.mediaDevices.addEventListener('devicechange', async () => {
    await setupDeviceSelector();
});
```

---

### Scenario 3: Recording Integration

**Before:**
```javascript
// Legacy recording
api.executeCommand('startRecording', 'file');

// Basic status tracking
api.addEventListener('recordingStatusChanged', (status) => {
    if (status.on) {
        console.log('Recording started');
    }
});
```

**After:**
```javascript
// Modern recording with full features
async function startRecording(mode = 'file') {
    try {
        await api.executeCommand('startRecording', {
            mode: mode,
            shouldRecordTranscription: true  // New feature
        });
    } catch (error) {
        console.error('Recording failed:', error);
        showRecordingError(error);
    }
}

// Enhanced status tracking
api.addEventListener('recordingStatusChanged', ({ on, mode, error }) => {
    if (error) {
        console.error('Recording error:', error);
        showRecordingError(error);
    } else if (on) {
        console.log(`Recording started (${mode})`);
        showRecordingIndicator(mode);
    } else {
        console.log('Recording stopped');
        hideRecordingIndicator();
        showRecordingSavedMessage();
    }
});
```

---

## Version Detection

To check which features are available:

```javascript
// Feature detection
function hasFeature(api, featureName) {
    switch (featureName) {
        case 'breakoutRooms':
            return typeof api.executeCommand === 'function'; // Check for command support
            
        case 'transcription':
            // Try to execute with transcription flag
            return true; // Assume available in recent versions
            
        case 'promiseFunctions':
            // Check if getAvailableDevices returns a promise
            const result = api.getAvailableDevices();
            return result && typeof result.then === 'function';
            
        default:
            return false;
    }
}

// Usage
if (hasFeature(api, 'breakoutRooms')) {
    // Enable breakout room UI
    showBreakoutRoomControls();
}
```

---

## Getting Help

If you encounter migration issues:

1. **Check the documentation**: Review [Commands](iframe-commands.md), [Functions](iframe-functions.md), and [Events](iframe-events.md)
2. **Search community forums**: [Jitsi Community](https://community.jitsi.org/)
3. **Review examples**: Check the [Quick Start Guide](iframe-quick-start.md) and [Workflows](iframe-workflows.md)
4. **Report issues**: [GitHub Issues](https://github.com/jitsi/jitsi-meet/issues)

---

**See also:**
- [Quick Start Guide](iframe-quick-start.md)
- [Workflows & Diagrams](iframe-workflows.md)
- [Commands Reference](iframe-commands.md)
- [Functions Reference](iframe-functions.md)
- [Events Reference](iframe-events.md)
- [Best Practices](iframe-best-practices.md)
