import {
  UsePortfolioServicePortfoliosIdHistoryQueryKeyFn,
  UsePortfolioServicePortfoliosIdQueryKeyFn,
  UsePortfolioServicePortfoliosQueryKeyFn,
  UsePortfolioServicePortfolioTransactionsQueryKeyFn,
} from "@minecraft/queries";
import type { QueryClient } from "@tanstack/react-query";
interface InvalidateOptions {
  portfolioId: any;
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
  }: InvalidateOptions
) => {
  if (invalidateTransactions) {
    queryClient.invalidateQueries({
      queryKey: UsePortfolioServicePortfolioTransactionsQueryKeyFn({
        opts: JSON.stringify({
          filters: {
            slug: activeSymbol,
            portfolio_id: portfolioId,
          },
          page: 1,
          per_page: 20,
        }),
      }),
    });
  }

  if (invalidatePortfolio) {
    queryClient.invalidateQueries({
      queryKey: UsePortfolioServicePortfoliosQueryKeyFn(),
    });
  }

  if (invalidatePortfolioId) {
    queryClient.invalidateQueries({
      queryKey: UsePortfolioServicePortfoliosIdQueryKeyFn({
        id: portfolioId,
      }),
    });
  }
  if (invalidateHistory) {
    queryClient.invalidateQueries({
      queryKey: UsePortfolioServicePortfoliosIdHistoryQueryKeyFn({
        id: portfolioId,
      }),
    });
  }
};
