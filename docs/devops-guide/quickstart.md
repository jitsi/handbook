---
id: devops-guide-quickstart
title: Self-Hosting Guide - Debian/Ubuntu server
sidebar_label: Debian/Ubuntu server
---

Follow these steps for a quick Jitsi-Meet installation on a Debian-based GNU/Linux system.
The following distributions are supported out-of-the-box:
- Debian 10 (Buster) or newer
- Ubuntu 18.04 (Bionic Beaver) or newer

_Note_: Many of the installation steps require `root` or `sudo` access. 


## Required packages and repository updates

You will need the following packages:
* `gnupg2`
* `nginx-full`
* `sudo` # only needed if you use sudo

:::note Note
OpenJDK 8 or OpenJDK 11 must be used.
:::

Make sure your system is up-to-date and required packages are installed:

```sh
# Run as root or with sudo

# Retrieve the latest package versions across all repositories
apt update

# Ensure support for apt repositories served via HTTPS
apt install apt-transport-https
```

On Ubuntu systems, Jitsi requires dependencies from Ubuntu's `universe` package repository.  To ensure this is enabled, run this command:

```sh
sudo apt-add-repository universe

# Retrieve the latest package versions across all repositories
sudo apt update
```

## Install Jitsi Meet

### Domain of your server and set up DNS

Decide what domain your server will use. For example, `meet.example.org`.

Set a DNS A record for that domain, using:
- your server's public IP address, if it has its own public IP; or
- the public IP address of your router, if your server has a private (RFC1918) IP address (e.g. 192.168.1.2) and connects through your router via Network Address Translation (NAT).

If your computer/server or router has a dynamic IP address (the IP address changes constantly), you can use a dynamic dns-service instead.

### Set up the Fully Qualified Domain Name (FQDN) (optional)

If the machine used to host the Jitsi Meet instance has a FQDN (for example `meet.example.org`) already set up in DNS, you can set it with the following command:

`sudo hostnamectl set-hostname meet.example.org`

Then add the same FQDN in the `/etc/hosts` file:

    127.0.0.1 localhost
    x.x.x.x meet.example.org

Note: `x.x.x.x` is your server's public IP address.

Finally on the same machine test that you can ping the FQDN with:

`ping "$(hostname)"`

If all worked as expected, you should see:
`meet.example.org`

### For Ubuntu 18.04, add Prosody package repository

This will add the Prosody repository so that Prosody .11 will be installed, which is necessary for features including the lobby feature.

```sh
echo deb http://packages.prosody.im/debian $(lsb_release -sc) main | sudo tee -a /etc/apt/sources.list
wget https://prosody.im/files/prosody-debian-packages.key -O- | sudo apt-key add -
```

### Add the Jitsi package repository

This will add the jitsi repository to your package sources to make the Jitsi Meet packages available.

```sh
curl https://download.jitsi.org/jitsi-key.gpg.key | sudo sh -c 'gpg --dearmor > /usr/share/keyrings/jitsi-keyring.gpg'
echo 'deb [signed-by=/usr/share/keyrings/jitsi-keyring.gpg] https://download.jitsi.org stable/' | sudo tee /etc/apt/sources.list.d/jitsi-stable.list > /dev/null

# update all package sources
sudo apt update
```

### Setup and configure your firewall

The following ports need to be open in your firewall, to allow traffic to the Jitsi Meet server:

