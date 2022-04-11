---
id: dev-guide-contributing
title: Contributing Guidelines
---

# How to contribute
We would love to have your help. Before you start working however, please read
and follow this short guide.

# Reporting Issues and Asking Questions

We prefer issues to be discussed first in the [community forum](https://community.jitsi.org/) and when confirmed, then an issue can be opened in the [issue tracker](https://github.com/jitsi/jitsi-meet/issues).

When opening an issue, please provide as much information as possible. Mention the version of Jitsi Meet, Jicofo and JVB you are using, and explain (as detailed as you can) how the problem can be reproduced.

Please ask any general and implementation specific questions on the [community forum](https://community.jitsi.org/) for support.

# Code contributions

Visit the [issue tracker](https://github.com/jitsi/jitsi-meet/issues) to find a list of open issues that need attention.

The [Developer Guide](dev-guide.md) will help you to setup a development environment to start working on the Jitsi Meet applications.

## Contributor License Agreement
While the Jitsi projects are released under the
[Apache License 2.0](https://github.com/jitsi/jitsi-meet/blob/master/LICENSE), the copyright
holder and principal creator is [8x8](https://www.8x8.com/). To
ensure that we can continue making these projects available under an Open Source license,
we need you to sign our Apache-based contributor
license agreement as either a [corporation](https://jitsi.org/ccla) or an
[individual](https://jitsi.org/icla). If you cannot accept the terms laid out
in the agreement, unfortunately, we cannot accept your contribution.

## Creating Pull Requests
- Fork the repo.
- Create a new topic branch for your changes based off the master branch with a suitable name.
- Make sure your code passes the linter rules beforehand. The linter is executed
  automatically when committing code.
- Perform **one** logical change per pull request.
- Maintain a clean list of commits, squash them if necessary.
- Rebase your topic branch on top of the master branch before creating the pull
 request.
- Commits should have prefix indicating what they do is it feature, a fix or a translation update. This is in regards the 
 automated release notes. Prefix the commits with `feat: `, `fix: `, `lang: ` etc.
## Coding style

### Comments

* Comments documenting the source code are required.

  * Comments from which documentation is automatically generated are **not**
    subject to case-by-case decisions. Such comments are used, for example, on
    types and their members. Examples of tools which automatically generate
    documentation from such comments include JSDoc, Javadoc, Doxygen.

  * Comments which are not automatically processed are strongly encouraged. They
    are subject to case-by-case decisions. Such comments are often observed in
    function bodies.

* Comments should be formatted as proper English sentences. Such formatting pays
  attention to, for example, capitalization and punctuation.

### Duplication

* Don't copy-paste source code. Reuse it.

### Formatting

* Line length is limited to 120 characters for JavaScript, Java, and Kotlin code.

* Sort by alphabetical order in order to make the addition of new entities as
  easy as looking a word up in a dictionary. Otherwise, one risks duplicate
  entries (with conflicting values in the cases of key-value pairs). For
  example:

  * JavaScript: Within an `import` of multiple names from a module, sort the names in
    alphabetical order. (Of course, the default name stays first as required by
    the `import` syntax.)

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

  * JavaScript: Within a group of imports (e.g. groups of imports delimited by an empty line
    may be: third-party modules, then project modules, and eventually the
    private files of a module), sort the module names in alphabetical order.

    ````javascript
    import React, { Component } from 'react';
    import { connect } from 'react-redux';
    ````
  * Java: Use package imports (package.*) and DO NOT import classes themselves.

* Java: Opening braces MUST be on their own line (especially those beginning a method).

* Use 4 spaces to indent everything. Instruct your IDE not to use tabs under any circumstances and replace them with spaces.

* Do not use double negative when naming properties, variables or methods/functions.

### Indentation

* Align `switch` and `case`/`default`. Don't indent the `case`/`default` more
  than its `switch`.

  ````javascript
  switch (i) {
  case 0:
      ...
      break;
  default:
      ...
  }
  ````

### Naming

* An abstraction should have one name within the project and across multiple
  projects. For example:

  * The instance of lib-jitsi-meet's `JitsiConnection` type should be named
    `connection` or `jitsiConnection` in jitsi-meet, not `client`.

  * The class `ReducerRegistry` should be defined in ReducerRegistry.js and its
    imports in other files should use the same name. Don't define the class
    `Registry` in ReducerRegistry.js and then import it as `Reducers` in other
    files.

* The names of global constants (including ES6 module-global constants) should
  be written in uppercase with underscores to separate words. For example,
  `BACKGROUND_COLOR`.

* The underscore character at the beginning of a name signals that the
  respective variable, function, property is non-public i.e. private, protected,
  or internal. In contrast, the lack of an underscore at the beginning of a name
  signals public API.

### JavaScript
#### Feature layout

When adding a new feature, this would be the usual layout.

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

The middleware must be imported in `react/features/app/` specifically
in `middlewares.any`, `middlewares.native.js` or `middlewares.web.js` where appropriate.
Likewise for the reducer.

An `index.js` file must not be provided for exporting actions, action types and
component. Features / files requiring those must import them explicitly.

This has not always been the case and the entire codebase hasn't been migrated to
this model but new features should follow this new layout.

When working on an old feature, adding the necessary changes to migrate to the new
model is encouraged.

#### Avoiding bundle bloat

When adding a new feature it's possible that it triggers a build failure due to the increased bundle size. We have safeguards inplace to avoid bundles growing disproportionatelly. While there are legit reasons for increasing the limits, please analyze the bundle first to make sure no unintended dependencies have been included, causing the increase in size.

First, make a production build with bundle-analysis enabled:

```
npx webpack -p --analyze-bundle
```

Then open the interactive bundle analyzer tool:

```
npx webpack-bundle-analyzer build/app-stats.json
```

### Kotlin

For Kotlin code we use the [standard convention](https://kotlinlang.org/docs/coding-conventions.html) and limit line length to 120 characters. We use `ktlint` to enforce formatting.
