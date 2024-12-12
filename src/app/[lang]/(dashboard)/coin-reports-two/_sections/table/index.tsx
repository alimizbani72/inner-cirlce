"use client";

import CustomTable, { type SortType } from "@/components/CustomTable";
import { useAppRouter } from "@/routes/hooks";
import { defaultValueSort } from "@dashboard/coin-reports-two/_sections/consts";
import UpgradeModal from "@dashboard/coin-reports/[coinId]/_section/UpgradeModal";
import type { CoinReportResponseData } from "@minecraft/requests";
import { Stack, styled, tableBodyClasses, tableHeadClasses } from "@mui/material";
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
  borderRadius: theme.spacing(1.5),
  overflow: "hidden",
  [`& .${tableHeadClasses.root} `]: {
    "& > tr > th:first-child": {
      position: "sticky",
      left: 0,
      top: 0,
      backgroundColor: theme.palette.dark[3],
      zIndex: 4,
    },
  },
  [`& .${tableBodyClasses.root} > tr`]: {
    borderLeft: "unset",
    cursor: "pointer",
    "& > td:first-child": {
      position: "sticky",
      left: 0,
      backgroundColor: theme.palette.dark[2],
      zIndex: 3,
      paddingLeft: `${theme.spacing(1)} !important`,
    },
    "&:hover > td": {
      backgroundColor: theme.palette.dark[3],
    },
  },
  "& >div:last-child": {
    borderRadius: 0,
  },
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
      <ContainerStyle>
        <Header {...{ onNextUpdate, filters, onFilterChange, nextUpdate }} />

        <CustomTable
          columns={columns}
          data={data || []}
          isPending={isFetching}
          page={filters.page}
          handleChangePage={(_, newPage) => onFilterChange({ ...filters, page: newPage })}
          totalCount={totalCount}
          onSortChange={handleSortChange}
          sort={filters.sorts}
          onRowClick={handleRowClick}
        />
      </ContainerStyle>
      {openUpgradeModal && <UpgradeModal open close={() => setOpenUpgradeModal(false)} />}
    </>
  );
};

export default CoinReportTable;
