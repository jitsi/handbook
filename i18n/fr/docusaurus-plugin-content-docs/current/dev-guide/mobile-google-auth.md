---
id: mobile-google-auth
title: Configuration de l'intégration de la connexion Google
---

- Créez un projet Firebase ici : https://firebase.google.com/. Vous aurez besoin d'une version Android signée pour cela, qui peut également être une version auto-signée de débogage, récupérez simplement le hachage de signature. Le hachage de clé d'un ap déjà signé peut être obtenu comme suit (sur macOS) : ```keytool -list -printcert -jarfile the-app.apk```
- Placez le fichier ```google-services.json``` généré dans ```android/app``` pour Android et le ```GoogleService-Info.plist``` dans ```ios/app`` ` pour iOS (vous pouvez vous arrêter à cette étape, pas besoin du pilote et des changements de code qu'ils suggèrent dans l'assistant).
- Vous voudrez peut-être exclure ces fichiers dans VOTRE configuration GIT (ne les excluez pas dans le ```.gitignore``` de l'application elle-même !).
- Votre ID de client Web est généré automatiquement lors de la création du projet Firebase. Retrouvez-les dans la Google Developer console (https://console.developers.google.com/)
- Assurez-vous que votre configuration reflète cet ID en définissant ```googleApiApplicationClientID``` dans config.js.
- Ajoutez votre ID client iOS (le REVERSED_CLIENT_ID dans le fichier plist) en tant que schéma d'URL d'application dans ```ios/app/src/Info.plist``` (en remplaçant l'espace réservé).
- Activez l'accès à l'API YouTube sur la console développeur (voir ci-dessus) pour activer la diffusion en direct.