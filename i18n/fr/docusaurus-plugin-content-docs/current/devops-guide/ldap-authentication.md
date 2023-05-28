---
id: ldap-authentication
title: Authentification LDAP
sidebar_label: Authentification LDAP
---

:::note
Il s'agit d'un premier brouillon et il se peut qu'il ne fonctionne pas sur votre système. Il a été testé sur une installation Debian 11 avec la prosodie 0.11 et s'authentifie auprès d'un répertoire OpenLDAP.
:::

Si vous souhaitez authentifier vos utilisateurs par rapport à un annuaire LDAP à la place
de la base de données locale des utilisateurs de Prosody, vous pouvez utiliser le package Cyrus SASL.
À l'aide de ce package, vous pourrez peut-être valider les informations d'identification fournies par l'utilisateur
contre d'autres sources, telles que PAM, SQL et plus - mais cela va au-delà
Cet article.

## Conditions préalables

Avant de suivre cet article, assurez-vous d'avoir configuré Prosody comme
décrit dans [Authentification (domaine sécurisé)](secure-domain.md) en premier.

### Forfaits requis

Sur les systèmes Debian, vous devez installer certains packages requis :

```
sudo apt-get install sasl2-bin libsasl2-modules-ldap lua-cyrussasl
sudo prosodyctl install --server=https://modules.prosody.im/rocks/ mod_auth_cyrus
```

Les deux premiers packages sont nécessaires pour `saslauthd` de Cyrus et lui permettent de se connecter à un annuaire LDAP. Le paquet `lua-cyrussasl` permet
Prosodie pour accéder à Cyrus SASL.

L'installation du module [mod_auth_cyrus](https://modules.prosody.im/mod_auth_cyrus) est nécessaire car la prise en charge de Cyrus SASL a été [supprimée](https://prosody.im/doc/cyrus_sasl) de Prosody principal et placée dans le référentiel de modules de la communauté.

## Installer et configurer Cyrus SASL

