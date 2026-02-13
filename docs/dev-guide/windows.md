---
id: dev-guide-windows
title: Running Jitsi Meet on Windows (Unofficial)
sidebar_label: Windows (Unofficial)
---

:::caution
Windows is **not** officially supported for Jitsi Meet development or deployment. The methods described below rely on running a Linux environment on your Windows machine. These are community-provided workarounds and issues specific to these setups may not receive official support.
:::

This guide describes unofficial ways to build and run [Jitsi Meet](dev-guide-web-jitsi-meet) on a Windows machine. All approaches work by providing a Linux environment where the standard Linux-based instructions apply.

## Prerequisites

- Windows 10 (version 2004 or later) or Windows 11
- Hardware virtualization enabled in BIOS/UEFI
- At least 8 GB of RAM (16 GB recommended)
- A stable internet connection for cloning repositories and installing dependencies

## Method 1: WSL2 (Recommended)

[Windows Subsystem for Linux 2 (WSL2)](https://learn.microsoft.com/en-us/windows/wsl/) runs a real Linux kernel on Windows and provides the closest experience to native Linux development. It has near-native performance, low resource overhead, and integrates well with Windows-based editors such as VS Code.

### Install WSL2

Open **PowerShell as Administrator** and run:

```bash
wsl --install
```

This installs WSL2 with Ubuntu as the default distribution. Restart your computer when prompted.

After restarting, open **Ubuntu** from the Start menu. On first launch you will be asked to create a Linux username and password. Complete the setup, then update the system packages:

```bash
sudo apt update && sudo apt upgrade -y
```

### Install Node.js

Jitsi Meet requires **Node.js >= 22** and **npm >= 10**. Install them using [nvm](https://github.com/nvm-sh/nvm):

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Reload your shell profile
source ~/.bashrc

# Install Node.js 22
nvm install 22

# Verify installation
node -v   # should print v22.x.x
npm -v    # should print 10.x.x
```

### Install build tools

Some dependencies require native compilation:

```bash
sudo apt install -y build-essential git
```

### Clone and build Jitsi Meet

:::tip
Always clone the repository inside the **Linux filesystem** (your home directory `~/`) rather than under `/mnt/c/`. The `/mnt/c/` path mounts your Windows `C:\` drive and cross-filesystem operations are significantly slower, which causes long build times and unreliable file watching.
:::

```bash
# Navigate to your Linux home directory
cd ~

# Clone the Jitsi Meet repository
git clone https://github.com/jitsi/jitsi-meet
cd jitsi-meet

# Install dependencies
npm install

# Start the development server
make dev
```

The development server will start at `https://localhost:8080/`. Open this URL in your Windows browser (Chrome, Edge, etc.). WSL2 automatically forwards `localhost` to Windows.

:::note
Your browser will show a certificate error because the development server uses a self-signed certificate. It is safe to accept the warning and proceed.
:::

For the full list of build commands and configuration options, see the [Jitsi Meet web development guide](dev-guide-web-jitsi-meet).

## Method 2: Docker Desktop

If your goal is to **self-host** a Jitsi Meet instance rather than develop the web application, Docker Desktop is a convenient option. It runs Linux containers on Windows using the WSL2 backend.

### Install Docker Desktop

1. Download [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/) and run the installer.
2. During installation, ensure **"Use WSL 2 instead of Hyper-V"** is selected.
3. After installation, launch Docker Desktop and wait for the engine to start.

Open **PowerShell** or **Command Prompt** and verify:

```bash
docker --version
docker compose version
```

Both commands should print version information without errors.

### Download the Jitsi Docker setup

Open **PowerShell** and download the latest release:

```powershell
# Download the latest stable release
Invoke-WebRequest -Uri $(
    (Invoke-RestMethod -Uri https://api.github.com/repos/jitsi/docker-jitsi-meet/releases/latest).assets |
    Where-Object { $_.name -like '*.zip' } |
    Select-Object -First 1 -ExpandProperty browser_download_url
) -OutFile jitsi-docker.zip

# Extract the archive
Expand-Archive -Path jitsi-docker.zip -DestinationPath jitsi-docker
cd jitsi-docker\*
```

### Configure and start the containers

```bash
# Copy the example environment file
copy env.example .env

# Generate strong passwords (run this from a WSL2 or Git Bash terminal)
bash ./gen-passwords.sh

# Create required configuration directories
mkdir -p ~/.jitsi-meet-cfg/{web,transcripts,prosody/config,prosody/prosody-plugins-custom,jicofo,jvb,jigasi,jibri}

# Start the containers
docker compose up -d
```

Access the Jitsi Meet instance at [https://localhost:8443](https://localhost:8443).

:::note
The Docker-based setup is designed for **deployment and testing**, not for active development of the Jitsi Meet web application source code. For development, use WSL2 (Method 1) or a Linux VM (Method 3).
:::

For the full Docker deployment guide including TLS, authentication, and recording configuration, see the [Self-Hosting Guide: Docker](../devops-guide/devops-guide-docker).

## Method 3: Linux Virtual Machine

Running a full Linux virtual machine provides complete isolation and the broadest compatibility. This approach works exactly like developing on a native Linux machine.

### Install a hypervisor

Download and install one of the following:

- [VirtualBox](https://www.virtualbox.org/) (free, open source)
- [VMware Workstation Player](https://www.vmware.com/products/workstation-player.html) (free for personal use)

### Create a virtual machine

1. Download an [Ubuntu LTS](https://ubuntu.com/download/desktop) ISO (22.04 or newer recommended).

2. Create a new virtual machine with the following recommended settings:

   | Setting | Recommended Value |
   |---------|-------------------|
   | RAM | 4 GB minimum, 8 GB preferred |
   | CPU Cores | 2 minimum, 4 preferred |
   | Disk Space | 30 GB minimum |
   | Network | NAT or Bridged Adapter |

3. Mount the Ubuntu ISO and complete the installation.

### Install dependencies inside the VM

After Ubuntu is installed and running, open a terminal and run:

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install build tools
sudo apt install -y build-essential git curl

# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc

# Install Node.js 22
nvm install 22

# Verify
node -v   # should print v22.x.x
npm -v    # should print 10.x.x
```

### Clone and build Jitsi Meet

```bash
# Clone the repository
git clone https://github.com/jitsi/jitsi-meet
cd jitsi-meet

# Install dependencies
npm install

# Start the development server
make dev
```

The development server will be available at `https://localhost:8080/` inside the VM's browser.

:::tip
If you want to access the development server from your Windows browser, configure the VM's network as **Bridged Adapter** and use the VM's IP address instead of `localhost`. You can find the IP by running `ip addr show` inside the VM.
:::

For the full list of build commands and configuration options, see the [Jitsi Meet web development guide](dev-guide-web-jitsi-meet).

## Tips and Caveats

**Filesystem performance (WSL2).** The location of your project files matters significantly. Working inside the Linux filesystem (`~/jitsi-meet`) gives native Linux I/O speed, while working under the mounted Windows filesystem (`/mnt/c/Users/.../jitsi-meet`) adds cross-OS translation overhead and is much slower. Always use the Linux filesystem for builds and file watching.

**Networking.** In WSL2, `localhost` on Windows automatically maps to WSL2, so the development server at `https://localhost:8080/` is accessible from your Windows browser. Docker Desktop containers bind to `localhost` by default and the web UI is at `https://localhost:8443`. For a virtual machine, use a Bridged Adapter network mode if you need to access the VM from Windows.

**Resource usage.** Both WSL2 and VMs consume system memory. By default WSL2 may use up to 50% of your system RAM. You can limit this by creating a `.wslconfig` file at `C:\Users\<YourUsername>\.wslconfig`:

```ini
[wsl2]
memory=4GB
processors=2
```

After saving, restart WSL2 with `wsl --shutdown` in PowerShell.

**Official support.** These workarounds are not officially supported. If you encounter issues, verify that the same problem occurs on a native Linux environment before reporting it upstream. The [Jitsi Community Forum](https://community.jitsi.org/) is a good place to ask for community help with Windows-specific issues.
