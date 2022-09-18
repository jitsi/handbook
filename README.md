# The Jitsi Handbook

This is The Jitsi Handbook. Your one-stop-shop for Jitsi documentation. It's powered by [Docusaurus](https://docusaurus.io/).
The documentation website can be found [here](https://jitsi.github.io/handbook/).

## Building the site

The site is built automatically with every push thanks to a [GH Actions](https://github.com/jitsi/handbook/blob/master/.github/workflows/gh-pages.yml).

**NOTE:** You need to have Node.Js(>=14) installed in your system in order to build this site. NodeJs can be downloaded from [here](https://nodejs.org/en/download/)

If you want to build it locally, follow these simple steps:

1. Clone the repository

```shell
git clone https://github.com/jitsi/handbook.git
```

2. Move to the folder where the repository is cloned

```shell
cd handbook
```

3. Install the dependencies

```shell
npm install
```

4. Start the website

```shell
npm start
```

The website will be running in http://127.0.0.1:3000/handbook/

You can now edit the files in the `docs` folder and the site will reflect the changes immediately thanks to
live reloading.

## Contributing

We appreciate all contributions to this repository. Please make a Pull Request, no matter how small, all contributions
are valuable!

Please follow the given [Contributing Guidelines](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-contributing) before submitting a pull request.
