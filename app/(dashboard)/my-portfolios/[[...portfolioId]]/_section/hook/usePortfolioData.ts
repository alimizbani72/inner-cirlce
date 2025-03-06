import { useParams } from 'next/navigation';
import { getActivePortfolioId } from '../utils';
import { useGetOverview, useGetPortfoliosId } from '@/services/minecraft/portfolio/portfolio';

const usePortfolioData = () => {
  const { portfolioId } = useParams();
  const activePortfolioId = getActivePortfolioId(portfolioId);

  const { data: portfolioDetail, isLoading: isLoadingPortfolioDetail } = useGetPortfoliosId(
    activePortfolioId,
    {
      query: {
        enabled: !!activePortfolioId,
        refetchOnMount: 'always',
      },
    }
  );

  const { data: overview, isLoading: isLoadingOverview } = useGetOverview({
    query: {
      enabled: !activePortfolioId,
      refetchOnMount: 'always',
    },
  });

  const selectedPortfolio = activePortfolioId ? portfolioDetail : overview;
  const isLoading = isLoadingPortfolioDetail || isLoadingOverview;
  return {
    selectedPortfolio,
    portfolioDetail,
    overview,
    portfolioId: activePortfolioId,
    isLoading,
  };
};

export default usePortfolioData;
