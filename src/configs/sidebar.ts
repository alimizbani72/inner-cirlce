export const sidebarServicesItems = [
  {
    path: "",
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
];

export const sidebarCommunityItems = [
  {
    path: "affiliate/",
    icon: "Affiliate",
  },
  {
    path: "education/",
    icon: "Tutorial",
  },
  {
    path: "help-center/",
    icon: "Support",
  },
];

export const mapPathToName = {
  "": "Dashboard",
  "coin-reports/": "Coin Reports",
  "my-portfolios/": "My Portfolios",
  "portfolio-strategies/": "Portfolio Strategies",
  "affiliate/": "Affiliate",
  "education/": "Education",
  "help-center/": "Help Center",
};
