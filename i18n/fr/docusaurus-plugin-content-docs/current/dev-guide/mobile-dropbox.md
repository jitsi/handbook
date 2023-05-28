---
id: mobile-dropbox
title: Configuration de l'intégration Dropbox
---

1. Créez une application Dropbox.
2. Ajoutez ce qui suit à ```ios/app/src/Info.plist``` en remplaçant `<APP_KEY>`
   avec votre propre clé d'application Dropbox (qui se trouve dans le
   [Console d'application](https://www.dropbox.com/developers/apps)):
```
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLName</key>
    <string></string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>db-<APP_KEY></string>
    </array>
  </dict>
</array>
<key>LSApplicationQueriesSchemes</key>
<array>
  <string>dbapi-2</string>
  <string>dbapi-8-emm</string>
</array>
```

**REMARQUE:** Les versions Android et iOS des applications analyseront la clé de l'application Dropbox à partir de ```ios/app/src/Info.plist```.

**REMARQUE:** Consultez le [Guide du développeur Dropbox](https://www.dropbox.com/developers/reference/developer-guide) pour plus d'informations.