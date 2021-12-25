---
id: faq
title: FAQ
---

## How to tell if my server instance is behind NAT?

In general, if the tool ifconfig (or ipconfig) shows the assigned IPv4 address to be a private / local address (10.x.x.x, or  172.16.x.x - 172.31.x.x, or 192.168.x.x) but you know that its public IPv4 address is different from that, the server is most probably behind NAT.

If you are hosting your server on a VPS, and you are not sure, ask your VPS provider's support team.

## Clients could communicate well in room created at `meet.jit.si`. The same clients still could connect to my self-hosted instance but can neither hear nor see one another. What's wrong?

Most probably, the server is behind NAT, but you haven't added the NAT-specific configuration. See this [resolved question](https://community.jitsi.org/t/cannot-see-video-or-hear-audio-on-self-hosted-instance/). You need to follow the steps detailed [here](devops-guide/devops-guide-quickstart#advanced-configuration).

## It works with two participants, but crashes or does not work properly when a third joins

P2P mode is working, but it fails when you are trying to pass traffic via jitsi-videobridge2.

Check you've got your firewall / NAT set up correctly — especially UDP 10000. For more information, see [here](devops-guide/devops-guide-quickstart#setup-and-configure-your-firewall).

## Can I mute and unmute other participants?

If you are the moderator of a conference (everyone is a moderator if you are using `meet.jit.si`), you can mute everyone's microphone. You cannot unmute other people's microphones, and they can unmute their microphone at any time.

You may want to set some "ground rules" for who can talk and when, just as with any physical meeting or classroom.

If you would like to limit who can become a moderator, you need to set up your own instance of Jitsi and enable "secure domain". Please see [here](#_4-enable-secure-domain-if-you-are-using-your-own-instance-of-jitsi_) for more information.

## How can I protect my meetings with Jitsi?

### _1. Create a "strong" room name._

Use a strong room name, which no-one else is likely to be using. Use the name generator on the welcome page, or else generate your own "strong" name.

For example, on macOS, in terminal, you can use `uuidgen` to generate a string of letters of numbers (e.g. B741B63E-C5E6-4D82-BAC4-048BE25D8CC7).

Your room name would be `meet.jit.si/B741B63E-C5E6-4D82-BAC4-048BE25D8CC7` on the hosted `meet.jit.si` platform.

If you use "test" or "LucysMeeting" or "pilates" or similar, then it's highly likely that other users will have had the same idea.

### _2. Use a different room name for each meeting / conference you have._

If you are going to have multiple meetings, ideally use a different room name for each one.

If that is not practical, at least use a different room name for each group of people.

### _3. Add a password to the room._

Once you have started your room, set a password for it. Only people who have the password can join from that point on, but it does not affect people who have already joined.

You will need to tell everyone the password.

If they give the password to others, those other people can also join.

### _4. Enable "secure domain" if you are using your own instance of Jitsi._

In addition to the tips above, consider enabling the ["secure domain" configuration](https://jitsi.github.io/handbook/docs/devops-guide/secure-domain). This requires you (or someone else) to enter a username and password to open a room. It also allows you to become a moderator.

## It's working when I connect from a browser, but not from the iOS or Android apps

This probably means that you are not serving the fullchain for your TLS certificate. You can check if your cert chain
is properly configured [here](https://whatsmychaincert.com/).

In nginx, if you are using Let's Encrypt, you should have a line like this:

`ssl_certificate /etc/letsencrypt/live/jitsi.example.com/fullchain.pem;`


## Can I record and save the video?

Yes. There are multiple methods (using external software or services):

_Note_: If you want to use a privacy-friendly method, use method 1 or 2.

1. **OBS**: Use [OBS](https://obsproject.com/) to record your Session (e.g. your browser window).

2. **RTMP-Server**: For this you have to setup your own RTMP-Server and then use your RTMP URL + Stream key instead of the Youtube Stream key as described [here](https://jitsi.org/blog/live-streaming-with-jitsi-and-youtube/). Self-installed Jitsi Meet deployments will need to setup Jibri to do this.

3. **Dropbox**: [Connect to Dropbox with Jitsi Meet](/handbook/docs/dev-guide/dev-guide-web-integrations#creating-the-dropbox-app-for-dropbox-recording-integration) and save the video in the Dropbox. 

4. **Video Services/Websites**: Stream your conference to YouTube or other sites (e.g. Twitch) and access the recording there (see [howto](https://jitsi.org/blog/live-streaming-with-jitsi-and-youtube/)). Self-installed Jitsi Meet deployments will need to setup Jibri to do this. 

More methods might be implemented in the future, but are not ready yet (e.g. [Local Recording](https://github.com/jitsi/jitsi-meet/issues/6014).

## I set the password in meeting but it is not working the next time
Once the meeting ends it's password also gets removed, so you need to set the password again for next meeting.

## How to limit the number of participants?

1. Use the command `prosodyctl about` to view the version of prosody and plug directory, similar to the output below.

```
Prosody 0.11.6

# Prosody directories

Data directory: /var/lib/prosody

Config directory: /etc/prosody

Source directory: /usr/lib/prosody

Plugin directories:

/usr/share/jitsi-meet/prosody-plugins/

/usr/lib/prosody/modules/
```

2. Check if there is a `mod_muc_max_occupants.lua` file in your plugin directory.

If not, please create a new file `mod_muc_max_occupants.lua` in the plugin directory And copy everything from [here](https://github.com/jitsi/jitsi-meet/blob/master/resources/prosody-plugins/mod_muc_max_occupants.lua) to paste.

If it exists, please ignore this step.

3.Edit your `/etc/prosody/conf.avail/meet.example.com.cfg.lua` file and add `muc_max_occupants` as a module_enabled in the conference.meet.example.com "muc" section.

Then, add the options below that. You need both `muc_max_occupants` and `muc_access_whitelist` defined.

Example:

```
Component "conference.meet.example.com" "muc"
   storage = "memory"
   modules_enabled = {
       "muc_meeting_id";
       "muc_domain_mapper";
       "muc_max_occupants"; 
   }
   muc_max_occupants = "5"
   muc_access_whitelist = { "focus@auth.meet.example.com" }
   admins = { "focus@auth.meet.example.com" }
   muc_room_locking = false
   muc_room_default_public_jids = true
```

Note: the relationship between storage = "" and your prosody version, and you need to modify all storage="" .
- Prosody nightly747 storage = "null"
- Prosody 0.10 storage = "none"
- Prosody 0.11 storage = "memory"

4. You need to use the command `prosodyctl restart` to see the effect.

5. If you want to update to use prosody, you can check [here](https://community.jitsi.org/t/how-to-how-do-i-update-prosody/72205).
