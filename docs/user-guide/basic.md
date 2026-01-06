---
id: user-guide-basic
title: User Guide (Basic Features)
sidebar_label: Basic Features
---

This guide covers the essential features and controls you'll use in every Jitsi Meet session.

## Getting Started

### Joining a Meeting

1. **Click the meeting link** you received (e.g., `https://meet.jit.si/RoomName`)
2. **Enter your name** in the pre-join screen
3. **Check your camera and microphone** preview
4. **Click "Join meeting"**

:::tip
You can join meetings without installing any app - Jitsi works directly in your web browser!
:::

---

## Main Interface Overview

When you join a meeting, you'll see:

```
┌─────────────────────────────────────────────────────┐
│  [🔙] Room Name                    [⚙️] [👥] [💬]   │  ← Top Bar
├─────────────────────────────────────────────────────┤
│                                                     │
│                                                     │
│              Main Video Area                        │  ← Active Speaker
│           (Active Speaker View)                     │
│                                                     │
│                                                     │
├─────────────────────────────────────────────────────┤
│  [👤] [👤] [👤] [👤] [👤] [👤] [👤] [👤]          │  ← Filmstrip
├─────────────────────────────────────────────────────┤
│    [🎤] [🎥] [📤] [💬] [👥] [⋮] [📞]               │  ← Control Bar
└─────────────────────────────────────────────────────┘
```

### Interface Components

1. **Top Bar**: Meeting name, settings, participants, and chat icons
2. **Main Video Area**: Shows the active speaker or shared screen
3. **Filmstrip**: Thumbnails of all participants
4. **Control Bar**: Primary meeting controls (always visible)

---

## Essential Controls

### Audio & Video Controls

