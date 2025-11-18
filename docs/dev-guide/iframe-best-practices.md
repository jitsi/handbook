---
id: iframe-best-practices
title: IFrame API Best Practices
---

This guide provides best practices, performance optimization tips, and security considerations for integrating the Jitsi Meet IFrame API.

## Table of Contents

- [Performance Optimization](#performance-optimization)
- [Memory Management](#memory-management)
- [Error Handling](#error-handling)
- [Security Best Practices](#security-best-practices)
- [UI/UX Considerations](#uiux-considerations)
- [Testing Strategies](#testing-strategies)
- [Production Deployment](#production-deployment)

---

## Performance Optimization

### 1. Efficient Event Handling

**❌ Bad Practice:**
```javascript
// Updating UI on every event without throttling
api.addEventListener('audioLevelChanged', ({ level }) => {
    // This fires very frequently!
    document.querySelector('#audioLevel').style.width = (level * 100) + '%';
    // Causes excessive DOM manipulation
});
```

**✅ Good Practice:**
```javascript
// Throttle frequent events
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func(...args);
        }
    };
}

const updateAudioLevel = throttle(({ level }) => {
    document.querySelector('#audioLevel').style.width = (level * 100) + '%';
}, 100); // Update at most every 100ms

api.addEventListener('audioLevelChanged', updateAudioLevel);
```

---

### 2. Batch DOM Updates

**❌ Bad Practice:**
```javascript
// Multiple DOM updates for each participant
api.addEventListener('participantJoined', ({ id, displayName }) => {
    const list = document.querySelector('#participants');
    list.innerHTML += `<div>${displayName}</div>`; // Triggers reflow
});
```

**✅ Good Practice:**
```javascript
// Batch updates using DocumentFragment
class ParticipantList {
    constructor() {
        this.participants = new Map();
        this.updateScheduled = false;
    }
    
    addParticipant(id, displayName) {
        this.participants.set(id, displayName);
        this.scheduleUpdate();
    }
    
    scheduleUpdate() {
        if (!this.updateScheduled) {
            this.updateScheduled = true;
            requestAnimationFrame(() => {
                this.render();
                this.updateScheduled = false;
            });
        }
    }
    
    render() {
        const container = document.querySelector('#participants');
        const fragment = document.createDocumentFragment();
        
        this.participants.forEach((name, id) => {
            const div = document.createElement('div');
            div.textContent = name;
            div.dataset.id = id;
            fragment.appendChild(div);
        });
        
        container.innerHTML = '';
        container.appendChild(fragment);
    }
}
```

---

### 3. Optimize Device Queries

**❌ Bad Practice:**
```javascript
// Querying devices repeatedly
setInterval(async () => {
    const devices = await api.getAvailableDevices();
    renderDevices(devices);
}, 1000); // Excessive polling
```

**✅ Good Practice:**
```javascript
// Cache devices and update only on change
class DeviceCache {
    constructor(api) {
        this.api = api;
        this.cachedDevices = null;
        this.setupListeners();
    }
    
    setupListeners() {
        // Update cache only when devices change
        navigator.mediaDevices.addEventListener('devicechange', async () => {
            console.log('Device change detected');
            await this.refreshDevices();
        });
    }
    
    async refreshDevices() {
        try {
            this.cachedDevices = await this.api.getAvailableDevices();
            this.notifyListeners();
        } catch (error) {
            console.error('Failed to refresh devices:', error);
        }
    }
    
    async getDevices() {
        if (!this.cachedDevices) {
            await this.refreshDevices();
        }
        return this.cachedDevices;
    }
}

// Usage
const deviceCache = new DeviceCache(api);
const devices = await deviceCache.getDevices(); // Uses cache
```

---

### 4. Lazy Load Features

**✅ Good Practice:**
```javascript
// Load features only when needed
class FeatureManager {
    constructor(api) {
        this.api = api;
        this.recordingManager = null;
        this.breakoutRoomManager = null;
    }
    
    getRecordingManager() {
        if (!this.recordingManager) {
            // Lazy initialize only when first used
            this.recordingManager = new RecordingManager(this.api);
        }
        return this.recordingManager;
    }
    
    getBreakoutRoomManager() {
        if (!this.breakoutRoomManager) {
            this.breakoutRoomManager = new BreakoutRoomManager(this.api);
        }
        return this.breakoutRoomManager;
    }
}

// Usage
const features = new FeatureManager(api);

// Only loaded when user clicks record
document.querySelector('#recordBtn').onclick = () => {
    features.getRecordingManager().startRecording();
};
```

---

### 5. Debounce User Input

**✅ Good Practice:**
```javascript
// Debounce display name changes
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

const updateDisplayName = debounce((name) => {
    api.executeCommand('displayName', name);
}, 500);

document.querySelector('#nameInput').addEventListener('input', (e) => {
    updateDisplayName(e.target.value);
});
```

---

## Memory Management

### 1. Proper Cleanup

**❌ Bad Practice:**
```javascript
// Memory leak: listeners never removed
function initMeeting() {
    const api = new JitsiMeetExternalAPI('meet.jit.si', { roomName: 'test' });
    
    api.addEventListener('participantJoined', (data) => {
        // Handler never removed
    });
    
    // No cleanup when meeting ends
}
```

**✅ Good Practice:**
```javascript
// Proper cleanup with listener management
class MeetingController {
    constructor(domain, roomName) {
        this.api = new JitsiMeetExternalAPI(domain, { roomName });
        this.listeners = new Map();
        this.intervals = [];
        this.timeouts = [];
    }
    
    addEventListener(event, handler) {
        this.api.addEventListener(event, handler);
        
        // Track for cleanup
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(handler);
    }
    
    setInterval(callback, delay) {
        const id = setInterval(callback, delay);
        this.intervals.push(id);
        return id;
    }
    
    setTimeout(callback, delay) {
        const id = setTimeout(callback, delay);
        this.timeouts.push(id);
        return id;
    }
    
    cleanup() {
        // Remove all event listeners
        this.listeners.forEach((handlers, event) => {
            handlers.forEach(handler => {
                this.api.removeEventListener(event, handler);
            });
        });
        this.listeners.clear();
        
        // Clear all intervals
        this.intervals.forEach(id => clearInterval(id));
        this.intervals = [];
        
        // Clear all timeouts
        this.timeouts.forEach(id => clearTimeout(id));
        this.timeouts = [];
        
        // Dispose API
        if (this.api) {
            this.api.dispose();
            this.api = null;
        }
    }
}

// Usage
const meeting = new MeetingController('meet.jit.si', 'test');

// Cleanup when done
window.addEventListener('beforeunload', () => {
    meeting.cleanup();
});
```

---

### 2. Avoid Circular References

**✅ Good Practice:**
```javascript
// Use WeakMap to avoid memory leaks
class ParticipantTracker {
    constructor(api) {
        this.api = api;
        // WeakMap allows garbage collection
        this.participantData = new WeakMap();
    }
    
    trackParticipant(participant) {
        this.participantData.set(participant, {
            joinedAt: Date.now(),
            // Additional tracking data
        });
    }
    
    // Participant objects can be garbage collected
    // when no longer referenced elsewhere
}
```

---

### 3. Limit Data Storage

**✅ Good Practice:**
```javascript
// Limit history to prevent unbounded growth
class ChatHistory {
    constructor(maxMessages = 100) {
        this.messages = [];
        this.maxMessages = maxMessages;
    }
    
    addMessage(message) {
        this.messages.push(message);
        
        // Trim old messages
        if (this.messages.length > this.maxMessages) {
            this.messages.shift();
        }
    }
    
    clear() {
        this.messages = [];
    }
}
```

---

## Error Handling

### 1. Graceful Degradation

**✅ Good Practice:**
```javascript
// Handle feature unavailability gracefully
class FeatureDetector {
    static async checkRecordingSupport(api) {
        try {
            // Try to start recording in test mode
            await api.executeCommand('startRecording', { mode: 'file' });
            await api.executeCommand('stopRecording', 'file');
            return true;
        } catch (error) {
            console.warn('Recording not supported:', error);
            return false;
        }
    }
    
    static checkBreakoutRoomSupport(api) {
        // Check if breakout room commands exist
        return typeof api.executeCommand === 'function';
    }
}

// Usage
api.addEventListener('videoConferenceJoined', async () => {
    const hasRecording = await FeatureDetector.checkRecordingSupport(api);
    
    if (hasRecording) {
        document.querySelector('#recordBtn').style.display = 'block';
    } else {
        console.warn('Recording disabled: Feature not available');
    }
});
```

---

### 2. User-Friendly Error Messages

**✅ Good Practice:**
```javascript
// Map technical errors to user-friendly messages
class ErrorHandler {
    static getErrorMessage(error) {
        const errorMap = {
            'NotAllowedError': 'Please grant camera and microphone permissions',
            'NotFoundError': 'No camera or microphone found',
            'NotReadableError': 'Camera or microphone is already in use',
            'OverconstrainedError': 'Device does not meet requirements',
            'SecurityError': 'Permission denied for security reasons',
            'TypeError': 'Invalid device selected'
        };
        
        return errorMap[error.name] || 'An unexpected error occurred. Please try again.';
    }
    
    static async handleDeviceError(error, operation) {
        const message = this.getErrorMessage(error);
        
        console.error(`Device error during ${operation}:`, error);
        
        // Show user-friendly message
        this.showNotification(message, 'error');
        
        // Log to error tracking service
        this.logError({
            type: 'device_error',
            operation,
            error: error.name,
            message: error.message
        });
    }
    
    static showNotification(message, type) {
        // Show toast/snackbar notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.remove(), 5000);
    }
    
    static logError(errorData) {
        // Send to your error tracking service
        // e.g., Sentry, LogRocket, etc.
        if (window.errorTracker) {
            window.errorTracker.log(errorData);
        }
    }
}

// Usage
async function switchCamera(deviceId) {
    try {
        await api.setVideoInputDevice(deviceId);
    } catch (error) {
        await ErrorHandler.handleDeviceError(error, 'camera_switch');
    }
}
```

---

### 3. Retry Logic

**✅ Good Practice:**
```javascript
// Retry failed operations with exponential backoff
async function retryWithBackoff(operation, maxRetries = 3, baseDelay = 1000) {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            return await operation();
        } catch (error) {
            if (attempt === maxRetries - 1) {
                // Last attempt failed
                throw error;
            }
            
            // Exponential backoff
            const delay = baseDelay * Math.pow(2, attempt);
            console.log(`Attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Usage
try {
    await retryWithBackoff(async () => {
        return await api.getAvailableDevices();
    });
} catch (error) {
    console.error('Failed after multiple retries:', error);
    ErrorHandler.handleDeviceError(error, 'get_devices');
}
```

---

## Security Best Practices

### 1. Use JWT Authentication

**✅ Good Practice:**
```javascript
// Generate JWT token server-side
async function createSecureMeeting(roomName, userInfo) {
    // Request JWT from your backend
    const response = await fetch('/api/generate-jwt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            room: roomName,
            user: userInfo
        })
    });
    
    const { jwt } = await response.json();
    
    // Initialize with JWT
    const api = new JitsiMeetExternalAPI('your-domain.com', {
        roomName,
        jwt,
        userInfo
    });
    
    return api;
}

// Usage
const api = await createSecureMeeting('secure-room', {
    displayName: 'John Doe',
    email: 'john@example.com'
});
```

---

### 2. Validate User Input

**✅ Good Practice:**
```javascript
// Validate and sanitize inputs
class InputValidator {
    static validateRoomName(roomName) {
        // Alphanumeric and dashes only
        const regex = /^[a-zA-Z0-9-_]+$/;
        
        if (!roomName || typeof roomName !== 'string') {
            throw new Error('Room name is required');
        }
        
        if (roomName.length < 3 || roomName.length > 50) {
            throw new Error('Room name must be 3-50 characters');
        }
        
        if (!regex.test(roomName)) {
            throw new Error('Room name contains invalid characters');
        }
        
        return roomName.toLowerCase();
    }
    
    static sanitizeDisplayName(name) {
        if (!name || typeof name !== 'string') {
            return 'Guest';
        }
        
        // Remove HTML tags
        const sanitized = name.replace(/<[^>]*>/g, '');
        
        // Limit length
        return sanitized.slice(0, 50);
    }
}

// Usage
try {
    const roomName = InputValidator.validateRoomName(userInput);
    const displayName = InputValidator.sanitizeDisplayName(userName);
    
    const api = new JitsiMeetExternalAPI('meet.jit.si', {
        roomName,
        userInfo: { displayName }
    });
} catch (error) {
    console.error('Validation error:', error.message);
    showError(error.message);
}
```

---

### 3. Implement Rate Limiting

**✅ Good Practice:**
```javascript
// Rate limit API calls
class RateLimiter {
    constructor(maxCalls, timeWindow) {
        this.maxCalls = maxCalls;
        this.timeWindow = timeWindow;
        this.calls = [];
    }
    
    async execute(fn) {
        const now = Date.now();
        
        // Remove old calls outside time window
        this.calls = this.calls.filter(time => now - time < this.timeWindow);
        
        if (this.calls.length >= this.maxCalls) {
            const oldestCall = this.calls[0];
            const waitTime = this.timeWindow - (now - oldestCall);
            throw new Error(`Rate limit exceeded. Please wait ${Math.ceil(waitTime / 1000)}s`);
        }
        
        this.calls.push(now);
        return await fn();
    }
}

// Usage: Max 10 device switches per minute
const deviceSwitchLimiter = new RateLimiter(10, 60000);

async function switchDevice(deviceId) {
    try {
        await deviceSwitchLimiter.execute(async () => {
            await api.setVideoInputDevice(deviceId);
        });
    } catch (error) {
        console.error('Rate limit error:', error.message);
        showError(error.message);
    }
}
```

---

### 4. Secure Configuration

**✅ Good Practice:**
```javascript
// Secure configuration defaults
const secureConfig = {
    // Disable features that could be abused
    configOverwrite: {
        // Require moderator for recording
        fileRecordingsEnabled: false,
        dropboxFileRecordingsEnabled: false,
        
        // Disable lobby bypass
        enableInsecureRoomNameWarning: true,
        
        // Limit participant actions
        disableRemoteMute: false,
        
        // Enable lobby for security
        enableLobby: true,
        
        // Hide sensitive info
        hideDisplayName: false,
        
        // Disable risky features
        disableDeepLinking: true
    },
    
    interfaceConfigOverwrite: {
        // Hide potentially sensitive UI
        HIDE_INVITE_MORE_HEADER: false,
        
        // Disable direct links
        ENABLE_DIAL_OUT: false
    }
};

// Merge with user config
function createSecureAPI(domain, roomName, userConfig = {}) {
    const config = {
        ...secureConfig,
        ...userConfig,
        roomName,
        configOverwrite: {
            ...secureConfig.configOverwrite,
            ...userConfig.configOverwrite
        }
    };
    
    return new JitsiMeetExternalAPI(domain, config);
}
```

---

## UI/UX Considerations

### 1. Loading States

**✅ Good Practice:**
```javascript
// Show appropriate loading states
class UIStateManager {
    constructor() {
        this.state = 'loading'; // loading, ready, error, ended
    }
    
    showLoading() {
        this.state = 'loading';
        this.render();
    }
    
    showReady() {
        this.state = 'ready';
        this.render();
    }
    
    showError(message) {
        this.state = 'error';
        this.errorMessage = message;
        this.render();
    }
    
    render() {
        const container = document.querySelector('#meeting-container');
        
        switch (this.state) {
            case 'loading':
                container.innerHTML = `
                    <div class="loading-state">
                        <div class="spinner"></div>
                        <p>Connecting to meeting...</p>
                    </div>
                `;
                break;
                
            case 'ready':
                container.innerHTML = `
                    <div id="meet"></div>
                    <div id="controls"></div>
                `;
                break;
                
            case 'error':
                container.innerHTML = `
                    <div class="error-state">
                        <p>${this.errorMessage}</p>
                        <button onclick="location.reload()">Try Again</button>
                    </div>
                `;
                break;
                
            case 'ended':
                container.innerHTML = `
                    <div class="ended-state">
                        <p>Meeting ended</p>
                        <button onclick="location.href='/'">Back to Home</button>
                    </div>
                `;
                break;
        }
    }
}

// Usage
const uiState = new UIStateManager();
uiState.showLoading();

api.addEventListener('videoConferenceJoined', () => {
    uiState.showReady();
});

api.addEventListener('videoConferenceLeft', () => {
    uiState.state = 'ended';
    uiState.render();
});
```

---

### 2. Responsive Design

**✅ Good Practice:**
```javascript
// Adapt to different screen sizes
class ResponsiveLayout {
    constructor(api) {
        this.api = api;
        this.setupResponsive();
    }
    
    setupResponsive() {
        // Initial setup
        this.adjustLayout();
        
        // Listen for resize
        window.addEventListener('resize', () => this.adjustLayout());
        
        // Listen for orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.adjustLayout(), 100);
        });
    }
    
    adjustLayout() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        if (width < 768) {
            // Mobile layout
            this.applyMobileLayout();
        } else if (width < 1024) {
            // Tablet layout
            this.applyTabletLayout();
        } else {
            // Desktop layout
            this.applyDesktopLayout();
        }
    }
    
    applyMobileLayout() {
        // Stack controls vertically
        // Hide participant list
        // Simplify toolbar
        this.api.executeCommand('setTileView', true);
    }
    
    applyTabletLayout() {
        // Show participant list as overlay
        // Full toolbar
    }
    
    applyDesktopLayout() {
        // Show sidebar with participants
        // Full feature set
    }
}
```

---

### 3. Accessibility

**✅ Good Practice:**
```javascript
// Ensure accessibility
class AccessibilityManager {
    constructor(api) {
        this.api = api;
        this.setupAccessibility();
    }
    
    setupAccessibility() {
        // Add ARIA labels
        this.addAriaLabels();
        
        // Keyboard shortcuts
        this.setupKeyboardShortcuts();
        
        // Screen reader announcements
        this.setupAnnouncements();
    }
    
    addAriaLabels() {
        const controls = {
            '#audioToggle': 'Toggle microphone',
            '#videoToggle': 'Toggle camera',
            '#screenToggle': 'Share screen',
            '#hangupBtn': 'Leave meeting'
        };
        
        Object.entries(controls).forEach(([selector, label]) => {
            const element = document.querySelector(selector);
            if (element) {
                element.setAttribute('aria-label', label);
                element.setAttribute('role', 'button');
            }
        });
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + D: Toggle audio
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault();
                this.api.executeCommand('toggleAudio');
                this.announce('Microphone toggled');
            }
            
            // Ctrl/Cmd + E: Toggle video
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                this.api.executeCommand('toggleVideo');
                this.announce('Camera toggled');
            }
        });
    }
    
    announce(message) {
        // Create ARIA live region for screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => announcement.remove(), 1000);
    }
}
```

---

## Testing Strategies

### 1. Unit Testing

**✅ Good Practice:**
```javascript
// Mock API for testing
class MockJitsiAPI {
    constructor() {
        this.listeners = new Map();
        this.commands = [];
    }
    
