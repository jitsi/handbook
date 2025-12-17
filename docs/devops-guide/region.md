---
id: devops-guide-region
title: Region based setup
---

## Configuration for region based setup

The goal is every participant to have its region recognized by jicofo which can choose a bridge from its region.

You can enable RegionBasedBridgeSelectionStrategy in Jicofo to have region based JVB selection.

Every component can be setup to know its region. The config for jicofo is jicofo.local-region. In JVB this videobridge.relay.region. In prosody that is region_name config. 
Make sure that in prosody you have enabled the following modules: `jiconop`, `muc_meeting_id`, `jitsi_session`.

## User region detection
An easy way to do that is to deploy a haproxy server in every region you support and use DNS routing from your cloud provider (closes geographically or rtt based) to connect users to the closes haproxy.
Haproxy will add a header 'X-Proxy-Region' with the region name to the request and forward it to the shard. Where this header will be handled and sent to jicofo.


## How it works
On the shard the request to xmpp-websocket will get through nginx and in prosody when participant is joining the region will be extracted and added to its presence which will be seen by jicofo.

That region will be in the self-presence of the participant and the client will add it to the config.deploymentInfo (for debugging purposes).
After connection `jiconop` will send to the client on which shard is the connection and in which region, both will end up in the config.deploymentInfo.

There is also a stat being fired from ljm to jitsi-meet, which value is visible in the local user stats in the UI (when you hover over the gsm bars) - serverRegion. This is the region of the bridge that is assigned by jicofo.
