---
id: devops-guide-quickstart
title: "Guide d'auto-hébergement - Serveur Debian/Ubuntu"
sidebar_label: 'Serveur Debian/Ubuntu'
---

Suivez ces étapes pour une installation rapide de Jitsi-Meet sur un système GNU/Linux basé sur Debian.
Les distributions suivantes sont prises en charge prêtes à l'emploi :

- Debian 10 (Buster) ou plus récent
- Ubuntu 20.04 (Focal Fossa) ou plus récent (Ubuntu 18.04 peut être utilisé, mais la version Prosody doit être mise à jour vers 0.11+ avant l'installation)

:::note
De nombreuses étapes d'installation nécessitent un accès `root` ou `sudo`. Il est donc recommandé d'avoir un accès `sudo`/`root` à votre système.
:::

## Required packages and repository updates

You will need the following packages:

- `gnupg2`
- `nginx-full`
- `sudo` => **Nécessaire uniquement si vous utilisez `sudo`**
- `curl` => **Ou** `wget` **pour [Ajouter le référentiel de packages Jitsi](#add-the-jitsi-package-repository)**

:::note REMARQUE
OpenJDK 11 doit être utilisé.
:::

Assurez-vous que votre système est à jour et que les packages requis sont installés :

Exécutez en tant que `root` ou avec `sudo` :

```bash
# Récupérer les dernières versions de packages dans tous les référentiels
sudo apt update

# Assurer la prise en charge des référentiels apt servis via HTTPS
sudo apt install apt-transport-https
```

Sur les systèmes Ubuntu, Jitsi nécessite des dépendances du référentiel de packages "universe" d'Ubuntu. Pour vous assurer que cette option est activée, exécutez cette commande :

```bash
sudo apt-add-repository universe
```

Retrieve the latest package versions across all repositories:

```bash
sudo apt update
```

## Installer Jitsi Meet

### Domaine de votre serveur et configuration DNS

Décidez quel domaine votre serveur utilisera. Par exemple, `meet.example.org`.

Définissez un enregistrement DNS A pour ce domaine, en utilisant :

- l'adresse IP publique de votre serveur, s'il possède sa propre IP publique ; ou alors
- l'adresse IP publique de votre routeur, si votre serveur a une adresse IP privée (RFC1918) (par exemple 192.168.1.2) et se connecte via votre routeur via Network Address Translation (NAT).

Si votre ordinateur/serveur ou routeur a une adresse IP dynamique (l'adresse IP change constamment), vous pouvez utiliser un service DNS dynamique à la place. Exemple [DuckDNS](https://www.duckdns.org/).

Exemple d'enregistrement DNS :

| **Record Type** |    **Hostname**    |                    **Public IP**                    | **TTL (Seconds)** |
| :-------------: | :----------------: | :-------------------------------------------------: | :---------------: |
|       `A`       | `meet.example.org` | IP publique de votre serveur de réunion (`x.x.x.x`) |      `1800`       |

### Configurer le nom de domaine complet (FQDN) (facultatif)

Si la machine utilisée pour héberger l'instance Jitsi Meet a un FQDN (par exemple `meet.example.org`) déjà configuré dans DNS, vous pouvez le définir avec la commande suivante :

```bash
sudo hostnamectl set-hostname meet.example.org
```

Ajoutez ensuite le même FQDN dans le fichier `/etc/hosts` :

    127.0.0.1 localhost
    x.x.x.x meet.example.org

:::note
`x.x.x.x` est l'adresse IP publique de votre serveur.
:::

Enfin sur la même machine testez que vous pouvez pinger le FQDN avec :

`ping "$(hostname)"`

Si tout a fonctionné comme prévu, vous devriez voir :
`meet.example.org`

### Ajouter le référentiel de packages Prosody

Cela ajoutera le référentiel Prosody afin qu'un Prosody à jour soit installé, ce qui est nécessaire pour les fonctionnalités, y compris la fonctionnalité de lobby.

```bash
echo deb http://packages.prosody.im/debian $(lsb_release -sc) main | sudo tee -a /etc/apt/sources.list
wget https://prosody.im/files/prosody-debian-packages.key -O- | sudo apt-key add -
apt install lua5.2
```

### Ajouter le référentiel de packages Jitsi

Cela ajoutera le référentiel jitsi à vos sources de packages pour rendre les packages Jitsi Meet disponibles.

```bash
curl https://download.jitsi.org/jitsi-key.gpg.key | sudo sh -c 'gpg --dearmor > /usr/share/keyrings/jitsi-keyring.gpg'
echo 'deb [signed-by=/usr/share/keyrings/jitsi-keyring.gpg] https://download.jitsi.org stable/' | sudo tee /etc/apt/sources.list.d/jitsi-stable.list > /dev/null
```

Mettez à jour toutes les sources de packages :

```bash
sudo apt update
```

### Installez et configurez votre pare-feu

Les ports suivants doivent être ouverts dans votre pare-feu pour autoriser le trafic vers le serveur Jitsi Meet :

- `80 TCP` => Pour vérification/renouvellement de certificat SSL avec Let's Encrypt. **Obligatoire**
- `443 TCP` => Pour un accès général à Jitsi Meet. **Obligatoire**
- `10000 UDP` => Pour les réunions audio/vidéo générales du réseau. **Obligatoire**
- `22 TCP` => Pour accéder à votre serveur en utilisant SSH (modifiez le port en conséquence si ce n'est pas 22). **Obligatoire**
- `3478 UDP` => Pour interroger le serveur stun (coturn, facultatif, nécessite une modification de `config.js` pour l'activer).
- `5349 TCP` => Pour les communications vidéo/audio réseau de secours sur TCP (lorsque UDP est bloqué par exemple), desservies par coturn. **Obligatoire**

Si vous utilisez `ufw`, vous pouvez utiliser les commandes suivantes :

```bash
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

#### Utiliser SSH

Pour plus de détails sur l'utilisation et le renforcement de l'accès SSH, consultez la documentation [Debian](https://wiki.debian.org/SSH) ou [Ubuntu](https://help.ubuntu.com/community/SSH/OpenSSH/Configuring) correspondante.

#### Rediriger les ports via votre routeur

Si vous exécutez Jitsi Meet sur un serveur [derrière NAT](https://jitsi.github.io/handbook/fr/docs/faq#comment-savoir-si-mon-instance-de-serveur-est-derrière-nat-) , redirigez les ports de votre routeur vers l'adresse IP de votre serveur.

_Remarque_: si les participants ne peuvent pas se voir ou s'entendre, revérifiez vos règles de pare-feu/NAT.

### Certificat TLS

Pour avoir des communications cryptées, vous avez besoin d'un [certificat TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security).

Lors de l'installation de Jitsi Meet vous pouvez choisir entre différentes options :

1. L'option recommandée est de choisir l'option Let's Encrypt Certificate

2. Mais si vous souhaitez utiliser un certificat différent, vous devez d'abord obtenir ce certificat, puis installer jitsi-meet et choisir **_Je veux utiliser mon propre certificat_**.

3. Vous pouvez également utiliser le certificat auto-signé (**_Générer un nouveau certificat auto-signé_**) mais cela n'est pas recommandé pour les raisons suivantes :

   - L'utilisation d'un certificat auto-signé entraînera l'affichage d'avertissements dans les navigateurs de vos utilisateurs, car ils ne peuvent pas vérifier l'identité de votre serveur.

- Les applications mobiles Jitsi Meet _nécessitent_ un certificat valide signé par une [autorité de certification] de confiance (https://en.wikipedia.org/wiki/Certificate_authority) et ne pourront pas se connecter à votre serveur si vous choisissez une auto- certificat signé.

### Installer Jitsi Meet

_Remarque_: Le programme d'installation vérifiera si [Nginx](https://nginx.org/) ou [Apache](https://httpd.apache.org/) sont présents (dans cet ordre) et configurera un hôte virtuel dans le serveur Web il trouve pour servir Jitsi Meet.

Si vous exécutez déjà Nginx sur le port 443 sur la même machine, la configuration de turnserver sera ignorée car elle entrera en conflit avec votre port 443 actuel.

```bash
# jitsi-meet installation
sudo apt install jitsi-meet
```

**Génération de certificat SSL/TLS:**
Vous serez interrogé sur la génération de certificat SSL/TLS.
Voir [ci-dessus](#tls-certificate) pour plus de détails.

**Nom d'hôte :**
Il vous sera également demandé de saisir le nom d'hôte de l'instance Jitsi Meet. Si vous avez un domaine, utilisez le nom de domaine spécifique, par exemple :
`meet.example.org`.
Vous pouvez également entrer l'adresse IP de la machine (si elle est statique ou ne change pas).

Ce nom d'hôte sera utilisé pour la configuration de l'hôte virtuel dans Jitsi Meet et également, vous et vos correspondants l'utiliserez pour accéder aux conférences Web.

### Contrôle d'accès

**Jitsi Meet server:**
_Remarque_: Par défaut, toute personne ayant accès à votre serveur Jitsi Meet pourra démarrer une conférence : si votre serveur est ouvert sur le monde, n'importe qui peut discuter avec n'importe qui d'autre.
Si vous souhaitez limiter la possibilité de démarrer une conférence aux utilisateurs enregistrés, suivez les instructions pour configurer un [domaine sécurisé](secure-domain).

**Conférences/Salles :**
Le contrôle d'accès aux conférences/salles est géré dans les salles, vous pouvez définir un mot de passe sur la page Web de la salle spécifique après sa création.
Consultez le Guide de l'utilisateur pour plus de détails : https://jitsi.github.io/handbook/fr/docs/user-guide/user-guide-start-a-jitsi-meeting

#### Configuration avancée

Si l'installation est sur une machine [derrière NAT](https://jitsi.github.io/handbook/fr/docs/faq#comment-savoir-si-mon-instance-de-serveur-est-derrière-nat-) jitsi- videobridge devrait se configurer automatiquement au démarrage. Si les appels à trois ne fonctionnent pas, une configuration supplémentaire de jitsi-videobridge est nécessaire pour qu'il soit accessible de l'extérieur.

À condition que tous les ports requis soient acheminés (transférés) vers la machine sur laquelle il s'exécute. Par défaut, ces ports sont TCP/443 et UDP/10000.

Les lignes supplémentaires suivantes doivent être ajoutées au fichier `/etc/jitsi/videobridge/sip-communicator.properties` :

```
org.ice4j.ice.harvest.NAT_HARVESTER_LOCAL_ADDRESS=<Local.IP.Address>
org.ice4j.ice.harvest.NAT_HARVESTER_PUBLIC_ADDRESS=<Public.IP.Address>
```

Et commentez l'existant `org.ice4j.ice.harvest.STUN_MAPPING_HARVESTER_ADDRESSES`.

Voir [la documentation d'ice4j](https://github.com/jitsi/ice4j/blob/master/doc/configuration.md)
pour plus de détails.

**Systemd/Limites:**
Les déploiements par défaut sur les systèmes utilisant systemd auront des valeurs par défaut faibles pour un maximum de processus et de fichiers ouverts. Si le pont utilisé attend un nombre plus élevé de participants, les valeurs par défaut doivent être ajustées (les valeurs par défaut sont bonnes pour moins de 100 participants).

Pour mettre à jour les valeurs, modifiez `/etc/systemd/system.conf` et assurez-vous d'avoir les valeurs suivantes si les valeurs sont plus petites, sinon ne mettez pas à jour.

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

Pour charger les valeurs et les vérifier, voir [ci-dessous] (#systemd-details) pour plus de détails.

##### Détails du système

Pour recharger les modifications systemd sur un système en cours d'exécution, exécutez `sudo systemctl daemon-reload` et `sudo systemctl restart jitsi-videobridge2`.
Pour vérifier la partie tâches, exécutez `sudo systemctl status jitsi-videobridge2` et vous devriez voir `Tasks: XX (limit: 65000)`.
Pour vérifier les fichiers et traiter la partie, exécutez `` cat /proc/`cat /var/run/jitsi-videobridge/jitsi-videobridge.pid`/limits `` et vous devriez voir :

```
Max processes             65000                65000                processes
Max open files            65000                65000                files
```

### Confirmez que votre installation fonctionne

Lancez un navigateur Web (tel que Firefox, Chrome ou Safari) et entrez le nom d'hôte ou l'adresse IP de l'étape précédente dans la barre d'adresse.

Si vous avez utilisé un certificat auto-signé (au lieu d'utiliser Let's Encrypt), votre navigateur Web vous demandera de confirmer que vous faites confiance au certificat. Si vous testez à partir de l'application iOS ou Android, cela échouera probablement à ce stade, si vous utilisez un certificat auto-signé.

Vous devriez voir une page Web vous invitant à créer une nouvelle réunion.
Assurez-vous que vous pouvez créer une réunion avec succès et que d'autres participants peuvent rejoindre la session.

Si tout cela a fonctionné, alors félicitations ! Vous disposez d'un service de conférence Jitsi opérationnel.

## Désinstaller

```bash
sudo apt purge jigasi jitsi-meet jitsi-meet-web-config jitsi-meet-prosody jitsi-meet-turnserver jitsi-meet-web jicofo jitsi-videobridge2
```

Parfois, les packages suivants ne se désinstallent pas correctement :

- jigasi
- jitsi-videobridge

Lorsque cela se produit, exécutez simplement la commande de désinstallation une deuxième fois et tout devrait bien se passer.

La raison de l'échec est que parfois le script de désinstallation est plus rapide que le processus qui arrête les démons. La deuxième exécution de la commande de désinstallation corrige ce problème, car à ce moment-là, les démons jigasi ou jitsi-videobridge sont déjà arrêtés.

## Problèmes de débogage

- Navigateur Web :
  Vous pouvez essayer d'utiliser un autre navigateur Web. Certaines versions de certains navigateurs sont connues pour avoir des problèmes avec Jitsi Meet.

- WebRTC, Webcam et Micro :
  Vous pouvez également visiter https://webrtc.github.io/samples/src/content/getusermedia/gum pour tester la compatibilité [WebRTC](https://en.wikipedia.org/wiki/WebRTC) de votre navigateur.

- Pare-feu:
  Si les participants ne peuvent pas se voir ou s'entendre, revérifiez vos règles de pare-feu/NAT.

\*Nginx/Apache :
Comme nous préférons l'utilisation de Nginx comme serveur Web, le programme d'installation vérifie d'abord la présence de Nginx, puis d'Apache. Au cas où vous auriez désespérément besoin d'imposer l'utilisation d'Apache, essayez de prérégler la variable `jitsi-meet/enforce_apache` pour le paquet `jitsi-meet-web-config` sur debconf.

- Fichiers journaux :
  Jetez un œil aux différents fichiers journaux :

```
/var/log/jitsi/jvb.log
/var/log/jitsi/jicofo.log
/var/log/prosody/prosody.log
```

## Fonctions supplémentaires

### Ajouter une passerelle SIP à Jitsi Meet

#### Installer Jigasi

Jigasi est une application côté serveur agissant comme une passerelle vers les conférences Jitsi Meet. Il permet aux clients [SIP](https://en.wikipedia.org/wiki/Session_Initiation_Protocol) réguliers de rejoindre des réunions et offre des fonctionnalités de transcription.

```bash
sudo apt install jigasi
```

Lors de l'installation, il vous sera demandé d'entrer votre compte SIP et votre mot de passe. Ce compte sera utilisé pour inviter les autres participants SIP.

#### Recharger Jitsi Meet

Lancez à nouveau un navigateur avec l'URL Jitsi Meet et vous verrez une icône de téléphone à l'extrémité droite de la barre d'outils. Utilisez-le pour inviter des comptes SIP à rejoindre la conférence en cours.

Apprécier!
