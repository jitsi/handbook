---
id: secure-domain
title: Configuration du domaine sécurisé
sidebar_label: Authentification (domaine sécurisé)
---

Il est possible de n'autoriser que les utilisateurs authentifiés à créer de nouvelles salles de conférence. Chaque fois qu'une nouvelle salle est sur le point d'être créée, Jitsi Meet vous demandera un nom d'utilisateur et un mot de passe. Une fois la salle créée, d'autres personnes pourront la rejoindre à partir d'un domaine anonyme. Voici ce qu'il faut configurer :

## Prosody configuration

If you have installed Jitsi Meet from the Debian package, these changes should be made in `/etc/prosody/conf.avail/[your-hostname].cfg.lua`

### Activer l'authentification

Dans le bloc `VirtualHost "[your-hostname]"`, remplacez l'authentification anonyme par l'authentification par mot de passe haché :

```
VirtualHost "jitsi-meet.example.com"
    authentication = "internal_hashed"
```

Remplacez `jitsi-meet.example.com` par votre nom d'hôte.

### Activer la connexion anonyme pour les invités

Ajoutez ce bloc **après le précédent VirtualHost** pour activer la méthode de connexion anonyme pour les invités :

```
VirtualHost "guest.jitsi-meet.example.com"
    authentication = "anonymous"
    c2s_require_encryption = false
```

_Notez que `guest.jitsi-meet.example.com` est interne à Jitsi, et vous n'avez pas besoin (et ne devriez pas) créer un enregistrement DNS pour lui, ou générer un certificat SSL/TLS, ou faire une configuration de serveur Web . Bien qu'il soit interne, vous devez toujours remplacer `jitsi-meet.example.com` par votre nom d'hôte._

## Configuration de Jitsi Meet

Dans config.js, les options `anonymousdomain` doivent être définies.

Si vous avez installé jitsi-meet à partir du paquet Debian, ces modifications doivent être apportées dans `/etc/jitsi/meet/[your-hostname]-config.js`.

```
var config = {
    hosts: {
            domain: 'jitsi-meet.example.com',
            anonymousdomain: 'guest.jitsi-meet.example.com',
            ...
        },
        ...
}
```

## Configuration Jicofo

Lors de l'exécution de Jicofo, spécifiez votre domaine principal dans une configuration supplémentaire
biens. Jicofo n'acceptera les demandes d'allocation de conférence que du
domaine authentifié. Cela devrait aller comme une nouvelle section 'authentification' dans `/etc/jitsi/jicofo/jicofo.conf` :

```
jicofo {
  authentication: {
    enabled: true
    type: XMPP
    login-url: jitsi-meet.example.com
 }
 ...
```

Lors de l'utilisation de l'authentification basée sur les jetons, le type doit utiliser "JWT" ​​comme schéma à la place :

```
jicofo {
  authentication: {
    enabled: true
    type: JWT
    login-url: jitsi-meet.example.com
 }
 ...
```

## Créer des utilisateurs dans Prosody (authentification interne)

Enfin, exécutez `prosodyctl` pour créer un utilisateur dans Prosody :

```
sudo prosodyctl register <username> jitsi-meet.example.com <password>
```
puis redémarrez prosody, jicofo et jitsi-videobridge2
```
systemctl restart prosody
systemctl restart jicofo
systemctl restart jitsi-videobridge2
```
## Facultatif : configuration Jigasi

### Activer l'authentification

Si vous utilisez Jigasi, configurez-le pour s'authentifier en modifiant les lignes suivantes dans `/etc/jitsi/jigasi/sip-communicator.properties` :

````
org.jitsi.jigasi.xmpp.acc.USER_ID=SOME_USER@SOME_DOMAIN
org.jitsi.jigasi.xmpp.acc.PASS=SOME_PASS
org.jitsi.jigasi.xmpp.acc.ANONYMOUS_AUTH=false
````

Notez que le mot de passe est le mot de passe réel en clair, pas un encodage base64.

### Débogage

Si vous rencontrez des problèmes avec une chaîne de certificats, vous devrez peut-être décommenter la ligne suivante, également dans `sip-communicator.properties` :

````
net.java.sip.communicator.service.gui.ALWAYS_TRUST_MODE_ENABLED=true
````

:::Remarque
Cela ne doit être utilisé qu'à des fins de test/débogage ou dans des environnements contrôlés. Si vous confirmez qu'il s'agit du problème, vous devez alors le résoudre d'une autre manière (par exemple, obtenir un certificat signé pour Prosody ou ajouter le certificat particulier au magasin de confiance de Jigasi).
:::
