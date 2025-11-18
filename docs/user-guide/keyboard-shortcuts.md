---
id: keyboard-shortcuts
title: Keyboard Shortcuts
---

Master Jitsi Meet with these keyboard shortcuts for faster, more efficient video conferencing. These shortcuts work in desktop browsers and the Jitsi Meet desktop applications.

## Essential Shortcuts

### Audio & Video Controls

| Shortcut | Action | Description |
|----------|--------|-------------|
| <kbd>M</kbd> | **Mute/Unmute Microphone** | Toggle your microphone on/off. Essential for quick muting during meetings |
| <kbd>V</kbd> | **Start/Stop Camera** | Toggle your video on/off. Useful for privacy or bandwidth saving |
| <kbd>D</kbd> | **Screen Share** | Switch between camera and screen sharing. Press again to stop sharing |
| <kbd>A</kbd> | **Video Quality** | Open video quality settings to adjust resolution and bandwidth |

### View Controls

| Shortcut | Action | Description |
|----------|--------|-------------|
| <kbd>F</kbd> | **Show/Hide Thumbnails** | Toggle video thumbnail filmstrip visibility |
| <kbd>W</kbd> | **Tile View** | Switch between tile view (grid) and speaker view |
| <kbd>S</kbd> | **Full Screen** | Enter or exit full screen mode |
| <kbd>0</kbd> | **Focus Your Video** | Pin your own video to the main stage |
| <kbd>1</kbd>-<kbd>9</kbd> | **Focus Participant** | Pin participant 1-9 to the main stage |

### Communication

| Shortcut | Action | Description |
|----------|--------|-------------|
| <kbd>C</kbd> | **Open/Close Chat** | Toggle the chat panel |
| <kbd>R</kbd> | **Raise/Lower Hand** | Raise your hand to signal you want to speak |
| <kbd>SPACE</kbd> | **Push to Talk** | Hold spacebar to temporarily unmute (when muted) |

### Interface

| Shortcut | Action | Description |
|----------|--------|-------------|
| <kbd>P</kbd> | **Participants Pane** | Show or hide the participants panel |
| <kbd>T</kbd> | **Show Stats** | Display connection statistics and quality metrics |
| <kbd>?</kbd> | **Shortcuts Help** | Show/hide this keyboard shortcuts overlay |

## Reactions

Express yourself quickly with emoji reactions:

| Shortcut | Reaction | When to Use |
|----------|----------|-------------|
| <kbd>Alt</kbd> + <kbd>T</kbd> | 👍 **Thumbs Up** | Agreement, approval |
| <kbd>Alt</kbd> + <kbd>C</kbd> | 👏 **Clap** | Appreciation, celebration |
| <kbd>Alt</kbd> + <kbd>L</kbd> | 😂 **Laugh** | Something funny |
| <kbd>Alt</kbd> + <kbd>O</kbd> | 😮 **Surprised** | Amazement, shock |
| <kbd>Alt</kbd> + <kbd>B</kbd> | 👎 **Boo** | Disagreement |
| <kbd>Alt</kbd> + <kbd>S</kbd> | 🤫 **Silence** | Request quiet |

## Advanced Shortcuts

| Shortcut | Action | Description |
|----------|--------|-------------|
| <kbd>G</kbd> | **GIPHY Menu** | Toggle the GIF search menu for fun reactions |

## Platform-Specific Shortcuts

### Windows & Linux

All shortcuts listed above work as-is on Windows and Linux systems.

**Modifier Keys:**
- <kbd>Alt</kbd> = Alt key
- <kbd>Ctrl</kbd> = Control key (for browser shortcuts)

### macOS

Most shortcuts work the same, but note:
- <kbd>Option</kbd> replaces <kbd>Alt</kbd> for reactions
- <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd> for full screen in some browsers

**Example:**
- Thumbs up: <kbd>Option</kbd> + <kbd>T</kbd>
- Clap: <kbd>Option</kbd> + <kbd>C</kbd>

## Browser-Specific Notes

### Chrome / Edge / Brave

All shortcuts work natively. For best experience:
- Allow keyboard shortcuts in settings
- Avoid conflicting browser extensions

### Firefox

All shortcuts supported. Note:
- <kbd>F</kbd> may conflict with "Find in page" in some cases
- Use <kbd>Ctrl</kbd> + <kbd>F</kbd> for find instead

### Safari

Most shortcuts work, except:
- Some Alt combinations may require enabling in System Preferences
- Full screen behavior follows macOS conventions

## Quick Reference Card

Print or save this quick reference:

```
┌─────────────────────────────────────────┐
│     JITSI MEET KEYBOARD SHORTCUTS       │
├─────────────────────────────────────────┤
│  AUDIO & VIDEO                          │
│  M  - Mute/Unmute                       │
│  V  - Camera On/Off                     │
│  D  - Share Screen                      │
│                                         │
│  VIEW                                   │
│  F  - Show/Hide Thumbnails              │
│  W  - Tile View                         │
│  S  - Full Screen                       │
│                                         │
│  COMMUNICATION                          │
│  C  - Chat                              │
│  R  - Raise Hand                        │
│  Space - Push to Talk                   │
│                                         │
│  INTERFACE                              │
│  P  - Participants                      │
│  T  - Show Stats                        │
│  ?  - Shortcuts Help                    │
│                                         │
│  REACTIONS                              │
│  Alt+T - 👍  Alt+C - 👏  Alt+L - 😂    │
│  Alt+O - 😮  Alt+B - 👎  Alt+S - 🤫    │
└─────────────────────────────────────────┘
```

