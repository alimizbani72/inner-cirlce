'use client';
import { useGetCoinReport } from '@/services/minecraft/coin-report/coin-report';
import { defaultValuesFilters } from '@dashboard/coin-reports/_sections/consts';
import CoinReportTable from '@dashboard/coin-reports/_sections/table';
import type { FilterFormDataType } from '@dashboard/coin-reports/_sections/types';
import { useMemo, useState } from 'react';

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

let TOTAL_COUNT = 0;

const CoinReportPage = () => {
  const [filters, setFilters] = useState<FilterFormDataType>(defaultValuesFilters);

  const { data, refetch, isFetching } = useGetCoinReport({ opts: handleOptsForService(filters) });

  const totalCount = useMemo(() => {
    if (data?.meta) {
      TOTAL_COUNT = data?.meta?.total_count || 0;
    }
    return TOTAL_COUNT;
  }, [data?.meta]);

  const finalData = useMemo(() => {
    return data?.data?.map((item, index) => ({ ...item, id: `${item.category}-${index}` }));
  }, [data?.data]);

  return (
    <CoinReportTable
      onFilterChange={(filter) => setFilters(filter)}
      filters={filters}
      data={finalData}
      nextUpdate={data?.meta?.next_update}
      totalCount={totalCount}
      isFetching={isFetching}
      onNextUpdate={refetch}
    />
  );
};

export default CoinReportPage;
