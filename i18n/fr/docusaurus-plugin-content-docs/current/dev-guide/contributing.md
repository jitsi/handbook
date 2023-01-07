---
id: dev-guide-contributing
title: Directives de contribution
---

# Comment contribuer
Nous aimerions avoir votre aide. Cependant, avant de commencer à travailler, veuillez lire et suivez ce petit guide.

# Signaler des problèmes et poser des questions

Nous préférons que les problèmes soient d'abord discutés dans le [forum de la communauté](https://community.jitsi.org/) et, une fois confirmés, un problème peut être ouvert dans l'outil de suivi des problèmes.

Nous préférons que les problèmes soient d'abord discutés dans le [forum de la communauté] et une fois confirmés, un problème peut être ouvert dans [l'outil de suivi des problèmes](https://github.com/jitsi/jitsi-meet/issues).

Lors de l'ouverture d'un problème, veuillez fournir autant d'informations que possible. Mentionnez la version de Jitsi Meet, Jicofo et JVB que vous utilisez, et expliquez (le plus précisément possible) comment le problème peut être reproduit.

Veuillez poser toutes les questions générales et spécifiques à la mise en œuvre sur le [forum de la communauté](https://community.jitsi.org/)  pour obtenir de l'aide.

# Code contributions

Visitez [l'outil de suivi des problèmes](https://github.com/jitsi/jitsi-meet/issues) pour trouver une liste des problèmes ouverts qui nécessitent votre attention.

Le [Guide du développeur](dev-guide.md) vous aidera à configurer un environnement de développement pour commencer à travailler sur les applications Jitsi Meet.

## Contrat de licence de contributeur
Alors que les projets Jitsi sont publiés sous la [licence Apache 2.0](https://github.com/jitsi/jitsi-meet/blob/master/LICENSE), le détenteur des droits d'auteur et créateur principal est [8x8](https://www.8x8.com/). Pour nous assurer que nous pouvons continuer à rendre ces projets disponibles sous une licence Open Source, nous avons besoin que vous signiez notre accord de licence de contributeur basé sur Apache en tant que [société](https://jitsi.org/ccla) ou [individu](https://jitsi.org/icla). Si vous ne pouvez pas accepter les conditions énoncées dans l'accord, nous ne pouvons malheureusement pas accepter votre contribution.

## Création de demandes d'extraction
- Fourchez le dépôt.
- Créez une nouvelle branche thématique pour vos modifications basée sur la branche principale avec un nom approprié.
- Effectuez **un** changement logique par pull request.
- Maintenez une liste propre de commits, écrasez-les si nécessaire.
- Rebasez votre branche thématique sur la branche principale avant de créer la pull request. **Ne jamais** fusionner le maître, toujours rebaser.
- Les commits doivent avoir un préfixe indiquant ce qu'ils font, c'est-à-dire une fonctionnalité, un correctif ou une mise à jour de la traduction. Cela aide à la génération automatisée des notes de version. Préfixez les commits avec `feat(feature name) `, `fix(feature name)`, etc.

## Pour 8x8 employés
- Ne liez pas de ressources internes telles que les problèmes Jira, il s'agit d'un projet Open Source

## Coding style

### Comments

* Des commentaires documentant le code source sont requis.

  * Les commentaires à partir desquels la documentation est automatiquement générée ne sont **pas** soumis à des décisions au cas par cas. De tels commentaires sont utilisés, par exemple, sur les types et leurs membres. Des exemples d'outils qui génèrent automatiquement de la documentation à partir de tels commentaires incluent JSDoc, Javadoc, Doxygen.

  * Les commentaires qui ne sont pas traités automatiquement sont fortement encouragés. Ils font l'objet de décisions au cas par cas. De tels commentaires sont souvent observés dans les corps de fonction.

* Les commentaires doivent être formatés en phrases anglaises appropriées. Une telle mise en forme tient compte, par exemple, des majuscules et de la ponctuation.

### Duplication

* Ne copiez pas le code source. Réutilisez-le. Attention cependant à ne pas créer de mauvaises abstractions juste pour réutiliser un petit morceau de code.

### Formatting

* La longueur de ligne est limitée à 120 caractères pour le code JavaScript, Java et Kotlin.

* Triez par ordre alphabétique afin de rendre l'ajout de nouvelles entités aussi simple que de rechercher un mot dans un dictionnaire. Sinon, on risque des entrées en double (avec des valeurs en conflit dans le cas des paires clé-valeur). Par exemple:

  * JavaScript : dans une `importation` de plusieurs noms d'un module, triez les noms par ordre alphabétique. (Bien sûr, le nom par défaut reste en premier comme requis par la syntaxe "import".)

    ````javascript
    import {
        DOMINANT_SPEAKER_CHANGED,
        JITSI_CLIENT_CONNECTED,
        JITSI_CLIENT_CREATED,
        JITSI_CLIENT_DISCONNECTED,
        JITSI_CLIENT_ERROR,
        JITSI_CONFERENCE_JOINED,
        MODERATOR_CHANGED,
        PEER_JOINED,
        PEER_LEFT,
        RTC_ERROR
    } from './actionTypes';
    ````

  * JavaScript : au sein d'un groupe d'imports (par exemple, des groupes d'imports délimités par une ligne vide peuvent être : des modules tiers, puis des modules de projet, et éventuellement les fichiers privés d'un module), triez les noms des modules par ordre alphabétique.

    ````javascript
    import React, { Component } from 'react';
    import { connect } from 'react-redux';
    ````
  * Java : utilisez les importations de packages (package.*) et N'IMPORTEZ PAS les classes elles-mêmes.

* Java : les accolades ouvrantes DOIVENT être sur leur propre ligne (en particulier celles qui commencent une méthode).

* Utilisez 4 espaces pour tout indenter. Demandez à votre IDE ** de ne pas utiliser de tabulations en aucune circonstance ** et remplacez-les par des espaces.

* N'utilisez pas de double négatif lorsque vous nommez des propriétés, des variables ou des méthodes/fonctions.

### Naming

* Une abstraction doit avoir un nom dans le projet et dans plusieurs projets. Par exemple:

  * L'instance du type `JitsiConnection` de lib-jitsi-meet doit être nommée `connection` ou `jitsiConnection` dans jitsi-meet, et non `client`.

  * La classe `ReducerRegistry` doit être définie dans ReducerRegistry.js et ses importations dans d'autres fichiers doivent utiliser le même nom. Ne définissez pas la classe `Registry` dans ReducerRegistry.js, puis importez-la en tant que `Reducers` dans d'autres fichiers.

* Les noms des constantes globales (y compris les constantes globales du module ES6) doivent être écrits en majuscules avec des traits de soulignement pour séparer les mots. Par exemple, `BACKGROUND_COLOR`.

* Le caractère de soulignement au début d'un nom signale que la variable, la fonction ou la propriété respective n'est pas publique, c'est-à-dire privée, protégée ou interne. En revanche, l'absence de trait de soulignement au début d'un nom signale une API publique.

### JavaScript

#### Feature layout

Lors de l'ajout d'une nouvelle fonctionnalité, ce serait la disposition habituelle.

```
react/features/sample/
├── actionTypes.js
├── actions.js
├── components
│   ├── AnotherComponent.js
│   ├── OneComponent.js
│   └── index.js
├── middleware.js
└── reducer.js
```

Le middleware doit être importé spécifiquement dans `react/features/app/`
dans `middlewares.any`, `middlewares.native.js` ou `middlewares.web.js`, le cas échéant. De même pour le réducteur.

Cela n'a pas toujours été le cas et l'intégralité de la base de code n'a pas été migrée vers ce modèle, mais de nouvelles fonctionnalités devraient suivre cette nouvelle disposition.

Lorsque vous travaillez sur une ancienne fonctionnalité, l'ajout des modifications nécessaires pour migrer vers le nouveau modèle est encouragé.

#### Éviter le gonflement des faisceaux

Lors de l'ajout d'une nouvelle fonctionnalité, il est possible qu'elle déclenche un échec de construction en raison de l'augmentation de la taille du bundle. Nous avons mis en place des mesures de protection pour éviter que les bundles ne grossissent de manière disproportionnée. Bien qu'il y ait des raisons légitimes d'augmenter les limites, veuillez d'abord analyser le bundle pour vous assurer qu'aucune dépendance involontaire n'a été incluse, provoquant l'augmentation de la taille.

Tout d'abord, créez une version de production avec l'analyse groupée activée :

```
npx webpack -p --analyze-bundle
```

Then open the interactive bundle analyzer tool:

```
npx webpack-bundle-analyzer build/app-stats.json
```

### Kotlin

Pour le code Kotlin, nous utilisons la [convention standard](https://kotlinlang.org/docs/coding-conventions.html) et limitons la longueur de ligne à 120 caractères. Nous utilisons `ktlint` pour appliquer le formatage.

