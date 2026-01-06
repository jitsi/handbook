---
id: iframe-quick-start
title: IFrame API Quick Start Guide
---

This guide provides complete, ready-to-use examples for common Jitsi Meet IFrame API integration patterns.

## Table of Contents

- [Basic Integration](#basic-integration)
- [Custom UI Controller](#custom-ui-controller)
- [Recording Manager](#recording-manager)
- [Participant List Component](#participant-list-component)
- [Device Manager](#device-manager)
- [Complete Example: Video Conference App](#complete-example-video-conference-app)

---

## Basic Integration

### Minimal Setup

```html
<!DOCTYPE html>
<html>
<head>
    <title>Jitsi Meet Integration</title>
    <script src='https://meet.jit.si/external_api.js'></script>
</head>
<body>
    <div id="meet"></div>
    
    <script>
        const domain = 'meet.jit.si';
        const options = {
            roomName: 'MyUniqueRoomName',
            width: '100%',
            height: 700,
            parentNode: document.querySelector('#meet'),
            userInfo: {
                displayName: 'John Doe',
                email: 'john@example.com'
            },
            configOverwrite: {
                startWithAudioMuted: false,
                startWithVideoMuted: false
            }
        };
        
        const api = new JitsiMeetExternalAPI(domain, options);
        
        // Listen for conference joining
        api.addEventListener('videoConferenceJoined', () => {
            console.log('Successfully joined the conference!');
        });
    </script>
</body>
</html>
```

---

## Custom UI Controller

Build custom controls outside the IFrame to control the meeting:

```javascript
class JitsiMeetController {
    constructor(domain, roomName, containerId) {
        this.api = new JitsiMeetExternalAPI(domain, {
            roomName: roomName,
            parentNode: document.querySelector(`#${containerId}`),
            width: '100%',
            height: 600
        });
        
        this.isAudioMuted = false;
        this.isVideoMuted = false;
        this.isSharingScreen = false;
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Track audio/video state
        this.api.addEventListener('audioMuteStatusChanged', ({ muted }) => {
            this.isAudioMuted = muted;
            this.updateUI();
        });
        
        this.api.addEventListener('videoMuteStatusChanged', ({ muted }) => {
            this.isVideoMuted = muted;
            this.updateUI();
        });
        
        this.api.addEventListener('screenSharingStatusChanged', ({ on }) => {
            this.isSharingScreen = on;
            this.updateUI();
        });
    }
    
    // Control methods
    toggleAudio() {
        this.api.executeCommand('toggleAudio');
    }
    
    toggleVideo() {
        this.api.executeCommand('toggleVideo');
    }
    
    toggleScreenShare() {
        this.api.executeCommand('toggleShareScreen');
    }
    
    hangup() {
        this.api.executeCommand('hangup');
    }
    
    setDisplayName(name) {
        this.api.executeCommand('displayName', name);
    }
    
    updateUI() {
        // Update your custom UI buttons here
        const audioBtn = document.querySelector('#audioToggle');
        const videoBtn = document.querySelector('#videoToggle');
        const screenBtn = document.querySelector('#screenToggle');
        
        if (audioBtn) {
            audioBtn.textContent = this.isAudioMuted ? '🔇 Unmute' : '🔊 Mute';
            audioBtn.className = this.isAudioMuted ? 'btn-danger' : 'btn-success';
        }
        
        if (videoBtn) {
            videoBtn.textContent = this.isVideoMuted ? '📹 Start Video' : '🎥 Stop Video';
            videoBtn.className = this.isVideoMuted ? 'btn-danger' : 'btn-success';
        }
        
        if (screenBtn) {
            screenBtn.textContent = this.isSharingScreen ? '🛑 Stop Sharing' : '📺 Share Screen';
        }
    }
    
    dispose() {
        this.api.dispose();
    }
}

// Usage
const controller = new JitsiMeetController('meet.jit.si', 'MyRoom', 'meet-container');

// Hook up custom buttons
document.querySelector('#audioToggle').addEventListener('click', () => {
    controller.toggleAudio();
});

document.querySelector('#videoToggle').addEventListener('click', () => {
    controller.toggleVideo();
});

document.querySelector('#screenToggle').addEventListener('click', () => {
    controller.toggleScreenShare();
});

document.querySelector('#hangupBtn').addEventListener('click', () => {
    controller.hangup();
});
```

**HTML for Custom Controls:**

```html
<div id="meet-container"></div>
<div class="controls">
    <button id="audioToggle" class="btn">🔊 Mute</button>
    <button id="videoToggle" class="btn">🎥 Stop Video</button>
    <button id="screenToggle" class="btn">📺 Share Screen</button>
    <button id="hangupBtn" class="btn btn-danger">📞 Leave</button>
</div>
```

---

## Recording Manager

Manage recording with proper state tracking and error handling:

```javascript
class RecordingManager {
    constructor(api) {
        this.api = api;
        this.isRecording = false;
        this.recordingMode = null;
        
        this.setupListeners();
    }
    
    setupListeners() {
        this.api.addEventListener('recordingStatusChanged', ({ on, mode, error }) => {
            this.isRecording = on;
            this.recordingMode = mode;
            
            if (error) {
                this.handleRecordingError(error);
            } else {
                this.updateRecordingUI(on, mode);
            }
        });
    }
    
    async startLocalRecording() {
        try {
            await this.api.executeCommand('startRecording', {
                mode: 'file'
            });
            console.log('Local recording started');
        } catch (error) {
            console.error('Failed to start local recording:', error);
            alert('Recording failed. Please try again.');
        }
    }
    
    async startDropboxRecording() {
        try {
            await this.api.executeCommand('startRecording', {
                mode: 'file',
                dropboxToken: 'YOUR_DROPBOX_TOKEN'
            });
            console.log('Dropbox recording started');
        } catch (error) {
            console.error('Failed to start Dropbox recording:', error);
        }
    }
    
    async startStreamingToYouTube(streamKey, youtubeId) {
        try {
            await this.api.executeCommand('startRecording', {
                mode: 'stream',
                rtmpStreamKey: streamKey,
                rtmpBroadcastID: youtubeId
            });
            console.log('YouTube streaming started');
        } catch (error) {
            console.error('Failed to start YouTube stream:', error);
        }
    }
    
    async startCustomRTMP(streamUrl, streamKey) {
        try {
            await this.api.executeCommand('startRecording', {
                mode: 'stream',
                rtmpStreamKey: streamKey,
                rtmpBroadcastID: streamUrl
            });
            console.log('RTMP streaming started');
        } catch (error) {
            console.error('Failed to start RTMP stream:', error);
        }
    }
    
    async stopRecording(mode = 'file') {
        try {
            await this.api.executeCommand('stopRecording', mode);
            console.log('Recording stopped');
        } catch (error) {
            console.error('Failed to stop recording:', error);
        }
    }
    
    updateRecordingUI(isRecording, mode) {
        const recordBtn = document.querySelector('#recordBtn');
        
        if (recordBtn) {
            if (isRecording) {
                recordBtn.textContent = '⏹️ Stop Recording';
                recordBtn.className = 'btn btn-danger recording-active';
            } else {
                recordBtn.textContent = '⏺️ Start Recording';
                recordBtn.className = 'btn btn-primary';
            }
        }
        
        // Show recording indicator
        const indicator = document.querySelector('#recordingIndicator');
        if (indicator) {
            indicator.style.display = isRecording ? 'block' : 'none';
            indicator.textContent = `🔴 Recording (${mode})`;
        }
    }
    
    handleRecordingError(error) {
        console.error('Recording error:', error);
        alert(`Recording error: ${error}`);
    }
}

// Usage
const api = new JitsiMeetExternalAPI('meet.jit.si', { roomName: 'RecordingRoom' });
const recordingManager = new RecordingManager(api);

// Start local recording
document.querySelector('#startLocalRecording').addEventListener('click', () => {
    recordingManager.startLocalRecording();
});

// Start YouTube streaming
document.querySelector('#startYouTubeStream').addEventListener('click', () => {
    const streamKey = prompt('Enter YouTube stream key:');
    const broadcastId = prompt('Enter YouTube broadcast ID:');
    if (streamKey && broadcastId) {
        recordingManager.startStreamingToYouTube(streamKey, broadcastId);
    }
});

// Stop recording
document.querySelector('#stopRecording').addEventListener('click', () => {
    recordingManager.stopRecording();
});
```

---

## Participant List Component

Track and display all participants with real-time updates:

```javascript
class ParticipantList {
    constructor(api, containerId) {
        this.api = api;
        this.container = document.querySelector(`#${containerId}`);
        this.participants = new Map();
        
        this.setupListeners();
        this.loadInitialParticipants();
    }
    
    setupListeners() {
        // Participant joined
        this.api.addEventListener('participantJoined', ({ id, displayName }) => {
            this.addParticipant(id, displayName);
        });
        
        // Participant left
        this.api.addEventListener('participantLeft', ({ id }) => {
            this.removeParticipant(id);
        });
        
        // Display name changed
        this.api.addEventListener('displayNameChange', ({ id, displayname }) => {
            this.updateParticipantName(id, displayname);
        });
        
        // Audio mute status
        this.api.addEventListener('audioMuteStatusChanged', ({ muted }) => {
            this.updateLocalAudioStatus(muted);
        });
        
        // Participant audio status (for remote participants)
        this.api.addEventListener('participantRoleChanged', ({ id, role }) => {
            this.updateParticipantRole(id, role);
        });
    }
    
    async loadInitialParticipants() {
        try {
            const count = await this.api.getNumberOfParticipants();
            console.log(`Conference has ${count} participants`);
            
            // Note: There's no direct API to get all participant details,
            // so we rely on events for initial state
        } catch (error) {
            console.error('Failed to get participant count:', error);
        }
    }
    
    addParticipant(id, displayName) {
        this.participants.set(id, {
            id,
            displayName: displayName || 'Guest',
            role: 'participant',
            audioMuted: false
        });
        
        this.render();
        console.log(`Participant joined: ${displayName} (${id})`);
    }
    
    removeParticipant(id) {
        this.participants.delete(id);
        this.render();
        console.log(`Participant left: ${id}`);
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
    
    updateLocalAudioStatus(muted) {
        // Update local participant's audio status
        this.render();
    }
    
    render() {
        if (!this.container) return;
        
        const participantCount = this.participants.size;
        
        let html = `
            <div class="participant-header">
                <h3>Participants (${participantCount})</h3>
            </div>
            <div class="participant-list">
        `;
        
        this.participants.forEach(participant => {
            const roleIcon = participant.role === 'moderator' ? '👑' : '👤';
            const audioIcon = participant.audioMuted ? '🔇' : '🔊';
            
            html += `
                <div class="participant-item" data-id="${participant.id}">
                    <span class="role-icon">${roleIcon}</span>
                    <span class="participant-name">${participant.displayName}</span>
                    <span class="audio-icon">${audioIcon}</span>
                </div>
            `;
        });
        
        html += '</div>';
        this.container.innerHTML = html;
    }
}

// Usage
const api = new JitsiMeetExternalAPI('meet.jit.si', { roomName: 'ParticipantDemo' });
const participantList = new ParticipantList(api, 'participants-container');
```

**HTML:**

```html
<div id="participants-container"></div>
```

**CSS:**

```css
.participant-header {
    padding: 10px;
    background: #f5f5f5;
    border-bottom: 1px solid #ddd;
}

.participant-list {
    max-height: 400px;
    overflow-y: auto;
}

.participant-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
}

.participant-name {
    flex: 1;
    margin: 0 10px;
}

.role-icon, .audio-icon {
    font-size: 18px;
}
```

---

## Device Manager

Manage audio/video devices with a complete UI:

```javascript
class DeviceManager {
    constructor(api) {
        this.api = api;
        this.devices = {
            audioInput: [],
            audioOutput: [],
            videoInput: []
        };
        this.currentDevices = {
            audioInput: null,
            audioOutput: null,
            videoInput: null
        };
        
        this.init();
    }
    
    async init() {
        await this.loadDevices();
        await this.loadCurrentDevices();
        this.render();
    }
    
    async loadDevices() {
        try {
            this.devices = await this.api.getAvailableDevices();
            console.log('Available devices:', this.devices);
        } catch (error) {
            console.error('Failed to get available devices:', error);
        }
    }
    
    async loadCurrentDevices() {
        try {
            this.currentDevices = await this.api.getCurrentDevices();
            console.log('Current devices:', this.currentDevices);
        } catch (error) {
            console.error('Failed to get current devices:', error);
        }
    }
    
    async setAudioInput(deviceId) {
        try {
            await this.api.setAudioInputDevice(deviceId);
            this.currentDevices.audioInput = { deviceId };
            console.log('Audio input device changed');
        } catch (error) {
            console.error('Failed to set audio input:', error);
            alert('Failed to switch microphone. Please try again.');
        }
    }
    
    async setAudioOutput(deviceId) {
        try {
            await this.api.setAudioOutputDevice(deviceId);
            this.currentDevices.audioOutput = { deviceId };
            console.log('Audio output device changed');
        } catch (error) {
            console.error('Failed to set audio output:', error);
            alert('Failed to switch speaker. Please try again.');
        }
    }
    
    async setVideoInput(deviceId) {
        try {
            await this.api.setVideoInputDevice(deviceId);
            this.currentDevices.videoInput = { deviceId };
            console.log('Video input device changed');
        } catch (error) {
            console.error('Failed to set video input:', error);
            alert('Failed to switch camera. Please try again.');
        }
    }
    
    render() {
        this.renderDeviceList('audioInput', 'Microphone', '🎤');
        this.renderDeviceList('audioOutput', 'Speaker', '🔊');
        this.renderDeviceList('videoInput', 'Camera', '📹');
    }
    
    renderDeviceList(type, label, icon) {
        const container = document.querySelector(`#${type}-devices`);
        if (!container) return;
        
        const devices = this.devices[type] || [];
        const currentId = this.currentDevices[type]?.deviceId;
        
        let html = `<h4>${icon} ${label}</h4><select id="${type}-select" class="device-select">`;
        
        devices.forEach(device => {
            const selected = device.deviceId === currentId ? 'selected' : '';
            html += `<option value="${device.deviceId}" ${selected}>${device.label}</option>`;
        });
        
        html += '</select>';
        container.innerHTML = html;
        
        // Add change listener
        const select = container.querySelector('select');
        select.addEventListener('change', (e) => {
            const deviceId = e.target.value;
            
            if (type === 'audioInput') {
                this.setAudioInput(deviceId);
            } else if (type === 'audioOutput') {
                this.setAudioOutput(deviceId);
            } else if (type === 'videoInput') {
                this.setVideoInput(deviceId);
            }
        });
    }
    
    async refreshDevices() {
        await this.loadDevices();
        await this.loadCurrentDevices();
        this.render();
    }
}

// Usage
const api = new JitsiMeetExternalAPI('meet.jit.si', { roomName: 'DeviceDemo' });

api.addEventListener('videoConferenceJoined', async () => {
    const deviceManager = new DeviceManager(api);
    
    // Refresh devices when new device is connected
    navigator.mediaDevices.addEventListener('devicechange', () => {
        deviceManager.refreshDevices();
    });
});
```

**HTML:**

```html
<div class="device-settings">
    <div id="audioInput-devices"></div>
    <div id="audioOutput-devices"></div>
    <div id="videoInput-devices"></div>
    <button onclick="deviceManager.refreshDevices()">🔄 Refresh Devices</button>
</div>
```

---

## Complete Example: Video Conference App

A complete application combining all patterns:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complete Jitsi Integration</title>
    <script src='https://meet.jit.si/external_api.js'></script>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Arial, sans-serif; }
        
        .container { display: flex; height: 100vh; }
        
        .main-area { flex: 1; display: flex; flex-direction: column; }
        
        #meet-container { flex: 1; }
        
        .control-bar {
            display: flex;
            justify-content: center;
            gap: 10px;
            padding: 20px;
            background: #333;
        }
        
        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s;
        }
        
        .btn-primary { background: #007bff; color: white; }
        .btn-success { background: #28a745; color: white; }
        .btn-danger { background: #dc3545; color: white; }
        .btn:hover { opacity: 0.8; }
        
        .sidebar {
            width: 300px;
            background: #f8f9fa;
            border-left: 1px solid #ddd;
            overflow-y: auto;
        }
        
        .sidebar-section {
            padding: 15px;
            border-bottom: 1px solid #ddd;
        }
        
        .sidebar-section h3 {
            margin-bottom: 10px;
            font-size: 18px;
        }
        
        .participant-item {
            display: flex;
            align-items: center;
            padding: 8px;
            background: white;
            margin-bottom: 5px;
            border-radius: 4px;
        }
        
        .participant-name {
            flex: 1;
            margin: 0 10px;
        }
        
        .device-select {
            width: 100%;
            padding: 8px;
            margin: 5px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        
        .recording-indicator {
            position: absolute;
            top: 20px;
            right: 20px;
            background: red;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            font-weight: bold;
            display: none;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        .stats {
            font-size: 12px;
            color: #666;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="main-area">
            <div id="meet-container" style="position: relative;">
                <div id="recordingIndicator" class="recording-indicator">
                    🔴 Recording
                </div>
            </div>
            
            <div class="control-bar">
                <button id="audioToggle" class="btn btn-success">🔊 Mute</button>
                <button id="videoToggle" class="btn btn-success">🎥 Stop Video</button>
                <button id="screenToggle" class="btn btn-primary">📺 Share Screen</button>
                <button id="recordToggle" class="btn btn-primary">⏺️ Record</button>
                <button id="hangupBtn" class="btn btn-danger">📞 Leave</button>
            </div>
        </div>
        
        <div class="sidebar">
            <div class="sidebar-section">
                <h3>Participants (<span id="participantCount">0</span>)</h3>
                <div id="participantList"></div>
            </div>
            
            <div class="sidebar-section">
                <h3>Devices</h3>
                <div id="audioInput-devices"></div>
                <div id="audioOutput-devices"></div>
                <div id="videoInput-devices"></div>
                <button class="btn btn-primary" onclick="app.refreshDevices()" style="margin-top: 10px; width: 100%;">
                    🔄 Refresh
                </button>
            </div>
            
            <div class="sidebar-section">
                <h3>Stats</h3>
                <div id="stats" class="stats"></div>
            </div>
        </div>
    </div>

    <script>
        class JitsiApp {
            constructor(domain, roomName) {
                this.domain = domain;
                this.roomName = roomName;
                this.api = null;
                this.participants = new Map();
                this.isAudioMuted = false;
                this.isVideoMuted = false;
                this.isRecording = false;
                this.devices = { audioInput: [], audioOutput: [], videoInput: [] };
                this.currentDevices = {};
                
                this.init();
            }
            
            init() {
                // Initialize Jitsi Meet API
                this.api = new JitsiMeetExternalAPI(this.domain, {
                    roomName: this.roomName,
                    parentNode: document.querySelector('#meet-container'),
                    width: '100%',
                    height: '100%',
                    userInfo: {
                        displayName: 'User' + Math.floor(Math.random() * 1000),
                        email: 'user@example.com'
                    },
                    configOverwrite: {
                        startWithAudioMuted: false,
                        startWithVideoMuted: false
                    }
                });
                
                this.setupEventListeners();
                this.setupControlButtons();
            }
            
            setupEventListeners() {
                // Conference events
                this.api.addEventListener('videoConferenceJoined', async () => {
                    console.log('Joined conference');
                    await this.loadDevices();
                    this.updateStats();
                });
                
                this.api.addEventListener('videoConferenceLeft', () => {
                    console.log('Left conference');
                });
                
                // Participant events
                this.api.addEventListener('participantJoined', ({ id, displayName }) => {
                    this.addParticipant(id, displayName);
                });
                
                this.api.addEventListener('participantLeft', ({ id }) => {
                    this.removeParticipant(id);
                });
                
                this.api.addEventListener('displayNameChange', ({ id, displayname }) => {
                    this.updateParticipantName(id, displayname);
                });
                
                // Media events
                this.api.addEventListener('audioMuteStatusChanged', ({ muted }) => {
                    this.isAudioMuted = muted;
                    this.updateControlButtons();
                });
                
                this.api.addEventListener('videoMuteStatusChanged', ({ muted }) => {
                    this.isVideoMuted = muted;
                    this.updateControlButtons();
                });
                
                // Recording events
                this.api.addEventListener('recordingStatusChanged', ({ on }) => {
                    this.isRecording = on;
                    this.updateRecordingUI();
                });
            }
            
            setupControlButtons() {
                document.querySelector('#audioToggle').onclick = () => this.toggleAudio();
                document.querySelector('#videoToggle').onclick = () => this.toggleVideo();
                document.querySelector('#screenToggle').onclick = () => this.toggleScreenShare();
                document.querySelector('#recordToggle').onclick = () => this.toggleRecording();
                document.querySelector('#hangupBtn').onclick = () => this.hangup();
            }
            
            toggleAudio() {
                this.api.executeCommand('toggleAudio');
            }
            
            toggleVideo() {
                this.api.executeCommand('toggleVideo');
            }
            
            toggleScreenShare() {
                this.api.executeCommand('toggleShareScreen');
            }
            
            async toggleRecording() {
                if (this.isRecording) {
                    await this.api.executeCommand('stopRecording', 'file');
                } else {
                    await this.api.executeCommand('startRecording', { mode: 'file' });
                }
            }
            
            hangup() {
                this.api.executeCommand('hangup');
            }
            
            updateControlButtons() {
                const audioBtn = document.querySelector('#audioToggle');
                const videoBtn = document.querySelector('#videoToggle');
                
                audioBtn.textContent = this.isAudioMuted ? '🔇 Unmute' : '🔊 Mute';
                audioBtn.className = this.isAudioMuted ? 'btn btn-danger' : 'btn btn-success';
                
                videoBtn.textContent = this.isVideoMuted ? '📹 Start Video' : '🎥 Stop Video';
                videoBtn.className = this.isVideoMuted ? 'btn btn-danger' : 'btn btn-success';
            }
            
            updateRecordingUI() {
                const indicator = document.querySelector('#recordingIndicator');
                const recordBtn = document.querySelector('#recordToggle');
                
                indicator.style.display = this.isRecording ? 'block' : 'none';
                recordBtn.textContent = this.isRecording ? '⏹️ Stop Recording' : '⏺️ Record';
                recordBtn.className = this.isRecording ? 'btn btn-danger' : 'btn btn-primary';
            }
            
            addParticipant(id, displayName) {
                this.participants.set(id, { id, displayName: displayName || 'Guest' });
                this.renderParticipants();
            }
            
            removeParticipant(id) {
                this.participants.delete(id);
                this.renderParticipants();
            }
            
            updateParticipantName(id, displayName) {
                const participant = this.participants.get(id);
                if (participant) {
                    participant.displayName = displayName;
                    this.renderParticipants();
                }
            }
            
            renderParticipants() {
                const container = document.querySelector('#participantList');
                const count = document.querySelector('#participantCount');
                
                count.textContent = this.participants.size;
                
                let html = '';
                this.participants.forEach(p => {
                    html += `
                        <div class="participant-item">
                            <span>👤</span>
                            <span class="participant-name">${p.displayName}</span>
                        </div>
                    `;
                });
                
                container.innerHTML = html || '<p style="color: #999;">No participants yet</p>';
            }
            
            async loadDevices() {
                try {
                    this.devices = await this.api.getAvailableDevices();
                    this.currentDevices = await this.api.getCurrentDevices();
                    this.renderDevices();
                } catch (error) {
                    console.error('Failed to load devices:', error);
                }
            }
            
            renderDevices() {
                this.renderDeviceSelect('audioInput', 'Microphone', '🎤');
                this.renderDeviceSelect('audioOutput', 'Speaker', '🔊');
                this.renderDeviceSelect('videoInput', 'Camera', '📹');
            }
            
            renderDeviceSelect(type, label, icon) {
                const container = document.querySelector(`#${type}-devices`);
                const devices = this.devices[type] || [];
                const currentId = this.currentDevices[type]?.deviceId;
                
                let html = `<label>${icon} ${label}</label><select class="device-select">`;
                devices.forEach(device => {
                    const selected = device.deviceId === currentId ? 'selected' : '';
                    html += `<option value="${device.deviceId}" ${selected}>${device.label}</option>`;
                });
                html += '</select>';
                
                container.innerHTML = html;
                
                container.querySelector('select').onchange = (e) => {
                    const deviceId = e.target.value;
                    if (type === 'audioInput') this.api.setAudioInputDevice(deviceId);
                    else if (type === 'audioOutput') this.api.setAudioOutputDevice(deviceId);
                    else if (type === 'videoInput') this.api.setVideoInputDevice(deviceId);
                };
            }
            
            async refreshDevices() {
                await this.loadDevices();
            }
            
            async updateStats() {
                const count = await this.api.getNumberOfParticipants();
                const statsDiv = document.querySelector('#stats');
                
                statsDiv.innerHTML = `
                    <div>Total Participants: ${count}</div>
                    <div>Audio: ${this.isAudioMuted ? 'Muted' : 'Active'}</div>
                    <div>Video: ${this.isVideoMuted ? 'Off' : 'On'}</div>
                    <div>Recording: ${this.isRecording ? 'Active' : 'Inactive'}</div>
                `;
                
                // Update every 5 seconds
                setTimeout(() => this.updateStats(), 5000);
            }
        }
        
        // Initialize the app
        const app = new JitsiApp('meet.jit.si', 'CompleteExampleRoom');
    </script>
