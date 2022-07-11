---
id: reservation
title: Reservation System setup
sidebar_label: Reservation System
---

### Support for a reservation system over REST API

It is possible to connect to an external conference reservation system using a
REST API. Before a new Jitsi Meet conference is created, the reservation system will be
queried for room availability. The system is supposed to return a positive or
negative response code, which also contains conference duration. Prosody will enforce
conference duration and if the time limit is exceeded the conference will be
terminated.

#### Enable reservation system

In order to enable the reservation system, the URL base for the REST API endpoint must be
 configured. Under the main virtual host in prosody, enable module "reservations" and 
add the config `reservations_api_prefix`:

```
VirtualHost "jitmeet.example.com"
    -- ....
    modules_enabled = {
        -- ....
        "reservations";
    }
    reservations_api_prefix = "http://reservation.example.com"
```

The URL base is used to construct the request URL. Currently, only `'/conference'`
endpoint is supported, so all request will go to:

```
http://reservation.example.com/conference
```
Additional configuration options are available:
* "reservations_api_timeout" to change API call timeouts (defaults to 20 seconds)
* "reservations_api_headers" to specify custom HTTP headers included in
  all API calls e.g. to provide auth tokens.
* "reservations_api_retry_count" to specify the number of times API call failures are retried (defaults to 3)
* "reservations_api_retry_delay" seconds to wait between retries (defaults to 3s)
* "reservations_api_should_retry_for_code" as a function that takes an HTTP response code and
  returns true if the API call should be retried. By default, retries are done for 5XX
  responses. Timeouts are never retried, and HTTP call failures are always retried.
* "reservations_enable_max_occupants" to enable integration with mod_muc_max_occupants. If this is set to `true`, and if
  the API response payload includes a "max_occupants" value, then that value will be set as the max occupancy limit
  for that specific room.

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
```

#### Call flow

##### Notes

All API calls use the following datetime format:

`yyyy-MM-dd'T'HH:mm:ss.SSSX` - more info can be found in
`SimpleDateFormat` [JavaDoc]

[JavaDoc]: https://docs.oracle.com/javase/6/docs/api/java/text/SimpleDateFormat.html

##### Conference allocation

When the first user joins a MUC room (i.e. Jitsi Meet URL is opened), an `HTTP POST`
request is sent to `'/conference'` endpoint with the following parameters
included:

* `name (string)` - short name of the conference room (not full MUC address). If tenant is used, the name will be `[tenant]roomname`.
* `start_time (string)` - conference start date and time
* `mail_owner (string)` - if authentication system is enabled this field will
 contain user's identity. It that case it will not be possible to create a new
 conference room without authenticating.

The payload sent to the endpoint will be encoded as `application/x-www-form-urlencoded`.

The reservation system is expected to respond with one of the following
responses:

###### HTTP 200 or 201 Conference created successfully

In the HTTP response, a JSON object is expected. It should contain conference `id`
assigned by the system and `duration` measured in seconds. Sample response body:

```
{
  'id': 364758328,
  'name': 'conference1234',
  'mail_owner': 'user@server.com',
  'start_time': '2048-04-20T17:55:12.000Z',
  'duration': 900000
}
```

The object can optionally include a `max_occupants` key with an integer value. When provided, and if
`reservations_enable_max_occupants` is enabled, then the value will be passed to muc_mod_max_occupants to enforce
per-room occupancy limits.


###### HTTP 409 - Conference already exists

This is to recover from previous failures. If for some reason the conference was
restarted and the user tries to create the room again, this response informs Prosody
that the conference room already exists. It is expected to contain
`conflict_id` in the JSON response body:

```
{
  'conflict_id': 364758328
}
```

Prosody will use `HTTP GET` to fetch information about the conflicting conference for the 
given `conflict_id`. More info about this request can be found in the "Reading conference info"
section.

###### HTTP 4xx

Other response codes will cause conference creation failure. The JSON response
can contain a `message` object which will be sent back to the client.

For example `user1` tries to start a new conference by sending
`conference` IQ to Jicofo. The system will reject the request.

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

The application can use `text` and `reservation-error` elements to
provide meaningful information to the user.

##### Reading conference info

In case of a `409` response to the `HTTP POST` request, Prosody will try
to read information about the conflicting conference using an `HTTP GET`
'/conference/{conflict_id}' endpoint. The response should provide all
information about the conference stored in the reservation system:

* `'id'`: conference identifier assigned by the reservation system
* `'name'`: conference room name
* `'mail_owner'`: identity of the user who has created the conference
* `'start_time'`: conference start date and time
* `'duration'`: scheduled conference duration in seconds

The optional `max_occupants` value should also be provided if applicable.

Sample response JSON body (contains the same info as `200 OK` to
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

##### Deleting conference

Prosody deletes conferences in the reservation system in two cases. First when
all users leave XMPP Multi User Chat room. Secondly when the conference duration limit
is exceeded. In the latter case Prosody will destroy the XMPP MUC room.
After the MUC room is destroyed, Prosody sends an `HTTP DELETE` request to
`'/conference/{id}'` endpoint where `{id}` is replaced with
conference identifier assigned by the reservation system.

```
DELETE /conference/364758328 HTTP/1.1
host: http://reservation.example.com
...
```

#### Implementation diagram

![](https://raw.githubusercontent.com/jitsi/handbook/master/docs/assets/reservation-api.png)
