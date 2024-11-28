import { Icon } from "@/components/icons";
import { isSidebarCollapsed } from "@/lib/features/menu/menuSlice";
import { useAppSelector } from "@/lib/hooks";
import {
  Box,
  Stack,
  type TablePaginationProps,
  menuClasses,
  Pagination as MuiPagination,
  tablePaginationClasses,
} from "@mui/material";
import type { DataGridProps } from "@mui/x-data-grid";
import { DataGrid, gridPageCountSelector, GridPagination, useGridApiContext, useGridSelector } from "@mui/x-data-grid";
import type { ReactNode } from "react";

interface DataGridCompProps extends DataGridProps {
  header?: ReactNode;
  emptyText?: ReactNode;
}

function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className" | "rowsPerPage" | "rowsPerPageOptions">) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      hideNextButton
      hidePrevButton
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props: any) {
  return (
    <GridPagination
      ActionsComponent={Pagination}
      sx={{ [`& .${tablePaginationClasses.displayedRows}`]: { display: "none" } }}
      {...props}
    />
  );
}

const SortIcon = () => <Icon name="Arrow-Sort" />;

const DataGridMui = (props: DataGridCompProps) => {
  const { header, emptyText, slots, ...rest } = props;
  const isCollapsed = useAppSelector(isSidebarCollapsed);

  return (
    <Stack
      width={{ xs: "calc(100vw - 48px)", md: `calc(100vw - ${isCollapsed ? "168px" : "312px"})` }}
      border="1.5px solid"
      borderColor="dark.3"
      alignItems="flex-start"
      borderRadius={1.5}
    >
      {header}
      <Box
        width="100%"
        sx={{
          [`& .${menuClasses.paper}`]: {
            bgcolor: "dark.3",
            color: "common.white",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
          },
        }}
      >
        <DataGrid
          rowHeight={56}
          columnHeaderHeight={40}
          disableColumnMenu
          pagination
          slots={{
            columnHeaderSortIcon: SortIcon,
            columnSortedAscendingIcon: SortIcon,
            columnSortedDescendingIcon: SortIcon,
            pagination: CustomPagination,
            ...slots,
          }}
          {...rest}
        />
      </Box>
    </Stack>
  );
};

export { DataGridMui as DataGrid };
