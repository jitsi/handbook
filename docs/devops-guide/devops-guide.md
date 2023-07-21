---
id: devops-guide-start
title: Self-Hosting Guide - Overview
sidebar_label: Overview
---

:::note
These guides help you to ___host your own Jitsi-Meet server___.   
If you want to have a video conference without setting up any infrastructure, use https://meet.jit.si instead.
:::

## First, a bit of general advice

Jitsi Meet being based on [WebRTC](https://en.wikipedia.org/wiki/WebRTC), an encrypted communication link (https) is ___necessary___ to get working multimedia, and the setup is not always trivial.

The best option is an Internet server with a certificate for a domain registered in the [DNS](https://en.wikipedia.org/wiki/Domain_Name_System#Domain_name_registration).

While it's possible to setup a server on a private network and/or a self-signed certificate, it can be less straightforward and you can expect difficulties, first if you want access both from the private network and the public internet, and second when using phones as these clients often don't accept self-signed certificates.

In case of trouble with clients using phones, [check your certificate](https://whatsmychaincert.com).

<hr />

import DocCardList from '@theme/DocCardList';

<DocCardList />
