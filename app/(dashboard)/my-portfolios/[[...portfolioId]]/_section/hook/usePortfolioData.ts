import { useParams } from "next/navigation";
import { useGetOverview, useGetPortfoliosId } from "../hooks";
import { getActivePortfolioId } from "../utils";

const usePortfolioData = () => {
  const { portfolioId } = useParams();
  const activePortfolioId = getActivePortfolioId(portfolioId);

  const { data: portfolioDetail, isLoading: isLoadingPortfolioDetail } =
    useGetPortfoliosId(activePortfolioId);

  const { data: overview, isLoading: isLoadingOverview } =
    useGetOverview(!activePortfolioId);

  const selectedPortfolio = activePortfolioId ? portfolioDetail : overview;

  return {
    selectedPortfolio,
    portfolioDetail,
    overview,
    portfolioId: activePortfolioId,
    isLoading: isLoadingPortfolioDetail || isLoadingOverview,
  };
};

export default usePortfolioData;
