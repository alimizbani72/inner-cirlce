'use client';
import { isSidebarCollapsed } from '@/lib/features/menu/menuSlice';
import { useAppSelector } from '@/lib/hooks';
import { Stack } from '@mui/material';
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
  const isCollapsed = useAppSelector(isSidebarCollapsed);
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

  return (
    <Stack
      width={{ md: '50%', xs: '100%' }}
      maxWidth={{ md: isCollapsed ? 'calc(50vw - 97px)' : 'calc(50vw - 168px)' }}
      sx={{ bgcolor: 'dark.2', border: '1.5px solid', borderColor: 'dark.3', borderRadius: 1.5 }}
    >
      <RenderContent {...{ chartData, filter, loading, setFilter }} />
    </Stack>
  );
};

export default HistorySection;
