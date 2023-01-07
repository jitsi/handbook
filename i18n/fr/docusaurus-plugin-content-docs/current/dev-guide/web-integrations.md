---
id: dev-guide-web-integrations
title: Intégrations Web
sidebar_label: Integrations
---

## Création du client API Google pour l'intégration de Google Calendar et YouTube

1. Connectez-vous à un compte administrateur Google.
2. Accédez au tableau de bord de la plate-forme cloud Google. https://console.cloud.google.com/apis/dashboard
3. Dans la liste déroulante Sélectionner un projet, cliquez sur Nouveau projet.
4. Donnez un nom au projet.
5. Passez aux paramètres des informations d'identification du nouveau projet.
6. Dans l'onglet Informations d'identification des paramètres d'informations d'identification, cliquez sur Créer des informations d'identification et sélectionnez le type d'ID client OAuth.
7. Procédez à la création d'une application Web et ajoutez les domaines (origines) sur lesquels l'application sera hébergée. Des environnements de développement locaux (http://localhost:8000 par exemple) peuvent être ajoutés ici.
8. Toujours dans le tableau de bord de la plate-forme Google Cloud, cliquez sur les paramètres de la bibliothèque pour le projet de calendrier.
9. Recherchez l'API Google Calendar (utilisée pour accéder au calendrier), cliquez sur son résultat et activez-la.
10. Faites de même pour YouTube Data API v3

## Création de l'application Microsoft pour l'intégration de Microsoft Outlook

1. Allez sur https://apps.dev.microsoft.com/
2. Suivez le flux "Ajouter une application". Une fois créée, une page avec plusieurs champs d'autorisations de graphique devrait s'afficher.
3. Sous "Platforms", ajoutez "Web"
4. Ajoutez une URL de redirection pour le flux d'authentification Microsoft à visiter une fois qu'un utilisateur a confirmé l'authentification. Le domaine cible, s'il est disponible, est simplement « votredomaine.com » (l'adresse de déploiement) et l'URL de redirection est « https://votredomaine.com/statique/msredirect.html ».
5. Ajoutez des autorisations déléguées Microsoft Graph, si cette option est disponible : Calendars.Read, Calendars.ReadWrite, Calendars.Read.Shared, Calendars.ReadWrite.Shared.
6. Cochez `Autoriser le flux implicite` (et `Restreindre l'émission de jetons à cette application` si disponible).
7. Enregistrez les modifications.

## Création de l'application Dropbox pour l'intégration de l'enregistrement Dropbox

1. Vous avez besoin d'un compte Dropbox (si vous n'en avez pas déjà un, vous pouvez créer un compte gratuit [ici](https://www.dropbox.com/register).)
2. Créez une nouvelle application comme décrit dans le [Guide de démarrage](https://www.dropbox.com/developers/reference/getting-started?_tk=guides_lp&_ad=guides2&_camp=get_started#app%20console)  dans la section App Console. 
3. Choisir
    1. 'Dropbox API - Pour les applications qui doivent accéder aux fichiers dans Dropbox.' 
    2. 'App folder– Accès à un dossier unique créé spécifiquement pour votre application.'
    3. Remplissez le nom de votre application
4. Vous n'avez besoin que de la clé d'application nouvellement créée dans `/etc/jitsi/meet/yourdeployment.com-config.js` dans
    ``` title="/etc/jitsi/meet/yourdeployment.com-config.js"
        dropbox: {
            appKey: '__dropbox_app_key__',
            redirectURI: 'https://yourdeployment.com/static/oauth.html'
        }
    ```
5. Ajoutez vos URI de redirection Dropbox dans le formulaire Dropbox `https://yourdeployment.com/static/oauth.html`
6. Remplir l'image de marque
