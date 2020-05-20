---
id: logging
title: Logging
---

Jitsi has multiple ways for logging different kinds of errors.

## Console Output
To enable custom logging handler they have to be enable in the `lib/logging.properties` file of the particular project.

### Sentry
To stay informed about problems occuring on your deployment you can use [Sentry](https://sentry.io/).

To activate and configure Sentry you have to set the `SENTRY_DSN` environment variable for the containers you want to monitor. Each container should have it's own DSN. More information including all configartion options you can find [here](https://docs.sentry.io/clients/java/config).

You can also set a release and environment to filter for possible errors and warnings more easily. These can be configured by defining `SENTRY_ENVIRONMENT` and `SENTRY_RELEASE` environment variables.

The default configuration is to only track warnings and errors.

Currently available for:
* JVB
* Jicofo
* Jigasi

### Syslog
The syslog server has to listen on port `514`.
You can customize the hostname, port and formatting in the `lib/logging.properties`.
