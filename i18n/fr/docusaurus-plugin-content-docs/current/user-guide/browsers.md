---
id: supported-browsers
title: Navigateurs pris en charge
---

## Navigateurs de bureau

| Navigateur | Soutien | Versions | Remarques |
|---|:---:|:---:|---|
| <i class="fa-brands fa-chrome"></i> Chrome [^1] | ✅ | >= 72 | Meilleurs résultats avec >= 96 |
| <i class="fa-brands fa-firefox-browser"></i> Firefox | ✅ | >= 68 | Meilleurs résultats avec >= 101 |
| <i class="fa-brands fa-safari"></i> Safari | ✅ | >= 14 | Meilleurs résultats avec >= 15, sélection du périphérique de sortie non prise en charge |
| <i class="fa-brands fa-edge"></i> Edge | ✅ | >= 79 | Edge Legacy n'est pas pris en charge |
| <i class="fa-brands fa-internet-explorer"></i> Internet Explorer | ❌ | | |

## Navigateur mobile

### Android

| Navigateur | Soutien | Versions | Remarques |
|---|:---:|:---:|---|
| <i class="fa-brands fa-chrome"></i> Chrome [^1] | ✅ | | Même prise en charge que la version de bureau |
| <i class="fa-brands fa-firefox-browser"></i> Firefox | ✅ | | Même prise en charge que la version de bureau |

:::note
Pour une meilleure expérience mobile (prise en charge en arrière-plan, prise en charge Bluetooth, etc.), nous vous recommandons d'utiliser un application native à la place. Nous fournissons un [SDK Android natif](/handbook/docs/dev-guide/dev-guide-android-sdk).
:::

### iOS

| Navigateur | Soutien | Versions | Remarques |
|---|:---:|:---:|---|
| <i class="fa-brands fa-chrome"></i> Chrome | ✅ | | Même support que Safari car ils partagent le moteur |
| <i class="fa-brands fa-firefox-browser"></i> Firefox | ✅ | |Même support que Safari car ils partagent le moteur |
| <i class="fa-brands fa-safari"></i> Safari | ✅ | >= 14.3 | Meilleurs résultats avec 15,4 |
| <i class="fa-brands fa-edge"></i> Edge | ✅ | | Même support que Safari car ils partagent le moteur |

:::note
Sur iOS, tous les navigateurs partagent le même moteur, Safari. En tant que telles, toutes les fonctionnalités et limitations de tous les navigateurs iOS sont celles de Safari.

Pour une meilleure expérience mobile (support en arrière-plan, intégration CallKit, etc.), nous vous recommandons d'utiliser un
application native à la place. Nous fournissons un [SDK iOS natif](/handbook/docs/dev-guide/dev-guide-ios-sdk).
:::

[^1]: Cela s'applique également à tous les navigateurs basés sur Chromium tels que Brave, Edge (actuel), Opera, Vivaldi et autres.
