'use client';
import { setCoinsTimer } from '@/lib/features/timer/timerSlice';
import { useAppDispatch } from '@/lib/hooks';
import { useGetCoinReportFavorites } from '@/services/minecraft/coin-report/coin-report';
import { toNumber } from '@/utils/toNumber';
import { handleOptsForService } from '@dashboard/coin-reports/_sections';
import { defaultValuesFilters } from '@dashboard/coin-reports/_sections/consts';
import CoinReportTable from '@dashboard/coin-reports/_sections/table';
import type { FilterFormDataType } from '@dashboard/coin-reports/_sections/types';
import { useEffect, useState } from 'react';

const CoinReportFavoritePage = () => {
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState<FilterFormDataType>(defaultValuesFilters);
  const { data, refetch, isFetching } = useGetCoinReportFavorites(
    {
      opts: handleOptsForService(filters),
    },
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

export default CoinReportFavoritePage;
