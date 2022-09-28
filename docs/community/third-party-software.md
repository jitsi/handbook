---
id: third-party-software
title: Third-Party Software
---

This page contains links to projects around Jitsi Meet, which are not maintained
by the Jitsi team.

Please keep this list in alphabetical order.

:::warning
As these packages are not maintained by the Jitsi team, please ask
their respective forums / issue trackers for help if you find issues.
:::

## Cketti's Jitsi Hacks

Some extra features using injected scripts.

https://jitsi-hacks.cketti.eu/

## Flutter plugin

Plugin for Flutter.

https://pub.dev/packages/jitsi_meet

## Galaxy

Galaxy is a web application for Jitsi admins and users to organize their Jitsi
meetings, meeting schedules and attendees.

https://github.com/emrahcom/galaxy

## GStreamer pipelinee integration

Integrate Jitsi Meet conferences with GStreamer pipelines.

https://github.com/avstack/gst-meet

## Jitok: Jitsi Token generator

Helper web tool and API for generating Jitsi Meet compatible JWT.

GitHub: https://github.com/jitsi-contrib/jitok

Demo: https://jitok.emrah.com/

Discussion: https://community.jitsi.org/t/jitok-jitsi-token-generator/94683

## Jitsi-Admin

An opensource platform to organize your meetings. Includes all function we know
from the big conference-tools

- Plan your Meeting
- Secure your Meeting with user login credentials
- Create a Report of each user visiting your conference
- Creating an appointment poll and transfer it into a conference with one click
- Dockerised for easy installation

Github: https://github.com/H2-invent/jitsi-admin

Demo: https://jitsi-admin.de

Docker:
https://github.com/H2-invent/jitsi-admin/wiki/Install-jitsi-admin-in-docker

## Jitsi URL Generator

A simple tool to illustrate how URL params can be composed to customise Jitsi.
It only exposes a small fraction of what is possible, but should hopefully help
build familiarity which users can then apply to other config values in the
whitelist.

https://shawnchin.github.io/jitsi-url-generator/

Github: https://github.com/shawnchin/jitsi-url-generator

## KeyCloak integration

Integration of KeyCloak for authentication.

https://github.com/D3473R/jitsi-keycloak

## Outlook Plugin

Plugin for Adding a "Schedule Jitsi Meeting" Button to Microsoft Outlook.

GitHub: https://github.com/timetheoretical/jitsi-meet-outlook

## Prosody Plugins

Collection of community-contributed prosody plugins that can be added to
self-hosted Jitsi deployments.

https://github.com/jitsi-contrib/prosody-plugins

- **event_sync**: Sends HTTP POST to external API when occupant or room events
  are triggered.
- **frozen_nick**: Prevents users from changing their display name if JWT auth
  is used and name is provided in token context.
- **jibri_autostart**: Automatically starts recording when the moderator enters
  the room.
- **lobby_autostart**: Automatically enables lobby for all rooms.
- **time_restricted**: Sets a time limit on rooms and terminates the conference
  when the time is up.
- **token_affiliation**: Promotes users to moderators based on affiliation
  property in token (JWT).
- **token_lobby_bypass**: Enables some users to bypass lobby based on a flag in
  token (JWT).
- **token_lobby_ondemand**: Activates lobby based on a flag in
  token (JWT).
- **token_owner_party**: Prevents unauthorized users from create a room and
  terminates the conference when the owner leaves.

## React Native plugin

Plugin for React Native.

https://github.com/skrafft/react-native-jitsi-meet

## SAML to Jitsi JWT Authentification

Intergration of SAML authentification with Shibboleth for a Jitsi Meet JWT
generator.

Github: https://github.com/Renater/Jitsi-SAML2JWT

## Unity plugin

Plugin for using lib-jitsi-meet in a Unity environment (WebGL).

https://github.com/avstack/jitsi-meet-unity-demo
