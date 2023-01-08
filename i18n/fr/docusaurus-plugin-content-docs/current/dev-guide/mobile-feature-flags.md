---
id: mobile-feature-flags
title: Feature flags
---

Le SDK mobile prend en charge un certain nombre d'indicateurs de fonctionnalité qui permettent de personnaliser certains aspects et comportements de l'interface utilisateur.

Voici les drapeaux actuellement implémentés :

* `add-people.enabled`: Indicateur indiquant si la fonctionnalité d'ajout de personnes doit être activée. Par défaut : activé (vrai).
* `android.audio-focus.disabled`: Indicateur indiquant si le SDK ne doit pas nécessiter le focus audio. Utilisé par les applications qui n'utilisent pas l'audio Jitsi. Par défaut : désactivé (faux).
* `audio-mute.enabled`: Drapeau indiquant si le bouton de sourdine audio doit être affiché. Par défaut : activé (vrai).
* `calendar.enabled`: Drapeau indiquant si l'intégration du calendrier doit être activée. Par défaut : activé (true) sur Android, auto-détecté sur iOS.
* `call-integration.enabled`: Drapeau indiquant si l'intégration des appels (CallKit sur iOS, ConnectionService sur Android) doit être activée. Par défaut : activé (vrai).
* `close-captions.enabled`: Drapeau indiquant si les sous-titres doivent être activés. Par défaut : activé (vrai).
* `conference-timer.enabled`: Indicateur indiquant si la minuterie de conférence doit être activée. Par défaut : activé (vrai).
* `chat.enabled`: Drapeau indiquant si le chat doit être activé. Par défaut : activé (vrai).
* `filmstrip.enabled`: Drapeau indiquant si la pellicule doit être activée. Par défaut : activé (vrai).
* `invite.enabled`: Indicateur indiquant si la fonctionnalité d'invitation doit être activée. Par défaut : activé (vrai).
* `ios.recording.enabled`: Drapeau indiquant si l'enregistrement doit être activé dans iOS. Par défaut : désactivé (faux).
* `ios.screensharing.enabled`: Drapeau indiquant si le partage d'écran doit être activé dans iOS. Par défaut : désactivé (faux).
* `kick-out.enabled` : indicateur indiquant si le kick-out est activé. Par défaut : activé (vrai).
* `live-streaming.enabled` : indicateur indiquant si la diffusion en direct doit être activée. Par défaut : auto-détecté.
* `meeting-name.enabled` : indicateur indiquant si l'affichage du nom de la réunion doit être activé. Par défaut : activé (vrai).
* `meeting-password.enabled` : indicateur indiquant si le bouton de mot de passe de la réunion doit être activé. Notez que cet indicateur décide simplement du bouton, si une réunion a un mot de passe défini, la boîte de dialogue de mot de passe s'affichera toujours. Par défaut : activé (vrai).
* `notifications.enabled` : indicateur indiquant si les notifications doivent être activées. Par défaut : activé (vrai).
* `overflow-menu.enabled` : indicateur indiquant si le bouton de menu de débordement audio doit être affiché. Par défaut : activé (vrai).
* `pip.enabled` : indicateur indiquant si l'image dans l'image doit être activée. Par défaut : auto-détecté.
* `raise-hand.enabled` : indicateur indiquant si la fonction de levée de main doit être activée. Par défaut : activé.
* `recording.enabled` : indicateur indiquant si l'enregistrement doit être activé. Par défaut : auto-détecté.
* `résolution` : indicateur indiquant la résolution vidéo locale et distante (maximale). Remplace la configuration du serveur. Par défaut : (non défini).
* `server-url-change.enabled` : indicateur indiquant si le changement d'URL du serveur est activé. Par défaut : activé (vrai)
* `tile-view.enabled` : indicateur indiquant si la fonctionnalité d'affichage en mosaïque doit être activée. Par défaut : activé.
* `toolbox.alwaysVisible` : drapeau indiquant si la boîte à outils doit toujours être visible. Par défaut : désactivé (faux).
* `toolbox.enabled` : indicateur indiquant si la boîte à outils doit être activée. Par défaut : activé.
* `video-mute.enabled` : indicateur indiquant si le bouton de mise en sourdine de la vidéo doit être affiché. Par défaut : activé (vrai).
* `video-share.enabled` : indicateur indiquant si le bouton de partage vidéo doit être activé. Par défaut : activé (vrai).
* `welcomepage.enabled` : indicateur indiquant si la page d'accueil doit être activée. Par défaut : désactivé (faux).

Tous les drapeaux sont définis [ici](https://github.com/jitsi/jitsi-meet/blob/master/react/features/base/flags/constants.js).