* 80 TCP - for SSL certificate verification / renewal with Let's Encrypt
* 443 TCP - for general access to Jitsi Meet
* 10000 UDP - for general network video/audio communications
* 22 TCP - if you access you server using SSH (change the port accordingly if it's not 22)
* 3478 UDP - for quering the stun server (coturn, optional, needs config.js change to enable it)
* 5349 TCP - for fallback network video/audio communications over TCP (when UDP is blocked for example), served by coturn

If you are using `ufw`, you can use the following commands:

```sh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 10000/udp
sudo ufw allow 22/tcp
sudo ufw allow 3478/udp
sudo ufw allow 5349/tcp
sudo ufw enable
```

Check the firewall status with:

```
sudo ufw status verbose
```

#### Using SSH
For more details on using and hardening SSH access, see the corresponding [Debian](https://wiki.debian.org/SSH) or [Ubuntu](https://help.ubuntu.com/community/SSH/OpenSSH/Configuring) documentation.

#### Forward ports via your router

If you are running Jitsi Meet on a server [behind NAT](https://jitsi.github.io/handbook/docs/faq#how-to-tell-if-my-server-instance-is-behind-nat), forward the ports on your router to your server's IP address.

_Note_: if participants cannot see or hear each other, double check your firewall / NAT rules.

### TLS Certificate

In order to have encrypted communications, you need a [TLS certificate](https://en.wikipedia.org/wiki/Transport_Layer_Security). 

During installation of Jitsi Meet you can choose between different options:

1. The recommended option is to choose ___Generate a new self-signed certificate___ and create a Lets-Encrypt Certificate later (see [below](#generate-a-lets-encrypt-certificate-optional-recommended)) (this will replace the self-signed certificate).

2. But if you want to use a different certificate or you want to choose a different challenge type of Let's Encrypt (see [below](#generate-a-lets-encrypt-certificate-optional-recommended) for details), you should create that certificate first and then install jitsi-meet and choose ___I want to use my own certificate___.

3. You could also use the self-signed certificate but this is not recommended for the following reasons:

    * Using a self-signed certificate will result in warnings being shown in your users browsers, because they cannot verify your server's identity.

	* Jitsi Meet mobile apps *require* a valid certificate signed by a trusted [Certificate Authority](https://en.wikipedia.org/wiki/Certificate_authority) and will not be able to connect to your server if you choose a self-signed certificate.

### Install Jitsi Meet

_Note_: The installer will check if [Nginx](https://nginx.org/) or [Apache](https://httpd.apache.org/) are present (in that order) and configure a virtual host within the web server it finds to serve Jitsi Meet.

If you are already running Nginx on port 443 on the same machine, turnserver configuration will be skipped as it will conflict with your current port 443.


```sh
# jitsi-meet installation
sudo apt install jitsi-meet
```

**SSL/TLS certificate generation:**
You will be asked about SSL/TLS certificate generation. 
See [above](#tls-certificate) for details.

**Hostname:**
You will also be asked to enter the hostname of the Jitsi Meet instance. If you have a domain, use the specific domain name, for example:
`meet.example.org`.
Alternatively you can enter the IP address of the machine (if it is static or doesn't change).

This hostname will be used for virtualhost configuration inside Jitsi Meet and also, you and your correspondents will be using it to access the web conferences.

### Access Control

**Jitsi Meet server:**
_Note_: By default, anyone who has access to your Jitsi Meet server will be able to start a conference: if your server is open to the world, anyone can have a chat with anyone else. 
If you want to limit the ability to start a conference to registered users, follow the instructions to set up a [secure domain](secure-domain).

**Conferences/Rooms:**
The access control for conferences/rooms is managed in the rooms, you can set a password on the webpage of the specific room after creation.
See the User Guide for details: https://jitsi.github.io/handbook/docs/user-guide/user-guide-start-a-jitsi-meeting

### Generate a Let's Encrypt certificate (optional, recommended)

In order to have encrypted communications, you need a [TLS certificate](https://en.wikipedia.org/wiki/Transport_Layer_Security).

The best method is to create a certificate that is signed by a [Certificate Authority](https://en.wikipedia.org/wiki/Certificate_authority).
This way you can avoid problems with a self-signed certificate (see [above](#tls-certificate) for details).
The easiest way is to use [Let's Encrypt](https://letsencrypt.org/).

Simply run the following in your shell:

```sh
sudo /usr/share/jitsi-meet/scripts/install-letsencrypt-cert.sh
```
Note that this script uses the [HTTP-01 challenge type](https://letsencrypt.org/docs/challenge-types/) and thus your instance needs to be accessible from the public internet on both ports 80 and 443. If you want to use a different challenge type, don't use this script and instead choose ___I want to use my own certificate___ during `jitsi-meet` installation.

#### If You're Using Debian 10 and AdoptOpenJDK8...

If you're using Debian 10 with the recommended JDK, Jitsi won't be able to find the necessary certificates and your logs will be full of errors like this:

```
Sep 16 22:04:53 c2s55fdd8d14490 info    Client disconnected: ssl handshake error: tlsv1 alert internal error
Sep 16 22:04:54 c2s55fdd8cd6ee0 info    Client connected
```

Until the upstream fix is available, you'll need to fix it by running this:

```
sudo apt install ca-certificates-java
sudo dpkg-divert --divert /usr/lib/jvm/adoptopenjdk-8-hotspot-amd64/jre/lib/security/cacerts.dist --rename --local --add /usr/lib/jvm/adoptopenjdk-8-hotspot-amd64/jre/lib/security/cacerts
sudo ln -s /etc/ssl/certs/java/cacerts /usr/lib/jvm/adoptopenjdk-8-hotspot-amd64/jre/lib/security/cacerts
```

#### Advanced configuration

If the installation is on a machine [behind NAT](https://jitsi.github.io/handbook/docs/faq#how-to-tell-if-my-server-instance-is-behind-nat) jitsi-videobridge should configure itself automatically on boot. If three way calls do not work, further configuration of jitsi-videobridge is needed in order for it to be accessible from outside.

Provided that all required ports are routed (forwarded) to the machine that it runs on. By default these ports are (TCP/443 or TCP/4443 and UDP/10000).

The following extra lines need to be added to the file `/etc/jitsi/videobridge/sip-communicator.properties`:

```
org.ice4j.ice.harvest.NAT_HARVESTER_LOCAL_ADDRESS=<Local.IP.Address>
org.ice4j.ice.harvest.NAT_HARVESTER_PUBLIC_ADDRESS=<Public.IP.Address>
```

And comment the existing `org.ice4j.ice.harvest.STUN_MAPPING_HARVESTER_ADDRESSES`.

See [the documentation of ice4j](https://github.com/jitsi/ice4j/blob/master/doc/configuration.md)
for details.

**Systemd/Limits:**
Default deployments on systems using systemd will have low default values for maximum processes and open files. If the used bridge will expect higher number of participants the default values need to be adjusted (the default values are good for less than 100 participants).

To update the values edit `/etc/systemd/system.conf` and make sure you have the following values if values are smaller, if not do not update.

```
DefaultLimitNOFILE=65000
DefaultLimitNPROC=65000
DefaultTasksMax=65000
```

To check values just run:

```
systemctl show --property DefaultLimitNPROC
systemctl show --property DefaultLimitNOFILE
systemctl show --property DefaultTasksMax
```

To load the values and check them see [below](#systemd-details) for details.

##### Systemd details
To reload the systemd changes on a running system execute `sudo systemctl daemon-reload` and `sudo systemctl restart jitsi-videobridge2`.
To check the tasks part execute `sudo systemctl status jitsi-videobridge2` and you should see `Tasks: XX (limit: 65000)`.
To check the files and process part execute ```cat /proc/`cat /var/run/jitsi-videobridge/jitsi-videobridge.pid`/limits``` and you should see:
```
Max processes             65000                65000                processes
Max open files            65000                65000                files
```

### Confirm that your installation is working

Launch a web browser (such as Firefox, Chrome or Safari) and enter the hostname or IP address from the previous step into the address bar.

If you used a self-signed certificate (as opposed to using Let's Encrypt), your web browser will ask you to confirm that you trust the certificate. If you are testing from the iOS or Android app, it will probably fail at this point, if you are using a self-signed certificate.

You should see a web page prompting you to create a new meeting.  
Make sure that you can successfully create a meeting and that other participants are able to join the session.

If this all worked, then congratulations!  You have an operational Jitsi conference service.


## Uninstall

```sh
sudo apt purge jigasi jitsi-meet jitsi-meet-web-config jitsi-meet-prosody jitsi-meet-turnserver jitsi-meet-web jicofo jitsi-videobridge2
```

Sometimes the following packages will fail to uninstall properly:

- jigasi
- jitsi-videobridge

When this happens, just run the uninstall command a second time and it should be ok.

The reason for the failure is that sometimes the uninstall script is faster than the process that stops the daemons. The second run of the uninstall command fixes this, as by then the jigasi or jitsi-videobridge daemons are already stopped.


## Debugging problems

* Web Browser:
You can try to use a different web browser. Some versions of some browsers are known to have issues with Jitsi Meet. 

* WebRTC, Webcam and Microphone:
You can also visit https://test.webrtc.org to test your browser's [WebRTC](https://en.wikipedia.org/wiki/WebRTC) support.

* Firewall:
If participants cannot see or hear each other, double check your firewall / NAT rules.

* Nginx/Apache:
As we prefer the usage of Nginx as webserver, the installer checks first for the presence of Nginx and then for Apache. In case you desperately need to enforce the usage of apache, try pre-setting the variable `jitsi-meet/enforce_apache` for package `jitsi-meet-web-config` on debconf.

* Log files:
Take a look at the various log files:

```
/var/log/jitsi/jvb.log
/var/log/jitsi/jicofo.log
/var/log/prosody/prosody.log
```

## Additional Functions

### Adding sip-gateway to Jitsi Meet

#### Install Jigasi

Jigasi is a server-side application acting as a gateway to Jitsi Meet conferences. It allows regular [SIP](https://en.wikipedia.org/wiki/Session_Initiation_Protocol) clients to join meetings and provides transcription capabilities.

```sh
sudo apt install jigasi
```

During the installation, you will be asked to enter your SIP account and password. This account will be used to invite the other SIP participants.

#### Reload Jitsi Meet

Launch again a browser with the Jitsi Meet URL and you'll see a telephone icon on the right end of the toolbar. Use it to invite SIP accounts to join the current conference.

Enjoy!
