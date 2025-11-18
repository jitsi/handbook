---
id: user-guide-jitsi-meet-for-google-calendar
title: Jitsi Meet for Google Calendar
sidebar_label: Jitsi Meet for Google Calendar
---

The Jitsi Meet for Google Calendar add-on allows you to seamlessly add Jitsi video conference links to your Google Calendar events, making it easier to schedule and join virtual meetings.

## Installation

### Installing the Add-on

1. Open [Google Calendar](https://calendar.google.com/)
2. Click the **Settings** gear icon in the top right
3. Select **Get add-ons** from the dropdown menu
4. Search for **"Jitsi Meet"** in the Google Workspace Marketplace
5. Click on the **Jitsi Meet** add-on
6. Click **Install**
7. Review and accept the required permissions
8. Click **Continue** to complete installation

### Required Permissions

The add-on requires the following permissions:
- **View and manage events on all your calendars** - To add Jitsi links to events
- **Connect to an external service** - To generate unique meeting URLs
- **Display information as a web page** - To show the add-on interface

## Using Jitsi Meet with Google Calendar

### Creating a Meeting with Jitsi

#### Method 1: Using the Add-on

1. Open Google Calendar
2. Click **Create** or click on a time slot to create a new event
3. Fill in the event details (title, time, guests, etc.)
4. Click the **Jitsi Meet** icon in the sidebar (may appear as a puzzle piece icon initially)
5. Click **Add video conferencing**
6. A unique Jitsi Meet link will be automatically added to your event description
7. Click **Save** to create the event

#### Method 2: Manual Link

You can also manually add a Jitsi link:

1. Create a new calendar event
2. In the description or location field, add a Jitsi Meet URL:
   ```
   https://meet.jit.si/YourMeetingName
   ```
3. Use a unique, hard-to-guess meeting name for security
4. Save the event

### Joining a Jitsi Meeting from Calendar

1. Open the calendar event
2. Click the **Jitsi Meet link** in the event details
3. Your default browser will open the meeting
4. Allow camera and microphone permissions when prompted
5. Enter your name and click **Join meeting**

### Adding Guests

1. In the event creation window, click **Add guests**
2. Enter email addresses of participants
3. Click **Save**
4. Guests will receive an email invitation with:
   - Event details
   - Jitsi Meet link
   - Option to add event to their calendar

## Features

### Automatic Link Generation

- **Unique URLs**: Each event gets a unique, secure meeting room URL
- **Persistent Rooms**: The same room can be reused for recurring meetings
- **No Account Required**: Guests don't need a Jitsi account to join

### Recurring Events

For recurring events:
1. Create the event as recurring (daily, weekly, monthly, etc.)
2. Add the Jitsi link
3. Choose to apply to:
   - **This event only**
   - **All events** (recommended for consistent meeting URL)

### Calendar Integration Benefits

- **Email Reminders**: Automatic reminders with Jitsi link
- **Time Zone Support**: Automatically adjusted for all participants
- **Mobile Notifications**: Join meetings directly from mobile notifications
- **Cross-Platform**: Works on desktop, mobile, and web

## Advanced Configuration

### Custom Meeting Names

For professional or branded meetings:

```
https://meet.jit.si/CompanyName-TeamMeeting-2024
```

Best practices:
- Use alphanumeric characters and hyphens
- Avoid spaces and special characters
- Make it memorable but unique
- Include date/team name for organization

### Security Settings

To protect your meetings:

1. **Use Strong Room Names**: Generated names are cryptographically secure
2. **Set Meeting Password**: Add password in the Jitsi room once started
3. **Enable Lobby**: First person to join can enable lobby mode
4. **Limit Meeting Access**: Don't share calendar publicly if using sensitive names

### Integration with Other Tools

The Jitsi link can be:
- Copied to Slack, Teams, or other chat platforms
- Embedded in project management tools
- Added to email signatures for regular meetings
- Shared via any communication channel

## Troubleshooting

### Add-on Not Appearing

**Problem:** Can't see Jitsi Meet add-on in calendar

**Solutions:**
1. Refresh your browser (Ctrl+F5 or Cmd+Shift+R)
2. Check if add-on is enabled:
   - Go to Settings → Add-ons
   - Ensure Jitsi Meet is enabled
3. Try different browser (Chrome, Firefox, Edge)
4. Clear browser cache and cookies
5. Reinstall the add-on

### Link Not Working

**Problem:** Meeting link doesn't open or shows error

**Solutions:**
1. Verify the URL format: `https://meet.jit.si/RoomName`
2. Check internet connection
3. Try opening in incognito/private mode
4. Update your browser to the latest version
5. Try different browser

### Permissions Issues

**Problem:** Add-on requesting permissions repeatedly

**Solutions:**
1. Revoke and re-grant permissions:
   - Go to Google Account → Security → Third-party apps
   - Find Jitsi Meet → Remove access
   - Reinstall the add-on
2. Check Google Calendar permissions
3. Ensure browser allows third-party cookies

### Meeting Not Starting

**Problem:** Can't join or start meeting from calendar

**Solutions:**
1. Click link directly instead of preview
2. Allow pop-ups for calendar.google.com
3. Grant camera/microphone permissions
4. Check firewall isn't blocking meet.jit.si
5. Try opening link in new incognito window

## Mobile Usage

### Android

1. Open **Google Calendar** app
2. Tap the event with Jitsi link
3. Tap the **Jitsi Meet link**
4. Choose to open in:
   - **Jitsi Meet app** (recommended - [Download](https://play.google.com/store/apps/details?id=org.jitsi.meet))
   - **Chrome browser**
5. Join the meeting

### iOS

1. Open **Google Calendar** app
2. Tap the event with Jitsi link
3. Tap the **Jitsi Meet link**
4. Choose to open in:
   - **Jitsi Meet app** (recommended - [Download](https://apps.apple.com/us/app/jitsi-meet/id1165103905))
   - **Safari browser**
5. Join the meeting

## Best Practices

### For Meeting Organizers

✅ **Do:**
- Add Jitsi link when creating the event
- Include meeting agenda in description
- Send reminders 15 minutes before meeting
- Test link before the actual meeting
- Arrive 2-3 minutes early to set up
- Enable waiting room for sensitive meetings

❌ **Don't:**
- Use simple/guessable room names like "meeting" or "test"
- Share meeting links publicly on social media
- Reuse same link for different groups without password
- Forget to update link if rescheduling

### For Participants

✅ **Do:**
- Click the link 2-3 minutes before start time
- Test audio/video before joining
- Mute microphone when not speaking
- Use headphones to prevent echo
- Have stable internet connection

❌ **Don't:**
- Share meeting link with unauthorized people
- Join without testing equipment first
- Use public WiFi for confidential meetings

## Tips & Tricks

### Quick Meeting Creation

1. Use Google Calendar keyboard shortcuts:
   - Press **C** to create new event
   - Add Jitsi link via add-on
   - Press **Ctrl+S** (Cmd+S) to save

### Meeting Templates

Create recurring event templates:
1. Create event with Jitsi link
2. Duplicate for similar meetings
3. Update date/time/guests as needed

### Integration with Google Meet Alternative

If your organization uses both:
- **Google Meet**: For internal team meetings
- **Jitsi Meet**: For external client meetings
- Keep both add-ons installed
- Choose appropriate platform per event

## Comparison: Jitsi vs Google Meet

| Feature | Jitsi Meet | Google Meet |
|---------|-----------|-------------|
| **Cost** | Free, unlimited | Free (60 min limit) or Workspace subscription |
| **Participants** | 75+ (self-hosted: unlimited) | 100-500 depending on plan |
| **Privacy** | Open-source, self-hostable | Google services |
| **Features** | Recording, streaming, custom branding | Google Workspace integration |
| **Best For** | Open-source advocates, privacy-focused | Google Workspace users |

## FAQ

**Q: Is Jitsi Meet free to use with Google Calendar?**  
A: Yes, both the add-on and meet.jit.si service are completely free.

**Q: Can I use my own Jitsi Meet server?**  
A: Yes, manually add your custom domain: `https://your-domain.com/MeetingName`

**Q: How many people can join a Jitsi meeting?**  
A: On meet.jit.si, typically 75-100 participants. Self-hosted instances can support more.

**Q: Do guests need a Jitsi account?**  
A: No, Jitsi is completely anonymous and doesn't require accounts.

**Q: Can I record meetings?**  
A: Yes, Jitsi supports local recording (save to your device) and streaming to YouTube.

**Q: Is Jitsi Meet secure?**  
A: Yes, all meetings are encrypted. Use passwords and unique room names for additional security.

**Q: Can I use Jitsi on mobile?**  
A: Yes, via browser or dedicated mobile apps for [Android](https://play.google.com/store/apps/details?id=org.jitsi.meet) and [iOS](https://apps.apple.com/us/app/jitsi-meet/id1165103905).

## Additional Resources

- **[Jitsi Meet User Guide](user-guide-basic)** - Complete feature overview
- **[Advanced Features](user-guide-advanced)** - URL parameters and customization
- **[Mobile App Guide](user-guide-jitsi-meet-on-mobile)** - Using Jitsi on smartphones
- **[Keyboard Shortcuts](keyboard-shortcuts)** - Quick commands
- **[Web Integrations](../dev-guide/dev-guide-web-integrations)** - Integration options
- **[Community Forum](https://community.jitsi.org/)** - Get help and support