    addEventListener(event, handler) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(handler);
    }
    
    removeEventListener(event, handler) {
        const handlers = this.listeners.get(event);
        if (handlers) {
            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    }
    
    executeCommand(command, ...params) {
        this.commands.push({ command, params });
        return Promise.resolve();
    }
    
    // Simulate events for testing
    triggerEvent(event, data) {
        const handlers = this.listeners.get(event);
        if (handlers) {
            handlers.forEach(handler => handler(data));
        }
    }
    
    dispose() {
        this.listeners.clear();
        this.commands = [];
    }
}

// Test example
function testParticipantTracking() {
    const mockAPI = new MockJitsiAPI();
    const tracker = new ParticipantTracker(mockAPI);
    
    // Simulate participant joining
    mockAPI.triggerEvent('participantJoined', {
        id: 'test-123',
        displayName: 'Test User'
    });
    
    // Assert participant was added
    console.assert(tracker.participants.has('test-123'), 'Participant should be tracked');
    
    // Cleanup
    mockAPI.dispose();
}
```

---

### 2. Integration Testing

**✅ Good Practice:**
```javascript
// Test real integration with timeouts
async function testRealIntegration() {
    const testRoom = 'test-' + Date.now();
    
    try {
        // Create API
        const api = new JitsiMeetExternalAPI('meet.jit.si', {
            roomName: testRoom,
            parentNode: document.querySelector('#test-container')
        });
        
        // Wait for join with timeout
        await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Join timeout'));
            }, 10000);
            
            api.addEventListener('videoConferenceJoined', () => {
                clearTimeout(timeout);
                resolve();
            });
        });
        
        console.log('✓ Join successful');
        
        // Test commands
        await api.executeCommand('displayName', 'Test User');
        console.log('✓ Display name set');
        
        // Cleanup
        api.dispose();
        console.log('✓ Cleanup successful');
        
    } catch (error) {
        console.error('✗ Test failed:', error);
        throw error;
    }
}
```

---

## Production Deployment

### 1. Error Monitoring

**✅ Good Practice:**
```javascript
// Integrate error monitoring
class ProductionErrorHandler {
    static init(config) {
        this.config = config;
        
        // Catch unhandled errors
        window.addEventListener('error', (event) => {
            this.logError({
                type: 'unhandled_error',
                message: event.message,
                filename: event.filename,
                line: event.lineno,
                column: event.colno,
                error: event.error
            });
        });
        
        // Catch unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.logError({
                type: 'unhandled_rejection',
                reason: event.reason
            });
        });
    }
    
    static logError(errorData) {
        // Add context
        const enriched = {
            ...errorData,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
            userId: this.config.userId,
            roomName: this.config.roomName
        };
        
        // Send to monitoring service
        fetch(this.config.errorEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(enriched)
        }).catch(console.error);
        
        // Also log to console in development
        if (this.config.environment === 'development') {
            console.error('Error logged:', enriched);
        }
    }
}

