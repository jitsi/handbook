---
id: dev-guide-ljm-api
title: lib-jitsi-meet API (low level)
---

You can use Jitsi Meet API to create Jitsi Meet video conferences with a custom GUI.

## Installation

To embed Jitsi Meet API in your application you need to source the Jitsi Meet API library.
**It should be sourced from your deployment.**

```html
<script src="https://meet.jit.si/libs/lib-jitsi-meet.min.js"></script>
```

Now you can access Jitsi Meet API through the `JitsiMeetJS` global object.

## Getting Started

1. The first thing you must do in order to use Jitsi Meet API is to initialize `JitsiMeetJS` object:

```javascript
JitsiMeetJS.init();
```

2. Then you must create the connection object:


```javascript
var connection = new JitsiMeetJS.JitsiConnection(null, null, options);
```


3. Now we can attach some listeners to the connection object and establish the server connection:

```javascript
connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, onConnectionSuccess);
connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, onConnectionFailed);
connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, disconnect);

connection.connect();
```

4. After you receive the `CONNECTION_ESTABLISHED` event you are to create the `JitsiConference` object and
also you may want to attach listeners for conference events (we are going to add handlers for remote track, conference joined, etc. ):


```javascript
room = connection.initJitsiConference("conference1", confOptions);
room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);
room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, onConferenceJoined);
```

5. You also may want to get your local tracks from the camera and microphone:
```javascript
JitsiMeetJS.createLocalTracks().then(onLocalTracks);
```

NOTE: Adding listeners and creating local streams are not mandatory steps.

6. Then you are ready to create / join a conference :

```javascript
room.join();
```

After that step you are in the conference. Now you can continue with adding some code that will handle the events and manage the conference.

## API Reference

### setReceiverConstraints

Configures the video quality for remote participant streams.

```javascript
conference.setReceiverConstraints(videoConstraints);
```

**Parameters:**

`videoConstraints` - Object containing the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `lastN` | number | Maximum number of video streams to receive |
| `selectedSources` | array | Source names to receive (e.g., `['abc123-v0', 'def456-v0']`) |
| `onStageSources` | array | Source names for participants on stage |
| `defaultConstraints` | object | Default quality for all sources `{ maxHeight: 360 }` |
| `constraints` | object | Per-source quality `{ 'abc123-v0': { maxHeight: 720 } }` |

**Example:**

```javascript
// Basic usage - receive up to 20 videos at 360p
conference.setReceiverConstraints({
    lastN: 20,
    defaultConstraints: { maxHeight: 360 }
});
```

Common `maxHeight` values: `180` (low), `360` (medium), `720` (HD), `1080` (Full HD).

:::warning DEPRECATED
`setReceiverVideoConstraint(resolution)` is deprecated. Use `setReceiverConstraints()` instead.
:::

### setEffect

Applies effects to local tracks (e.g., background blur, virtual backgrounds).

```javascript
track.setEffect(effect);
```

**Parameters:**

`effect` - Object with the following methods, or `undefined` to remove effect:

| Method | Description |
|--------|-------------|
| `isEnabled(track)` | Returns true if effect can be applied to this track |
| `startEffect(stream)` | Processes stream and returns modified MediaStream |
| `stopEffect()` | Cleans up effect resources |

**Example:**

```javascript
const blurEffect = {
    isEnabled: (track) => track.isVideoTrack(),
    startEffect: (stream) => {
        // Apply blur and return processed stream
        return processedStream;
    },
    stopEffect: () => {
        // Release resources
    }
};

localVideoTrack.setEffect(blurEffect);

// Remove effect
localVideoTrack.setEffect(undefined);
```

## Components

See [the full API docs](https://jitsi.github.io/lib-jitsi-meet/).

## Usage

:::note NOTE
JaaS customers, please follow [this example](https://github.com/jitsi/ljm-jaas-example) or check out the [live demo](https://jitsi.github.io/ljm-jaas-example).
:::