Les options suivantes définissent une configuration LDAP de base. Un ensemble complet de
les options possibles peuvent être trouvées dans [LDAP_SASLAUTHD](https://github.com/winlibs/cyrus-sasl/blob/master/saslauthd/LDAP_SASLAUTHD).

Par défaut, `saslauthd` de Cyrus recherche sa configuration LDAP dans `/etc/saslauthd.conf`. Créez donc ce fichier et entrez quelque chose de similaire pour définir votre environnement LDAP :

```
ldap_servers: ldaps://ldap.example.com
ldap_bind_dn: admin@example.com
ldap_bind_pw: topsecret
ldap_auth_method: bind
ldap_search_base: ou=people,dc=example,dc=com
```

:::note
Une option omise que vous voudrez peut-être examiner est `ldap_filter` qui est par défaut `uid=%u` et devrait fonctionner pour de nombreux systèmes. Si vous utilisez une instance Samba ou Microsoft AD comme serveur LDAP, vous devrez peut-être le remplacer par `ldap_filter : (sAMAccountName=%U)` car `uid` est NULL par défaut dans de nombreuses configurations. Vous pouvez également utiliser le `ldap_filter` pour autoriser uniquement l'accès à des utilisateurs spécifiques. Pour plus de détails à ce sujet et sur d'autres options, consultez le document `LDAP_SASLAUTHD` lié ci-dessus.

Veuillez noter que Prosody peut rencontrer des problèmes avec les noms d'utilisateur contenant le symbole "@". Vous pouvez contourner ce problème en remplaçant `uid=%u` par `uid=%U`, qui est [défini](https://github.com/winlibs/cyrus-sasl/blob/d933c030ce12ec0668469d79ab8378e347a1b3ba/saslauthd/LDAP_SASLAUTHD# L126) comme "partie utilisateur de %u (%U = test quand %u = test@domain.tld)"
:::

### Tester l'authentification LDAP

Pour tester si la configuration LDAP fonctionne, vous pouvez démarrer `saslauthd` en mode débogage tout en spécifiant le mécanisme d'authentification LDAP obligatoire :

```
sudo saslauthd -d -a ldap
```

L'utilitaire de test du serveur d'authentification SASL peut alors être utilisé dans un terminal secondaire. Remplacez `user` et `password` par les informations d'identification stockées dans LDAP.

```
sudo testsaslauthd -u user -p password
0: OK "Success."
sudo testsaslauthd -u user -p wrongpassword
0: NO "authentication failed"
```

Après le test, vous pouvez arrêter `saslauthd` en utilisant `ctrl-c`.

### Activer le service `saslauthd`

Vous devrez modifier le `/etc/default/saslauthd` pour activer le service `saslauthd` pour qu'il s'exécute au démarrage et qu'il utilise LDAP pour l'authentification. Vous pouvez utiliser sed pour le faire rapidement.
```
sudo sed -i -e "s/START=.*/START=yes/" -e "s/MECHANISMS=.*/MECHANISMS=\"ldap\"/" /etc/default/saslauthd
```

Cela apportera les modifications suivantes à `/etc/default/saslauthd`.
```
[...]
# Should saslauthd run automatically on startup? (default: no)
START=yes
[...]
# Example: MECHANISMS="pam"
MECHANISMS="ldap"
[...]
```


Il n'est pas nécessaire de pointer `MECH_OPTIONS` vers le fichier de configuration LDAP
puisqu'il s'agit de la valeur par défaut pour ce mécanisme.

Vous pouvez maintenant démarrer, redémarrer et arrêter `saslauthd` en utilisant les scripts `service` :

```
sudo service saslauthd restart
```

Si vous rencontrez des problèmes, vérifiez `/var/log/auth.log` pour les entrées `saslauthd`.

### Fichier de configuration Cyrus SASL

Cyrus SASL nécessite un fichier de configuration afin de savoir comment vérifier l'utilisateur
identifiants. Pour Prosody, le fichier est nommé `prosody.conf` par défaut.
Son emplacement varie selon le système d'exploitation et la distribution, comme indiqué dans le tableau suivant :

| Plateforme          | Emplacement   |
| ----------------- | ---------- |
| Debian and Ubuntu | /etc/sasl  |
| Arch, RHEL/CentOS | /etc/sasl2 |

Donc pour les systèmes Debian, créez le fichier `/etc/sasl/prosody.conf`. Le répertoire `/etc/sasl` n'existe peut-être pas encore.

```
sudo mkdir /etc/sasl/
cat << 'EOF' |sudo tee /etc/sasl/prosody.conf > /dev/null
pwcheck_method: saslauthd
mech_list: PLAIN
EOF
```

:::note
Le nom de fichier `prosody.conf` correspond à une valeur pour `cyrus_application_name` dans la configuration de Prosody. Puisque nous n'avons pas changé la valeur par défaut, cela a une valeur de `prosodie`.

:::

La documentation de Prosody contient plus de détails sur un
[Configuration liée à Cyrus SASL](https://prosody.im/doc/cyrus_sasl).

## Configurer la prosodie

Si vous avez testé l'authentification LDAP avec succès et activé le service `saslauthd`, vous pouvez modifier l'authentification de Prosody au backend Cyrus en modifiant le paramètre `authentication` dans `/etc/prosody/conf.avail/$(hostname -f). cfg.lua` via la commande :
```
sed -i -E -e "/^ *VirtualHost \"$(hostname -f)\"/,/^ *VirtualHost/ {s/authentication ?=.*$/authentication = \"cyrus\"/}" /etc/prosody/conf.avail/$(hostname -f).cfg.lua
```

You might also have to add the `allow_unencrypted_plain_auth` option to allow 
plain-text passwords to be sent over the network. *This is not recommended* as it 
makes the setup less secure. So please try without this line first and only add
it if you have problems authenticating.

```
        authentication = "cyrus"
        allow_unencrypted_plain_auth = true
```

### Set Permissions

Prosody va maintenant essayer d'accéder au socket saslauthd dans
`/var/run/saslauthd/` pour communiquer avec le démon d'authentification.
Ce dossier n'autorise l'accès qu'à l'utilisateur `root` et au groupe `sasl` pendant que prosody s'exécute en tant qu'utilisateur/groupe système `prosody`.

La solution la plus simple consiste à ajouter le groupe `sasl` à l'utilisateur `prosody` et à redémarrer le service.

```
sudo adduser prosody sasl
sudo service prosody restart
```

