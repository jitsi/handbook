---
id: architecture
title: Architecture
---

Dans cette section, un aperçu global de l'infrastructure Jitsi est fourni. Si vous venez de commencer à contribuer au projet, nous vous recommandons vivement de lire attentivement cette section.


## Components
Jitsi comprend un [ensemble de projets](https://jitsi.org/projects/):

* [Jitsi Meet](https://jitsi.org/jitsi-meet) - Application JavaScript compatible WebRTC qui utilise Jitsi Videobridge pour fournir des vidéoconférences évolutives de haute qualité. Construisez sur React et React Native.
* [Jitsi Videobridge (JVB)](https://jitsi.org/jitsi-videobridge) - Serveur compatible WebRTC conçu pour acheminer les flux vidéo entre les participants à une conférence.
* [Jitsi Conference Focus (jicofo)](https://github.com/jitsi/jicofo) - composant de focus côté serveur utilisé dans les conférences Jitsi Meet qui gère les sessions multimédia et agit comme équilibreur de charge entre chacun des participants et le pont vidéo.
* [Jitsi Gateway to SIP (jigasi)](https://github.com/jitsi/jigasi) - application côté serveur qui permet aux clients SIP réguliers de rejoindre les conférences Jitsi Meet
* [Jitsi Broadcasting Infrastructure (jibri)](https://github.com/jitsi/jibri) - ensemble d'outils pour enregistrer et/ou diffuser une conférence Jitsi Meet qui fonctionne en lançant une instance Chrome rendue dans un framebuffer virtuel et en capturant et encodant la sortie avec ffmpeg.

Logiciel externe utilisé par Jitsi :
* [Prosody](https://prosody.im/) - Serveur XMPP utilisé pour la signalisation


## Schéma d'architecture
Les connexions individuelles entre les composants décrits précédemment, ainsi que leurs intégrations externes sont décrites dans la figure ci-dessous.

![](https://raw.githubusercontent.com/jitsi/handbook/master/docs/assets/ArchitectureDiagram.png)

Les connexions externes peuvent être classées en deux groupes principaux. Premièrement, les connexions entre les clients qui demandent une connexion vidéo ou audio effectuées via des requêtes à distance et des flux de données. La deuxième catégorie de connexions externes est celle vers des services externes qui aident à stocker des enregistrements, à diffuser des enregistrements, à diffuser des vidéos ou à créer des réunions.

## Code Map
Dans cette section, nous examinerons les principales parties de la base de code et verrons à quoi elles peuvent servir.

**./react/features**
Ce dossier est l'endroit où il est préférable de commencer à écrire votre code, car il contient la plupart des composants d'application utilisés dans les applications sur Android et iOS, ainsi que sur la version Web. Ce dossier source est divisé en toutes les différentes fonctionnalités que Jitsi a à offrir, telles que l'authentification, l'interaction de chat, les raccourcis clavier, la capture d'écran, le contrôle à distance et l'arrière-plan virtuel. Chacune de ces fonctionnalités a son propre dossier dans cette carte, qui est ensuite à nouveau divisé pour conserver une hiérarchie et une cohérence dans tout le code.

Chaque dossier de fonctionnalités se compose d'un sous-dossier appelé composants. Dans ce dossier, tous les composants React ou React Native pour mobile sont exprimés. Habituellement, dans ce dossier, il y aura une séparation entre les composants natifs et Web, mais dans certains cas, le même composant peut être utilisé à la fois pour Android, iOS et le navigateur Web, auquel cas aucune séparation n'est effectuée.

Comme indiqué précédemment, la base de code se compose principalement de React et React Native, qui est la version React pour les applications mobiles. La plupart des fonctionnalités utilisent le soi-disant composant de classe de React[^class-comp], cependant, certaines nouvelles fonctionnalités commencent à utiliser la nouvelle façon d'écrire des composants fonctionnels à l'aide de crochets[^func-comp].

L'application utilise également React Redux, qui est utilisé comme magasin d'état général pour suivre les paramètres importants utilisés dans l'application. Plus d'informations sur React Redux peuvent être trouvées ici [^react-redux].

La plupart des fonctionnalités contiennent également un fichier appelé `middleware.js`. Ce fichier agit comme un pont entre le composant et les fonctionnalités du reste de l'application.

**./modules/external-api**
Dans ce dossier, l'API externe peut être trouvée. Cette API peut être utilisée dans divers événements tels que les participants qui rejoignent/quittent la réunion, les changements d'avatars ou de chat, ainsi que les erreurs d'utilisation du microphone ou de la caméra.

**./android and ./ios**
Ces deux dossiers contiennent respectivement les bases de l'application Android et iOS. Cependant, le code de l'application elle-même et de ses composants se trouve dans le dossier **react/features** ,qui est expliqué plus haut dans cette section.

**./conference.js**
Ce fichier se trouve à la racine du projet et contient la base de toute interaction entre un utilisateur et une salle de conférence. Celle-ci consiste à établir une connexion avec celle-ci, rejoindre la salle de réunion, activer et désactiver le son, mais aussi des fonctions pour recueillir des informations sur les participants qui se trouvent dans la salle.

**./lang**
Ce dossier contient toutes les différentes traductions présentes dans Jitsi Meet. Les traductions peuvent être trouvées dans le code avec chacune des clés dans les cartes de traduction qui peuvent être trouvées dans les fichiers`main-[language].json`.

**./css**
Ce dossier contient tous les css utilisés dans le projet. Les fichiers (principalement des fichiers .scss [^scss]) sont divisés en fonctionnalités telles que les fonctionnalités React dans lesquelles ils sont utilisés.

## Testing
La principale forme de test des changements de code se fait par des tests de torture, à côté de cela, le code est testé manuellement.

Les tests de torture sont situés dans un référentiel séparé,[Jitsi Meet Torture](https://github.com/jitsi/jitsi-meet-torture). Le projet contient des tests de bout en bout pour plusieurs fonctions clés telles que le pair à pair et les invitations. Les tests peuvent être effectués pour iOS, Android et le Web, qui sont toutes les plates-formes sur lesquelles Jitsi Meet peut être utilisé. Le test est effectué automatiquement pour les demandes d'extraction par les membres du projet, où il est utilisé en combinaison avec l'intégration continue par une instance Jenkins exécutant les tests, en testant sur l'instance [meet.jit.si](https://meet.jit.si). Les autres membres peuvent exécuter les tests localement.

Les tests manuels sont effectués lors des révisions de code, mais il existe également des versions de test qui peuvent être téléchargées et déployées librement, ou peuvent être utilisées sur le [serveur de test bêta](https://beta.meet.jit.si/).

[^class-comp]: [Class components](https://reactjs.org/docs/react-component.html)
[^func-comp]: [Functional components with hooks](https://reactjs.org/docs/hooks-intro.html)
[^react-redux]: [React Redux](https://react-redux.js.org/)
[^scss]: [SCSS](https://sass-lang.com/documentation/syntax)
