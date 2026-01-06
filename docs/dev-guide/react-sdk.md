---
id: dev-guide-react-sdk
title: React SDK
---

The Jitsi Meet React SDK provides the same user experience as the Jitsi Meet app, in a customizable way which you can embed in your apps.

:::important
React 16 or higher is required.
:::

## Sample application using the SDK
If you want to see how easy integrating the Jitsi Meet React SDK into a React application is, take a look at our [example](https://github.com/jitsi/jitsi-meet-react-sdk/tree/main/example).

## Installation
To access the React SDK modules in your application you need to install it as a dependency:
```bash
npm install @jitsi/react-sdk
```

## Modules
The SDK exposes two components with similar properties, intended for different use-cases.

### JitsiMeeting
To be used with custom domains as-it-is in React projects:
```jsx
<JitsiMeeting
    domain = { YOUR_DOMAIN }
    roomName = "PleaseUseAGoodRoomName"
    configOverwrite = {{
        startWithAudioMuted: true,
        disableModeratorIndicator: true,
        startScreenSharing: true,
        enableEmailInStats: false
    }}
    interfaceConfigOverwrite = {{
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
    }}
    userInfo = {{
        displayName: 'YOUR_USERNAME'
    }}
    onApiReady = { (externalApi) => {
        // here you can attach custom event listeners to the Jitsi Meet External API
        // you can also store it locally to execute commands
    } }
    getIFrameRef = { (iframeRef) => { iframeRef.style.height = '400px'; } }
/>
```
#### Properties specific to the `JitsiMeeting` component
* `domain`: Optional. Field used to retrieve the external_api.js file that initializes the IFrame. If omitted, defaults to `meet.jit.si`.

### JaaSMeeting
To be used with the `8x8.vc` domain as-it-is in React projects:
```jsx
<JaaSMeeting
    appId = { YOUR_APP_ID }
    roomName = "PleaseUseAGoodRoomName"
    jwt = { YOUR_VALID_JWT }
    configOverwrite = {{
        disableLocalVideoFlip: true,
        backgroundAlpha: 0.5
    }}
    interfaceConfigOverwrite = {{
        VIDEO_LAYOUT_FIT: 'nocrop',
        MOBILE_APP_PROMO: false,
        TILE_VIEW_MAX_COLUMNS: 4
    }}
    spinner = { SpinnerView }
    onApiReady = { (externalApi) => { ... } }
/>
```
...or with the `stage.8x8.vc` domain:
```js
<JaaSMeeting
    appId = { YOUR_APP_ID }
    roomName = "PleaseUseAGoodRoomName"
    ...
    useStaging = { true }
/>
```
#### Properties specific to the `JaaSMeeting` component
* `appId`: Required. Provides an isolated context and prefixes the room name.
* `useStaging`: Optional. Tells whether to use the staging environment or not.

## Common properties
The component modules support a similar kind of customization to the Jitsi Meet IFrame. The following properties can be passed down to your instances of `JitsiMeeting` or `JaaSMeeting`.

* `roomName`: Required. The name of the room to join.

* `configOverwrite`: Optional. The JS object with overrides for options defined in the [config.js] file.

* `interfaceConfigOverwrite`: Optional. The JS object with overrides for options defined in the [interface_config.js] file.

* `jwt`: Optional. The [JWT](https://jwt.io/) token.

* `invitees`: Optional. Object arrays that contain information about participants invited to a call.

* `devices`: Optional. Information map about the devices used in a call.

* `userInfo`: Optional. The JS object that contains information about the participant starting or joining the meeting (e.g., email).

* `release`: Optional. Information regarding the `stage.8x8.vc` or `8x8.vc` release version. Expects the following format: `release-1234`.

* `spinner`: Optional. The custom spinner to be displayed while the IFrame is loading.

* `onApiReady`: Optional. The external API reference for events and commands.

* `onReadyToClose`: Optional. The callback for when the meeting is ready to be closed.

* `getIFrameRef`: Optional. The parent node used by the IFrame.

---

## Complete Examples

### Basic Integration

```jsx
import React from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';

function App() {
    return (
        <div style={{ height: '100vh' }}>
            <JitsiMeeting
                domain="meet.jit.si"
                roomName="MyFirstMeeting"
                configOverwrite={{
                    startWithAudioMuted: true,
                    startWithVideoMuted: true
                }}
                userInfo={{
                    displayName: 'John Doe',
                    email: 'john@example.com'
                }}
                getIFrameRef={(iframeRef) => {
                    iframeRef.style.height = '100%';
                }}
            />
        </div>
    );
}

export default App;
```

### With State Management

```jsx
import React, { useState, useCallback } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';

function VideoConference() {
    const [api, setApi] = useState(null);
    const [inMeeting, setInMeeting] = useState(false);
    const [participants, setParticipants] = useState(0);

    const handleApiReady = useCallback((externalApi) => {
        setApi(externalApi);
        
        // Listen for events
        externalApi.addEventListener('videoConferenceJoined', () => {
            setInMeeting(true);
            console.log('Joined the conference');
        });
        
        externalApi.addEventListener('videoConferenceLeft', () => {
            setInMeeting(false);
            console.log('Left the conference');
        });
        
        externalApi.addEventListener('participantJoined', () => {
            externalApi.getNumberOfParticipants().then(count => {
                setParticipants(count);
            });
        });
        
        externalApi.addEventListener('participantLeft', () => {
            externalApi.getNumberOfParticipants().then(count => {
                setParticipants(count);
            });
        });
    }, []);

    const handleReadyToClose = useCallback(() => {
        console.log('Meeting is ready to close');
        setInMeeting(false);
    }, []);

    return (
        <div>
            <h1>Video Conference</h1>
            <div style={{ marginBottom: '20px' }}>
                <p>Status: {inMeeting ? '🟢 In Meeting' : '🔴 Not Connected'}</p>
                <p>Participants: {participants}</p>
            </div>
            <div style={{ height: '600px' }}>
                <JitsiMeeting
                    domain="meet.jit.si"
                    roomName="StatefulMeeting"
                    onApiReady={handleApiReady}
                    onReadyToClose={handleReadyToClose}
                    getIFrameRef={(iframe) => {
                        iframe.style.height = '100%';
                    }}
                />
            </div>
        </div>
    );
}

export default VideoConference;
```

### Custom Controls

```jsx
import React, { useState, useCallback } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';

function MeetingWithControls() {
    const [api, setApi] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(true);

    const handleApiReady = useCallback((externalApi) => {
        setApi(externalApi);
        
        externalApi.addEventListener('audioMuteStatusChanged', ({ muted }) => {
            setIsMuted(muted);
        });
        
        externalApi.addEventListener('videoMuteStatusChanged', ({ muted }) => {
            setIsVideoOn(!muted);
        });
    }, []);

    const toggleAudio = () => {
        if (api) {
            api.executeCommand('toggleAudio');
        }
    };

    const toggleVideo = () => {
        if (api) {
            api.executeCommand('toggleVideo');
        }
    };

    const hangup = () => {
        if (api) {
            api.executeCommand('hangup');
        }
    };

    return (
        <div>
            <div style={{ padding: '20px', background: '#333' }}>
                <button onClick={toggleAudio} style={{ marginRight: '10px' }}>
                    {isMuted ? '🔇 Unmute' : '🎤 Mute'}
                </button>
                <button onClick={toggleVideo} style={{ marginRight: '10px' }}>
                    {isVideoOn ? '📹 Stop Video' : '🎥 Start Video'}
                </button>
                <button onClick={hangup} style={{ background: '#dc3545', color: 'white' }}>
                    📞 Leave
                </button>
            </div>
            <div style={{ height: '600px' }}>
                <JitsiMeeting
                    domain="meet.jit.si"
                    roomName="CustomControls"
                    onApiReady={handleApiReady}
                    configOverwrite={{
                        toolbarButtons: [] // Hide default toolbar
                    }}
                    getIFrameRef={(iframe) => {
                        iframe.style.height = '100%';
                    }}
                />
            </div>
        </div>
    );
}

export default MeetingWithControls;
```

---

## TypeScript Support

### Type Definitions

```typescript
import React, { useState, useCallback } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';

// External API types
interface JitsiMeetExternalAPI {
    executeCommand: (command: string, ...params: any[]) => void;
    addEventListener: (event: string, handler: (...args: any[]) => void) => void;
    removeEventListener: (event: string, handler: (...args: any[]) => void) => void;
    getNumberOfParticipants: () => Promise<number>;
    dispose: () => void;
}

// Component props interface
interface VideoMeetingProps {
    roomName: string;
    userDisplayName: string;
    userEmail?: string;
    onMeetingEnd?: () => void;
}

const VideoMeeting: React.FC<VideoMeetingProps> = ({
    roomName,
    userDisplayName,
    userEmail,
    onMeetingEnd
}) => {
    const [api, setApi] = useState<JitsiMeetExternalAPI | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const handleApiReady = useCallback((externalApi: JitsiMeetExternalAPI) => {
        setApi(externalApi);
        
        externalApi.addEventListener('videoConferenceJoined', () => {
            setIsConnected(true);
        });
        
        externalApi.addEventListener('videoConferenceLeft', () => {
            setIsConnected(false);
            onMeetingEnd?.();
        });
    }, [onMeetingEnd]);

    return (
        <div style={{ height: '100vh' }}>
            <JitsiMeeting
                domain="meet.jit.si"
                roomName={roomName}
                userInfo={{
                    displayName: userDisplayName,
                    email: userEmail
                }}
                onApiReady={handleApiReady}
                getIFrameRef={(iframe: HTMLIFrameElement) => {
                    iframe.style.height = '100%';
                }}
            />
        </div>
    );
};

export default VideoMeeting;
```

### Advanced TypeScript Example

```typescript
import React, { useState, useCallback, useEffect } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';

interface Participant {
    id: string;
    displayName: string;
}

interface MeetingStats {
    duration: number;
    participantCount: number;
    isRecording: boolean;
}

interface AdvancedMeetingProps {
    roomName: string;
    userInfo: {
        displayName: string;
        email: string;
    };
    onStatsUpdate?: (stats: MeetingStats) => void;
}

const AdvancedMeeting: React.FC<AdvancedMeetingProps> = ({
    roomName,
    userInfo,
    onStatsUpdate
}) => {
    const [api, setApi] = useState<any>(null);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [stats, setStats] = useState<MeetingStats>({
        duration: 0,
        participantCount: 0,
        isRecording: false
    });

    const handleApiReady = useCallback((externalApi: any) => {
        setApi(externalApi);
        
        externalApi.addEventListener('participantJoined', 
            ({ id, displayName }: Participant) => {
                setParticipants(prev => [...prev, { id, displayName }]);
            }
        );
        
        externalApi.addEventListener('participantLeft', 
            ({ id }: { id: string }) => {
                setParticipants(prev => prev.filter(p => p.id !== id));
            }
        );
        
        externalApi.addEventListener('recordingStatusChanged', 
            ({ on }: { on: boolean }) => {
                setStats(prev => ({ ...prev, isRecording: on }));
            }
        );
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => {
                const newStats = {
                    ...prev,
                    duration: prev.duration + 1,
                    participantCount: participants.length
                };
                onStatsUpdate?.(newStats);
                return newStats;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [participants, onStatsUpdate]);

    return (
        <div>
            <div style={{ padding: '10px', background: '#f0f0f0' }}>
                <p>Duration: {Math.floor(stats.duration / 60)}m {stats.duration % 60}s</p>
                <p>Participants: {stats.participantCount}</p>
                <p>Recording: {stats.isRecording ? '🔴 On' : '⚫ Off'}</p>
            </div>
            <div style={{ height: '600px' }}>
                <JitsiMeeting
                    domain="meet.jit.si"
                    roomName={roomName}
                    userInfo={userInfo}
                    onApiReady={handleApiReady}
                    getIFrameRef={(iframe: HTMLIFrameElement) => {
                        iframe.style.height = '100%';
                    }}
                />
            </div>
        </div>
    );
};

export default AdvancedMeeting;
```

---

## Custom Hooks

### useJitsiMeet Hook

```jsx
import { useState, useCallback, useEffect } from 'react';

export const useJitsiMeet = () => {
    const [api, setApi] = useState(null);
    const [isInMeeting, setIsInMeeting] = useState(false);
    const [participants, setParticipants] = useState([]);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(true);

    const handleApiReady = useCallback((externalApi) => {
        setApi(externalApi);
        
        // Conference events
        externalApi.addEventListener('videoConferenceJoined', () => {
            setIsInMeeting(true);
        });
        
        externalApi.addEventListener('videoConferenceLeft', () => {
            setIsInMeeting(false);
        });
        
        // Participant events
        externalApi.addEventListener('participantJoined', ({ id, displayName }) => {
            setParticipants(prev => [...prev, { id, displayName }]);
        });
        
        externalApi.addEventListener('participantLeft', ({ id }) => {
            setParticipants(prev => prev.filter(p => p.id !== id));
        });
        
        // Media events
        externalApi.addEventListener('audioMuteStatusChanged', ({ muted }) => {
            setIsMuted(muted);
        });
        
        externalApi.addEventListener('videoMuteStatusChanged', ({ muted }) => {
            setIsVideoOn(!muted);
        });
    }, []);

    const toggleAudio = useCallback(() => {
        if (api) {
            api.executeCommand('toggleAudio');
        }
    }, [api]);

    const toggleVideo = useCallback(() => {
        if (api) {
            api.executeCommand('toggleVideo');
        }
    }, [api]);

    const hangup = useCallback(() => {
        if (api) {
            api.executeCommand('hangup');
        }
    }, [api]);

    const startRecording = useCallback(() => {
        if (api) {
            api.executeCommand('startRecording', { mode: 'file' });
        }
    }, [api]);

    const stopRecording = useCallback(() => {
        if (api) {
            api.executeCommand('stopRecording', 'file');
        }
    }, [api]);

    useEffect(() => {
        return () => {
            if (api) {
                api.dispose();
            }
        };
    }, [api]);

    return {
        handleApiReady,
        isInMeeting,
        participants,
        isMuted,
        isVideoOn,
        toggleAudio,
        toggleVideo,
        hangup,
        startRecording,
        stopRecording
    };
};
```

### Usage of Custom Hook

```jsx
import React from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useJitsiMeet } from './hooks/useJitsiMeet';

function MeetingWithHook() {
    const {
        handleApiReady,
        isInMeeting,
        participants,
        isMuted,
        isVideoOn,
        toggleAudio,
        toggleVideo,
        hangup
    } = useJitsiMeet();

    return (
        <div>
            <div style={{ padding: '20px' }}>
                <h2>{isInMeeting ? '🟢 Connected' : '🔴 Disconnected'}</h2>
                <p>Participants: {participants.length}</p>
                
                <div style={{ marginTop: '10px' }}>
                    <button onClick={toggleAudio}>
                        {isMuted ? 'Unmute' : 'Mute'}
                    </button>
                    <button onClick={toggleVideo}>
                        {isVideoOn ? 'Stop Video' : 'Start Video'}
                    </button>
                    <button onClick={hangup}>Leave</button>
                </div>
            </div>
            
            <div style={{ height: '600px' }}>
                <JitsiMeeting
                    domain="meet.jit.si"
                    roomName="HookExample"
                    onApiReady={handleApiReady}
                    getIFrameRef={(iframe) => {
                        iframe.style.height = '100%';
                    }}
                />
            </div>
        </div>
    );
}

export default MeetingWithHook;
```

---

## Advanced Patterns

### Loading State

```jsx
import React, { useState } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';

function MeetingWithLoading() {
    const [isLoading, setIsLoading] = useState(true);

    const handleApiReady = (api) => {
        setIsLoading(false);
    };

    const CustomSpinner = () => (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            height: '100vh'
        }}>
            <div style={{ textAlign: 'center' }}>
                <div className="spinner"></div>
                <p>Loading meeting...</p>
            </div>
        </div>
    );

    return (
        <div style={{ height: '100vh' }}>
            {isLoading && <CustomSpinner />}
            <JitsiMeeting
                domain="meet.jit.si"
                roomName="LoadingExample"
                onApiReady={handleApiReady}
                spinner={CustomSpinner}
                getIFrameRef={(iframe) => {
                    iframe.style.height = '100%';
                    iframe.style.display = isLoading ? 'none' : 'block';
                }}
            />
        </div>
    );
}

export default MeetingWithLoading;
```

### Router Integration

```jsx
import React from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { JitsiMeeting } from '@jitsi/react-sdk';

function MeetingRoom() {
    const { roomId } = useParams();

    return (
        <div style={{ height: '100vh' }}>
            <JitsiMeeting
                domain="meet.jit.si"
                roomName={roomId}
                userInfo={{
                    displayName: 'Guest User'
                }}
                getIFrameRef={(iframe) => {
                    iframe.style.height = '100%';
                }}
            />
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/meeting/:roomId" element={<MeetingRoom />} />
                <Route path="/" element={<div>Home</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
```

### With Authentication

```jsx
import React, { useEffect, useState } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';

function AuthenticatedMeeting({ user }) {
    const [jwt, setJwt] = useState(null);

    useEffect(() => {
        // Fetch JWT from your backend
        fetch('/api/generate-jwt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                room: 'SecureMeeting',
                user: user.id
            })
        })
        .then(res => res.json())
        .then(data => setJwt(data.jwt))
        .catch(err => console.error('JWT generation failed:', err));
    }, [user]);

    if (!jwt) {
        return <div>Authenticating...</div>;
    }

    return (
        <div style={{ height: '100vh' }}>
            <JitsiMeeting
                domain="your-domain.com"
                roomName="SecureMeeting"
                jwt={jwt}
                userInfo={{
                    displayName: user.name,
                    email: user.email
                }}
                getIFrameRef={(iframe) => {
                    iframe.style.height = '100%';
                }}
            />
        </div>
    );
}

export default AuthenticatedMeeting;
```

---

## Troubleshooting

### Common Issues

#### IFrame Not Loading

**Problem:** Blank screen or stuck on loading

**Solutions:**
1. Check network connection
2. Verify domain is accessible
3. Check browser console for errors
4. Ensure React version is 16+
5. Clear browser cache

```jsx
// Add error boundary
class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Jitsi Meeting Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div>Error loading meeting. Please refresh.</div>;
        }
        return this.props.children;
    }
}

// Wrap component
<ErrorBoundary>
    <JitsiMeeting {...props} />
</ErrorBoundary>
```

#### API Not Ready

**Problem:** Commands not working

**Solution:** Wait for `onApiReady` callback

```jsx
const [api, setApi] = useState(null);
const [isReady, setIsReady] = useState(false);

const handleApiReady = (externalApi) => {
    setApi(externalApi);
    setIsReady(true);
};

// Only execute commands after ready
const muteAudio = () => {
    if (isReady && api) {
        api.executeCommand('toggleAudio');
    }
};
```

#### Memory Leaks

**Problem:** Component not cleaning up

**Solution:** Dispose API in useEffect cleanup

```jsx
useEffect(() => {
    return () => {
        if (api) {
            api.dispose();
        }
    };
}, [api]);
```

---

## Best Practices

### ✅ Do's

1. **Always dispose the API** when component unmounts
2. **Wait for onApiReady** before executing commands
3. **Handle errors** with error boundaries
4. **Use TypeScript** for type safety
5. **Extract reusable logic** into custom hooks
6. **Test on different browsers** before deploying
7. **Implement loading states** for better UX

### ❌ Don'ts

1. **Don't execute commands** before API is ready
2. **Don't forget cleanup** in useEffect
3. **Don't store API in Redux** (causes serialization issues)
4. **Don't hardcode credentials** in client code
5. **Don't ignore browser compatibility**

---

## Performance Tips

1. **Lazy load the component** for faster initial page load:

```jsx
const JitsiMeeting = React.lazy(() => 
    import('@jitsi/react-sdk').then(module => ({ 
        default: module.JitsiMeeting 
    }))
);

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <JitsiMeeting {...props} />
        </Suspense>
    );
}
```

2. **Memoize callbacks** to prevent unnecessary re-renders:

```jsx
const handleApiReady = useCallback((api) => {
    // Setup logic
}, []); // Empty deps = stable function
```

3. **Optimize re-renders** with React.memo:

```jsx
const MeetingComponent = React.memo(({ roomName, userInfo }) => {
    return <JitsiMeeting roomName={roomName} userInfo={userInfo} />;
});
```

---

## Additional Resources

- 📖 **[IFrame API Reference](dev-guide-iframe)** - Complete API documentation
- 🎯 **[Quick Start Guide](iframe-quick-start)** - Ready-to-use examples
- 🔧 **[Configuration Options](dev-guide-configuration)** - All available configs
- 💬 **[GitHub Repository](https://github.com/jitsi/jitsi-meet-react-sdk)** - Source code
- 🐛 **[Report Issues](https://github.com/jitsi/jitsi-meet-react-sdk/issues)** - Bug tracker

[config.js]: https://github.com/jitsi/jitsi-meet/blob/master/config.js
[interface_config.js]: https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js
