---
id: reservation
title: Configuration du système de réservation
sidebar_label: Système de reservation
---

### Support for a reservation system over REST API

Il est possible de se connecter à un système de réservation de conférence externe à l'aide d'une API REST. Avant la création d'une nouvelle conférence Jitsi Meet, le système de réservation sera interrogé sur la disponibilité des salles. Le système est censé renvoyer un code de réponse positif ou négatif, qui contient également la durée de la conférence. Prosody appliquera la durée de la conférence et si la limite de temps est dépassée, la conférence sera terminée.

#### Activer le système de réservation

Pour activer le système de réservation, la base d'URL du point de terminaison de l'API REST doit être
configuré. Sous l'hôte virtuel principal en prosodie, activez le module "réservations" et
ajoutez la configuration `reservations_api_prefix` :

```
VirtualHost "jitmeet.example.com"
    -- ....
    modules_enabled = {
        -- ....
        "reservations";
    }
    reservations_api_prefix = "http://reservation.example.com"
```

La base d'URL est utilisée pour construire l'URL de requête. Actuellement, seul le point de terminaison `'/conference'` est pris en charge, donc toutes les requêtes iront à :

```
http://reservation.example.com/conference
```
Des options de configuration supplémentaires sont disponibles :
* "reservations_api_timeout" pour modifier les délais d'attente des appels d'API (par défaut à 20 secondes)
* "reservations_api_headers" pour spécifier les en-têtes HTTP personnalisés inclus dans
  tous les appels d'API, par ex. pour fournir des jetons d'authentification.
* "reservations_api_retry_count" pour spécifier le nombre de fois que les échecs d'appel d'API sont réessayés (par défaut à 3)
* "reservations_api_retry_delay" secondes à attendre entre les tentatives (par défaut à 3s)
* "reservations_api_should_retry_for_code" en tant que fonction qui prend un code de réponse HTTP et
  renvoie vrai si l'appel d'API doit être réessayé. Par défaut, les tentatives sont effectuées pour 5XX
  réponses. Les délais d'expiration ne sont jamais réessayés et les échecs d'appels HTTP sont toujours réessayés.
* "reservations_enable_max_occupants" pour activer la prise en charge de la définition du nombre maximum d'occupants. Si ce paramètre est défini sur "true", et si
  la charge utile de la réponse de l'API inclut une valeur "max_occupants", cette valeur sera alors définie comme la limite d'occupation maximale
  pour cette pièce spécifique.
  * Le module "muc_max_occupants" doit également être activé pour que cela fonctionne.
* "reservations_enable_lobby_support" pour activer la prise en charge du lobby. Si ce paramètre est défini sur "true", et si
  la charge utile de réponse de l'API inclut un champ "lobby" défini sur `true` , alors le lobby sera activé pour la salle.
  * Les modules "muc_lobby_rooms" et "persistent_lobby" doivent également être activés pour que cela fonctionne.
* "reservations_enable_password_support" pour activer la prise en charge du mot de passe de la salle. Si ce paramètre est défini sur "true", et si
  la charge utile de la réponse de l'API inclut une valeur "mot de passe", cette valeur sera alors définie comme mot de passe de la salle. Les utilisateurs pourront alors
  être tenu de connaître ce mot de passe pour pouvoir rejoindre la salle, ou dans le cas où le lobby est activé, peut utiliser le
  mot de passe pour contourner le lobby.

```
    --- The following are all optional
    reservations_api_headers = {
        ["Authorization"] = "Bearer TOKEN-237958623045";
    }
    reservations_api_timeout = 10  -- timeout if API does not respond within 10s
    reservations_api_retry_count = 5  -- retry up to 5 times
    reservations_api_retry_delay = 1  -- wait 1s between retries
    reservations_api_should_retry_for_code = function (code)
        return code >= 500 or code == 408
    end
    reservations_enable_max_occupants = true -- enable integration with muc_max_occupants
    reservations_enable_lobby_support = true -- enable integration with muc_lobby_rooms
    reservations_enable_password_support = true -- enable support for setting room passwords
```

#### Call flow

##### Remarques

Tous les appels d'API utilisent le format datetime suivant :

`aaaa-MM-jj'T'HH:mm:ss.SSSX` - plus d'informations peuvent être trouvées dans
`SimpleDateFormat` [JavaDoc]

[JavaDoc]: https://docs.oracle.com/javase/6/docs/api/java/text/SimpleDateFormat.html

##### Allocation de conférence

Lorsque le premier utilisateur rejoint une salle MUC (c'est-à-dire que l'URL Jitsi Meet est ouverte), un `HTTP POST`
la requête est envoyée au point de terminaison `'/conference'` avec les paramètres suivants
inclus:

