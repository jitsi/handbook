---
id: faq
title: FAQ
---

## Comment savoir si mon instance de serveur est derrière NAT ?

En général, si l'outil ifconfig (ou ipconfig) indique que l'adresse IPv4 attribuée est une adresse privée/locale (10.x.x.x, ou 172.16.x.x - 172.31.x.x, ou 192.168.x.x) mais que vous savez que son adresse IPv4 publique est différent de cela, le serveur est très probablement derrière NAT.

Si vous hébergez votre serveur sur un VPS et que vous n'êtes pas sûr, demandez à l'équipe de support de votre fournisseur VPS.

## Les clients pouvaient bien communiquer dans la salle créée sur `meet.jit.si`. Les mêmes clients peuvent toujours se connecter à mon instance auto-hébergée mais ne peuvent ni s'entendre ni se voir. Qu'est-ce qui ne va pas?

Très probablement, le serveur est derrière NAT, mais vous n'avez pas ajouté la configuration spécifique à NAT. Voir cette [question résolue](https://community.jitsi.org/t/cannot-see-video-or-hear-audio-on-self-hosted-instance/). Vous devez suivre les étapes détaillées [ici.](devops-guide/devops-guide-quickstart#advanced-configuration).

## Il fonctionne avec deux participants, mais plante ou ne fonctionne pas correctement lorsqu'un troisième se joint

Le mode P2P fonctionne, mais il échoue lorsque vous essayez de faire passer le trafic via jitsi-videobridge2.

Vérifiez que votre pare-feu/NAT est correctement configuré, en particulier UDP 10000. Pour plus d'informations, cliquez [ici](devops-guide/devops-guide-quickstart#setup-and-configure-your-firewall).

## Puis-je activer et désactiver le son d'autres participants ?

Si vous êtes le modérateur d'une conférence (tout le monde est modérateur si vous utilisez `meet.jit.si`), vous pouvez désactiver le microphone de tout le monde. Vous ne pouvez pas réactiver les microphones d'autres personnes, et elles peuvent réactiver leur microphone à tout moment.

Vous voudrez peut-être définir des "règles de base" pour savoir qui peut parler et quand, comme pour toute réunion physique ou salle de classe.

