module.exports = {
  docs: [
    {
      type: "category",
      label: "Getting Started",
      items: [
        "intro",
        "architecture",
        "security",
        "faq",
      ],
    },
    {
      type: "category",
      label: "Community",
      link: {
        type: "doc",
        id: "community/community-intro",
      },
      items: [
        "community/community-instances",
        "community/breakout-rooms",
        "community/third-party-software",
      ],
    },
    {
      type: "category",
      label: "User Guide",
      link: {
        type: "doc",
        id: "user-guide/user-guide-start",
      },
      items: [
        "user-guide/supported-browsers",
        "user-guide/user-guide-join-jitsi-meeting",
        "user-guide/user-guide-start-a-jitsi-meeting",
        "user-guide/user-guide-share-a-jitsi-meeting",
        "user-guide/user-guide-jitsi-meet-on-mobile",
        "user-guide/user-guide-jitsi-meet-for-google-calendar",
        "user-guide/keyboard-shortcuts",
        "user-guide/user-guide-basic",
        "user-guide/user-guide-advanced",
      ],
    },
    {
      type: "category",
      label: "Developer Guide",
      link: {
        type: "doc",
        id: "dev-guide/dev-guide-start",
      },
      items: [
        "dev-guide/dev-guide-contributing",
        {
          type: "category",
          label: "Web",
          link: {
            type: "doc",
            id: "dev-guide/dev-guide-web",
          },
          items: [
            "dev-guide/dev-guide-ljm",
            "dev-guide/dev-guide-web-integrations",
            {
              type: "category",
              label: "IFrame API",
              link: {
                type: "doc",
                id: "dev-guide/dev-guide-iframe",
              },
              items: [
                "dev-guide/dev-guide-iframe-functions",
                "dev-guide/dev-guide-iframe-commands",
                "dev-guide/dev-guide-iframe-events"
              ]
            },
            "dev-guide/dev-guide-configuration",
            "dev-guide/dev-guide-react-sdk",
            "dev-guide/dev-guide-ljm-api",
          ],
        },
        {
          type: "category",
          label: "Mobile",
          link: {
            type: "doc",
            id: "dev-guide/dev-guide-mobile",
          },
          items: [
            "dev-guide/dev-guide-mobile-jitsi-meet",
            "dev-guide/mobile-feature-flags",
            "dev-guide/dev-guide-android-sdk",
            "dev-guide/dev-guide-ios-sdk",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Self-Hosting Guide",
      link: {
        type: "doc",
        id: "devops-guide/devops-guide-start",
      },
      items: [
        {
          type: "category",
          label: "Deployment",
          items: [
            "devops-guide/devops-guide-requirements",
            "devops-guide/devops-guide-quickstart",
            "devops-guide/devops-guide-opensuse",
            "devops-guide/devops-guide-docker",
            "devops-guide/devops-guide-manual",
          ],
        },
        {
          type: "category",
          label: "Configuration",
          items: [
            "devops-guide/secure-domain",
            "devops-guide/ldap-authentication",
            "devops-guide/devops-guide-scalable",
            "devops-guide/reservation",
            "devops-guide/turn",
            "devops-guide/speakerstats",
            "devops-guide/videosipgw",
            "devops-guide/cloud-api",
          ],
        },
        "devops-guide/devops-guide-videotutorials",
        "devops-guide/faq",
      ],
    },
  ],
  "releases-sidebar": [
    {
      type: "doc",
      label: "Releases",
      id: "releases",
    },
  ],
};
