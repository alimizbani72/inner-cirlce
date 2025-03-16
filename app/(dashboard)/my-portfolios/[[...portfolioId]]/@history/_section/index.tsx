'use client';
import { useParams } from 'next/navigation';
import { getActivePortfolioId } from '../../_section/utils';

import {
  useGetOverviewHistory,
  useGetPortfolios,
  useGetPortfoliosIdHistory,
} from '@/services/minecraft/portfolio/portfolio';
import { useMemo, useState } from 'react';
import { RenderContent } from './RenderContent';
import { getChartData } from './utils';

const HistorySection = () => {
  const { portfolioId } = useParams();
  const [filter, setFilter] = useState('All');
  const activePortfolioId = getActivePortfolioId(portfolioId);

  const { data: overview, isLoading: overviewLoading } = useGetOverviewHistory(undefined, {
    query: {
      enabled: !activePortfolioId,
      refetchOnMount: 'always',
    },
  });
  const { data: portfolios } = useGetPortfolios();
  const { data: portfoliohistory, isLoading: portfolioDetailLoading } = useGetPortfoliosIdHistory(
    activePortfolioId,
    undefined,
    {
      query: {
        enabled: !!activePortfolioId,
        refetchOnMount: 'always',
      },
    }
  );

  const loading = activePortfolioId ? portfolioDetailLoading : overviewLoading;
  const selectedPortfolio = activePortfolioId ? portfoliohistory : overview;

  const chartData = useMemo(
    () => getChartData(selectedPortfolio, filter),
    [selectedPortfolio, filter]
  );
  if (!portfolios?.data?.length) {
    return null;
  }

  return <RenderContent {...{ chartData, filter, loading, setFilter }} />;
};

export default HistorySection;
