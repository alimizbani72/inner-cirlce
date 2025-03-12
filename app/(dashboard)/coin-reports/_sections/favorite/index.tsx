'use client';
import { useGetCoinReportFavorites } from '@/services/minecraft/coin-report/coin-report';
import { handleOptsForService } from '@dashboard/coin-reports/_sections';
import { defaultValuesFilters } from '@dashboard/coin-reports/_sections/consts';
import CoinReportTable from '@dashboard/coin-reports/_sections/table';
import type { FilterFormDataType } from '@dashboard/coin-reports/_sections/types';
import { useMemo, useState } from 'react';

let TOTAL_COUNT = 0;

const CoinReportFavoritePage = () => {
  const [filters, setFilters] = useState<FilterFormDataType>(defaultValuesFilters);
  const { data, refetch, isFetching } = useGetCoinReportFavorites(
    {
      opts: handleOptsForService(filters),
    },
    { query: { refetchOnMount: 'always' } }
  );

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

export default CoinReportFavoritePage;
