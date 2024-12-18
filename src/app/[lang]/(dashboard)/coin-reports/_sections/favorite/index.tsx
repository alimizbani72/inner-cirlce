"use client";
import { handleOptsForService } from "@dashboard/coin-reports/_sections";
import { defaultValuesFilters } from "@dashboard/coin-reports/_sections/consts";
import CoinReportTable from "@dashboard/coin-reports/_sections/table";
import type { FilterFormDataType } from "@dashboard/coin-reports/_sections/types";
import { useCoinReportServiceCoinReportFavoritesQuery } from "@minecraft/queries";
import { useMemo, useState } from "react";

let TOTAL_COUNT = 0;

const CoinReportFavoritePage = () => {
  const [filters, setFilters] = useState<FilterFormDataType>(defaultValuesFilters);
  const { data, refetch, isFetching } = useCoinReportServiceCoinReportFavoritesQuery({
    opts: handleOptsForService(filters),
  });

  const totalCount = useMemo(() => {
    if (data?.meta) {
      TOTAL_COUNT = data?.meta?.total_count || 0;
    }
    return TOTAL_COUNT;
  }, [data?.meta]);

  return (
    <CoinReportTable
      onFilterChange={(filter) => setFilters(filter)}
      filters={filters}
      data={data?.data}
      nextUpdate={data?.meta?.next_update}
      totalCount={totalCount}
      isFetching={isFetching}
      onNextUpdate={refetch}
    />
  );
};

export default CoinReportFavoritePage;
