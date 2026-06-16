"use client";

import CustomTable, { type SortType } from "@/components/CustomTable";
import { useIsMobile } from "@/hooks/use-responsive";
import { useAppRouter } from "@/routes/hooks";
import { toNumber } from "@/utils/toNumber";
import UpgradeModal from "@dashboard/coin-reports/[coinId]/_section/UpgradeModal";
import { defaultValueSort } from "@dashboard/coin-reports/_sections/consts";
import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Header } from "../header";
import type { FilterFormDataType } from "../types.d";
import { useColumns } from "./useColumns";

export interface TableProps {
  filters: FilterFormDataType;
  onFilterChange: (filter: FilterFormDataType) => void;
  data?: any[];
  totalCount: number;
  onNextUpdate: () => void;
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
        <Header {...{ onNextUpdate, filters, onFilterChange }} />

        <CustomTable
          containerHeight={
            toNumber(data?.length) > 10 ? undefined : "max-content"
          }
          perPage={filters.per_page}
          columns={columns}
          data={data || []}
          isPending={isFetching}
          page={filters.page}
          handleChangePage={(_, newPage) =>
            onFilterChange({ ...filters, page: newPage })
          }
          totalCount={totalCount}
          onSortChange={handleSortChange}
          sort={filters.sorts}
          onRowClick={handleRowClick}
          isStickyFirstColumn
          uniqueId="slug"
        />
      </ContainerStyle>
      {openUpgradeModal && (
        <UpgradeModal open close={() => setOpenUpgradeModal(false)} />
      )}
    </>
  );
};

export default CoinReportTable;
