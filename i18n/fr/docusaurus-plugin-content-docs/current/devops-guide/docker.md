---
id: devops-guide-docker
title: Self-Hosting Guide - Docker
sidebar_label: Docker
---

:::note
À partir de la version `stable-7289-1`, nos images sont fournies avec l'architecture `amd64` et `arm64`.
:::

## Démarrage rapide

Afin d'exécuter rapidement Jitsi Meet sur une machine exécutant Docker et Docker Compose,
Suivez ces étapes:

1. Téléchargez et extrayez la [dernière version]. **NE PAS** cloner le dépôt git. Voir ci-dessous si vous souhaitez exécuter des images de test.
    
2. Créez un fichier ``.env`` en copiant et en ajustant ``env.example`` :
   
   ```bash
   cp env.example .env
   ```
   
3. Définissez des mots de passe forts dans les options de la section de sécurité du fichier ``.env`` en exécutant le script bash suivant
   
   ```bash
   ./gen-passwords.sh
   ```
   
4. Créer les répertoires "CONFIG" requis
   * Pour linux :
   ```bash
   mkdir -p ~/.jitsi-meet-cfg/{web,transcripts,prosody/config,prosody/prosody-plugins-custom,jicofo,jvb,jigasi,jibri}
   ```
   * Pour les fenêtres:
   ```bash
   echo web,transcripts,prosody/config,prosody/prosody-plugins-custom,jicofo,jvb,jigasi,jibri | % { mkdir "~/.jitsi-meet-cfg/$_" }
   ```
