"use client";
import { setCoinsTimer } from "@/lib/features/timer/timerSlice";
import { useAppDispatch } from "@/lib/hooks";
import { customInstance } from "@/scripts/fetcher";
import { toNumber } from "@/utils/toNumber";
import { handleOptsForService } from "@dashboard/coin-reports/_sections";
import { defaultValuesFilters } from "@dashboard/coin-reports/_sections/consts";
import CoinReportTable from "@dashboard/coin-reports/_sections/table";
import type { FilterFormDataType } from "@dashboard/coin-reports/_sections/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useCoinReportFavorites = (opts: any) => {
  return useQuery({
    queryKey: ["coin-report-favorites", opts],
    queryFn: async () => {
      const res = await customInstance<any>({
        url: "/coin-report",
      });

      return {
        ...res,
        data: res.data.filter((item: any) => item.is_favorite),
      };
    },
  });
};
const CoinReportFavoritePage = () => {
  const dispatch = useAppDispatch();
  const [filters, setFilters] =
    useState<FilterFormDataType>(defaultValuesFilters);
  const { data, refetch, isFetching } = useCoinReportFavorites(
    handleOptsForService(filters),
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
