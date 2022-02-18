---
id: devops-guide-requirements
title: Requirements
---

:::note
Jitsi-meet is a real-time system.
Requirements are very different from a web server and depend on many factors.
Miscalculations can very easily destroy basic functionality rather than cause slow performance.
Avoid adding other functions to your Jitsi-meet setup as it can harm performance and complicate optimizations.

Note that Jitsi-meet design priorizes scalability by adding servers on using a huge server. Check Jitsi-videobridge documentation on adding several bridges to a Jitsi-meet server, and OCTO to go even beyond that (federation of Jitsi-meet servers). If you feel that you are a network and server administration newbie, don't even think of going there.
:::

# Jitsi-meet needs, by order of importance

- Network link: basic speed and reliability are essential. Check speed against the provider claims using any download tool (or ftp), and
verify latency using a tool such as iperf3.
Exact calculation is very complex and depend on many optimisations and tricks, but you should at least remember these numbers on resolution:
180 = 200 kbits/s
360 = 500 kbits/s
720 (HD) = 2500 kbits/s
4k = 10 Mbits/s
So don't expect to have 20 users using 4K on a server with 100Mbits/s upload and download.
For a friends/small organization server, 1 Gbits/s will often be enough but for a serious server 10 Gbits/s
is advisable. Several (or many...) bridges having each a 10 Gbits/s link are used by big deployments.

-> these requirements concern the videobridge. If there are only external videobridges (as can be the case on high end Jitsi-meet servers), network performance matters much less.

- RAM: it's usually suggested to get 8 GB.
 For small meetings you can get away with 4 GB, for test servers or very small meetings you can try to use 2 GB.
 For big meetings it's suggested to go the scalable way over getting huge amounts of memory.


- CPU: very low processor performance can seriously harm a real time system, especially when using a shared server (where your CPU performance can be stolen by other customers of your hoster, check on 'dedicated CPU' if you are getting a VPS, rather than a physical server). However, a consideration is that a Jitsi-meet component, Prosody, can only use ONE (1) core. So getting a lot of cores, let's say more than 32, is not always useful. For a basic server, 4 dedicated cores can be enough.

- Disk: unless you are doing heavy logging or have very specific needs, you can get away with 250 Gbytes of standard hard disk.
SSD are more a nice to have than a necessity.


If you want additional services, requirements can go up.


# Recording

Jibri needs ONE system per recording.
One Jibri instance == one meeting. For 5 meetings recorded simultaneously, you need 5 Jibris.
There is no workaround to that.
If you are knowledgeable, you can setup Jibris in containers and use a big server to save a bit on resources but that's about it.

Jibri RAM and CPU needs are far higher than Jitsi-meet itself, as it does video encoding.
For 1080x720 you currently need at least 8 Gb RAM, for 1280x1024 12 Gb (this is for recording a __single__  meeting).
If memory is not sufficient or CPU can't encode fast enough, recordings will fail.

While Jibri and Jitsi-meet can technically be hosted in a single server, it's not recommended because Jibri is a resource drain and it can harm Jitsi-meet performance, and can exhaust disk space and stop Jitsi-meet function altogether.



