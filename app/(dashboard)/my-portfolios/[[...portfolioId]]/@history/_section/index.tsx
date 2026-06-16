"use client";
import { useParams } from "next/navigation";
import { getActivePortfolioId } from "../../_section/utils";

import { useMemo, useState } from "react";
import {
  useGetOverviewHistory,
  useGetPortfolios,
  useGetPortfoliosIdHistory,
} from "../../_section/hooks";
import { RenderContent } from "./RenderContent";
import { getChartData } from "./utils";

const HistorySection = () => {
  const { portfolioId } = useParams();
  const [filter, setFilter] = useState("All");
  const activePortfolioId = getActivePortfolioId(portfolioId);

  const { data: overview, isLoading: overviewLoading } =
    useGetOverviewHistory();
  const { data: portfolios } = useGetPortfolios();
  const { data: portfoliohistory, isLoading: portfolioDetailLoading } =
    useGetPortfoliosIdHistory(activePortfolioId);

  const loading = activePortfolioId ? portfolioDetailLoading : overviewLoading;
  const selectedPortfolio = activePortfolioId ? portfoliohistory : overview;

  const chartData = useMemo(
    () => getChartData(selectedPortfolio as any, filter),
    [selectedPortfolio, filter],
  );
  if (!portfolios?.data?.length) {
    return null;
  }

  return <RenderContent {...{ chartData, filter, loading, setFilter }} />;
};

export default HistorySection;