// Initialize
ProductionErrorHandler.init({
    errorEndpoint: '/api/errors',
    userId: currentUser.id,
    roomName: currentRoom,
    environment: process.env.NODE_ENV
});
```

---

### 2. Performance Monitoring

**✅ Good Practice:**
```javascript
// Monitor performance metrics
class PerformanceMonitor {
    static trackMeeting(api, roomName) {
        const metrics = {
            roomName,
            joinTime: null,
            leaveTime: null,
            duration: null,
            events: []
        };
        
        // Track join time
        const joinStart = Date.now();
        api.addEventListener('videoConferenceJoined', () => {
            metrics.joinTime = Date.now() - joinStart;
            console.log(`Join took ${metrics.joinTime}ms`);
            
            this.sendMetric('meeting_join', { duration: metrics.joinTime });
        });
        
        // Track meeting duration
        api.addEventListener('videoConferenceLeft', () => {
            metrics.leaveTime = Date.now();
            metrics.duration = metrics.leaveTime - (joinStart + metrics.joinTime);
            
            this.sendMetric('meeting_duration', {
                duration: metrics.duration,
                events: metrics.events.length
            });
        });
        
        // Track events
        ['participantJoined', 'participantLeft', 'recordingStatusChanged'].forEach(event => {
            api.addEventListener(event, () => {
                metrics.events.push({ event, timestamp: Date.now() });
            });
        });
    }
    