5. Run ``docker-compose up -d``
6. Access the web UI at [``https://localhost:8443``](https://localhost:8443) (or a different port, in case you edited the `.env` file).

:::note
HTTP (pas HTTPS) est également disponible (sur le port 8000, par défaut), mais c'est par ex. pour une configuration de proxy inverse ;
un accès direct via HTTP à la place de HTTPS entraîne des erreurs WebRTC telles que _Failed to access your microphone/camera: Cannot use microphone/camera for an unknown reason. Impossible de lire la propriété 'getUserMedia' de undefined_ ou _navigator.mediaDevices est undefined_.
:::

Si vous souhaitez également utiliser jigasi, configurez d'abord votre fichier env avec les informations d'identification SIP, puis exécutez Docker Compose comme suit :

```bash
docker-compose -f docker-compose.yml -f jigasi.yml up
```

Si vous souhaitez activer le partage de documents via [Etherpad],
configurez-le et exécutez Docker Compose comme suit :

```bash
docker-compose -f docker-compose.yml -f etherpad.yml up
```

Si vous souhaitez également utiliser jibri, configurez d'abord un hôte comme décrit dans la section de configuration de l'infrastructure JItsi BRoadcasting, puis exécutez Docker Compose comme suit :

```bash
docker-compose -f docker-compose.yml -f jibri.yml up -d
```

or to use jigasi too:

```bash
docker-compose -f docker-compose.yml -f jigasi.yml -f jibri.yml up -d
```

### Tester le développement / les builds instables

Téléchargez le dernier code :
     
```bash
git clone https://github.com/jitsi/docker-jitsi-meet && cd docker-jitsi-meet
```

:::note
Le code dans 'master' est conçu pour fonctionner avec les images instables. Ne l'exécutez pas avec des images de version.
:::

Exécutez "docker-compose up" comme d'habitude.

Chaque jour, une nouvelle version d'image "instable" est téléchargée.

### Construire ses propres images

Téléchargez le dernier code :
     
```bash
git clone https://github.com/jitsi/docker-jitsi-meet && cd docker-jitsi-meet
```

Le `Makefile` fourni fournit un moyen complet de construire la pile entière ou des images individuelles.

Pour créer toutes les images :

```bash
make
```

Pour construire une image spécifique (l'image web par exemple) :

```bash
make build_web
```

Une fois que votre build local est prêt, assurez-vous d'ajouter `JITSI_IMAGE_VERSION=latest` à votre fichier `.env`.

### Note de sécurité

Cette configuration avait des mots de passe par défaut pour les comptes internes utilisés dans tous les composants.
Afin de rendre la configuration par défaut sécurisée par défaut, ceux-ci ont été supprimés et les conteneurs respectifs ne démarreront pas sans avoir défini un mot de passe.

Des mots de passe forts peuvent être générés comme suit : `./gen-passwords.sh`
Cela modifiera votre fichier `.env` (une sauvegarde est enregistrée dans `.env.bak`) et définira des mots de passe forts pour chacun des
options requises. Les mots de passe sont générés en utilisant `openssl rand -hex 16` .

NE PAS réutiliser les mots de passe.

## Architecture

Une installation Jitsi Meet peut être décomposée en les composants suivants :

* Une interface Web
* Un serveur XMPP
* Un volet focus conférence
* Un routeur vidéo (il peut y en avoir plusieurs)
* Une passerelle SIP pour les appels audio
* Une infrastructure de diffusion pour enregistrer ou diffuser une conférence.

![](../assets/docker-jitsi-meet.png)

Le diagramme montre un déploiement typique dans un hôte exécutant Docker. Ce projet sépare chacun des composants ci-dessus en conteneurs interconnectés. À cette fin, plusieurs images de conteneurs sont fournies.

### Ports externes

Les ports externes suivants doivent être ouverts sur un pare-feu :

* `80/tcp` pour Web UI HTTP (vraiment juste pour rediriger, après avoir décommenté `ENABLE_HTTP_REDIRECT=1` dans `.env`)
* `443/tcp` pour HTTPS de l'interface utilisateur Web
* `4443/tcp` pour les médias RTP sur TCP
* `10000/udp` pour les médias RTP sur UDP

Également `20000-20050/udp` pour jigasi, au cas où vous choisiriez de le déployer pour faciliter l'accès SIP.

Par exemple. sur un serveur CentOS/Fedora, cela se ferait comme ceci (sans accès SIP) :

```bash
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --permanent --add-port=4443/tcp
sudo firewall-cmd --permanent --add-port=10000/udp
sudo firewall-cmd --reload
```

See [the corresponding section in the manual setup guide](https://jitsi.github.io/handbook/docs/devops-guide/devops-guide-quickstart#setup-and-configure-your-firewall).

### Images

* **base** : image de base stable de Debian avec la [superposition S6] pour le contrôle des processus et la
  [Référentiels Jitsi] activés. Toutes les autres images sont basées sur celle-ci.
* **base-java** : identique à ce qui précède, plus Java (OpenJDK).
* **web** : interface utilisateur Web Jitsi Meet, servie avec nginx.
* **prosody** : [Prosody], le serveur XMPP.
* **jicofo** : [Jicofo], le composant de mise au point XMPP.
* **jvb** : [Jitsi Videobridge], le routeur vidéo.
* **jigasi** : [Jigasi], la passerelle SIP (audio uniquement).
* **jibri** : [Jibri], l'infrastructure de diffusion.

### Considérations sur la conception

Jitsi Meet utilise XMPP pour la signalisation, d'où la nécessité du serveur XMPP.
La configuration fournie par ces conteneurs n'expose pas le serveur XMPP au monde extérieur.
Au lieu de cela, il est complètement scellé et le routage du trafic XMPP ne se produit que sur un réseau défini par l'utilisateur.

Le serveur XMPP peut être exposé au monde extérieur,
mais cela sort du cadre de ce projet.

## Configuration

La configuration est effectuée via des variables d'environnement contenues dans un fichier ``.env``.
Vous pouvez copier le fichier ``env.example`` fourni comme référence.

Variable | descriptif | Exemple
--- | --- | ---
`CONFIG` | Répertoire où toute la configuration sera stockée | /opt/jitsi-meet-cfg
`TZ` | Fuseau horaire du système | Europe/Amsterdam
`HTTP_PORT` | Port exposé pour le trafic HTTP | 8000
`HTTPS_PORT` | Port exposé pour le trafic HTTPS | 8443
`DOCKER_HOST_ADDRESS` | Adresse IP de l'hôte Docker, nécessaire pour les environnements LAN | 192.168.1.1
`PUBLIC_URL` | URL publique du service Web | https://meet.example.com

:::note
Les applications mobiles ne fonctionneront pas avec des certificats auto-signés (valeur par défaut). Voir ci-dessous pour obtenir des instructions sur la façon d'obtenir un certificat approprié avec Let's Encrypt.
:::

### TLS Configuration

#### Configuration de Let's Encrypt

Si vous souhaitez exposer directement votre instance Jitsi Meet au trafic extérieur, mais que vous ne possédez pas de certificat TLS approprié, vous avez de la chance car la prise en charge de Let's Encrypt est intégrée. Voici les options requises :

Variable | descriptif | Exemple
--- | --- | ---
`ENABLE_LETSENCRYPT` | Activer la génération de certificat Let's Encrypt | 1
`LETSENCRYPT_DOMAIN` | Domaine pour lequel générer le certificat | meet.example.com
`LETSENCRYPT_EMAIL` | E-mail pour recevoir les notifications de compte importantes (obligatoire) | alice@atlanta.net

De plus, vous devrez définir `HTTP_PORT` sur 80 et `HTTPS_PORT` sur 443 et PUBLIC_URL sur votre domaine.
Vous pouvez également envisager de rediriger le trafic HTTP vers HTTPS en définissant `ENABLE_HTTP_REDIRECT=1`.

**Avertissement de limite de taux Let's Encrypt** : Let's Encrypt a une limite au nombre de fois que vous pouvez soumettre une demande
pour un nouveau certificat pour votre nom de domaine. Au moment de la rédaction, la limite actuelle est de cinq nouveaux (duplicata)
certificats pour le même nom de domaine tous les sept jours. Pour cette raison, il est recommandé de désactiver le
Encryptons les variables d'environnement de `.env` si vous prévoyez de supprimer le dossier `.jitsi-meet-cfg`.
Sinon, vous voudrez peut-être envisager de déplacer le dossier `.jitsi-meet-cfg` vers un autre emplacement afin d'avoir un endroit sûr pour trouver le certificat déjà émis par Let's Encrypt. Ou effectuez un test initial avec Let's Encrypt désactivé, puis réactivez-le. Let's Encrypt une fois que vous avez terminé les tests.

:::note
Lorsque vous vous éloignez de `LETSENCRYPT_USE_STAGING`,
vous devrez effacer manuellement les certificats de `.jitsi-meet-cfg/web`.
:::

Pour plus d'informations sur les limites de débit de Let's Encrypt, visitez :
https://letsencrypt.org/docs/rate-limits/

#### Utilisation du certificat et de la clé TLS existants

Si vous possédez un certificat TLS approprié et que vous n'avez pas besoin d'un certificat Let's Encrypt, vous pouvez configurer le conteneur Jitsi Meet
pour l'utiliser.

Contrairement aux certificats Let's Encrypt, cela n'est pas configuré via le fichier `.env`, mais en indiquant au service `web` de Jitsi Meet
pour monter les deux volumes suivants :

- monter le fichier `/path/to/your/cert.key` sur le point de montage `/config/keys/cert.key`
- monter le fichier `/path/to/your/cert.fullchain` sur le point de montage `/config/keys/cert.crt`.

Le faire dans le fichier `docker-compose.yml` devrait ressembler à ceci :


```
services:
    web:
        ...
        volumes:
            ...
            - /path/to/your/cert.fullchain:/config/keys/cert.crt
            - /path/to/your/cert.key:/config/keys/cert.key
```

### Configuration des fonctionnalités (config.js)

Variable | descriptif | Exemple
--- | --- | ---
`TOOLBAR_BUTTONS` | Configurer les boutons de la barre d'outils. Ajoutez le nom des boutons séparés par des virgules (pas d'espaces entre les virgules) | |
`HIDE_PREMEETING_BUTTONS` | Masquez les boutons sur l'écran de pré-adhésion. Ajouter le nom des boutons séparés par une virgule | |
`ENABLE_LOBBY` | Contrôlez si la fonction de lobby doit être activée ou non | 1
`ENABLE_AV_MODERATION` | Contrôlez si la modération A/V doit être activée ou non | 1
`ENABLE_PREJOIN_PAGE` | Afficher une page de pré-adhésion avant d'entrer dans une conférence | 1
`ENABLE_WELCOME_PAGE` | Activer la page d'accueil | 1
`ENABLE_CLOSE_PAGE` | Activer la page de fermeture | 0
`DISABLE_AUDIO_LEVELS` | Désactiver la mesure des niveaux audio | 0
`ENABLE_NOISY_MIC_DETECTION` | Activer la détection de micro bruyant | 1
`ENABLE_BREAKOUT_ROOMS` | Activer les salles de sous-commission | 1

### Configuration de la passerelle SIP Jigasi (audio uniquement)

Si vous souhaitez activer la passerelle SIP, ces options sont requises :

Variable | descriptif | Exemple
--- | --- | ---
`JIGASI_SIP_URI` | URI SIP pour les appels entrants / sortants | test@sip2sip.info
`JIGASI_SIP_PASSWORD` | Mot de passe pour le compte SIP spécifié | `<unset>`
`JIGASI_SIP_SERVER` | Serveur SIP (utilisez le domaine du compte SIP en cas de doute) | sip2sip.info
`JIGASI_SIP_PORT` | Port du serveur SIP | 5060
`JIGASI_SIP_TRANSPORT` | Transport SIP | UDP

#### Afficher les informations d'appel entrant

Variable | descriptif | Exemple
--- | --- | ---
`DIALIN_NUMBERS_URL` | URL vers le JSON avec tous les numéros d'accès | https://meet.example.com/dialin.json
`CONFCODE_URL` | URL vers l'API pour vérifier/générer les codes d'accès | https://jitsi-api.jitsi.net/conferenceMapper

Le JSON avec les numéros d'appel devrait ressembler à ceci :
```json
{"message":"Dial-In numbers:","numbers":{"DE": ["+49-721-0000-0000"]},"numbersEnabled":true}
```

### Configuration d'enregistrement/diffusion en direct avec Jibri

<details>
  <summary>Si vous utilisez une version antérieure à 7439, une configuration supplémentaire est nécessaire.</summary>
Avant d'exécuter Jibri **sur les versions antérieures à 7439**, vous devez configurer un périphérique de bouclage ALSA sur l'hôte.
Ceci **ne fonctionnera pas** sur un hôte non-Linux.

Pour CentOS 7, le module est déjà compilé avec le noyau, il suffit donc d'exécuter :

```bash
# configurer 5 interfaces de capture/lecture
echo "options snd-aloop enable=1,1,1,1,1 index=0,1,2,3,4" > /etc/modprobe.d/alsa-loopback.conf
# configurer le chargement automatique du module
echo "snd_aloop" > /etc/modules-load.d/snd_aloop.conf
# charger le module
modprobe snd-aloop
# vérifier que le module est chargé
lsmod | grep snd_aloop
```

For Ubuntu:

```bash
# installer le module
apt update && apt install linux-image-extra-virtual
# configurer 5 interfaces de capture/lecture
echo "options snd-aloop enable=1,1,1,1,1 index=0,1,2,3,4" > /etc/modprobe.d/alsa-loopback.conf
# configurer le chargement automatique du module
echo "snd-aloop" >> /etc/modules
# vérifier que le module est chargé
lsmod | grep snd_aloop
```

:::note
Si vous utilisez AWS, vous devrez peut-être redémarrer votre machine pour utiliser le noyau générique au lieu du noyau "aws". Si après le redémarrage, votre machine utilise toujours le noyau "aws", vous devrez mettre à jour manuellement le fichier grub. Alors lancez simplement :
:::

```bash
# ouvrir le fichier grub dans l'éditeur
nano /etc/default/grub
# Modifier la valeur de GRUB_DEFAULT de "0" à "1>2"
# Enregistrer et quitter le fichier

# Mettre à jour le grub
update-grub
# Redémarrez la machine
reboot now
```

Pour utiliser plusieurs instances Jibri, vous devez sélectionner manuellement différentes interfaces de bouclage pour chaque instance.

  Par défaut, la première instance a :

  ```
  ...
  slave.pcm "hw:Loopback,0,0"
  ...
  slave.pcm "hw:Loopback,0,1"
  ...
  slave.pcm "hw:Loopback,1,1"
  ...
  slave.pcm "hw:Loopback,1,0"
  ...
  ```

 Pour configurer la deuxième instance, exécutez le conteneur avec `/home/jibri/.asoundrc` modifié :

  ```
  ...
  slave.pcm "hw:Loopback_1,0,0"
  ...
  slave.pcm "hw:Loopback_1,0,1"
  ...
  slave.pcm "hw:Loopback_1,1,1"
  ...
  slave.pcm "hw:Loopback_1,1,0"
  ...
  ```

  Vous pouvez également utiliser l'identifiant de numérotation pour définir l'interface de bouclage. La troisième instance aura `.asoundrc` qui ressemble à :

  ```
  ...
  slave.pcm "hw:2,0,0"
  ...
  slave.pcm "hw:2,0,1"
  ...
  slave.pcm "hw:2,1,1"
  ...
  slave.pcm "hw:2,1,0"
  ...

  ```
</details>

Si vous souhaitez activer Jibri, ces options sont requises :

Variable | descriptif | Exemple
--- | --- | ---
`ENABLE_RECORDING` | Activer l'enregistrement/le streaming en direct | 1

Configuration Jibri étendue :

Variable | descriptif | Exemple
--- | --- | ---
`JIBRI_RECORDER_USER` | Utilisateur d'enregistreur interne pour les connexions client Jibri | enregistreur
`JIBRI_RECORDER_PASSWORD` | Mot de passe de l'enregistreur interne pour les connexions client Jibri | `<unset>`
`JIBRI_RECORDING_DIR` | Répertoire pour les enregistrements à l'intérieur du conteneur Jibri | /config/recordings
`JIBRI_FINALIZE_RECORDING_SCRIPT_PATH` | Le script final. S'exécutera une fois l'enregistrement terminé | /config/finalize.sh
`JIBRI_XMPP_USER` | Utilisateur interne pour les connexions client Jibri. | jibri
`JIBRI_STRIP_DOMAIN_JID` | Domaine de préfixe pour la bande à l'intérieur de Jibri (veuillez consulter env.example pour plus de détails) | muc
`JIBRI_BREWERY_MUC` | Nom MUC pour la piscine Jibri | jibribrewery
`JIBRI_PENDING_TIMEOUT` | Délai de connexion MUC | 90

### Configuration de Jitsi Meet

:::astuce Cette section contient en partie des paramètres en double

Il y a des paramètres dans votre ``docker-compose.yml`` comme ``START_AUDIO_MUTED`` qui seront écrasés si vous suivez le guide ci-dessous.

:::

Jitsi-Meet utilise deux fichiers de configuration pour modifier les paramètres par défaut dans
l'interface web : ``config.js`` et ``interface_config.js``. Les fichiers sont situés dans le répertoire ``CONFIG`` configuré dans votre fichier d'environnement.

Ces fichiers sont recréés à chaque redémarrage du conteneur.
Si vous souhaitez fournir vos propres paramètres, créez vos propres fichiers de configuration : ``custom-config.js`` et ``custom-interface_config.js``.

Il suffit de fournir uniquement vos paramètres pertinents, les scripts docker ajouteront vos fichiers personnalisés à ceux par défaut !

### Authentification

L'authentification peut être contrôlée avec les variables d'environnement ci-dessous. Si l'accès invité est activé, les utilisateurs non authentifiés devront attendre qu'un utilisateur s'authentifie avant de pouvoir rejoindre une salle. Si l'accès invité n'est pas activé, chaque utilisateur devra s'authentifier avant de pouvoir se joindre.

Si l'authentification est activée, une fois qu'un utilisateur authentifié est connecté, il est toujours connecté avant l'expiration de la session. Vous pouvez définir `ENABLE_AUTO_LOGIN=0` pour désactiver cette fonctionnalité de connexion automatique par défaut.

Variable | descriptif | Exemple
--- | --- | ---
`ENABLE_AUTH` | Activer l'authentification | 1
`ENABLE_GUESTS` | Activer l'accès invité | 1
`AUTH_TYPE` | Sélectionnez le type d'authentification (interne, jwt ou ldap) | internal
`ENABLE_AUTO_LOGIN` | Activer la connexion automatique  | 1

#### Authentification interne

Le mode d'authentification par défaut ("interne") utilise les informations d'identification XMPP pour authentifier les utilisateurs. Pour l'activer, vous devez activer l'authentification avec `ENABLE_AUTH` et définir `AUTH_TYPE` sur `internal`, puis configurer les paramètres que vous pouvez voir ci-dessous.

Les utilisateurs internes doivent être créés avec l'utilitaire ``prosodyctl`` dans le conteneur ``prosody``. Pour ce faire, exécutez d'abord un shell dans le conteneur correspondant :

```bash
docker-compose exec prosody /bin/bash
```

Une fois dans le conteneur, exécutez la commande suivante pour créer un utilisateur :

```bash
prosodyctl --config /config/prosody.cfg.lua register TheDesiredUsername meet.jitsi TheDesiredPassword
```

Notez que la commande ne produit aucune sortie.

Pour supprimer un utilisateur, exécutez la commande suivante dans le conteneur :

```bash
prosodyctl --config /config/prosody.cfg.lua unregister TheDesiredUsername meet.jitsi
```

Pour répertorier tous les utilisateurs, exécutez la commande suivante dans le conteneur :

```bash
find /config/data/meet%2ejitsi/accounts -type f -exec basename {} .dat \;
```

#### Authentification via LDAP

Vous pouvez utiliser LDAP pour authentifier les utilisateurs. Pour l'activer, vous devez activer l'authentification avec `ENABLE_AUTH` et
définissez `AUTH_TYPE` sur `ldap`, puis configurez les paramètres que vous pouvez voir ci-dessous.

Variable | descriptif | Exemple
--- | --- | ---
`LDAP_URL` | URL de connexion LDAP | ldaps://ldap.domain.com/
`LDAP_BASE` | DN de base LDAP. Peut être vide. | DC=example,DC=domain,DC=com
`LDAP_BINDDN` | DN de l'utilisateur LDAP. Ne spécifiez pas ce paramètre pour la liaison anonyme. | CN=binduser,OU=users,DC=example,DC=domain,DC=com
`LDAP_BINDPW` | DN de l'utilisateur LDAP. Ne spécifiez pas ce paramètre pour la liaison anonyme. | LdapUserPassw0rd
`LDAP_FILTER` | Filtre LDAP. | (sAMAccountName=%u)
`LDAP_AUTH_METHOD` | Méthode d'authentification LDAP. | bind
`LDAP_VERSION` | Version du protocole LDAP | 3
`LDAP_USE_TLS` | Activer LDAP TLS | 1
`LDAP_TLS_CIPHERS` | Définir la liste des chiffrements TLS pour autoriser | SECURE256:SECURE128
`LDAP_TLS_CHECK_PEER` | Exiger et vérifier le certificat du serveur LDAP | 1
`LDAP_TLS_CACERT_FILE` | Chemin d'accès au fichier de certificat CA. Utilisé lorsque la vérification du certificat du serveur est activée | /etc/ssl/certs/ca-certificates.crt
`LDAP_TLS_CACERT_DIR` | Chemin d'accès au répertoire des certificats CA. Utilisé lorsque la vérification du certificat du serveur est activée. | /etc/ssl/certs
`LDAP_START_TLS` | Activer START_TLS, nécessite LDAPv3, l'URL doit être ldap:// et non ldaps:// | 0
Authentification à l'aide de jetons JWT
#### 

Vous pouvez utiliser des jetons JWT pour authentifier les utilisateurs. Pour l'activer, vous devez activer l'authentification avec `ENABLE_AUTH` et définir `AUTH_TYPE` sur `jwt`, puis configurer les paramètres que vous pouvez voir ci-dessous.

Variable | descriptif | Exemple
--- | --- | ---
`JWT_APP_ID` | Identifiant D'application | my_jitsi_app_id
`JWT_APP_SECRET` | Secret d'application connu uniquement de votre token | my_jitsi_app_secret
`JWT_ACCEPTED_ISSUERS` | (Facultatif) Définissez asap_accepted_issuers en tant que liste séparée par des virgules | my_web_client,my_app_client
`JWT_ACCEPTED_AUDIENCES` | (Facultatif) Définissez asap_accepted_audiences en tant que liste séparée par des virgules | my_server1,my_server2
`JWT_ASAP_KEYSERVER` | (Facultatif) Définissez asap_keyserver sur une URL où les clés publiques peuvent être trouvées | https://example.com/asap
`JWT_ALLOW_EMPTY` | (Facultatif) Autoriser les utilisateurs anonymes sans JWT lors de la validation des JWT lorsqu'ils sont fournis | 0
`JWT_AUTH_TYPE` | (Facultatif) Contrôle quel module est utilisé pour traiter les JWT entrants | token
`JWT_TOKEN_AUTH_MODULE` | (Facultatif) Contrôle quel module est utilisé pour valider les JWT | token_verification

Cela peut être testé à l'aide du débogueur [jwt.io]. Utilisez l'exemple de charge utile suivant :

```json
{
  "context": {
    "user": {
      "avatar": "https://robohash.org/john-doe",
      "name": "John Doe",
      "email": "jdoe@example.com"
    }
  },
  "aud": "my_jitsi_app_id",
  "iss": "my_jitsi_app_id",
  "sub": "meet.jitsi",
  "room": "*"
}
```

#### Authentification à l'aide de Matrix

Pour plus d'informations voir la documentation de la "Prosody Auth Matrix User Verification" [ici](https://github.com/matrix-org/prosody-mod-auth-matrix-user-verification).

Variable | descriptif | Exemple
--- | --- | ---
`MATRIX_UVS_URL` | URL de base vers le service de vérification de l'utilisateur de la matrice (sans barre oblique de fin) | https://uvs.example.com:3000
`MATRIX_UVS_ISSUER` | (facultatif) L'émetteur du jeton d'authentification à transmettre. Doit correspondre à ce qui est défini comme "iss" dans le JWT. | issuer (default) 
`MATRIX_UVS_AUTH_TOKEN` | (facultatif) jeton d'authentification du service de vérification de l'utilisateur, si l'authentification est activée | changeme
`MATRIX_UVS_SYNC_POWER_LEVELS` | (facultatif) Faites des modérateurs de la salle Matrix les propriétaires de la salle Prosody. | 1

#### Authentification externe

Variable | descriptif | Exemple
--- | --- | ---
`TOKEN_AUTH_URL` | Authentifiez-vous à l'aide d'un service externe ou concentrez-vous simplement sur la fenêtre d'authentification externe s'il en existe déjà une. | https://auth.meet.example.com/{room}

### Édition de documents partagés à l'aide d'Etherpad

Vous pouvez éditer un document en collaboration via [Etherpad]. Pour l'activer, définissez les options de configuration ci-dessous et exécutez Docker Compose avec le fichier de configuration supplémentaire "etherpad.yml".

Voici les options requises :

Variable | descriptif | Exemple
--- | --- | ---
`ETHERPAD_URL_BASE` | Définir l'URL etherpad-lite | http://etherpad.meet.jitsi:9001

### Configuration de la transcription

Si vous souhaitez activer la fonction Transcription, ces options sont requises :

Variable | descriptif | Exemple
--- | --- | ---
`ENABLE_TRANSCRIPTIONS` | Activer la transcription Jigasi dans une conférence | 1
`GC_PROJECT_ID` | `project_id` de Google Cloud Credentials
`GC_PRIVATE_KEY_ID` | `private_key_id` de Google Cloud Credentials
`GC_PRIVATE_KEY` | `private_key` de Google Cloud Credentials
`GC_CLIENT_EMAIL` | `client_email` de Google Cloud Credentials
`GC_CLIENT_ID` | `client_id` de Google Cloud Credentials
`GC_CLIENT_CERT_URL` | `client_x509_cert_url` de Google Cloud Credentials
`JIGASI_TRANSCRIBER_RECORD_AUDIO` | Jigasi enregistrera l'audio lorsque le transcripteur sera activé | vrai
`JIGASI_TRANSCRIBER_SEND_TXT` | Jigasi enverra le texte transcrit au chat lorsque le transcripteur sera activé | vrai
`JIGASI_TRANSCRIBER_ADVERTISE_URL` | Jigasi publiera une URL sur le chat avec le fichier de transcription | vrai

Pour définir les informations d'identification Google Cloud, veuillez lire https://cloud.google.com/text-to-speech/docs/quickstart-protocol section "Avant de commencer" paragraphe 1 à 5.
Configuration de la journalisation sentinelle
### 

Variable | Descriptif | Valeur par défaut
--- | --- | ---
`JVB_SENTRY_DSN` | Nom de la source de données Sentry (endpoint pour le projet Sentry) | https://public:private@host:port/1
`JICOFO_SENTRY_DSN` | Nom de la source de données Sentry (endpoint pour le projet Sentry) | https://public:private@host:port/1
`JIGASI_SENTRY_DSN` | Nom de la source de données Sentry (endpoint pour le projet Sentry) | https://public:private@host:port/1
`SENTRY_ENVIRONMENT` | Informations facultatives sur l'environnement pour filtrer les événements | production
`SENTRY_RELEASE` | Informations de version facultatives pour filtrer les événements | 1.0.0

### TURN server config

Configurez les serveurs TURN externes.

Variable | Descriptif | Valeur par défaut
--- | --- | ---
`TURN_CREDENTIALS` | Informations d'identification pour les serveurs TURN
`TURN_HOST` | Nom d'hôte du serveur TURN (transport TCP)
`TURN_PORT` | Port du serveur TURN (transport TCP)
`TURNS_HOST` | Nom d'hôte du serveur TURN (transport TLS)
`TURNS_PORT` | Port du serveur TURN (transport TLS)

### Configuration avancée

Ces options de configuration sont déjà définies et n'ont généralement pas besoin d'être modifiées.

Variable | Descriptif | Valeur par défaut
--- | --- | ---
`XMPP_DOMAIN` | Domaine XMPP interne | rencontrez.jitsi
`XMPP_AUTH_DOMAIN` | Domaine XMPP interne pour les services authentifiés | auth.meet.jitsi
`XMPP_SERVER` | Nom du serveur XMPP interne xmpp.meet.jitsi | xmpp.meet.jitsi
`XMPP_BOSH_URL_BASE` | URL du serveur XMPP interne pour le module BOSH | http://xmpp.meet.jitsi:5280
`XMPP_MUC_DOMAIN` | domaine XMPP pour le MUC | muc.meet.jitsi
`XMPP_INTERNAL_MUC_DOMAIN` | Domaine XMPP pour le MUC interne | interne-muc.meet.jitsi
`XMPP_GUEST_DOMAIN` | Domaine XMPP pour les utilisateurs non authentifiés | invité.meet.jitsi
`XMPP_RECORDER_DOMAIN` | Domaine pour l'enregistreur jibri | recorder.meet.jitsi
`XMPP_MODULES` | Modules de prosodie personnalisés pour XMPP_DOMAIN (séparés par des virgules) | info, alerte
`XMPP_MUC_MODULES` | Modules de prosodie personnalisés pour le composant MUC (séparés par des virgules) | info, alerte
`XMPP_INTERNAL_MUC_MODULES` | Modules Prosody personnalisés pour le composant MUC interne (séparés par des virgules) | info, alerte
`MODULES_GLOBAUX` | Modules de prosodie personnalisés à charger dans la configuration globale (séparés par des virgules) | statistiques, alerte
`CONFIG_GLOBALE` | Chaîne de configuration personnalisée avec retour à la ligne échappé | foo = bar;\nkey = val;
`RESTART_POLICY` | Politique de redémarrage du conteneur | par défaut à `à moins d'être arrêté`
`DISABLE_HTTPS` | Gérer les connexions TLS en dehors de cette configuration | 0
`ENABLE_HTTP_REDIRECT` | Rediriger le trafic HTTP vers HTTPS | 0
`LOG_LEVEL` | Contrôle les journaux générés par la prosodie et les modules associés | Info
`ENABLE_HSTS` | Envoyez un en-tête `strict-transport-security` pour forcer les navigateurs à utiliser une connexion sécurisée et fiable. Recommandé pour une utilisation en production. | 1
`ENABLE_IPV6` | Fournit des moyens de désactiver IPv6 dans les environnements qui ne le prennent pas en charge | 1

#### Options avancées de prosodie

Variables | Descriptif | Valeur par défaut
--- | --- | ---
`PROSODY_RESERVATION_ENABLED` | Activer l'API REST de réservation de Prosody | faux
`PROSODY_RESERVATION_REST_BASE_URL` | URL de base de l'API REST de réservation de Prosody |

#### Options Jicofo avancées

variables | Descriptif | Valeur par défaut
--- | --- | ---
`JICOFO_COMPONENT_SECRET` | Mot de passe du composant XMPP pour Jicofo | s3cr37
`JICOFO_AUTH_USER` | Utilisateur XMPP pour les connexions client Jicofo | se concentrer
`JICOFO_AUTH_PASSWORD` | Mot de passe XMPP pour les connexions client Jicofo | `<non défini>`
`JICOFO_ENABLE_HEALTH_CHECKS` | Activer les contrôles de santé à l'intérieur de Jicofo, permettant l'utilisation de l'API REST pour vérifier l'état de Jicofo | faux

#### Options JVB avancées

Variable | Descriptif | Valeur par défaut
--- | --- | ---
`JVB_AUTH_USER` | Utilisateur XMPP pour les connexions client JVB MUC | jvb
`JVB_AUTH_PASSWORD` | Mot de passe XMPP pour les connexions client JVB MUC | `<non défini>`
`JVB_STUN_SERVERS` | Serveurs STUN utilisés pour découvrir l'IP publique du serveur | stun.l.google.com:19302, stun1.l.google.com:19302, stun2.l.google.com:19302
`JVB_PORT` | Port UDP pour les médias utilisé par Jitsi Videobridge | 10000
`JVB_COLIBRI_PORT` | Port API COLIBRI REST de JVB exposé à localhost | 8080
`JVB_BREWERY_MUC` | Nom MUC pour le pool JVB | jvbbrasserie
`COLIBRI_REST_ENABLED` | Activer l'API REST COLIBRI | vrai
`SHUTDOWN_REST_ENABLED` | Activer l'API REST d'arrêt | vrai

#### Options Jigasi avancées

Variable | Descriptif | Valeur par défaut
--- | --- | ---
`JIGASI_ENABLE_SDES_SRTP` | Activer SDES srtp | 0
`JIGASI_SIP_KEEP_ALIVE_METHOD` | Méthode Keepalive | OPTIONS
`JIGASI_HEALTH_CHECK_SIP_URI` | Extension de bilan de santé |
`JIGASI_HEALTH_CHECK_INTERVAL` | Intervalle de bilan de santé | 300000
`JIGASI_XMPP_USER` | Utilisateur XMPP pour les connexions client Jigasi MUC | jigasi
`JIGASI_XMPP_PASSWORD` | Mot de passe XMPP pour les connexions client Jigasi MUC | `<non défini>`
`JIGASI_BREWERY_MUC` | Nom MUC pour la piscine Jigasi | jigasibrasserie
`JIGASI_PORT_MIN` | Port minimum pour les médias utilisés par Jigasi | 20000
`JIGASI_PORT_MAX` | Port maximum pour les médias utilisés par Jigasi | 20050

### Exécution derrière NAT ou sur un environnement LAN

Lors de l'exécution dans un environnement LAN ou sur Internet public via NAT, la variable d'environnement ``JVB_ADVERTISE_IPS`` doit être définie.
Cette variable permet de contrôler les adresses IP que JVB publiera pour le trafic multimédia WebRTC.

:::note
Cette variable s'appelait auparavant ``DOCKER_HOST_ADDRESS`` mais elle a été renommée pour plus de clarté et pour prendre en charge une liste d'adresses IP.
:::

Si vos utilisateurs arrivent sur Internet (et non sur un réseau local), il s'agira probablement de votre adresse IP publique. Si cela n'est pas configuré correctement, les appels se bloquent lorsque plus de deux utilisateurs rejoignent une réunion.

L'adresse IP publique est tentée d'être découverte via [STUN]. Les serveurs STUN peuvent être spécifiés avec l'option ``JVB_STUN_SERVERS``.

:::note
En raison d'un bogue dans la version de docker actuellement dans les dépôts Debian (20.10.5), [Docker n'écoute pas sur les ports IPv6](https://forums.docker.com/t/docker-doesnt-open-ipv6-ports /106201/2), donc pour cette combinaison, vous devrez [obtenir manuellement la dernière version](https://docs.docker.com/engine/install/debian/).
:::

#### Split horizon

Si vous travaillez dans un environnement à horizon partagé (les clients internes du LAN se connectent à une adresse IP locale et les autres clients se connectent à une adresse IP publique), vous pouvez spécifier
plusieurs adresses IP annoncées en les séparant par des virgules :

```
JVB_ADVERTISE_IPS=192.168.1.1,1.2.3.4
```

## Accéder aux journaux du serveur

Le comportement par défaut de `docker-jitsi-meet` est de se connecter à `stdout`.

Bien que les journaux soient envoyés à `stdout`, ils ne sont pas perdus : à moins qu'ils ne soient configurés pour supprimer tous les journaux, Docker les garde disponibles pour une récupération et un traitement ultérieurs.

Si vous avez besoin d'accéder aux journaux du conteneur, plusieurs options s'offrent à vous. Voici les principaux :

* exécutez `docker-compose logs -t -f <service_name>` à partir de la ligne de commande, où `<service_name>` est l'un des `web`, `prosody`,`jvb`, `jicofo`. Cette commande affichera les journaux du service sélectionné sur stdout avec des horodatages.
* utilisez un [pilote de journalisation docker] standard (https://docs.docker.com/config/containers/logging/configure/) pour rediriger les journaux vers la cible souhaitée (par exemple `syslog` ou `splunk`).
* recherchez [docker hub](https://hub.docker.com/search?q=) pour un tiers [plugin de pilote de journalisation docker](https://docs.docker.com/config/containers/logging/plugins /)
* ou [écrivez votre propre plugin de pilote](https://docs.docker.com/engine/extend/plugins_logging/) si vous avez un besoin très spécifique.

Par exemple, si vous souhaitez que tous les journaux liés à un `<service_name>` soient écrits dans `/var/log/jitsi/<service_name>` en tant que sortie `json`, vous pouvez utiliser [docker-file-log-driver] (https://github.com/deep-compute/docker-file-log-driver) et configurez-le en ajoutant le bloc suivant dans votre fichier `docker-compose.yml`, au même niveau que le bloc `image` du `<service_name>` sélectionné :

```
services:
    <service_name>:
        image: ...
        ...
        logging:
            driver: file-log-driver
            options:
                fpath: "/jitsi/<service_name>.log"
```

Si vous souhaitez afficher uniquement la partie `message` du journal au format `json`, exécutez simplement la commande suivante (par exemple si `fpath` était défini sur `/jitsi/jvb.log`) qui utilise `jq` pour extraire la partie pertinente des journaux :


```
sudo cat /var/log/jitsi/jvb.log | jq -r '.msg' | jq -r '.message'
```

## Instructions de construction

La création de vos images vous permet de modifier les fichiers de configuration de chaque image individuellement, offrant ainsi plus de personnalisation pour votre déploiement.

Les images docker peuvent être construites en exécutant la commande `make` dans le dossier principal du référentiel. Si vous avez besoin d'écraser des images existantes à partir de la source distante, utilisez `FORCE_REBUILD=1 make`.

Si vous êtes sur la branche instable, construisez les images avec `FORCE_REBUILD=1 JITSI_RELEASE=unstable make`.

Vous pouvez maintenant exécuter `docker-compose up` comme d'habitude.

## Courir derrière un proxy inverse

Par défaut, cette configuration utilise des connexions WebSocket pour 2 composants principaux :

* Signalisation (XMPP)
* Pont canal (colibri)

En raison de la nature saut par saut de WebSockets, le proxy inverse doit correctement terminer et transférer les connexions WebSocket. Il existe 2 itinéraires nécessitant un tel traitement:

* /xmpp-websocket
* /colibri-ws

Avec nginx, ces routes peuvent être transférées à l'aide de l'extrait de configuration suivant :

```
location /xmpp-websocket {
    proxy_pass https://localhost:8443;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
location /colibri-ws {
    proxy_pass https://localhost:8443;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```
Avec apache, `mod_proxy` et `mod_proxy_wstunnel` doivent être activés et ces routes peuvent être transmises à l'aide de l'extrait de configuration suivant :

```
<IfModule mod_proxy.c>
    <IfModule mod_proxy_wstunnel.c>
        ProxyTimeout 900
        <Location "/xmpp-websocket">
            ProxyPass "wss://localhost:8443/xmpp-websocket"
        </Location>
        <Location "/colibri-ws/">
            ProxyPass "wss://localhost:8443/colibri-ws/"
        </Location>
    </IfModule>
</IfModule>

```

où `https://localhost:8443/` est l'URL de l'entrée du service Web.

### Désactivation des connexions WebSocket

:::Remarque
Ce n'est pas la configuration recommandée.
:::

Si l'utilisation de WebSockets n'est pas une option, ces variables d'environnement peuvent être définies pour se replier sur l'interrogation HTTP et les canaux de données WebRTC :

```bash
ENABLE_SCTP=1
ENABLE_COLIBRI_WEBSOCKET=0
ENABLE_XMPP_WEBSOCKET=0
```

[Jitsi]: https://jitsi.org/
[Jitsi Meet]: https://jitsi.org/jitsi-meet/
[Docker]: https://www.docker.com
[Docker Compose]: https://docs.docker.com/compose/
[Swarm mode]: https://docs.docker.com/engine/swarm/
[S6 Overlay]: https://github.com/just-containers/s6-overlay
[Jitsi repositories]: https://jitsi.org/downloads/
[Prosody]: https://prosody.im/
[Jicofo]: https://github.com/jitsi/jicofo
[Jitsi Videobridge]: https://github.com/jitsi/jitsi-videobridge
[Jigasi]: https://github.com/jitsi/jigasi
[ICE]: https://en.wikipedia.org/wiki/Interactive_Connectivity_Establishment
[STUN]: https://en.wikipedia.org/wiki/STUN
[jwt.io]: https://jwt.io/#debugger-io
[Etherpad]: https://github.com/ether/etherpad-lite
[Jibri]: https://github.com/jitsi/jibri
[latest release]: https://github.com/jitsi/docker-jitsi-meet/releases/latest