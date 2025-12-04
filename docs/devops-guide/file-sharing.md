---
id: file-sharing
title: File sharing
---

## Deploying and configuring a demo file sharing service for Jitsi Meet

The Jitsi Meet UI can use a file sharing service which implements the following [API](https://github.com/jitsi/jitsi-meet/blob/master/resources/file-sharing.yaml).

There is an example implementation of such a service in the [jitsi-meet-file-sharing](https://github.com/jitsi/jitsi-meet-file-sharing-service). 
That is a simple implementation using local filesystem storage.

### Setup

On an existing deployment or after installing jitsi-meet following the [Self-Hosting Guide](https://jitsi.org/qi) you need to install the file sharing service and configure jitsi-meet to use it.

- Download and install nvm
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
```

- Clone the repository and deploy the service
```bash
cd /srv
git clone https://github.com/jitsi/jitsi-meet-file-sharing-service.git
cd /srv/jitsi-meet-file-sharing-service
nvm install
nvm use
./deploy.sh
```

- Setup sign material for short-lived tokens
```bash
mkdir /etc/jitsi/file-sharing-service
mkdir -p /var/www/jitsi-meet-file-sharing-service/uploads
openssl genrsa -out /etc/jitsi/file-sharing-service/short_lived_token.key 2048
openssl rsa -in /etc/jitsi/file-sharing-service/short_lived_token.key -pubout -out /etc/jitsi/file-sharing-service/short_lived_token.pub
ssh-keygen -f /etc/jitsi/file-sharing-service/short_lived_token.key -e -m pem > /etc/jitsi/file-sharing-service/short_lived_token.pem
chmod g+r /etc/jitsi/file-sharing-service/short_lived_token.key
chown root:prosody /etc/jitsi/file-sharing-service/short_lived_token.key
```

- Enable short-lived token in your prosody config.
Add its configuration to `/etc/prosody/conf.avail/your-domain.cfg.lua`:
```lua
short_lived_token = {
    issuer = 'prosody';
    accepted_audiences = { 'file-sharing' };
    key_path = '/etc/jitsi/file-sharing-service/short_lived_token.key';
    key_id = 'jitsi/short_lived_token_2025';
    ttl_seconds = 30;
};
```
Enable it in the `modules_enabled` section under the main virtual host:
```lua
modules_enabled = {
    ...
    'short_lived_token';
    ...
};
```

- restart prosody:
```bash
systemctl restart prosody
```

- Configure the file sharing service in config.js, add to the end:
```javascript
config.fileSharing = {
    apiUrl :"https://your-domain/file-service/v1/documents",
    enabled: true,
};
```

Configure nginx by adding the following to your nginx configuration file (e.g., `/etc/nginx/sites-available/your-domain.conf`):
```nginx
    client_max_body_size 50M;
    location ^~ /file-service/ {
        # Remove /file-service prefix when forwarding
        rewrite ^/file-service(/.*)$ $1 break;

        # Add CORS headers
        add_header Access-Control-Allow-Origin "$http_origin" always;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Authorization, Content-Type, X-Requested-With" always;
        add_header Access-Control-Allow-Credentials "true" always;

        # Handle preflight requests
        if ($request_method = OPTIONS) {
            return 204;
        }

        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
```
- restart nginx
```bash
systemctl restart nginx
```

- Setup the environment variables for the file sharing service in `/srv/jitsi-meet-file-sharing-service/.env`:
```bash
JWT_PUBLIC_KEY_PATH=/etc/jitsi/file-sharing-service/short_lived_token.pem
UPLOAD_DIR=/var/www/jitsi-meet-file-sharing-service/uploads
```

- restart the file sharing service:
```bash
cd /srv/jitsi-meet-file-sharing-service
nvm use
pm2 delete jitsi-meet-file-sharing-service
pm2 start ecosystem.config.js --env production
```

- If you are using jwt authentication, make sure you pass 'file-upload' feature in `context.features` in the jwt.
```
{
  ...,
  "context": {
    "user": {
      "id": "....",
      ...
    },
    "features": {
        "file-upload":  true,
        ...
    }
    ...
}
```
- If you are using some other authentication method, you need to configure jitsi_default_permissions to include it.
```
jitsi_default_permissions = {
        livestreaming = true;
        recording = true;
        transcription = true;
        ['outbound-call'] = true;
        ['create-polls'] = true;
        ['file-upload'] = true;
        ['send-groupchat'] = true;
        flip = true;
    };
```
If you change prosody configuration, make sure to restart it.

### Usage

 - To rebuild the app: `npm run build`

 - To restart the service: `pm2 restart file-sharing-service`

 - To watch the logs: `pm2 logs file-sharing-service`


