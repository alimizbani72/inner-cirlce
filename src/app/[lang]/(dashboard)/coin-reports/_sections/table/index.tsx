"use client";

import { DataGrid } from "@/components/datagrid";
import { useDebounce } from "@/hooks/use-debounce";
import Toggle from "@app/_components/Toggle";
import { defaultValueSort } from "@dashboard/coin-reports/_sections/consts";
import type { FilterFormDataType } from "@dashboard/coin-reports/_sections/types.d";
import { useCoinReportServiceCoinReportFavoritesQuery, useCoinReportServiceCoinReportQuery } from "@minecraft/queries";
import { Stack, Typography } from "@mui/material";
import { type GridRowParams, type GridSortModel, gridClasses, useGridApiRef } from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useAppRouter } from "@/routes/hooks";
import UpgradeModal from "@dashboard/coin-reports/[coinId]/_section/UpgradeModal";
import { FilterModal } from "@dashboard/coin-reports/_sections/FilterModal";
import { Header } from "./Header";
import { useTableController } from "./useTableController";

const convertFilterData = (data: FilterFormDataType) => ({
  filters: {
    timeframe: data.timeFrame,
    plans: data.packages?.map((pack) => pack.value),
    signals: data?.signals?.map((signal) => signal?.value),
    categories: data?.categories?.map((category) => category.value),
    query: data?.query || undefined,
  },
  sorts: data.sorts,
});

function CustomNoRowsOverlay() {
  return (
    <Stack justifyContent="center" alignItems="center" height="100%">
      <Typography variant="caption-medium" color="common.white">
        No rows
      </Typography>
    </Stack>
  );
}

const CoinReportTable = () => {
  const apiRef = useGridApiRef();
  const router = useAppRouter();

  const [value, setValue] = useState("all-coins");
  const [searchValue, setSearchValue] = useState("");
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [filters, setFilters] = useState<FilterFormDataType>({ timeFrame: "1h", sorts: defaultValueSort });
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 100,
  });
  const [openUpgradeModal, setOpenUpgradeModal] = useState(false);

  const debouncedSearch = useDebounce(searchValue, 500);

  const opts = useMemo(() => {
    return JSON.stringify({
      ...convertFilterData({ ...filters, query: debouncedSearch }),
      page: paginationModel?.page + 1,
      per_page: paginationModel?.pageSize,
    });
  }, [paginationModel, debouncedSearch, filters]);

  const {
    data: allData,
    refetch: refetchAll,
    isFetching,
  } = useCoinReportServiceCoinReportQuery({ opts }, undefined, { enabled: false });

  const {
    data: favoriteData,
    refetch: refetchFavorite,
    isFetching: isFetchingFavorite,
  } = useCoinReportServiceCoinReportFavoritesQuery({ opts }, undefined, { enabled: false });

  const refetch = useMemo(() => {
    if (value === "favorites") {
      return refetchFavorite;
    }
    return refetchAll;
  }, [value]);

  useEffect(() => {
    refetch();
  }, [opts, value]);

  const { columns, buttons } = useTableController();

  const finalData = useMemo(() => {
    const data = value === "favorites" ? favoriteData : allData;

    return {
      data: data?.data?.map((d, index) => ({ ...d, id: `${index}-${d?.plan}` })),
      meta: data?.meta,
    };
  }, [allData, favoriteData]);

  const handleSortChange = useCallback((model: GridSortModel) => {
    const sortModel = model[0];
    setFilters((prev) => ({
      ...prev,
      sorts: sortModel ? { [sortModel.field]: sortModel.sort === "asc" } : defaultValueSort,
    }));
  }, []);

  const toggleFilterModal = useCallback(() => {
    setOpenFilterModal((prev) => !prev);
  }, []);

  const handleFilterSubmit = useCallback(
    (
      data: Omit<FilterFormDataType, "sorts"> & {
        sorts: string;
      }
    ) => {
      setOpenFilterModal(false);
      setFilters({ ...data, sorts: { [data.sorts]: true } });
    },
    []
  );

  useEffect(() => {
    setTimeout(() => {
      apiRef.current.autosizeColumns({
        includeHeaders: true,
        includeOutliers: true,
        outliersFactor: 1.5,
        expand: true,
      });
    }, 2000);
  }, []);

  const handleRowClick = (api: GridRowParams<any>) => {
    if (api?.row?.name) {
      router.push(`/coin-reports/${api.row.slug}`);
    } else {
      setOpenUpgradeModal(true);
    }
  };

  return (
    <Stack
      sx={{
        ".os-scrollbar-handle": {
          cursor: "pointer",
          backgroundColor: "grey.dark",
          "&:hover": { backgroundColor: "grey.dark" },
        },
      }}
    >
      <Stack pl={{ md: 4, xs: 3 }} pb={3} alignItems="flex-start" maxWidth="100vw">
        <Stack pr={{ md: 4, xs: 3 }}>
          <Toggle
            setValue={setValue}
            buttons={buttons}
            value={value}
            sx={{ px: { xs: "20px !important", md: "24px !important" } }}
          />
        </Stack>
      </Stack>
      <Stack
        px={{ md: 4, xs: 3 }}
        sx={{
          [`& .${gridClasses.columnHeaders}`]: {
            [`& .${gridClasses.columnHeader}[data-field=name]`]: {
              position: "sticky",
              zIndex: 4,
              left: "0 !important",
              bgcolor: "dark.3",
            },
          },
          [`& .${gridClasses.row}`]: {
            "&:hover": {
              [`& .${gridClasses.cell}[data-field=name]`]: {
                bgcolor: "dark.3",
              },
            },
            [`& .${gridClasses.cell}[data-field=name]`]: {
              position: "sticky",
              zIndex: 4,
              left: "0 !important",
              bgcolor: "dark.1",
            },
          },
        }}
      >
        <DataGrid
          apiRef={apiRef}
          rows={finalData?.data}
          loading={isFetching || isFetchingFavorite}
          slotProps={{
            loadingOverlay: {
              variant: "circular-progress",
              noRowsVariant: "circular-progress",
            },
          }}
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          columns={columns}
          header={
            <Header
              onFilterClick={toggleFilterModal}
              onNextUpdate={refetch}
              nextUpdateTime={finalData?.meta?.next_update}
              {...{ setFilters, filters, setSearchValue }}
            />
          }
          rowCount={finalData?.meta?.total_count || 0}
          pageSizeOptions={[100]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={(model) => {
            setPaginationModel(model);
          }}
          sortModel={
            filters.sorts
              ? [{ field: Object.keys(filters.sorts)[0], sort: Object.values(filters.sorts)[0] ? "asc" : "desc" }]
              : undefined
          }
          sortingMode="server"
          autosizeOptions={{
            includeHeaders: true,
            includeOutliers: true,
            outliersFactor: 1.5,
            expand: true,
          }}
          onSortModelChange={handleSortChange}
          disableVirtualization
          onRowClick={handleRowClick}
          sx={{ height: "calc(100dvh - 400px)" }}
        />
      </Stack>

      {openFilterModal && (
        <FilterModal
          onClose={toggleFilterModal}
          onSubmit={handleFilterSubmit}
          filters={{ ...filters, sorts: Object.keys(filters?.sorts || {})?.[0] }}
        />
      )}
      {openUpgradeModal && <UpgradeModal open close={() => setOpenUpgradeModal(false)} />}
    </Stack>
  );
};

export default CoinReportTable;
