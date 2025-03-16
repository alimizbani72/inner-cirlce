'use client';
import { setCoinsTimer } from '@/lib/features/timer/timerSlice';
import { useAppDispatch } from '@/lib/hooks';
import { useGetCoinReport } from '@/services/minecraft/coin-report/coin-report';
import { toNumber } from '@/utils/toNumber';
import { defaultValuesFilters } from '@dashboard/coin-reports/_sections/consts';
import CoinReportTable from '@dashboard/coin-reports/_sections/table';
import type { FilterFormDataType } from '@dashboard/coin-reports/_sections/types';
import { useEffect, useState } from 'react';

export const handleOptsForService = (filters: FilterFormDataType) => {
  return JSON.stringify({
    filters: {
      timeframe: filters.timeFrame,
      plans: filters.packages?.map((pack) => pack.value),
      signals: filters?.signals?.map((signal) => signal?.value),
      categories: filters?.categories?.map((category) => category.value),
      query: filters?.query || undefined,
    },
    sorts: filters.sorts,
    page: filters.page || 1,
    per_page: filters.per_page,
  });
};

const CoinReportPage = () => {
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState<FilterFormDataType>(defaultValuesFilters);

  const { data, refetch, isFetching } = useGetCoinReport(
    { opts: handleOptsForService(filters) },
    { query: { refetchOnMount: 'always' } }
  );

  useEffect(() => {
    if (isFetching) {
      dispatch(setCoinsTimer(toNumber(0)));
    } else if (data?.meta?.next_update) {
      dispatch(setCoinsTimer(toNumber(data?.meta?.next_update)));
    }
  }, [data?.meta?.next_update, isFetching]);

  return (
    <CoinReportTable
      onFilterChange={(filter) => setFilters(filter)}
      filters={filters}
      data={data?.data}
      totalCount={data?.meta?.total_count || 0}
      isFetching={isFetching}
      onNextUpdate={refetch}
    />
  );
};

export default CoinReportPage;