* `name (string)` - nom abrégé de la salle de conférence (pas l'adresse MUC complète). Si locataire est utilisé, le nom sera `[tenant]roomname`.
* `start_time (string)` - date et heure de début de la conférence
* `mail_owner (string)` - si le système d'authentification est activé, ce champ contiendra l'identité de l'utilisateur. Dans ce cas, il ne sera pas possible de créer une nouvelle salle de conférence sans s'authentifier.

La charge utile envoyée au point de terminaison sera encodée sous la forme `application/x-www-form-urlencoded`.

Le système de réservation devrait répondre avec l'un des éléments suivants
réponses :

###### HTTP 200 or 201 Conference created successfully

Dans la réponse HTTP, un objet JSON est attendu. Il doit contenir l'identifiant de conférence attribué par le système et la "durée" mesurée en secondes. Exemple de corps de réponse :

```
{
  'id': 364758328,
  'name': 'conference1234',
  'mail_owner': 'user@server.com',
  'start_time': '2048-04-20T17:55:12.000Z',
  'duration': 900000
}
```

L'objet peut éventuellement inclure une clé `max_occupants` avec une valeur entière. Lorsqu'il est fourni, et si
`reservations_enable_max_occupants` est activé, la valeur sera transmise à muc_mod_max_occupants pour appliquer les limites d'occupation par chambre.


###### HTTP 409 - La conférence existe déjà

Il s'agit de récupérer des échecs précédents. Si pour une raison quelconque la conférence a été redémarrée et que l'utilisateur essaie de recréer la salle, cette réponse informe Prosody
que la salle de conférence existe déjà. Il devrait contenir `conflict_id` dans le corps de la réponse JSON :
```
{
  'conflict_id': 364758328
}
```

Prosody utilisera `HTTP GET` pour récupérer des informations sur la conférence en conflit pour le `conflict_id` donné. Plus d'informations sur cette demande peuvent être trouvées dans la section "Lire les informations sur la conférence".

###### HTTP 4xx

D'autres codes de réponse entraîneront l'échec de la création de la conférence. La réponse JSON peut contenir un objet `message` qui sera renvoyé au client.

Par exemple, `user1` essaie de démarrer une nouvelle conférence en envoyant `conference` IQ à Jicofo. Le système rejettera la demande.

Client -> Jicofo:

```
<iq from='client1@xmpp.com' to='jicofo.meet.com' type='set'>
  <conference xmlns='http://jitsi.org/protocol/focus' room='testroom1' />
</iq>
```

Prosody -> Reservation system:

```
POST /conference HTTP/1.1
content-type:application/x-www-form-urlencoded;charset=utf-8
host: http://reservation.example.com
content-length: length

name=testroom1&start_time=2048-04-20T17%3A55%3A12.000Z&mail_owner=client1%40xmpp.com
```

Reservation system -> Prosody:

```
HTTP/1.1 403 Forbidden
Content-Type: application/json; charset=utf-8
Content-Length: length

{
  'message': 'client1 is not allowed to create the room at this time'
}
```

Prosody -> Client:

```
<iq from='jicofo.meet.com' to='client1@xmpp.com' type='error'>
  <error type='cancel'>
    <service-unavailable xmlns='urn:ietf:params:xml:ns:xmpp-stanzas' />
    <text xmlns='urn:ietf:params:xml:ns:xmpp-stanzas'>
          client1 is not allowed to create the room at this time
    </text>
    <reservation-error xmlns='http://jitsi.org/protocol/focus' error-code='403'/>
  </error>
</iq>
```

L'application peut utiliser les éléments `text` et `reservation-error` pour fournir des informations significatives à l'utilisateur.

##### Lire les informations sur la conférence

En cas de réponse `409` à la requête `HTTP POST`, Prosody essaiera de lire les informations sur la conférence en conflit à l'aide d'un `HTTP GET`
Point de terminaison '/conference/{conflict_id}'. La réponse doit fournir toutes les informations sur la conférence stockées dans le système de réservation :

* `'id'` : identifiant de la conférence attribué par le système de réservation
* `'nom'` : nom de la salle de conférence
* `'mail_owner'` : identité de l'utilisateur qui a créé la conférence
* `'start_time'` : date et heure de début de la conférence
* `'duration'` : durée de la conférence planifiée en secondes

La valeur facultative "max_occupants" doit également être fournie, le cas échéant.

Exemple de corps JSON de réponse (contient les mêmes informations que "200 OK" pour
`HTTP POST`):
```
{
  'id': 364758328,
  'name': 'conference1234',
  'mail_owner': 'user@server.com',
  'start_time': '2048-04-20T17:55:12.000Z',
  'duration': 900000
}
```

##### Suppression de la conférence

Prosody supprime les conférences dans le système de réservation dans deux cas. D'abord lorsque tous les utilisateurs quittent la salle de discussion multi-utilisateurs XMPP. Deuxièmement, lorsque la limite de durée de la conférence est dépassée. Dans ce dernier cas, Prosody détruira la salle XMPP MUC. Une fois la salle MUC détruite, Prosody envoie une requête "HTTP DELETE" à
`'/conference/{id}'` point de terminaison où `{id}` est remplacé par l'identifiant de conférence attribué par le système de réservation.

```
DELETE /conference/364758328 HTTP/1.1
host: http://reservation.example.com
...
```

#### Schéma de mise en œuvre

![](https://raw.githubusercontent.com/jitsi/handbook/master/docs/assets/reservation-api.png)