    static sendMetric(name, data) {
        // Send to analytics service
        if (window.analytics) {
            window.analytics.track(name, data);
        }
    }
}

// Usage
PerformanceMonitor.trackMeeting(api, roomName);
```

---

### 3. Feature Flags

**✅ Good Practice:**
```javascript
// Use feature flags for gradual rollout
class FeatureFlags {
    static flags = {
        breakoutRooms: false,
        transcription: false,
        advancedRecording: true
    };
    
    static async loadFlags(userId) {
        try {
            const response = await fetch(`/api/feature-flags/${userId}`);
            const flags = await response.json();
            this.flags = { ...this.flags, ...flags };
        } catch (error) {
            console.error('Failed to load feature flags:', error);
        }
    }
    
    static isEnabled(feature) {
        return this.flags[feature] === true;
    }
}

// Usage
await FeatureFlags.loadFlags(currentUser.id);

if (FeatureFlags.isEnabled('breakoutRooms')) {
    showBreakoutRoomUI();
}

if (FeatureFlags.isEnabled('transcription')) {
    enableTranscriptionOption();
}
```

---

## Summary Checklist

### Performance ✅
- [ ] Throttle/debounce frequent events
- [ ] Batch DOM updates
- [ ] Cache device queries
- [ ] Lazy load features
- [ ] Use requestAnimationFrame for animations

### Memory ✅
- [ ] Remove event listeners on cleanup
- [ ] Clear intervals and timeouts
- [ ] Call api.dispose() before unmount
- [ ] Limit data storage (arrays, maps)
- [ ] Avoid circular references

### Error Handling ✅
- [ ] Handle all promise rejections
- [ ] Provide user-friendly error messages
- [ ] Implement retry logic for transient failures
- [ ] Log errors to monitoring service
- [ ] Gracefully degrade when features unavailable

### Security ✅
- [ ] Use JWT authentication in production
- [ ] Validate and sanitize all inputs
- [ ] Implement rate limiting
- [ ] Use secure configuration defaults
- [ ] Keep API version updated

### UX ✅
- [ ] Show loading states
- [ ] Implement responsive design
- [ ] Add accessibility features (ARIA, keyboard shortcuts)
- [ ] Provide clear feedback for actions
- [ ] Test on multiple devices and browsers

### Production ✅
- [ ] Set up error monitoring
- [ ] Track performance metrics
- [ ] Use feature flags for new features
- [ ] Write integration tests
- [ ] Document your integration

---

**See also:**
- [Quick Start Guide](iframe-quick-start.md)
- [Workflows & Diagrams](iframe-workflows.md)
- [Migration Guide](iframe-migration-guide.md)
- [Commands Reference](iframe-commands.md)
- [Functions Reference](iframe-functions.md)
- [Events Reference](iframe-events.md)
