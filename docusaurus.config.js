const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

module.exports = {
  title: "Jitsi Meet",
  tagline: "State-of-the-art video conferencing you can self-host.",
  url: "https://jitsi.github.io",
  baseUrl: "/handbook/",
  organizationName: "jitsi",
  projectName: "handbook",
  favicon: "img/favicon.png",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          editUrl: "https://github.com/jitsi/handbook/edit/master/website/",
          path: "docs",
          sidebarPath: require.resolve("./sidebars.json"),
        },
        theme: {
          customCss: [require.resolve("./src/css/custom.css")],
        },
      },
    ],
  ],
  plugins: [],
  themeConfig: {
    navbar: {
      title: "Jitsi Meet Handbook",
      logo: {
        src: "img/logo.svg",
      },
      items: [
        {
          to: "docs/intro",
          label: "Docs",
          position: "left",
        },
        {
          to: "docs/releases",
          label: "Releases",
          position: "left",
        },
        {
          href: "https://community.jitsi.org",
          label: "Community",
          position: "left",
        },
        {
          href: 'https://github.com/jitsi',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    image: "img/undraw_online.svg",
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Introduction",
              to: "docs/intro",
            },
            {
              label: "User guide",
              to: "docs/user-guide",
            },
            {
              label: "Developer guide",
              to: "docs/dev-guide",
            },
            {
              label: "Self-hosting guide",
              to: "docs/devops-guide",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Forum",
              href: "https://community.jitsi.org",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/jitsinews",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              href: "https://jitsi.org",
            },
            {
              label: "GitHub",
              href: "https://github.com/jitsi",
            },
            {
              label: "JaaS: Jitsi as a Service",
              href: "https://jaas.8x8.vc"
            },
          ],
        },
      ],
      copyright: "Copyright © 8x8, Inc.",
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
};
