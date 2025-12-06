---
id: iframe-workflows
title: IFrame API Workflows & Sequence Diagrams
---

This guide provides visual representations of common integration workflows and interaction patterns with the Jitsi Meet IFrame API.

## Table of Contents

- [Conference Join Flow](#conference-join-flow)
- [Recording Workflow](#recording-workflow)
- [Device Switching Flow](#device-switching-flow)
- [Screen Sharing Workflow](#screen-sharing-workflow)
- [Participant Management Flow](#participant-management-flow)
- [Breakout Rooms Workflow](#breakout-rooms-workflow)
- [Complete Meeting Lifecycle](#complete-meeting-lifecycle)

---

## Conference Join Flow

This diagram shows the typical sequence when a user joins a conference:

```mermaid
sequenceDiagram
    participant App as Your Application
    participant API as JitsiMeetExternalAPI
    participant Jitsi as Jitsi Meet
    participant User as End User
    
    App->>API: new JitsiMeetExternalAPI(domain, options)
    API->>Jitsi: Load IFrame
    Jitsi-->>API: IFrame loaded
    API-->>App: onload callback
    
    User->>Jitsi: Request to join
    Jitsi->>Jitsi: Check permissions
    
    alt Has permissions
        Jitsi-->>API: videoConferenceJoined event
        API-->>App: Conference joined
        App->>API: executeCommand('displayName', name)
        API->>Jitsi: Set display name
        App->>API: getNumberOfParticipants()
        API-->>App: Participant count
    else No permissions
        Jitsi-->>API: participantKickedOut event
        API-->>App: Access denied
        App->>User: Show error message
    end
    
    loop Continuous Updates
        Jitsi-->>API: Various events
        API-->>App: Event notifications
        App->>App: Update UI
    end
```

**Implementation:**

```javascript
const api = new JitsiMeetExternalAPI('meet.jit.si', {
    roomName: 'MyRoom',
    parentNode: document.querySelector('#meet'),
    userInfo: {
        displayName: 'John Doe',
        email: 'john@example.com'
    }
});

// Listen for successful join
api.addEventListener('videoConferenceJoined', async () => {
    console.log('Successfully joined!');
    
    // Set display name if needed
    api.executeCommand('displayName', 'John Doe');
    
    // Get participant count
    const count = await api.getNumberOfParticipants();
    console.log(`${count} participants in the room`);
});

// Handle join failure
api.addEventListener('participantKickedOut', () => {
    console.error('Failed to join: Access denied');
    alert('You do not have permission to join this meeting');
});
```

---

## Recording Workflow

Complete recording lifecycle from start to stop:

```mermaid
sequenceDiagram
    participant App as Your Application
    participant API as JitsiMeetExternalAPI
    participant Jitsi as Jitsi Meet
    participant Service as Recording Service
    
    Note over App: User clicks "Start Recording"
    
    App->>App: Check if moderator
    
    alt Is Moderator
        App->>API: executeCommand('startRecording', {mode: 'file'})
        API->>Jitsi: Start recording request
        Jitsi->>Service: Initialize recording
        
        alt Recording Started
            Service-->>Jitsi: Recording active
            Jitsi-->>API: recordingStatusChanged {on: true}
            API-->>App: Recording started event
            App->>App: Show recording indicator
            
            Note over Jitsi,Service: Recording in progress...
            
            Note over App: User clicks "Stop Recording"
            App->>API: executeCommand('stopRecording', 'file')
            API->>Jitsi: Stop recording request
            Jitsi->>Service: Finalize recording
            Service-->>Jitsi: Recording saved
            Jitsi-->>API: recordingStatusChanged {on: false}
            API-->>App: Recording stopped event
            App->>App: Hide recording indicator
            App->>User: Show recording saved notification
            
        else Recording Failed
            Service-->>Jitsi: Error
            Jitsi-->>API: recordingStatusChanged {error: 'message'}
            API-->>App: Recording error event
            App->>User: Show error message
        end
        
    else Not Moderator
        App->>User: Show "Moderator only" message
    end
```

**Implementation:**

```javascript
// Check moderator status first
let isModerator = false;

api.addEventListener('participantRoleChanged', ({ role }) => {
    isModerator = (role === 'moderator');
});

async function startRecording() {
    if (!isModerator) {
        alert('Only moderators can start recording');
        return;
    }
    
    try {
        await api.executeCommand('startRecording', {
            mode: 'file'  // or 'stream' for RTMP
        });
    } catch (error) {
        console.error('Failed to start recording:', error);
        alert('Recording failed to start');
    }
}

// Listen for recording status
api.addEventListener('recordingStatusChanged', ({ on, mode, error }) => {
    if (error) {
        console.error('Recording error:', error);
        alert(`Recording error: ${error}`);
    } else if (on) {
        console.log(`Recording started (${mode})`);
        showRecordingIndicator();
    } else {
        console.log('Recording stopped');
        hideRecordingIndicator();
        alert('Recording saved successfully');
    }
});

async function stopRecording() {
    try {
        await api.executeCommand('stopRecording', 'file');
    } catch (error) {
        console.error('Failed to stop recording:', error);
    }
}
```

---

## Device Switching Flow

Handling device enumeration and switching:

```mermaid
sequenceDiagram
    participant App as Your Application
    participant API as JitsiMeetExternalAPI
    participant Jitsi as Jitsi Meet
    participant Browser as Browser API
    
    Note over App: Component mounted
    
    App->>API: getAvailableDevices()
    API->>Browser: navigator.mediaDevices.enumerateDevices()
    Browser-->>API: Device list
    API-->>App: {audioInput: [...], audioOutput: [...], videoInput: [...]}
    App->>App: Render device list
    
    App->>API: getCurrentDevices()
    API->>Jitsi: Get active devices
    Jitsi-->>API: Current device IDs
    API-->>App: {audioInput: {deviceId}, audioOutput: {deviceId}, videoInput: {deviceId}}
    App->>App: Highlight current devices
    
    Note over App: User selects new camera
    
    App->>API: setVideoInputDevice(newDeviceId)
    API->>Jitsi: Switch video device
    Jitsi->>Browser: Get new media stream
    
    alt Device Available
        Browser-->>Jitsi: New video stream
        Jitsi-->>API: Device switched
        API-->>App: Success
        App->>App: Update UI
        
    else Device Error
        Browser-->>Jitsi: Error (NotFoundError/NotAllowedError)
        Jitsi-->>API: Error
        API-->>App: Promise rejected
        App->>User: Show error message
        App->>API: getCurrentDevices()
        API-->>App: Revert to previous device
    end
    
    Note over Browser: New device plugged in
    Browser->>Browser: devicechange event
    Browser-->>App: Navigator devicechange event
    App->>API: getAvailableDevices()
    API-->>App: Updated device list
    App->>App: Re-render device list
```

**Implementation:**

```javascript
class DeviceManager {
    constructor(api) {
        this.api = api;
        this.init();
    }
    
    async init() {
        // Load initial devices
        await this.refreshDevices();
        
        // Listen for device changes
        navigator.mediaDevices.addEventListener('devicechange', async () => {
            console.log('Device change detected');
            await this.refreshDevices();
        });
    }
    
    async refreshDevices() {
        try {
            // Get all available devices
            const available = await this.api.getAvailableDevices();
            
            // Get currently active devices
            const current = await this.api.getCurrentDevices();
            
            // Update UI
            this.renderDeviceSelectors(available, current);
        } catch (error) {
            console.error('Failed to refresh devices:', error);
        }
    }
    
    async switchCamera(deviceId) {
        try {
            await this.api.setVideoInputDevice(deviceId);
            console.log('Camera switched successfully');
        } catch (error) {
            if (error.name === 'NotFoundError') {
                alert('Camera not found. Please check your device.');
            } else if (error.name === 'NotAllowedError') {
                alert('Camera access denied. Please grant permissions.');
            } else {
                alert('Failed to switch camera. Please try again.');
            }
            
            // Revert to previous device
            const current = await this.api.getCurrentDevices();
            this.updateUI(current);
        }
    }
    
    renderDeviceSelectors(available, current) {
        // Render microphones
        this.renderSelect('microphones', available.audioInput, 
                         current.audioInput?.deviceId);
        
        // Render speakers
        this.renderSelect('speakers', available.audioOutput, 
                         current.audioOutput?.deviceId);
        
        // Render cameras
        this.renderSelect('cameras', available.videoInput, 
                         current.videoInput?.deviceId);
    }
}
```

---

## Screen Sharing Workflow

Screen sharing initiation and management:

```mermaid
sequenceDiagram
    participant App as Your Application
    participant API as JitsiMeetExternalAPI
    participant Jitsi as Jitsi Meet
    participant Browser as Browser API
    participant User as End User
    
    Note over App: User clicks "Share Screen"
    
    App->>API: executeCommand('toggleShareScreen')
    API->>Jitsi: Request screen share
    Jitsi->>Browser: getDisplayMedia()
    Browser->>User: Screen picker dialog
    
    alt User Grants Permission
        User-->>Browser: Select screen/window
        Browser-->>Jitsi: Display media stream
        Jitsi-->>API: screenSharingStatusChanged {on: true}
        API-->>App: Screen sharing started
        App->>App: Update button (Show "Stop Sharing")
        
        Note over Jitsi: Sharing in progress...
        
        alt User Clicks "Stop Sharing"
            App->>API: executeCommand('toggleShareScreen')
            API->>Jitsi: Stop screen share
        else User Stops via Browser
            Browser->>Jitsi: Stream ended
        end
        
        Jitsi-->>API: screenSharingStatusChanged {on: false}
        API-->>App: Screen sharing stopped
        App->>App: Update button (Show "Share Screen")
        
    else User Denies Permission
        User-->>Browser: Cancel dialog
        Browser-->>Jitsi: NotAllowedError
        Jitsi-->>API: Error
        API-->>App: Screen sharing failed
        App->>User: Show error message
    end
```

**Implementation:**

```javascript
let isSharingScreen = false;

function toggleScreenShare() {
    api.executeCommand('toggleShareScreen');
}

api.addEventListener('screenSharingStatusChanged', ({ on, details }) => {
    isSharingScreen = on;
    
    const btn = document.querySelector('#screenShareBtn');
    
    if (on) {
        btn.textContent = '🛑 Stop Sharing';
        btn.className = 'btn btn-danger';
        console.log('Screen sharing started');
        
        // Show who is sharing
        if (details && details.sourceType) {
            console.log(`Sharing: ${details.sourceType}`); // 'screen', 'window', or 'tab'
        }
    } else {
        btn.textContent = '📺 Share Screen';
        btn.className = 'btn btn-primary';
        console.log('Screen sharing stopped');
    }
});

// Handle errors
api.addEventListener('errorOccurred', ({ error }) => {
    if (error.includes('screenshare')) {
        alert('Screen sharing failed. Please grant permission and try again.');
    }
});
```

---

## Participant Management Flow

Managing participants throughout their lifecycle:

```mermaid
sequenceDiagram
    participant App as Your Application
    participant API as JitsiMeetExternalAPI
    participant Jitsi as Jitsi Meet
    
    Note over App: Initial load
    App->>API: Conference joined
    API-->>App: videoConferenceJoined
    App->>API: getNumberOfParticipants()
    API-->>App: Current count
    
    Note over Jitsi: New participant joins
    Jitsi-->>API: participantJoined {id, displayName}
    API-->>App: Participant joined event
    App->>App: Add to participant list
    App->>API: getNumberOfParticipants()
    API-->>App: Updated count
    
    Note over Jitsi: Participant changes name
    Jitsi-->>API: displayNameChange {id, displayname}
    API-->>App: Name changed event
    App->>App: Update participant name
    
    Note over Jitsi: Participant becomes moderator
    Jitsi-->>API: participantRoleChanged {id, role: 'moderator'}
    API-->>App: Role changed event
    App->>App: Add moderator badge
    
    Note over App: Moderator kicks participant
    App->>API: executeCommand('kickParticipant', participantId)
    API->>Jitsi: Kick request
    Jitsi->>Jitsi: Remove participant
    Jitsi-->>API: participantLeft {id}
    API-->>App: Participant left event
    App->>App: Remove from list
    App->>API: getNumberOfParticipants()
    API-->>App: Updated count
    
    Note over Jitsi: Participant leaves normally
    Jitsi-->>API: participantLeft {id}
    API-->>App: Participant left event
    App->>App: Remove from list
```

**Implementation:**

```javascript
class ParticipantManager {
    constructor(api) {
        this.api = api;
        this.participants = new Map();
        this.isModerator = false;
        
        this.setupListeners();
    }
    
    setupListeners() {
        // Track when participants join
        this.api.addEventListener('participantJoined', ({ id, displayName }) => {
            this.addParticipant(id, displayName);
        });
        
        // Track when participants leave
        this.api.addEventListener('participantLeft', ({ id }) => {
            this.removeParticipant(id);
        });
        
        // Track name changes
        this.api.addEventListener('displayNameChange', ({ id, displayname }) => {
            this.updateParticipantName(id, displayname);
        });
        
        // Track role changes
        this.api.addEventListener('participantRoleChanged', ({ id, role }) => {
            if (id === this.getLocalParticipantId()) {
                this.isModerator = (role === 'moderator');
            }
            this.updateParticipantRole(id, role);
        });
    }
    
    addParticipant(id, displayName) {
        this.participants.set(id, {
            id,
            displayName: displayName || 'Guest',
            role: 'participant'
        });
        
        console.log(`Participant joined: ${displayName} (${id})`);
        this.render();
    }
    
    removeParticipant(id) {
        const participant = this.participants.get(id);
        if (participant) {
            console.log(`Participant left: ${participant.displayName}`);
            this.participants.delete(id);
            this.render();
        }
    }
    
    updateParticipantName(id, displayName) {
        const participant = this.participants.get(id);
        if (participant) {
            participant.displayName = displayName;
            this.render();
        }
    }
    
    updateParticipantRole(id, role) {
        const participant = this.participants.get(id);
        if (participant) {
            participant.role = role;
            this.render();
        }
    }
    
    kickParticipant(participantId) {
        if (!this.isModerator) {
            alert('Only moderators can kick participants');
            return;
        }
        
        const participant = this.participants.get(participantId);
        if (participant && confirm(`Kick ${participant.displayName}?`)) {
            this.api.executeCommand('kickParticipant', participantId);
        }
    }
    
    render() {
        const container = document.querySelector('#participants');
        let html = '<h3>Participants (' + this.participants.size + ')</h3>';
        
        this.participants.forEach(p => {
            const roleIcon = p.role === 'moderator' ? '👑' : '👤';
            const kickBtn = this.isModerator ? 
                `<button onclick="manager.kickParticipant('${p.id}')">❌</button>` : '';
            
            html += `
                <div class="participant">
                    <span>${roleIcon} ${p.displayName}</span>
                    ${kickBtn}
                </div>
            `;
        });
        
        container.innerHTML = html;
    }
}

const manager = new ParticipantManager(api);
```

---

## Breakout Rooms Workflow

Managing breakout rooms:

```mermaid
sequenceDiagram
    participant App as Your Application
    participant API as JitsiMeetExternalAPI
    participant Jitsi as Jitsi Meet (Main)
    participant Breakout as Breakout Room
    
    Note over App: Moderator creates breakout rooms
    
    App->>API: executeCommand('addBreakoutRoom', 'Room 1')
    API->>Jitsi: Create breakout room
    Jitsi-->>API: breakoutRoomsUpdated event
    API-->>App: Room created
    
    App->>API: executeCommand('addBreakoutRoom', 'Room 2')
    API->>Jitsi: Create breakout room
    Jitsi-->>API: breakoutRoomsUpdated event
    API-->>App: Rooms list updated
    
    Note over App: Assign participants to rooms
    
    App->>API: executeCommand('sendParticipantToRoom', participantId, 'Room 1')
    API->>Jitsi: Send participant
    Jitsi-->>API: participantLeft event
    
    Note over Breakout: Participant joins breakout room
    
    Breakout-->>API: participantJoined event
    API-->>App: Participant in breakout room
    
    Note over App: Moderator joins breakout room
    
    App->>API: executeCommand('joinBreakoutRoom', 'Room 1')
    API->>Breakout: Join room
    Breakout-->>API: videoConferenceJoined
    API-->>App: Joined breakout room
    
    Note over App: Time to close breakout rooms
    
    App->>API: executeCommand('closeBreakoutRoom', 'Room 1')
    API->>Breakout: Close room
    Breakout->>Jitsi: Return participants
    Jitsi-->>API: participantJoined events
    API-->>App: Participants returned
```

**Implementation:**

```javascript
class BreakoutRoomManager {
    constructor(api) {
        this.api = api;
        this.rooms = new Map();
        
        this.api.addEventListener('breakoutRoomsUpdated', ({ rooms }) => {
            this.updateRooms(rooms);
        });
    }
    
    async createRoom(roomName) {
        try {
            await this.api.executeCommand('addBreakoutRoom', roomName);
            console.log(`Breakout room created: ${roomName}`);
        } catch (error) {
            console.error('Failed to create room:', error);
        }
    }
    
    async sendParticipantToRoom(participantId, roomName) {
        try {
            await this.api.executeCommand('sendParticipantToRoom', 
                                         participantId, roomName);
            console.log(`Sent participant to ${roomName}`);
        } catch (error) {
            console.error('Failed to send participant:', error);
        }
    }
    
    async joinRoom(roomName) {
        try {
            await this.api.executeCommand('joinBreakoutRoom', roomName);
            console.log(`Joined breakout room: ${roomName}`);
        } catch (error) {
            console.error('Failed to join room:', error);
        }
    }
    
    async closeRoom(roomName) {
        try {
            await this.api.executeCommand('closeBreakoutRoom', roomName);
            console.log(`Closed breakout room: ${roomName}`);
        } catch (error) {
            console.error('Failed to close room:', error);
        }
    }
    
    updateRooms(rooms) {
        this.rooms = new Map(rooms.map(r => [r.id, r]));
        this.render();
    }
    
    render() {
        // Render breakout rooms UI
    }
}
```

---

## Complete Meeting Lifecycle

End-to-end meeting flow from initialization to cleanup:

```mermaid
sequenceDiagram
    participant App as Your Application
    participant API as JitsiMeetExternalAPI
    participant Jitsi as Jitsi Meet
    participant User as End User
    
    Note over App: Page Load
    App->>API: new JitsiMeetExternalAPI(...)
    API->>Jitsi: Create IFrame
    Jitsi-->>API: IFrame ready
    API-->>App: onload callback
    
    Note over User: User joins meeting
    User->>Jitsi: Click "Join"
    Jitsi-->>API: readyToClose event
    Jitsi-->>API: videoConferenceJoined event
    API-->>App: Notify joined
    App->>App: Initialize features
    
    rect rgb(200, 220, 250)
        Note over App,Jitsi: Active Meeting Phase
        
        loop Meeting Activities
            User->>Jitsi: Various actions
            Jitsi-->>API: Events
            API-->>App: Process events
            App->>API: Commands
            API->>Jitsi: Execute
        end
    end
    
    alt User Leaves
        User->>Jitsi: Click "Leave"
        Jitsi-->>API: readyToClose event
        API-->>App: Meeting ending
        App->>API: dispose()
        
    else User Closes Tab/Window
        User->>Browser: Close tab
        Browser->>App: beforeunload event
        App->>API: dispose()
        
    else Network Disconnect
        Note over Jitsi: Connection lost
        Jitsi-->>API: videoConferenceLeft event
        API-->>App: Disconnected
        App->>User: Show reconnection UI
        
    else Kicked Out
        Jitsi-->>API: participantKickedOut event
        API-->>App: Kicked notification
        App->>User: Show removal message
        App->>API: dispose()
    end
    
    API->>Jitsi: Cleanup IFrame
    API-->>App: Disposed
    App->>App: Cleanup resources
```

**Implementation:**

```javascript
class MeetingManager {
    constructor(domain, roomName, options = {}) {
        this.domain = domain;
        this.roomName = roomName;
        this.api = null;
        this.isActive = false;
        
        this.init(options);
        this.setupCleanup();
    }
    
    init(options) {
        // Create API instance
        this.api = new JitsiMeetExternalAPI(this.domain, {
            roomName: this.roomName,
            parentNode: document.querySelector('#meet'),
            ...options
        });
        
        // Setup event listeners
        this.api.addEventListener('videoConferenceJoined', () => {
            this.onJoined();
        });
        
        this.api.addEventListener('videoConferenceLeft', () => {
            this.onLeft();
        });
        
        this.api.addEventListener('readyToClose', () => {
            this.cleanup();
        });
        
        this.api.addEventListener('participantKickedOut', () => {
            this.onKickedOut();
        });
    }
    
    onJoined() {
        this.isActive = true;
        console.log('Meeting started');
        
        // Initialize meeting features
        this.initializeFeatures();
    }
    
    onLeft() {
        this.isActive = false;
        console.log('Left meeting');
        
        // Show post-meeting UI
        this.showPostMeetingScreen();
    }
    
    onKickedOut() {
        this.isActive = false;
        console.log('Kicked from meeting');
        alert('You have been removed from the meeting');
        this.cleanup();
    }
    
    initializeFeatures() {
        // Initialize participant tracking
        // Initialize device management
        // Initialize UI controls
        // etc.
    }
    
    setupCleanup() {
        // Cleanup when page unloads
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });
        
        // Cleanup on navigation
        window.addEventListener('popstate', () => {
            this.cleanup();
        });
    }
    
    cleanup() {
        if (this.api) {
            console.log('Cleaning up API resources');
            this.api.dispose();
            this.api = null;
        }
        
        this.isActive = false;
        
        // Cleanup any other resources
        // Remove event listeners
        // Clear intervals/timeouts
        // etc.
    }
    
    leave() {
        if (this.isActive && this.api) {
            this.api.executeCommand('hangup');
        }
    }
    
    showPostMeetingScreen() {
        // Show feedback form, meeting summary, etc.
        document.querySelector('#post-meeting').style.display = 'block';
    }
}

// Usage
const meeting = new MeetingManager('meet.jit.si', 'MyMeeting', {
    userInfo: {
        displayName: 'John Doe',
        email: 'john@example.com'
    }
});

// Leave button
document.querySelector('#leaveBtn').onclick = () => {
    meeting.leave();
};
```

---

## Best Practices

### Event Handling
1. **Always remove listeners** when components unmount
2. **Use debouncing** for frequent events (e.g., audio levels)
3. **Handle all error cases** in event callbacks

### Command Execution
1. **Check permissions** before executing privileged commands
2. **Use async/await** with proper error handling
3. **Validate parameters** before sending commands

### Resource Management
1. **Always call dispose()** before page unload
2. **Clean up timers** and intervals
3. **Remove event listeners** to prevent memory leaks

### Performance
1. **Batch UI updates** instead of updating on every event
2. **Cache device lists** to avoid repeated queries
3. **Use requestAnimationFrame** for smooth animations

---

**See also:**
- [Quick Start Guide](iframe-quick-start.md)
- [Commands Reference](iframe-commands.md)
- [Functions Reference](iframe-functions.md)
- [Events Reference](iframe-events.md)
