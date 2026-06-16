export type Asset = {
  id: string;
  name: string;
  symbol: string;
  slug: string;
  logo: string;

  current_holdings: number;
  actual_price: number;
  actual_value: number;
  distribution: number;

  total_purchased: number;
  total_sold: number;
  total_invested: number;

  unrealized_pnl: number;
  realized_pnl: number;
};

export type PortfolioResponse = {
  data: {
    id: string;
    name: string;
    avatar?: string;

    total_value: number;

    // ✅ ADD THESE (used in UI)
    total_invested: number;
    total_realized: number;
    total_unrealized: number;

    assets: Asset[];
  };
  meta: {
    total_actual_value: number;
  };
};

export type PortfolioHistoryResponse = {
  data: {
    history: { date: string; value: number }[];
  };
};

export type PortfolioListItem = {
  id: string;
  name: string;
  avatar: string;
  background_color: string;
  actual_value: number;
  total_actual_value: number;
};

export type PortfoliosResponse = {
  data: PortfolioListItem[];
  meta: {
    total_actual_value: number;
  };
};

export type PortfolioTransaction = {
  id: string;
  type: "buy" | "sell";
  quantity: number;
  price: number;
  fee: number;
  date: string;
  note?: string;
};

export type PortfolioTransactionsResponse = {
  data: PortfolioTransaction[];
  meta: {
    total_count: number;
  };
};
