"use client";

import { DataGrid } from "@/components/datagrid";
import { useIsMobile } from "@/hooks/use-responsive";
import Toggle from "@app/_components/Toggle";
import { Stack, Typography } from "@mui/material";
import { type GridSortModel, useGridApiRef, gridClasses } from "@mui/x-data-grid";
import { useDebounce } from "@/hooks/use-debounce";
import { defaultValueSort } from "@dashboard/coin-reports-new/_sections/consts";
import type { FilterFormDataType } from "@dashboard/coin-reports-new/_sections/types.d";
import { useCoinReportServiceCoinReportQuery } from "@minecraft/queries";
import { useMemo, useState, useCallback } from "react";

import { Header } from "./Header";
import { useTableController } from "./useTableController";
import { useRouter } from "next/navigation";
import { FilterModal } from "@dashboard/coin-reports-new/_sections/FilterModal";

const convertFilterData = (data: FilterFormDataType) => ({
  filters: {
    timeframe: data.timeFrame,
    plans: data.packages?.map((pack) => pack.value),
    signals: data?.signals?.map((signal) => signal?.value),
    categories: data?.categories?.map((category) => category.value),
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
  const router = useRouter();

  const [value, setValue] = useState("all-coins");
  const [searchValue, setSearchValue] = useState("");
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [filters, setFilters] = useState<FilterFormDataType>({ timeFrame: "1d", sorts: defaultValueSort });

  const isMobile = useIsMobile();
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, refetch, isFetching } = useCoinReportServiceCoinReportQuery({
    opts: JSON.stringify({
      ...convertFilterData(filters),
      query: debouncedSearch,
      page: 1,
      per_page: 15,
    }),
  });

  const { columns, buttons } = useTableController();

  const finalData = useMemo(() => {
    return data?.data?.map((d) => ({ ...d, id: `${d.slug}-${d.category}` }));
  }, [data]);

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
        pl={{ md: 4, xs: 3 }}
        pb={3}
        sx={{
          ...(!isMobile && {
            [`& .${gridClasses.columnHeaders}`]: {
              [`& .${gridClasses.columnHeader}[data-field=name]`]: {
                position: "sticky",
                zIndex: 4,
                width: 250,
                left: "0 !important",
                bgcolor: "dark.3",
              },
            },
            [`& .${gridClasses.row}`]: {
              [`& .${gridClasses.cell}[data-field=name]`]: {
                position: "sticky",
                zIndex: 4,
                width: 250,
                left: "0 !important",
                bgcolor: "dark.1",
              },
            },
          }),

          "> div": {
            borderBottomRightRadius: { xs: undefined, md: 0 },
            borderTopRightRadius: { xs: undefined, md: 0 },
            borderRight: { xs: undefined, md: 0 },
          },
        }}
      >
        <DataGrid
          apiRef={apiRef}
          rows={finalData}
          loading={isFetching}
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
          autosizeOptions={{
            includeHeaders: false,
            includeOutliers: false,
            outliersFactor: 1,
            expand: true,
          }}
          disableColumnResize
          header={
            <Header
              onFilterClick={toggleFilterModal}
              onNextUpdate={refetch}
              nextUpdateTime={data?.meta?.next_update}
              {...{ setFilters, filters, setSearchValue }}
            />
          }
          pageSizeOptions={[10, 15, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 15 } },
          }}
          sortModel={
            filters.sorts
              ? [{ field: Object.keys(filters.sorts)[0], sort: Object.values(filters.sorts)[0] ? "asc" : "desc" }]
              : undefined
          }
          sortingMode="server"
          onSortModelChange={handleSortChange}
          disableVirtualization
          onRowClick={(api) => router.push(`/coin-reports-new/${api.row.slug}`)}
          sx={{ height: 300 }}
        />
      </Stack>

      {openFilterModal && (
        <FilterModal
          onClose={toggleFilterModal}
          onSubmit={handleFilterSubmit}
          filters={{ ...filters, sorts: Object.keys(filters?.sorts || {})?.[0] }}
        />
      )}
    </Stack>
  );
};

export default CoinReportTable;