Si vous souhaitez limiter qui peut devenir modérateur, vous devez configurer votre propre instance de Jitsi et activer le "domaine sécurisé". Veuillez vous reporter [ici](#4-enable-secure-domain-if-you-are-using-your-own-instance-of-jitsi) pour plus d'informations.

## Comment puis-je protéger mes réunions avec Jitsi ?

### _1. Créez un nom de pièce "fort"._

Utilisez un nom de salle fort, que personne d'autre n'est susceptible d'utiliser. Utilisez le générateur de noms sur la page d'accueil, ou bien générez votre propre nom "fort".

Par exemple, sur macOS, dans le terminal, vous pouvez utiliser `uuidgen` pour générer une chaîne de lettres de chiffres (par exemple B741B63E-C5E6-4D82-BAC4-048BE25D8CC7).

Le nom de votre salle serait `meet.jit.si/B741B63E-C5E6-4D82-BAC4-048BE25D8CC7` sur la plate-forme hébergée `meet.jit.si`.

Si vous utilisez "test" ou "LucysMeeting" ou "pilates" ou similaire, il est fort probable que d'autres utilisateurs aient eu la même idée.

### _2. Utilisez un nom de salle différent pour chaque réunion/conférence que vous avez._

Si vous avez plusieurs réunions, utilisez idéalement un nom de salle différent pour chacune.

Si ce n'est pas pratique, utilisez au moins un nom de pièce différent pour chaque groupe de personnes.

### _3. Ajoutez un mot de passe à la salle._

Une fois que vous avez démarré votre salle, définissez un mot de passe pour celle-ci. Seules les personnes qui ont le mot de passe peuvent rejoindre à partir de ce moment, mais cela n'affecte pas les personnes qui ont déjà rejoint.

Vous devrez dire à tout le monde le mot de passe.

S'ils donnent le mot de passe à d'autres, ces autres personnes peuvent également se joindre.

### _4. Activez "domaine sécurisé" si vous utilisez votre propre instance de Jitsi._

En plus des conseils ci-dessus, envisagez d'activer la [configuration "domaine sécurisé"](https://jitsi.github.io/handbook/docs/devops-guide/secure-domain). Cela nécessite que vous (ou quelqu'un d'autre) saisissiez un nom d'utilisateur et un mot de passe pour ouvrir une salle. Il vous permet également de devenir modérateur.

## Cela fonctionne lorsque je me connecte depuis un navigateur, mais pas depuis les applications iOS ou Android

Cela signifie probablement que vous ne servez pas la chaîne complète pour votre certificat TLS. Vous pouvez vérifier si votre chaîne de certification
est correctement configuré [ici](https://whatsmychaincert.com/).

Dans nginx, si vous utilisez Let's Encrypt, vous devriez avoir une ligne comme celle-ci :

`ssl_certificate /etc/letsencrypt/live/jitsi.example.com/fullchain.pem;`


## Puis-je enregistrer et sauvegarder la vidéo ?

Oui. Il existe plusieurs méthodes (à l'aide de logiciels ou de services externes) :

_Note_: Si vous souhaitez utiliser une méthode respectueuse de la vie privée, utilisez la méthode 1 ou 2.

1. **OBS**: Utilisez [OBS](https://obsproject.com/) pour enregistrer votre session (par exemple, la fenêtre de votre navigateur).

2. **RTMP-Server**: Pour cela, vous devez configurer votre propre serveur RTMP, puis utiliser votre URL RTMP + clé de flux au lieu de la clé de flux Youtube comme décrit [ici](https://jitsi.org/blog/live-streaming-with-jitsi-and-youtube/). Les déploiements Jitsi Meet auto-installés devront configurer Jibri pour ce faire.

3. **Dropbox**: [Connectez-vous à Dropbox avec Jitsi Meet](/handbook/docs/dev-guide/dev-guide-web-integrations#creating-the-dropbox-app-for-dropbox-recording-integration) et enregistrez la vidéo dans la Dropbox

4. **Video Services/Websites**: Diffusez votre conférence sur YouTube ou d'autres sites (par exemple Twitch) et accédez à l'enregistrement (voir [comment](https://jitsi.org/blog/live-streaming-with-jitsi-and-youtube/)). Les déploiements Jitsi Meet auto-installés devront configurer Jibri pour ce faire.

D'autres méthodes pourraient être mises en œuvre à l'avenir, mais ne sont pas encore prêtes (par exemple, [enregistrement local](https://github.com/jitsi/jitsi-meet/issues/6014).

## J'ai défini le mot de passe en réunion mais il ne fonctionne pas la prochaine fois
Une fois la réunion terminée, son mot de passe est également supprimé, vous devez donc redéfinir le mot de passe pour la prochaine réunion.

## How to limit the number of participants?

1. Utilisez la commande `prosodyctl about` pour afficher la version du répertoire prosody et plug, similaire à la sortie ci-dessous.

```
Prosody 0.11.6

# Prosody directories

Data directory: /var/lib/prosody

Config directory: /etc/prosody

Source directory: /usr/lib/prosody

Plugin directories:

/usr/share/jitsi-meet/prosody-plugins/

/usr/lib/prosody/modules/
```

2. Vérifiez s'il y a un fichier `mod_muc_max_occupants.lua` dans votre répertoire de plugins.

Sinon, veuillez créer un nouveau fichier `mod_muc_max_occupants.lua` dans le répertoire du plugin et copier tout d'[ici](https://github.com/jitsi/jitsi-meet/blob/master/resources/prosody-plugins/mod_muc_max_occupants.lua) pour coller.

S'il existe, veuillez ignorer cette étape.

3.Modifiez votre fichier `/etc/prosody/conf.avail/meet.example.com.cfg.lua` et ajoutez `muc_max_occupants` en tant que module_enabled dans la section "muc" de conference.meet.example.com.

Ensuite, ajoutez les options ci-dessous. Vous devez définir à la fois `muc_max_occupants` et `muc_access_whitelist`.

Exemple:

```
Component "conference.meet.example.com" "muc"
   storage = "memory"
   modules_enabled = {
       "muc_meeting_id";
       "muc_domain_mapper";
       "muc_max_occupants"; 
   }
   muc_max_occupants = "5"
   muc_access_whitelist = { "focus@auth.meet.example.com" }
   admins = { "focus@auth.meet.example.com" }
   muc_room_locking = false
   muc_room_default_public_jids = true
```

La relation entre storage="" et votre version de prosodie, et vous devez modifier tous les storage="" .
- Prosody nightly747 storage = "null"
- Prosody 0.10 storage = "none"
- Prosody 0.11 storage = "memory"

4. Vous devez utiliser la commande `prosodyctl restart` pour voir l'effet.

5. Si vous souhaitez mettre à jour pour utiliser la prosodie, vous pouvez vérifier [ici](https://community.jitsi.org/t/how-to-how-do-i-update-prosody/72205).
