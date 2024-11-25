import { Icon } from "@/components/icons";
import { useIsMobile } from "@/hooks/use-responsive";
import { isSidebarCollapsed } from "@/lib/features/menu/menuSlice";
import { useAppSelector } from "@/lib/hooks";
import { Box, menuClasses, Stack } from "@mui/material";
import type { DataGridProps } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import type { ReactNode } from "react";

interface DataGridCompProps extends DataGridProps {
  header?: ReactNode;
  emptyText?: ReactNode;
}

const SortIcon = () => <Icon name="Arrow-Sort" />;

const DataGridMui = (props: DataGridCompProps) => {
  const { columns, rows, header, emptyText, slots, ...rest } = props;
  const isMobile = useIsMobile();
  const isCollapsed = useAppSelector(isSidebarCollapsed);

  return (
    <Stack
      width={isMobile ? "calc(100vw - 48px)" : `calc(100vw - ${isCollapsed ? "104px" : "280px"})`}
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
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={56}
          columnHeaderHeight={40}
          disableColumnMenu
          pagination
          slots={{
            columnHeaderSortIcon: SortIcon,
            columnSortedAscendingIcon: SortIcon,
            columnSortedDescendingIcon: SortIcon,
            ...slots,
          }}
          {...rest}
        />
      </Box>
    </Stack>
  );
};

export { DataGridMui as DataGrid };
