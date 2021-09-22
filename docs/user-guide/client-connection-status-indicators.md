---
id: client connection status indicators
title: Client Connection Status Indicators
---

This document explains what the different connection quality indicators on the video thumbnails actually mean.

## GOOD
* With video enabled, when the send bitrate for the video stream is at least 50% of the target bitrate expected for the stream. Please refer to the target bitrates table below.
* With video disabled or screen sharing is in progress, when the downstream packet loss is less than 6%.

## NON-OPTIMAL
* With video enabled, when the send bitrate for the video stream is at least 30% of the target bitrate expected for the stream. Please refer to the target bitrates table below.
* With video disabled or screen sharing is in progress, when the downstream packet loss is less than 8%.

## POOR
* With video enabled, when the send bitrate for the video stream is at least 10% of the target bitrate expected for the stream. Please refer to the target bitrates table below.
* With video disabled or screen sharing is in progress, when the downstream packet loss is less than 12%.

## LOST
* When the user stops receiving video for the remote endpoint even when the endpoint is not video muted and it is in LastN as indicated by the bridge’s LastNEndpointChangeEvent.
* When the bridge sends an EndpointConnectivityStatusChangeEvent indicating that the remote endpoint is no longer active, i.e., when the bridge has not received media from the remote endpoint for more than 3 secs.

## GHOST/NINJA
* When the user stops receiving video for the remote endpoint even when the endpoint is not video muted and it is not in LastN as indicated by the bridge’s LastNEndpointChangeEvent. This means that the bridge decided to suspend the video for this user. Bridge takes into consideration the available downlink bandwidth for the receiving endpoint and the number of video streams requested using the channelLast setting.

## Target bitrates expected for the video streams

CodecType   | 180p (in Kbps) | 360p (in Kbps) | 720p (in Kbps)
----------- | -------------- | -------------- | -------------------
VP8         |      200       |     500        |      1500          
VP9         |      100       |     300        |      1200          
