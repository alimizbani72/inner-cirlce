export const sidebarItems = [
  {
    path: "dashboard",
    icon: "Home",
  },
  {
    path: "coin-reports",
    icon: "Coin reports",
  },
  {
    path: undefined,
    icon: "Portfolio",
    items: [{ path: "my-portfolios" }, { path: "portfolio-strategies" }],
  },
];

export const mapPathToName = {
  dashboard: "Dashboard",
  "coin-reports": "Coin Reports",
  "my-portfolios": "My Portfolios",
  "portfolio-strategies": "Portfolio Strategies",
};
