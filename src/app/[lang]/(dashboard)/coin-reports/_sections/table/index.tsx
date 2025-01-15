"use client";

import CustomTable, { type SortType } from "@/components/CustomTable";
import { useIsMobile } from "@/hooks/use-responsive";
import { useAppRouter } from "@/routes/hooks";
import UpgradeModal from "@dashboard/coin-reports/[coinId]/_section/UpgradeModal";
import { defaultValueSort } from "@dashboard/coin-reports/_sections/consts";
import type { CoinReportResponseData } from "@minecraft/requests";
import { Stack, styled } from "@mui/material";
import { useState } from "react";
import { Header } from "../header";
import type { FilterFormDataType } from "../types.d";
import { useColumns } from "./useColumns";

export interface TableProps {
  filters: FilterFormDataType;
  onFilterChange: (filter: FilterFormDataType) => void;
  data?: CoinReportResponseData[];
  nextUpdate?: number;
  totalCount: number;
  onNextUpdate?: () => void;
  isFetching: boolean;
}

const ContainerStyle = styled(Stack)(({ theme }) => ({
  border: "1.5px solid",
  borderColor: theme.palette.dark[3],
  alignItems: "flex-start",
  overflow: "hidden",
}));

const CoinReportTable = ({
  data,
  filters,
  nextUpdate,
  onFilterChange,
  onNextUpdate,
  totalCount,
  isFetching,
}: TableProps) => {
  const [openUpgradeModal, setOpenUpgradeModal] = useState(false);
  const { push } = useAppRouter();
  const { columns } = useColumns();
  const isMobile = useIsMobile();

  const handleSortChange = (sort?: SortType) => {
    onFilterChange({
      ...filters,
      sorts: sort || defaultValueSort,
    });
  };

  const handleRowClick = (row: any) => {
    if (row?.slug) {
      push(`/coin-reports/${row.slug}`);
    } else {
      setOpenUpgradeModal(true);
    }
  };

  return (
    <>
      <ContainerStyle
        sx={{
          ...(isMobile
            ? { borderLeft: "unset", borderRight: "unset" }
            : {
                borderRadius: 1.5,
              }),
        }}
      >
        <Header {...{ onNextUpdate, filters, onFilterChange, nextUpdate }} />

        <CustomTable
          perPage={filters.per_page}
          columns={columns}
          data={data || []}
          isPending={isFetching}
          page={filters.page}
          handleChangePage={(_, newPage) => onFilterChange({ ...filters, page: newPage })}
          totalCount={totalCount}
          onSortChange={handleSortChange}
          sort={filters.sorts}
          onRowClick={handleRowClick}
          isStickyFirstColumn
        />
      </ContainerStyle>
      {openUpgradeModal && <UpgradeModal open close={() => setOpenUpgradeModal(false)} />}
    </>
  );
};

export default CoinReportTable;