#### Microphone Control 🎤
- **Click the microphone icon** to mute/unmute your audio
- **Red icon = muted** (others can't hear you)
- **Green icon = unmuted** (you're live)
- **Keyboard shortcut**: `M` key

```
Muted:   [🔇]  (Red)
Unmuted: [🎤]  (Green)
```

**Tips:**
- Always mute when not speaking in large meetings
- Unmute temporarily by holding the spacebar (push-to-talk)
- Your microphone status shows in your thumbnail

#### Camera Control 🎥
- **Click the camera icon** to turn video on/off
- **Red icon = camera off** (others see your avatar)
- **Blue icon = camera on** (you're visible)
- **Keyboard shortcut**: `V` key

```
Camera Off: [📹]  (Red - shows avatar/initials)
Camera On:  [🎥]  (Blue - shows video feed)
```

**Tips:**
- Turn off video to save bandwidth on slow connections
- Use virtual backgrounds (Settings → More → Virtual Background)
- Select different cameras from Settings if you have multiple

---

### Screen Sharing 📤

Share your screen, window, or application with others.

**How to share:**
1. Click the **"Share Screen" button** (monitor icon)
2. Choose what to share:
   - **Entire Screen**: Everything on your screen
   - **Window**: A specific application window
   - **Tab**: Just a browser tab (Chrome/Edge)
3. Click **"Share"**

**While sharing:**
- A red border appears around your screen
- You see "You are sharing your screen" notification
- Click **"Stop sharing"** button to stop

**Keyboard shortcut**: `D` key

**Tips:**
- Share only the window you need (not entire screen) for privacy
- Close unnecessary tabs/apps before sharing
- Check "Share audio" if presenting a video
- Others can't control your screen, only view it

---

### Chat 💬

Send text messages to everyone or specific participants.

**Opening Chat:**
- Click the **chat icon** in the top-right
- Or press `C` key
- Chat panel slides in from the right

**Sending Messages:**
1. Type your message in the text box
2. Press `Enter` to send
3. Messages appear in chronological order

**Features:**
- Send messages to everyone (default)
- Private chat with specific participants (click their name)
- Share links, emojis, and text
- Chat history preserved during the meeting
- Receive notifications for new messages

**Tips:**
- Use chat for sharing links or information
- Private messages only visible to you and recipient
- Chat is not saved when meeting ends
- Moderators can disable chat if needed

---

### Participants Panel 👥

View and manage meeting participants.

**Opening the Panel:**
- Click the **participants icon** (people icon)
- Or press `P` key
- Panel appears on the right side

**What You See:**
```
Participants (5)
┌──────────────────────┐
│ 👑 John Doe (You)   │  ← Moderator (crown icon)
│ 👤 Jane Smith       │
│ 👤 Bob Johnson      │
│ 🔇 Alice Brown      │  ← Muted participant
│ ✋ Mike Wilson       │  ← Raised hand
└──────────────────────┘
[✋ Raise Hand]
[🔇 Mute Everyone]  (moderator only)
```

**Information Displayed:**
- Participant names
- 👑 Crown icon = Moderator
- 🔇 Muted indicator
- ✋ Raised hand status
- Connection quality (colored dots)

**Actions:**
- See who's in the meeting
- Raise your hand (✋)
- View participant stats
- Moderators can mute others or grant moderator rights

---

### Raise Hand ✋

Signal that you want to speak without interrupting.

**How to Raise Hand:**
1. Click the **"Raise Hand" button** in participants panel
2. Or use keyboard shortcut: `R`
3. Your hand icon ✋ appears next to your name

**When You Raise Hand:**
- All participants see your raised hand
- You move to the top of the participants list
- Moderator gets notification
- Lower your hand by clicking the button again

### Leaving a Meeting 📞

Click the **red phone icon** or close the browser tab. You're immediately removed and can rejoin using the same link.

**For Moderators**: Choose between "Leave meeting" (you leave) or "End meeting for all" (closes meeting for everyone).

---

## View Modes

**Tile View (Grid)**: Press `W` or click the grid icon to see all participants in equal-sized tiles. Great for group meetings (up to 25 people).

**Speaker View (Default)**: Large video of active speaker with filmstrip of others. Better for presentations with automatic speaker switching.

---

## Basic Settings ⚙️

Access settings from the gear icon in the top-right.

**Audio**: Select microphone, enable noise suppression and echo cancellation

**Video**: Choose camera, set quality, enable background blur or virtual backgrounds

**Profile**: Change display name, email, language preferences

---

## Common Features

**Display Name**: Click your thumbnail and the pencil icon to change your name. Visible to all participants.

**Reactions 👍**: Click the smiley face icon to send emoji reactions (👍 👏 ❤️ 😂 🎉). Floats up from your thumbnail and disappears after a few seconds.

**Lobby**: When enabled, participants wait for moderator approval before joining. Prevents uninvited guests.

---

## Keyboard Shortcuts

Essential shortcuts for quick actions:

| Action | Shortcut |
|--------|----------|
| Mute/Unmute Audio | `M` |
| Turn Video On/Off | `V` |
| Share Screen | `D` |
| Open Chat | `C` |
| Open Participants | `P` |
| Raise Hand | `R` |
| Toggle Tile View | `W` |
| Toggle Filmstrip | `F` |
| Push to Talk | Hold `Space` |
| Leave Meeting | `Ctrl/Cmd + W` |

Press `?` to view all shortcuts.

---

## Tips & Best Practices

**Before Meeting**: Test camera/microphone, ensure good lighting, close bandwidth-heavy apps

**During Meeting**: Mute when not speaking, use push-to-talk (spacebar), look at camera when speaking, use raise hand and reactions

**Connection Issues**: Turn off video if poor quality, use headphones to prevent echo, move closer to WiFi router

**Mobile App**: Swipe up for controls, use picture-in-picture mode, landscape for better view

**Security**: Use unique room names, enable lobby for sensitive meetings, use password protection, grant permissions only to trusted sites

---

## Troubleshooting

**Camera/Microphone Not Working**: Check browser permissions (lock icon in address bar), close apps using device (Zoom, Skype), try different browser

**Can't Hear Others**: Check speaker connection, verify volume isn't muted, select correct audio output in Settings

**Video Freezing/Lagging**: Check internet speed (min 1 Mbps), close other applications, turn off HD video

**Meeting Link Not Working**: Verify link is complete, try different browser, clear cache, or manually enter room name at meet.jit.si

---

## Getting Help

If you need additional assistance:

- 📚 **[User Guides](/docs/category/user-guide)**: More detailed guides
- 🔧 **[FAQ](/docs/faq)**: Common questions and answers  
- 💬 **[Community Forum](https://community.jitsi.org)**: Ask questions
- 📖 **[Advanced Features](user-guide-advanced)**: Power user features

---

**See also:**
- [Advanced User Guide](user-guide-advanced) - URL parameters and advanced settings
- [Keyboard Shortcuts](keyboard-shortcuts) - Complete shortcut reference
- [Join a Meeting](user-guide-join-jitsi-meeting) - Detailed joining guide
- [Start a Meeting](user-guide-start-a-jitsi-meeting) - Host your own meeting
