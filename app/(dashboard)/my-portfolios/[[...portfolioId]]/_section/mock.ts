import type {
  PortfolioHistoryResponse,
  PortfolioResponse,
  PortfoliosResponse,
} from "./typess";

export const mockPortfolio: PortfolioResponse = {
  data: {
    id: "overview",
    name: "All Portfolios",
    avatar: "📊",

    total_value: 0,

    // ✅ REQUIRED (used in Badge)
    total_invested: 140000,
    total_realized: 5000,
    total_unrealized: 10000,

    assets: [
      {
        id: "1",
        name: "Bitcoin",
        symbol: "BTC",
        slug: "bitcoin",
        logo: "/btc.svg",

        current_holdings: 1.5,
        actual_price: 65000,
        actual_value: 97500,
        distribution: 65,

        total_purchased: 1.2,
        total_sold: 0.2,
        total_invested: 70000,

        unrealized_pnl: 27500,
        realized_pnl: 5000,
      },
      {
        id: "2",
        name: "Ethereum",
        symbol: "ETH",
        slug: "ethereum",
        logo: "/eth.svg",

        current_holdings: 1.5,
        actual_price: 3000,
        actual_value: 4500,
        distribution: 35,

        total_purchased: 1.2,
        total_sold: 0.2,
        total_invested: 2000,

        unrealized_pnl: 2500,
        realized_pnl: 1000,
      },
    ],
  },
  meta: {
    total_actual_value: 0,
  },
};

export const mockPortfolioDetail: PortfolioResponse = {
  data: {
    id: "1",
    name: "My Portfolio",
    avatar: "📊",

    total_value: 0,

    // ✅ REQUIRED (used in Badge)
    total_invested: 140000,
    total_realized: 5000,
    total_unrealized: 10000,

    assets: [
      {
        id: "1",
        name: "Bitcoin",
        symbol: "BTC",
        slug: "bitcoin",
        logo: "/btc.svg",

        current_holdings: 1.5,
        actual_price: 65000,
        actual_value: 97500,
        distribution: 65,

        total_purchased: 1.2,
        total_sold: 0.2,
        total_invested: 70000,

        unrealized_pnl: 27500,
        realized_pnl: 5000,
      },
      {
        id: "2",
        name: "Ethereum",
        symbol: "ETH",
        slug: "ethereum",
        logo: "/eth.svg",

        current_holdings: 1.5,
        actual_price: 3000,
        actual_value: 4500,
        distribution: 35,

        total_purchased: 1.2,
        total_sold: 0.2,
        total_invested: 2000,

        unrealized_pnl: 2500,
        realized_pnl: 1000,
      },
    ],
  },
  meta: {
    total_actual_value: 0,
  },
};
export const mockHistory: PortfolioHistoryResponse = {
  data: {
    history: [
      { date: "2024-01-01", value: 50000 },
      { date: "2024-02-01", value: 80000 },
      { date: "2024-03-01", value: 120000 },
    ],
  },
};

export const mockPortfolios: PortfoliosResponse = {
  data: [
    {
      id: "1",
      name: "Main Portfolio",
      avatar: "📈",
      background_color: "#2D2D2D",
      actual_value: 90000,
      total_actual_value: 90000,
    },
    {
      id: "2",
      name: "Trading Portfolio",
      avatar: "💹",
      background_color: "#1E1E1E",
      actual_value: 60000,
      total_actual_value: 60000,
    },
  ],
  meta: {
    total_actual_value: 150000,
  },
};
