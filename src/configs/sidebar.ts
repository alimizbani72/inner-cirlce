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
    name: "Portfolios",
    icon: "Portfolio",
    items: [{ path: "my-portfolios/" }, { path: "portfolio-strategies/" }],
  },
  {
    path: "education/",
    icon: "Tutorial",
  },
];

export const sidebarCommunityItems = [
  {
    path: "affiliate/",
    icon: "Affiliate",
  },
  {
    path: "help-center/",
    icon: "Support",
  },
];

export const mapPathToName = {
  "dashboard/": "Dashboard",
  "coin-reports/": "Coin Reports",
  "my-portfolios/": "My Portfolios",
  "portfolio-strategies/": "Portfolio Strategies",
  "affiliate/": "Affiliate",
  "education/": "Education",
  "help-center/": "Help Center",
};
