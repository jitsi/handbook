---
id: devops-guide-region
title: Region-based setup
---

## Configuration for region-based setup

This approach allows jicofo to recognize the region of a participant and then choose a bridge for them based on that. To set this up:

* Jicofo: enable RegionBasedBridgeSelectionStrategy and set jicofo.local-region to jicofo's region
* JVB: set videobridge.relay.region to the local region
* prosody: enable the `jiconop`, `muc_meeting_id`, and `jitsi_session` modules and set region_name to the local region
  
## User region detection

For your global deployment we assume you are using some sort of DNS routing from a cloud provider. At some point on your ingress add the 'X-Proxy-Region' HTTP header with the region name to the request, and forward that to the shard. This header will be handled and set to jicofo. Some cloud providers have a feature like this built in. If you have to add the proxy yourself, you can add a regional nginx reverse proxy or HAProxy in front of your shards that adds this header.

## How it works
On the shard, the request to /xmpp-websocket will go through nginx. On participant join, prosody will extract the region and add it to the participant presence, which will be seen by jicofo.

That region will be in the self-presence of the participant and the client will add it to the config.deploymentInfo (for debugging purposes).
After connection `jiconop` will send the client the shard and region information, both will end up in the config.deploymentInfo.

There is also a stat fired from ljm to jitsi-meet. The value of this is visible in the local user stats in the UI (when you hover over the gsm bars) - serverRegion. This is the region of the bridge that is assigned by jicofo.
