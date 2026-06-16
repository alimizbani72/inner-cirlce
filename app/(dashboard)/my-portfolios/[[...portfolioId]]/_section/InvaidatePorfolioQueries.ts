import type { QueryClient } from "@tanstack/react-query";

interface InvalidateOptions {
  portfolioId: string;
  activeSymbol?: string;

  invalidateTransactions?: boolean;
  invalidatePortfolio?: boolean;
  invalidatePortfolioId?: boolean;
  invalidateHistory?: boolean;
}

export const invalidatePortfolioQueries = (
  queryClient: QueryClient,
  {
    invalidatePortfolioId = false,
    portfolioId,
    activeSymbol,
    invalidateTransactions = false,
    invalidatePortfolio = false,
    invalidateHistory = false,
  }: InvalidateOptions,
) => {
  // ✅ Transactions
  if (invalidateTransactions) {
    queryClient.invalidateQueries({
      queryKey: ["portfolio-transactions", activeSymbol, portfolioId],
    });
  }

  // ✅ Portfolio list (all portfolios)
  if (invalidatePortfolio) {
    queryClient.invalidateQueries({
      queryKey: ["portfolios"],
    });
  }

  // ✅ Single portfolio detail
  if (invalidatePortfolioId) {
    queryClient.invalidateQueries({
      queryKey: ["portfolio-detail", portfolioId],
    });
  }

  // ✅ Portfolio history
  if (invalidateHistory) {
    queryClient.invalidateQueries({
      queryKey: ["portfolio-history", portfolioId],
    });
  }
};
