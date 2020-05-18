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
