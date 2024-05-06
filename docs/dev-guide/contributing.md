---
id: dev-guide-contributing
title: Contributing Guidelines
---

# 🤝 How to Contribute 
We greatly appreciate your willingness to contribute ❤️ Before you start working however, please take a moment to read and follow this brief guide.

# 📥 Reporting Issues and Asking Questions 

- We prefer issues to be discussed first in the [community forum](https://community.jitsi.org/) and when confirmed, then an issue can be opened in the issue tracker of the appropriate project on GitHub.

- Feel free to report ***any bugs, ask for new features or anything else*** you need help with. When opening an issue, please provide as much information as possible.

- Please ask any general and implementation specific questions on the [community forum](https://community.jitsi.org/) for support.

### 🪲 Bug Reports and Other Issues

For bugs please follow these steps:

- **Provide Detailed Information:**
  Include versions of Jitsi Meet, Jicofo, and JVB.

- **Description of the Issue:**
  Clearly explain the problem encountered.

- **Reproduction Steps:**
  Provide step-by-step instructions to recreate the issue.

- **Expected Behavior:**
  Describe the expected outcome when using the software.

- **Actual Behavior:**
  Explain what actually happened, including any error messages.

### 💟 Feature Requests

If you have an idea for a new feature or something you'd like to see improved in Jitsi, here's how you can let us know:

- **Describe the feature:** Specify the desired functionality.
- **Provide examples:** Share similar features from other apps.
- **Explain importance:** Justify the feature's relevance.
- **Considerations:** Assess potential challenges.
- **Additional details:** Include specific preferences.

# Code Contributions 

- Visit the [issue tracker](https://github.com/jitsi/jitsi-meet/issues) to find a list of open issues that need attention.

- Discovered a bug or have a feature request and know how to fix it? Excellent! Keep reading 🔍

- The [Developer Guide](/docs/category/developer-guide) will help you to setup a development environment to start working on the Jitsi Meet applications.

## ✏️ Contributor License Agreement 
While the Jitsi projects are released under the
[Apache License 2.0](https://github.com/jitsi/jitsi-meet/blob/master/LICENSE), the copyright
holder and principal creator is [8x8](https://www.8x8.com/). To
ensure that we can continue making these projects available under an Open Source license,
we need you to sign our Apache-based contributor
license agreement as either a [corporation](https://jitsi.org/ccla) or an
[individual](https://jitsi.org/icla). If you cannot accept the terms laid out
in the agreement, unfortunately, we cannot accept your contribution.

## 🔁 Creating Pull Requests 
- Fork the repository to your GitHub account.
- Create a new branch for your changes, based on the master branch. Choose a descriptive name for your branch.
- Make **one** logical change per pull request to keep things organized.
- Keep your commit history clean and concise. If necessary, squash multiple commits into one.
- Rebase your branch onto the latest changes in the master branch before submitting the pull request. **Never** merge master, always rebase.
- Commits should have prefix indicating what they do is it feature, a fix or a translation update. This helps with automated release notes generation. Prefix the commits with `feat(feature name) `, `fix(feature name)`, etc.

## ❗️For 8x8 employees
- Don't link any internal resources such as Jira issues, this is an Open Source project

## 📝 Coding Style

### Comments

* Comments documenting the source code are required.

  * Comments from which documentation is automatically generated are **not**
    subject to case-by-case decisions. Such comments are used, for example, on
    types and their members. Examples of tools which automatically generate
    documentation from such comments include JSDoc, Javadoc, Doxygen.

  * Comments that are not automatically processed are strongly encouraged. They
    are subject to case-by-case decisions. Such comments are often observed in
    function bodies.

* Comments should be formatted as proper English sentences. Such formatting pays
  attention to, for example, capitalization and punctuation.

### Duplication

* Don't copy-paste source code. Reuse it. Be careful not to create bad abstractions just to reuse a small chunk of code, however.

### Formatting

* Line length is limited to 120 characters for JavaScript, Java, and Kotlin code.

* Sort by alphabetical order to make the addition of new entities as
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
    maybe: third-party modules, then project modules, and eventually the
    private files of a module), sort the module names in alphabetical order.

    ````javascript
    import React, { Component } from 'react';
    import { connect } from 'react-redux';
    ````
  * Java: Use package imports (package.*) and DO NOT import classes themselves.

* Java: Opening braces MUST be on their line (especially those beginning a method).

* Use 4 spaces to indent everything. Instruct your IDE **not to use tabs under any circumstance** and replace them with spaces.

* Do not use double negatives when naming properties, variables, or methods/functions.

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
  respective variable, function, or property is non-public i.e. private, protected,
  or internal. In contrast, the lack of an underscore at the beginning of a name
  signals public API.

### TypeScript

#### Feature layout

When adding a new feature, this would be the usual layout.

```
react/features/sample/
├── actionTypes.ts
├── actions.ts
├── components
│   ├── AnotherComponent.tsx
│   └── OneComponent.tsx
├── middleware.ts
└── reducer.ts
```

All new features must be written in TypeScript. When working on an old feature,
converting the JavaScript files to TypeScript is encouraged.

The middleware must be imported in `react/features/app/` specifically
in `middlewares.any`, `middlewares.native.js` or `middlewares.web.js` where appropriate.
Likewise for the reducer.

In general, we want to avoid `index` files. We prefer using the full path for imports.
However, there are cases where a common file (used by both web and native, eg. `actions.ts`)
needs to import from components (from `/native` or from `/web`, depending on the platform the build is for).
In this case, we create two `index` files in `components/`: `index.native.ts` and `index.web.ts` and export
just the component we need. The common file should then be imported from `components/index`.

This has not always been the case and the entire codebase hasn't been migrated to
this model but new features should follow this new layout.

When working on an old feature, adding the necessary changes to migrate to the new
model is encouraged.

#### Avoiding bundle bloat

When adding a new feature it may trigger a build failure due to the increased bundle size. We have safeguards in place to avoid bundles growing disproportionately. While there are legitimate reasons for increasing the limits, please analyze the bundle first to make sure no unintended dependencies have been included, causing the increase in size.

First, make a production build with bundle-analysis enabled:

```
npx webpack -p --analyze-bundle
```

Then open the interactive bundle analyzer tool:

```
npx webpack-bundle-analyzer build/app-stats.json
```

### Kotlin

- For Kotlin code we use the [standard convention](https://kotlinlang.org/docs/coding-conventions.html) and limit line length to 120 characters. We use `ktlint` to enforce formatting.

## ✅ Code Reviews

- **Submit Your Contribution:** After completing your work, submit your contribution.
- **Draft PRs for Discussion:** Consider opening a draft PR early to discuss your approach with the team before fully implementing it. Draft PRs facilitate early collaboration, ensuring efficient progress.
- **Assign Reviewers:** Appropriate reviewers are assigned based on the affected code base and expertise required for changes.
- **Review Process:** Reviewers will carefully examine your code, checking for adherence to coding standards, correctness, performance and potential issues.
- **Feedback and Iteration:** If any issues or suggestions are identified during the review, you'll receive feedback from the reviewers. Address any comments or concerns raised and make necessary revisions to your code.
- **Automated tests:** Once the PR is in a good state, a team member will trigger the automated tests. The PR needs to merge cleanly on top of master, and test failures or issues discovered at this stage will need to be addressed before the PR is approved for merging.
- **Approval:** Once the code meets the required standards, passes the review, and tests, it will be approved for merging into the main codebase.

## 🎉 Issue Closing 

- You can close issues automatically with keywords in pull requests and commit messages. For more information, see "[Linking a pull request to an issue.](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword#linking-a-pull-request-to-an-issue-using-a-keyword)"
