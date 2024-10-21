import { useParams } from "next/navigation";
import { usePortfolioServicePortfoliosIdQuery, usePortfolioServiceOverviewQuery } from "@minecraft/queries";
import { getActivePortfolioId } from "../utils";

const usePortfolioData = () => {
  const { portfolioId } = useParams();
  const activePortfolioId = getActivePortfolioId(portfolioId);

  const { data: portfolioDetail, isLoading: isLoadingPortfolioDetail } = usePortfolioServicePortfoliosIdQuery(
    { id: activePortfolioId },
    undefined,
    {
      enabled: !!activePortfolioId,
    }
  );

  const { data: overview, isLoading: isLoadingOverview } = usePortfolioServiceOverviewQuery(undefined, {
    enabled: !activePortfolioId,
  });

  const selectedPortfolio = activePortfolioId ? portfolioDetail : overview;
  const isLoading = isLoadingPortfolioDetail || isLoadingOverview;
  return { selectedPortfolio, portfolioDetail, overview, portfolioId: activePortfolioId, isLoading };
};

export default usePortfolioData;
