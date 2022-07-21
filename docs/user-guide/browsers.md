---
id: supported-browsers
title: Supported Browsers
---

## Desktop browsers

| Browser | Support | Versions | Notes |
|---|:---:|:---:|---|
| <i class="fa-brands fa-chrome"></i> Chrome * | ✅ | >= 72 | Best results with >= 96 |
| <i class="fa-brands fa-firefox-browser"></i> Firefox | ✅ | >= 68 | Best results with >= 101 |
| <i class="fa-brands fa-safari"></i> Safari | ✅ | >= 14 | Best results with >= 15, output device selection unsupported |
| <i class="fa-brands fa-edge"></i> Edge | ✅ | >= 79 | Edge Legacy is unsupported |
| <i class="fa-brands fa-internet-explorer"></i> Internet Explorer | ❌ | | |

*: The same applies to all Chromium based browsers.

## Mobile browsers

### Android

| Browser | Support | Versions | Notes |
|---|:---:|:---:|---|
| <i class="fa-brands fa-chrome"></i> Chrome * | ✅ | | Same support as the desktop version |
| <i class="fa-brands fa-firefox-browser"></i> Firefox | ✅ | | Same support as the desktop version |

*: The same applies to all Chromium based browsers.

:::note
For a better mobile experience (background support, Bluetooth support, etc.) we recommend using a
native app instead. We provide a [native Android SDK](/handbook/docs/dev-guide/dev-guide-android-sdk).
:::

### iOS

| Browser | Support | Versions | Notes |
|---|:---:|:---:|---|
| <i class="fa-brands fa-chrome"></i> Chrome | ✅ | | Same support as Safari as they share the engine |
| <i class="fa-brands fa-firefox-browser"></i> Firefox | ✅ | | Same support as Safari as they share the engine |
| <i class="fa-brands fa-safari"></i> Safari | ✅ | >= 14.3 | Best results with 15.4 |
| <i class="fa-brands fa-edge"></i> Edge | ✅ | | Same support as Safari as they share the engine |

:::note
On iOS all browsers share the same engine, Safari. As such all features and limitations on all iOS
browsers are those of Safari.

For a better mobile experience (background support, CallKit integration, etc.) we recommend using a
native app instead. We provide a [native iOS SDK](/handbook/docs/dev-guide/dev-guide-ios-sdk).
:::
