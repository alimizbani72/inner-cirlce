import {
  getGetPortfoliosIdHistoryQueryKey,
  getGetPortfoliosIdQueryKey,
  getGetPortfoliosQueryKey,
  getGetPortfolioTransactionsQueryKey,
} from '@/services/minecraft/portfolio/portfolio';
import type { QueryClient } from '@tanstack/react-query';
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
      queryKey: getGetPortfolioTransactionsQueryKey({
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
      queryKey: getGetPortfoliosQueryKey(),
    });
  }

  if (invalidatePortfolioId) {
    queryClient.invalidateQueries({
      queryKey: getGetPortfoliosIdQueryKey(portfolioId),
    });
  }
  if (invalidateHistory) {
    queryClient.invalidateQueries({
      queryKey: getGetPortfoliosIdHistoryQueryKey(portfolioId),
    });
  }
};
