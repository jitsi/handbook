---
id: breakout-rooms
title: Breakout rooms
---

:::note
Jitsi Meet dispose désormais d'un support natif pour les salles de sous-commission. Vous pouvez le voir en action [ici](https://www.youtube.com/watch?v=ubYYZ0daw10). Cette page est conservée ici à des fins historiques et ne recevra plus de mises à jour.
:::

~~Jitsi ne prend pas en charge nativement les salles de sous-commission (par exemple, voir [#4787](https://github.com/jitsi/jitsi-meet/issues/4787) et [#5550](https://github.com/jitsi/jitsi-meet/issues/5550));~~ 
cependant, il existe différentes solutions pour cette fonctionnalité construite au-dessus de Jitsi :

| Nom | Licence | Modèle de coût | L'administrateur peut déplacer des participants | commentaires |
| --- | --- | --- | --- | --- |
| "DIY" - combiner manuellement Jitsi avec d'autres outils de communication | Dépend de ce que vous utilisez | Dépend de ce que vous utilisez | Non | Pas une bonne solution, car aucune intégration native ; tout le monde doit suivre un flux de travail pré-convenu et quelles salles Jitsi utiliser, par ex. [https://meet.jit.si/&lt;eventname&gt;-&lt;roomname&gt;](https://github.com/jitsi/jitsi-meet/issues/5550#issuecomment-620747815) |
| [Veertly](https://veertly.com/) | [Apache 2.0](https://github.com/veertly/app/blob/stage/LICENSE) | Ne peut actuellement pas être auto-hébergé car il [nécessite Firebase](https://github.com/veertly/app/issues/68) (also [SaaS](https://en.wikipedia.org/wiki/Software_as_a_service) - free for now?) | [Non](https://github.com/jitsi/jitsi-meet/issues/4787#issuecomment-624868307) | Essayez la [démo en ligne](https://app.veertly.com/v/demo) |
| [Wurk.app](https://www.wurk.app/) | Apache 2.0 | [Open Source](https://github.com/puthli/breakout-rooms) | Oui | [Commentaire d'origine](https://github.com/jitsi/jitsi-meet/issues/5550#issuecomment-625891995) Utilise une pièce principale. L'hôte de la réunion peut ajouter un nombre illimité d'autres salles et y déplacer des participants Web. L'éloignement des participants de la salle principale n'est pas encore pris en charge sur mobile. Prend en charge les boîtes horaires et les messages diffusés. Les hôtes de la réunion peuvent activer/désactiver le son des autres. Wurk utilise une installation Jitsi meet auto-hébergée |
| [VideoFacilitator](https://www.videofacilitator.com/) | Proprietary [SaaS](https://en.wikipedia.org/wiki/Software_as_a_service) | Abonnement (voir [tarifs](https://www.videofacilitator.com/pricing))| ? | [Des problèmes avec la navigation dans les salles sur mobile ?](https://github.com/jitsi/jitsi-meet/issues/5550#issuecomment-612262313) |
| [Plugin for Openfire Meetings](https://github.com/jitsi/jitsi-meet/issues/5550#issuecomment-617670291) | [Apache 2.0](https://github.com/igniterealtime/openfire-pade-plugin/blob/master/LICENSE) | Gratuit (auto-hébergement) | ? | Plus d'infos [ici](https://github.com/jitsi/jitsi-meet/issues/5550#issuecomment-618461856) |