</body>
</html>
```

---

## Next Steps

- **Read the API Reference**: Check out [Commands](iframe-commands.md), [Functions](iframe-functions.md), and [Events](iframe-events.md) for complete API documentation
- **Explore Configuration**: Learn about all available [configuration options](configuration.md)
- **Implement Error Handling**: See the [Error Handling](iframe-functions.md#error-handling) and [Troubleshooting](iframe-commands.md#troubleshooting) sections
- **Review Best Practices**: Check out the performance optimization and security considerations below

## Performance Best Practices

1. **Dispose API properly**: Always call `api.dispose()` before unmounting or leaving the page
2. **Remove event listeners**: Clean up listeners when components unmount
3. **Throttle updates**: Don't update UI on every event if not necessary
4. **Use async/await**: Handle promises properly to avoid blocking
5. **Cache device lists**: Don't query devices on every render

## Security Considerations

1. **Use JWT tokens**: Implement token authentication for production
2. **Validate inputs**: Always validate user inputs before passing to API
3. **Handle errors**: Never expose internal errors to users
4. **Use HTTPS**: Always use secure connections for production
5. **Implement permissions**: Check moderator status before allowing privileged actions

---

**See also:**
- [IFrame API Overview](iframe.md)
- [Commands Reference](iframe-commands.md)
- [Functions Reference](iframe-functions.md)
- [Events Reference](iframe-events.md)
- [Configuration Guide](configuration.md)
