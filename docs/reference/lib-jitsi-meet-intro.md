---
id: lib-jitsi-meet-intro
title: Jitsi Meet JS API Reference
sidebar_label: Introduction
---

Jitsi Meet JS can be used to create Jitsi Meet video conferences with custom GUI.

## Installation


To embed Jitsi Meet API in your application you need to add Jitsi Meet API library

```html
<script src="https://meet.jit.si/libs/lib-jitsi-meet.min.js"></script>
```

Now you can access Jitsi Meet API trough the ```JitsiMeetJS``` global object.

## Quick start

1. The first thing you must do in order to use Jitsi Meet API is to initialize `JitsiMeetJS` object:
```javascript
JitsiMeetJS.init();
```
2. Then you must create the connection object:
```javascript
let connection = new JitsiMeetJS.JitsiConnection(null, null, options);
```
3. Now we can attach some listeners to the connection object and establish the server connection:
```javascript
connection.addEventListener(
    JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, 
    event => {
        // Do something here when connection is established
    }
);
connection.addEventListener(
    JitsiMeetJS.events.connection.CONNECTION_FAILED, 
    event => {
        // Do something here when connection fails
    }
);
connection.addEventListener(
    JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, 
    event => {
        // Do something here when disconnected
    }
);

connection.connect();
```

4. After you receive the `CONNECTION_ESTABLISHED` event you are to create the `JitsiConference` object and
also you may want to attach listeners for conference events (we are going to add handlers for remote track, conference joined, etc. ):


```javascript
let room = connection.initJitsiConference("my-custom-conference", conferenceOptions);
room.on(
    JitsiMeetJS.events.conference.TRACK_ADDED, 
    event => { 
        /* When tracks are added */ 
    });
room.on(
    JitsiMeetJS.events.conference.CONFERENCE_JOINED, 
    event => { 
        /* When joining the conference */ 
    });
```

5. You also may want to get your local tracks from the camera and microphone:
```javascript
JitsiMeetJS.createLocalTracks().then(onLocalTracks);
```

>🥽 **Note:** Adding listeners and creating local streams are not mandatory steps.


6. Then you are ready to create / join a conference :

```javascript
room.join();
```

Now, you are in the conference. You can continue adding code that will handle various events and manage the conference 🤩

## Components
Jitsi Meet API has the following components:
1. [JitsiMeetJS](/handbook/docs/api-reference/lib-jitsi-meet-reference#jitsi-meet-js)
1. [JitsiConnection](/handbook/docs/api-reference/lib-jitsi-meet-reference#jitsiconnection-1)
1. [JitsiConference](/handbook/docs/api-reference/lib-jitsi-meet-reference#jitsiconference)
1. [JitsiTrack](/handbook/docs/api-reference/lib-jitsi-meet-reference#jitsitrack)
1. [JitsiTrackError](/handbook/docs/api-reference/lib-jitsi-meet-reference#jitsitrackerror)
