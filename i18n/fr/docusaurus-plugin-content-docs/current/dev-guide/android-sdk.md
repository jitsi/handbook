---
id: dev-guide-android-sdk
title: Android SDK
---

Le SDK Android Jitsi Meet offre la même expérience utilisateur que l'application Jitsi Meet, d'une manière personnalisable que vous pouvez intégrer dans vos applications.

:::important
Android 6.0 (niveau API 23) ou supérieur est requis.
:::

## Exemples d'applications utilisant le SDK

Si vous voulez voir à quel point il est facile d'intégrer le SDK Jitsi Meet dans une application native, jetez un œil au
[exemple de référentiel d'applications](https://github.com/jitsi/jitsi-meet-sdk-samples).

## Construisez les vôtres ou utilisez des artefacts/binaires SDK pré-construits

Jitsi fournit commodément des artefacts/binaires SDK pré-construits dans son référentiel Maven. Lorsque vous n'avez besoin d'aucun
modification du SDK lui-même ou de l'une de ses dépendances, il est suggéré d'utiliser le SDK de pré-construction. Cela évite le
complexité de la construction et de l'installation de vos propres artefacts/binaires SDK.

### Use pre-build SDK artifacts/binaries

Dans votre projet, ajoutez le référentiel Maven
`https://github.com/jitsi/jitsi-maven-repository/raw/master/releases` et la dépendance `org.jitsi.react:jitsi-meet-sdk` dans vos fichiers `build.gradle`.

Le référentiel va généralement dans le fichier `build.gradle` à la racine de votre projet :

```gradle title="build.gradle"
allprojects {
    repositories {
        maven {
            url "https://github.com/jitsi/jitsi-maven-repository/raw/master/releases"
        }
        google()
        mavenCentral()
        maven { url 'https://www.jitpack.io' }
    }
}
```

Dans les versions récentes d'Android Studios, `allprojects{}` peut ne pas être trouvé dans `build.gradle`. Dans ce cas, le référentiel va dans le fichier `settings.gradle` à la racine de votre projet :

```gradle title="settings.gradle"
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        maven {
            url "https://github.com/jitsi/jitsi-maven-repository/raw/master/releases"
        }
        maven {
            url "https://maven.google.com"
        }
    }
}
```

Les définitions de dépendance appartiennent aux fichiers `build.gradle` du module individuel :

```gradle
dependencies {
    // (other dependencies)
    implementation ('org.jitsi.react:jitsi-meet-sdk:+') { transitive = true }
}
```

:::warning
Assurez-vous d'épingler votre dépendance en consultant la [page des versions](https://github.com/jitsi/jitsi-meet-release-notes/blob/master/CHANGELOG-MOBILE-SDKS.md).
:::

### Créez et utilisez vos propres artefacts/binaires SDK

<details>
<summary>Afficher les instructions de construction</summary>

Commencez par vous assurer que votre environnement de développement [est configuré correctement](mobile.md).

:::note A Note on Dependencies
Outre le SDK, Jitsi publie également un artefact binaire Maven pour certaines des dépendances du SDK (qui ne sont autrement pas accessibles au public) dans le référentiel Jitsi Maven. Lorsque vous prévoyez d'utiliser un SDK qui est construit à partir de la source, vous utiliserez probablement une version du code source qui est plus récente (ou au moins _différente_) que la version de la source qui a été utilisée pour créer l'artefact SDK binaire . Par conséquent, les dépendances dont votre projet aura besoin peuvent également être différentes de celles publiées dans le référentiel Jitsi Maven. Cela peut entraîner des problèmes de construction, causés par des dépendances qui ne sont pas disponibles.
:::

Si vous souhaitez utiliser un SDK construit à partir de la source, vous bénéficierez probablement de la composition d'un référentiel Maven local contenant ces dépendances. Le texte ci-dessous décrit comment vous créez un référentiel qui inclut à la fois le SDK ainsi que ces dépendances. À des fins d'illustration, nous définirons l'emplacement de ce référentiel Maven local comme `/tmp/repo`

Sous forme de code source, les dépendances du SDK Android sont verrouillées/épinglées par `package.json` et `package-lock.json` du projet Jitsi Meet. Pour obtenir les données, exécutez NPM dans le répertoire du projet jitsi-meet :
    npm install

Cela tirera les dépendances au format binaire ou au format de code source, quelque part sous /node_modules/

Les _modules_ tiers React Native, dont dépend Jitsi Meet SDK pour Android, sont téléchargés par NPM dans le code source
ou sous forme binaire. Ceux-ci doivent être assemblés dans des artefacts Maven, puis publiés dans votre référentiel Maven local.
Un script est fourni pour faciliter cela. Depuis la racine du référentiel du projet jitsi-meet, exécutez :

    ./android/scripts/release-sdk.sh /tmp/repo

Cela construira et publiera le SDK et toutes ses dépendances dans le référentiel Maven spécifié (`/tmp/repo`) dans
cet exemple.

Vous êtes maintenant prêt à utiliser les artefacts. Dans _votre_ projet, ajoutez le référentiel Maven que vous avez utilisé ci-dessus (`/tmp/repo`) dans votre fichier `build.gradle` de niveau supérieur :

    allprojects {
        repositories {
            maven { url "file:/tmp/repo" }
            google()
            mavenCentral()
            maven { url 'https://www.jitpack.io' }
        }
    }

Vous pouvez utiliser votre référentiel local pour remplacer le référentiel Jitsi (`maven { url "https://github.com/jitsi/jitsi-maven-repository/raw/master/releases" }`) lorsque vous avez publié _tous_ les sous-projets. Si vous ne l'avez pas fait, vous devrez ajouter les deux référentiels. Assurez-vous que votre référentiel local est répertorié en premier !

Ensuite, définissez la dépendance `org.jitsi.react:jitsi-meet-sdk` dans le fichier `build.gradle` de votre module :

    implementation ('org.jitsi.react:jitsi-meet-sdk:+') { transitive = true }

Notez qu'il ne devrait pas être nécessaire d'ajouter explicitement les autres dépendances, car elles seront intégrées en tant que transitive
dépendances de `jitsi-meet-sdk`.

</details>

## Utilisation de l'API

Jitsi Meet SDK est une bibliothèque Android qui incarne toute l'expérience Jitsi Meet et la rend réutilisable par des applications tierces.

Tout d'abord, ajoutez la prise en charge de la compatibilité Java 1.8 à votre projet en ajoutant les lignes suivantes dans votre fichier `build.gradle` :

```
compileOptions {
    sourceCompatibility JavaVersion.VERSION_1_8
    targetCompatibility JavaVersion.VERSION_1_8
}
```

Pour commencer, lancez simplement `JitsiMeetActivity` en pointant vers la salle que vous voulez :

```java
// Quelque part au début de votre application.
JitsiMeetConferenceOptions defaultOptions
        = new JitsiMeetConferenceOptions.Builder()
    .setServerURL(serverURL)
    // Lorsque vous utilisez JaaS, définissez le JWT obtenu ici
    //.setToken("MyJWT")
    // Différents drapeaux de fonctionnalités peuvent être définis
    // .setFeatureFlag("toolbox.enabled", false)
    // .setFeatureFlag("filmstrip.enabled", false)
    .setFeatureFlag("welcomepage.enabled", false)
    .build();
JitsiMeet.setDefaultConferenceOptions(defaultOptions);
// ...
// Créer un objet d'options pour rejoindre la conférence. Le SDK fusionnera la valeur par défaut
// celui que nous avons défini plus tôt et celui-ci lors de l'adhésion.
JitsiMeetConferenceOptions options
        = new JitsiMeetConferenceOptions.Builder()
    .setRoom(roomName)
    // Paramètres audio et vidéo
    //.setAudioMuted(true)
    //.setVideoMuted(true)
    .build();
// Lancez la nouvelle activité avec les options données. La méthode launch() s'occupe
// de créer l'intention requise et de transmettre les options.
JitsiMeetActivity.launch(this, options);
```

Alternatively, you can use the `org.jitsi.meet.sdk.JitsiMeetView` class which extends `android.view.View`.

Notez que cela ne devrait être nécessaire que lorsque `JitsiMeetActivity` ne peut pas être utilisé pour une raison quelconque. L'extension de `JitsiMeetView` nécessite un câblage manuel de la vue à l'activité, en utilisant beaucoup de code passe-partout. Utilisation de l'activité au lieu de
La vue est fortement recommandée.

<details>
<summary>Show example</summary>

```java
package org.jitsi.example;

import android.os.Bundle;
import android.support.v4.app.FragmentActivity;

import org.jitsi.meet.sdk.JitsiMeetView;
import org.jitsi.meet.sdk.ReactActivityLifecycleCallbacks;

// Example
//
public class MainActivity extends FragmentActivity implements JitsiMeetActivityInterface {
    private JitsiMeetView view;

    @Override
    protected void onActivityResult(
            int requestCode,
            int resultCode,
            Intent data) {
        JitsiMeetActivityDelegate.onActivityResult(
                this, requestCode, resultCode, data);
    }

    @Override
    public void onBackPressed() {
        JitsiMeetActivityDelegate.onBackPressed();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        view = new JitsiMeetView(this);
        JitsiMeetConferenceOptions options = new JitsiMeetConferenceOptions.Builder()
            .setRoom("https://meet.jit.si/test123")
            .build();
        view.join(options);

        setContentView(view);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        view.dispose();
        view = null;

        JitsiMeetActivityDelegate.onHostDestroy(this);
    }

    @Override
    public void onNewIntent(Intent intent) {
        JitsiMeetActivityDelegate.onNewIntent(intent);
    }

    @Override
    public void onRequestPermissionsResult(
            final int requestCode,
            final String[] permissions,
            final int[] grantResults) {
        JitsiMeetActivityDelegate.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    @Override
    protected void onResume() {
        super.onResume();

        JitsiMeetActivityDelegate.onHostResume(this);
    }

    @Override
    protected void onStop() {
        super.onStop();

        JitsiMeetActivityDelegate.onHostPause(this);
    }
}
```

</details>

### JitsiMeetActivity

Cette classe encapsule une API de haut niveau sous la forme d'un `FragmentActivity` Android qui affiche un seul `JitsiMeetView`. Vous pouvez passer une URL en tant que `ACTION_VIEW` sur l'Intent lors de son démarrage et il rejoindra la conférence, et sera automatiquement terminé (finish() sera appelé sur l'activité) lorsque la conférence se termine ou échoue.

### JitsiMeetView

La classe `JitsiMeetView` est au cœur de Jitsi Meet SDK. Il est conçu pour afficher une conférence Jitsi Meet (ou une page d'accueil).

#### join(options)

Rejoint la conférence spécifiée par les `JitsiMeetConferenceOptions` donnés.

#### dispose()

Libère toutes les ressources associées à cette vue. Cette méthode DOIT être appelée lorsque l'activité contenant cette vue va être détruite, généralement dans la méthode `onDestroy()`.

### JitsiMeetConferenceOptions

Cet objet encapsule toutes les options qui peuvent être modifiées lors de la participation à une conférence.

Exemple:

```java
JitsiMeetConferenceOptions options = new JitsiMeetConferenceOptions.Builder()
    .setServerURL(new URL("https://meet.jit.si"))
    .setRoom("test123")
    .setAudioMuted(false)
    .setVideoMuted(false)
    .setAudioOnly(false)
    .setWelcomePageEnabled(false)
    .setConfigOverride("requireDisplayName", true)
    .build();
```

Voir l'implémentation de `JitsiMeetConferenceOptions` pour toutes les options disponibles.

### JitsiMeetActivityDelegate

Cette classe gère l'interaction entre `JitsiMeetView` et son `Activity` englobante. Généralement, cela ne devrait pas être consommé par les utilisateurs, car ils utiliseraient à la place `JitsiMeetActivity`, qui est déjà complètement intégré.

Toutes ses méthodes sont statiques.

#### onActivityResult(...)

Méthode d'assistance pour gérer les résultats des activités auxiliaires lancées par le SDK. Doit être appelé à partir de la méthode d'activité du même nom.

#### onBackPressed()

Méthode d'assistance qui doit être appelée à partir de la méthode `onBackPressed` de l'activité.
Si cette fonction renvoie "true", cela signifie que l'action a été gérée et qu'aucun traitement supplémentaire n'est donc requis ; sinon, l'application doit appeler la méthode `onBackPressed` du parent.

#### onHostDestroy(...)

Méthode d'assistance qui doit être appelée à partir de la méthode `onDestroy` de l'activité.

#### onHostResume(...)

Méthode d'assistance qui doit être appelée à partir de la méthode `onResume` ou `onStop` de l'activité.

#### onHostStop(...)

Méthode d'assistance qui doit être appelée à partir de la méthode `onSstop` de l'activité.

#### onNewIntent(...)

Méthode d'assistance pour l'intégration de la fonctionnalité de *liens profonds*. Si l'activité de votre application est lancée en mode "singleTask", cette méthode doit être appelée à partir de la méthode `onNewIntent` de l'activité.

#### onRequestPermissionsResult(...)

Méthode d'assistance pour gérer les demandes d'autorisation dans le SDK. Elle doit être appelée à partir de la méthode d'activité du même nom.

#### onUserLeaveHint()

Méthode d'assistance pour l'intégration automatique de Picture-in-Picture. Il doit être appelé à partir de la méthode `onUserLeaveHint` de l'activité.

Il s'agit d'une méthode statique.

### Listening for broadcasted events

Le SDK diffuse plusieurs événements que les utilisateurs peuvent écouter.

```java
    IntentFilter intentFilter = new IntentFilter();
    intentFilter.addAction(BroadcastEvent.Type.CONFERENCE_JOINED.getAction());
    LocalBroadcastManager.getInstance(this).registerReceiver(broadcastReceiver, intentFilter);
 ```  
        
Veuillez consulter `JitsiMeetActivity`, qui s'inscrit à tous les événements et peut servir d'exemple.

#### Supported events

##### CONFERENCE_JOINED

Diffusé lorsqu'une conférence a été rejointe. `data` contient les informations suivantes :

- `url`: the conference URL

##### CONFERENCE_TERMINATED

Diffusé lorsque la conférence active se termine, que ce soit à cause du choix de l'utilisateur ou à cause d'un échec. `data` contient le
information suivante:

- `url`: l'URL de la conférence
- `error`: manquant si la conférence s'est bien terminée, sinon contient le message d'erreur

##### CONFERENCE_WILL_JOIN

Diffusé avant qu'une conférence ne soit rejointe. `data` contient les informations suivantes :

- `url`: l'URL de la conférence

##### AUDIO_MUTED_CHANGED

Diffusé lorsque le son du participant local est coupé ou rétabli. `data` contient les informations suivantes :

- `muted`: un booléen indiquant si l'audio est coupé ou non.

##### PARTICIPANT_JOINED

Diffusé lorsqu'un participant a rejoint la conférence. `data` contient les informations suivantes :

- `email`: l'e-mail du participant. Il peut ne pas être défini si le participant distant n'en a pas défini.
- `name`: le nom du participant.
- `role`: le rôle du participant.
- `participantId`: l'identifiant du participant.

##### PARTICIPANT_LEFT

Appelé lorsqu'un participant a quitté la conférence. `data` contient les informations suivantes :

- `participantId`: l'identifiant du participant qui est parti.

##### ENDPOINT_TEXT_MESSAGE_RECEIVED

Diffusé lors de la réception d'un message texte de point de terminaison. Le HashMap `data` contient une clé `senderId` avec le participantId de l'expéditeur et une clé `message` avec le contenu.

#### SCREEN_SHARE_TOGGLED

Diffusé lorsqu'un participant démarre ou arrête de partager son écran. `data` contient les informations suivantes :

- `participantId`: Identifiant du participant qui a commencé ou arrêté de partager son écran.
- `sharing`: Vrai si le participant partage son écran, faux sinon.

##### PARTICIPANTS_INFO_RETRIEVED

Diffusé lorsqu'une action RETRIEVE_PARTICIPANTS_INFO est appelée. Le HashMap `data` contient une clé `participantsInfo` avec une liste d'informations sur les participants et une clé `requestId` avec l'identifiant qui a été envoyé dans l'action RETRIEVE_PARTICIPANTS_INFO.

##### CHAT_MESSAGE_RECEIVED

Diffusé lorsqu'un message texte de chat est reçu. `data` contient les informations suivantes :

- `senderId`: l'identifiant du participant qui a envoyé le message.
- `message`: le contenu du message.
- `isPrivate`: true si le message est privé, false sinon.
- `timestamp`: l'horodatage (facultatif) du message.

##### CHAT_TOGGLED

Diffusé lorsque la boîte de dialogue de discussion est ouverte ou fermée. `data` contient les informations suivantes :

- `isOpen`: true if the chat dialog is open, false otherwise.

##### VIDEO_MUTED_CHANGED

Broadcasted when the local participant's video is muted or unmuted. `data` contains the following information:

- `muted`: un entier indiquant si la vidéo est muette ou non. 0 signifie activé, 4 signifie désactivé.

##### READY_TO_CLOSE

Le SDK est prêt à être fermé/rejeté.

### Broadcasting Actions

Le SDK écoute les actions diffusées par les utilisateurs et réagit en conséquence.

```java
    Intent muteBroadcastIntent = new Intent(BroadcastAction.Type.SET_AUDIO_MUTED.getAction());
    muteBroadcastIntent.putExtra("muted", muted);
    LocalBroadcastManager.getInstance(getApplicationContext()).sendBroadcast(muteBroadcastIntent);
 ```

Les intentions peuvent être créées manuellement (comme indiqué ci-dessus) ou via les méthodes de `BroadcastIntentHelper`.

Veuillez consulter `JitsiMeetOngoingConferenceService` pour plus d'exemples d'actions d'envoi.

#### Supported actions

##### SET_AUDIO_MUTED
Définit l'état de l'audio localParticipant coupé en fonction du paramètre "muet". Attend une clé "muted" sur l'intent supplémentaire avec une valeur booléenne.

##### SET_VIDEO_MUTED
Définit l'état de la vidéo localParticipant désactivée en fonction du paramètre "muet".
Attend une clé "muted" sur l'intent supplémentaire avec une valeur booléenne.

##### HANG_UP
Le participant local quitte la conférence en cours.
N'attend aucune valeur supplémentaire.

##### SEND_ENDPOINT_TEXT_MESSAGE
Envoie un message via le canal de données à un participant particulier ou à tous. Attend une clé "à" sur l'intent supplémentaire avec l'identifiant du participant auquel le message est destiné et une clé "message" avec une valeur de chaîne, le contenu réel du message. Si la touche `to` n'est pas présente ou si sa valeur est vide, le message sera envoyé à tous les participants à la conférence.

Afin d'obtenir le participantId, l'événement `PARTICIPANT_JOINED` doit être écouté, lequel `data` inclut l'identifiant et celui-ci doit être stocké d'une manière ou d'une autre.

##### TOGGLE_SCREEN_SHARE
Définit l'état du partage d'écran localParticipant en fonction du paramètre "enabled". Attend une clé "enabled" sur l'intent supplémentaire avec une valeur booléenne.

##### RETRIEVE_PARTICIPANTS_INFO
Signale au SDK de récupérer une liste avec les informations des participants. Le SDK émettra un événement PARTICIPANTS_INFO_RETRIEVED.
Attend une clé `requestId` sur l'intention supplémentaire avec une valeur de chaîne, ce paramètre sera présent sur l'événement PARTICIPANTS_INFO_RETRIEVED.

##### OPEN_CHAT
Ouvre la boîte de dialogue de discussion. Si une clé "to" est présente avec un participantId valide, le chat privé pour ce participant particulier sera ouvert.

##### CLOSE_CHAT
Ferme la boîte de dialogue de discussion.
N'attend aucune valeur supplémentaire.

##### SEND_CHAT_MESSAGE
Envoie un message de chat, soit un message privé si une clé `to` est présente avec un participantId valide et à tout le monde sinon.
Attend une clé `message` avec une valeur de chaîne.

## ProGuard rules

Lors de l'utilisation du SDK sur un projet, certaines règles proguard doivent être ajoutées afin d'éviter que le code nécessaire ne soit supprimé. Ajoutez ce qui suit au fichier de règles de votre projet : https://github.com/jitsi/jitsi-meet/blob/master/android/app/proguard-rules.pro

## Picture-in-Picture

`JitsiMeetView` ajustera automatiquement son interface utilisateur lorsqu'il sera présenté dans un
Scénario de style Picture-in-Picture, dans un rectangle trop petit pour accueillir son interface utilisateur "complète".

## Dropbox integration

Pour configurer l'intégration Dropbox, procédez comme suit :

1. Ajoutez ce qui suit au fichier AndroidManifest.xml de l'application et remplacez `<APP_KEY>` par
your Dropbox app key:
```
<activity
    android:configChanges="keyboard|orientation"
    android:launchMode="singleTask"
    android:name="com.dropbox.core.android.AuthActivity">
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.BROWSABLE" />
    <category android:name="android.intent.category.DEFAULT" />
    <data android:scheme="db-<APP_KEY>" />
  </intent-filter>
</activity>
```

2. Ajoutez ce qui suit au fichier strings.xml de l'application et remplacez `<APP_KEY>` par votre
Clé d'application Dropbox :
```
<string name="dropbox_app_key"><APP_KEY></string>
```
