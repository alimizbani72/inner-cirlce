export type Coin = {
  symbol: string;
  name: string;
  logo: string;
};

export type Portfolio = {
  avatar: string;
  background_color: string;
  id: string;
  name: string;
  actual_value?: string;
};

export type SelectedPortfolio = {
  total_realized: string;
  total_unrealized: string;
  total_invested: string;
};