## Tips for Efficient Meeting Management

### For Participants

1. **Quick Mute**: Keep <kbd>M</kbd> handy to mute instantly when needed
2. **Push to Talk**: Use <kbd>SPACE</kbd> for brief comments when muted
3. **Reactions**: Use Alt+shortcuts to provide quick feedback without interrupting
4. **Focus Video**: Press <kbd>1</kbd>-<kbd>9</kbd> to focus on active speaker

### For Moderators

1. **Tile View**: Press <kbd>W</kbd> to see all participants at once
2. **Stats**: Press <kbd>T</kbd> to monitor connection quality
3. **Screen Share**: Use <kbd>D</kbd> to quickly start presentations
4. **Chat Monitoring**: Toggle <kbd>C</kbd> to check for questions

## Accessibility

### Keyboard Navigation

Jitsi Meet is fully keyboard accessible:
- **Tab**: Navigate between interface elements
- **Enter**: Activate buttons and links
- **Escape**: Close dialogs and menus
- **Arrow Keys**: Navigate within menus

### Screen Reader Support

- All shortcuts announce their actions
- ARIA labels provide context
- Focus indicators show current element

## Customization

### Changing Shortcuts

Currently, keyboard shortcuts cannot be customized in the standard Jitsi Meet interface. However:

**Self-Hosted Instances:**
- Can modify shortcuts in the source code
- See [Configuration Guide](../dev-guide/dev-guide-configuration) for details

**Browser Extensions:**
- Use browser extension managers to remap keys
- Popular options: Shortkeys (Chrome), Shortkeys (Firefox)

## Troubleshooting

### Shortcut Not Working

**Problem:** Keyboard shortcut doesn't respond

**Solutions:**
1. Ensure Jitsi Meet window has focus (click inside)
2. Check browser isn't in full-screen presentation mode
3. Verify no browser extension is intercepting the key
4. Try reloading the page (Ctrl+R / Cmd+R)
5. Check keyboard layout (some layouts may conflict)

### Conflicts with Browser

**Problem:** Shortcut triggers browser action instead

**Solutions:**
1. Use different browser (Chrome recommended)
2. Disable conflicting browser shortcuts in settings
3. Use Jitsi desktop app instead of browser
4. Click inside meeting area to ensure focus

### Push to Talk Not Working

**Problem:** Space bar doesn't unmute

**Solutions:**
1. Must be already muted for push-to-talk
2. Click inside video area (not chat or buttons)
3. Hold space, don't just tap
4. Check microphone permissions
5. Try muting/unmuting with M first

## Desktop App vs Browser

### Desktop Application

**Advantages:**
- More reliable shortcut handling
- No browser conflicts
- Better full-screen experience
- Background audio support

**Download:**
- [Windows/Mac/Linux](https://github.com/jitsi/jitsi-meet-electron/releases)

### Web Browser

**Advantages:**
- No installation required
- Always up-to-date
- Cross-platform
- Easy sharing

## Mobile Apps

Note: Keyboard shortcuts don't apply to mobile apps (Android/iOS). Mobile apps use:
- Touch controls
- Voice commands (where supported)
- Hardware buttons (volume for mute on some devices)

See: [Using Jitsi on Mobile](user-guide-jitsi-meet-on-mobile)

## Learning Tips

### Memorization Strategy

**Week 1**: Master essential shortcuts
- <kbd>M</kbd> - Mute
- <kbd>V</kbd> - Video
- <kbd>C</kbd> - Chat

**Week 2**: Add view controls
- <kbd>W</kbd> - Tile view
- <kbd>S</kbd> - Full screen
- <kbd>F</kbd> - Thumbnails

**Week 3**: Learn reactions
- <kbd>Alt</kbd> + <kbd>T</kbd> - Thumbs up
- <kbd>Alt</kbd> + <kbd>C</kbd> - Clap
- <kbd>R</kbd> - Raise hand

### Practice Exercise

1. Join a test meeting: [meet.jit.si/test](https://meet.jit.si/test)
2. Practice each shortcut 3 times
3. Use shortcuts in real meetings for one week
4. Muscle memory will develop naturally

## Additional Resources

- 📖 **[User Guide - Basic](user-guide-basic)** - Learn Jitsi features
- 🎯 **[Advanced Features](user-guide-advanced)** - Power user tips
- 💻 **[Desktop App](https://github.com/jitsi/jitsi-meet-electron)** - Enhanced experience
- 💬 **[Community Forum](https://community.jitsi.org/)** - Get help

## Cheat Sheet Download

Want a printable version? Create your own:

1. Copy the quick reference card above
2. Paste into a text document
3. Print and keep near your desk
4. Or save as desktop wallpaper

---

**Pro Tip:** Press <kbd>?</kbd> anytime during a meeting to see the shortcuts overlay!
