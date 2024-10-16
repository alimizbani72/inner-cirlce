export const sidebarServicesItems = [
  {
    path: "dashboard/",
    key: "dashboard",
    icon: "Home",
  },
  {
    path: "coin-reports/",
    icon: "Coin-reports",
  },
  {
    path: undefined,
    name: "portfolio",
    icon: "Portfolio",
    // items: [{ path: "my-portfolios/" }, { path: "portfolio-strategies/" }],
    items: [{ path: "portfolio-strategies/" }],
  },
  {
    path: "education/",
    icon: "Tutorial",
    mainSlug: "education",
  },
];

export const sidebarCommunityItems = [
  {
    path: undefined,
    name: "affiliate",
    icon: "Affiliate",
    items: [
      { path: "affiliate/", name: "Affiliate Dashboard" },
      { path: "affiliate/how-it-works/", name: "How it works" },
      { path: "affiliate/marketing-assets/", name: "Marketing Assets" },
      { path: "affiliate/marketing-rules/", name: "Marketing Rules" },
    ],
  },

  {
    path: "settings/account/",
    icon: "Settings",
    mainSlug: "settings",
  },
  // {
  //   path: "secret-hunts/",
  //   icon: "treasure-map",
  // },

  // {
  //   path: "help-center/",
  //   icon: "Support",
  // },
];

export const mapPathToName = {
  "dashboard/": "dashboard",
  "coin-reports/": "coin-reports",
  "telegram-channel/": "telegram-channel",
  "portfolio-strategies/": "portfolio-strategies",
  "my-portfolios/": "my-portfolios",
  "affiliate/": "affiliate",
  "education/": "education",
  "help-center/": "help-center",
  "secret-hunts/": "secret-hunts",
  "settings/account/": "settings",
  "settings/become-a-partner/": "settings",
  "settings/billing/": "settings",
  "settings/business-account/": "settings",
};
