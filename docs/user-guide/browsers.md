---
id: supported-browsers
title: Supported Browsers
---

## Desktop browsers

| Browser | Support | Versions | Notes |
|---|:---:|:---:|---|
| Chrome [^1] | ✅ | >= 72 | Best results with >= 96 |
| Firefox | ✅ | >= 68 | Best results with >= 101 |
| Safari | ✅ | >= 14 | Best results with >= 15, output device selection unsupported |
| Edge | ✅ | >= 79 | Edge Legacy is unsupported |
| Internet Explorer | ❌ | | |

## Mobile browsers

### Android

| Browser | Support | Versions | Notes |
|---|:---:|:---:|---|
| Chrome [^1] | ✅ | | Same support as the desktop version |
| Firefox | ✅ | | Same support as the desktop version |

:::note
For a better mobile experience (background support, Bluetooth support, etc.) we recommend using a
native app instead. We provide a [native Android SDK](/handbook/docs/dev-guide/dev-guide-android-sdk).
:::

### iOS

| Browser | Support | Versions | Notes |
|---|:---:|:---:|---|
| Chrome | ✅ | | Same support as Safari as they share the engine |
| Firefox | ✅ | | Same support as Safari as they share the engine |
| Safari | ✅ | >= 14.3 | Best results with 15.4 |
| Edge | ✅ | | Same support as Safari as they share the engine |

:::note
On iOS all browsers share the same engine, Safari. As such all features and limitations on all iOS
browsers are those of Safari.

For a better mobile experience (background support, CallKit integration, etc.) we recommend using a
native app instead. We provide a [native iOS SDK](/handbook/docs/dev-guide/dev-guide-ios-sdk).
:::

[^1]: This also applies to all Chromium based browsers such as Brave, (current) Edge, Opera, Vivaldi and others.
