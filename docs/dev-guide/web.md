---
id: dev-guide-web
title: Developer Guide (Web)
sidebar_label: Start
---

Welcome to the developers guide for web! This guide will help you setup a development
environment to start working on the Jitsi Meet codebase.


## Prerequisites

The setup for the development environment uses `make`, a native command from GNU/Linux. **This guide assumes that you have a Linux system with Ubuntu or Debian, or Windows Subsystem for Linux (WSL)[https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux]**. If you have iOS or other Linux distro, the process should of the installation of packages will be diferent depending on your OS.

:::note
Node.js >= 12 and npm >= 6 are required.
:::

1. Install `nodejs` and `npm`

The easiest way to install `nodejs` and `npm` is to run

```bash
sudo apt-get install nodejs npm
```

Verify that the version of `nodejs` is >= 12 and the version of `npm`>= 6 with

```bash
node -v && npm -v
```

A result that looks good is, for example,

```
v12.18.3
6.14.6
```

2. Install `npm` dependencies

Run

```bash
npm update
npm install webpack
npm install lib-jitsi-meet

```

Do NOT run these as the `root` user. These commands are intended to work from a normal user.


3. *(OPTIONAL: only for Windows WSL)*

Install nginx, a web server that will be used to host Jisti, with

```bash
sudo apt-get install nginx
```

Once you've done in, it is a good idea to restart the service. It also starts it if it wasn't already started. Run

```bash
sudo service nginx restart
```

If we are developing in a Windows WSL, we will need to access to the `localhost` service exposed inside the Windows WSL. In order to do so, we need to open the port of the firewall of the Windows WSL. We will install a simple firewall manager called `ufw`. In theory, if you access a service from internet with your Windows WSL, it will first pass the firewall of the local Windows machine, so nothing should happen, but beware that these ports will remain open in the Windows WSL. 

```bash
sudo apt-get install ufw

sudo ufw allow 8000/tcp
sudo ufw allow 8443/tcp
sudo ufw allow 4443/tcp
sudo ufw allow in 10000:20000/udp
```



## Development environment

Clone the official repo:

```bash
git clone https://github.com/jitsi/jitsi-meet
cd ./jitsi-meet/

npm update && npm install
```


### Running with webpack-dev-server for development

Use the following command in your terminal:

```bash
make dev
```

By default the backend deployment used is `alpha.jitsi.net`. The path to this variable is under `/jitsi-meet/webpack.config.js`. You can point the Jitsi Meet app at a different backend by using a proxy server. To do this, set the WEBPACK_DEV_SERVER_PROXY_TARGET variable:


```bash
export WEBPACK_DEV_SERVER_PROXY_TARGET=https://your-example-server.com
make dev
```

**Congratulations! The app should be running at https://localhost:8080/**



*(OPTIONAL: only for Windows WSL)*
In order to access the application from a browser in the local Windows machine, run


```bash
export WEBPACK_DEV_SERVER_PROXY_TARGET="https://$HOST-MACHINE-IP-ADDRESS:8080"
make dev
```


#### Certificate Error

Browsers may show a certificate error since the development certificate is self-signed. It's safe to disregard those
warning and continue to your site.


### Building the sources


To build the Jitsi Meet application from the source, just run
```
make
```


### Building .debs

To make a deb you can easily deploy to a public test server, ensure you have the lib-jitsi-meet sources you wish, then:
```
make
dpkg-buildpackage -A -rfakeroot -us -uc -tc
```

You'll have a bunch of .deb files in the parent directory, and can push the updated source to your server and install it with the jitsi-meet-web deb file.

### Running from source on existing deployment

Follow the document https://community.jitsi.org/t/how-to-how-to-build-jitsi-meet-from-source-a-developers-guide/75422


:::note
If you have any problem during the installation of the development environment, please first look ar the following community guide:
https://community.jitsi.org/t/how-to-how-to-build-jitsi-meet-from-source-a-developers-guide/75422
:::

