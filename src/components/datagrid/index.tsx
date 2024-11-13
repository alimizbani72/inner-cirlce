import { useIsMobile } from "@/hooks/use-responsive";
import { isSidebarCollapsed } from "@/lib/features/menu/menuSlice";
import { useAppSelector } from "@/lib/hooks";
import { Box, Stack } from "@mui/material";
import type { SxProps } from "@mui/material";
import type { DataGridProps } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import type { ReactNode } from "react";

interface DataGridCompProps extends DataGridProps {
  leftHeader?: ReactNode;
  rightHeader?: ReactNode;
  headerSx?: SxProps;
}

const DataGridMui = (props: DataGridCompProps) => {
  const { columns, rows, leftHeader, rightHeader, headerSx, ...rest } = props;
  const isMobile = useIsMobile();
  const isCollapsed = useAppSelector(isSidebarCollapsed);
  return (
    <Stack
      maxWidth={isMobile ? "calc(100vw - 48px)" : `calc(100vw - ${isCollapsed ? "104px" : "248px"})`}
      border="1.5px solid"
      borderColor="dark.3"
      alignItems="flex-start"
      borderRadius={1.5}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2.5}
        py={3}
        width="100%"
        flexDirection={isMobile ? "column" : "row"}
        sx={headerSx}
      >
        {leftHeader}
        {rightHeader}
      </Box>
      <Box width="100%">
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={56}
          columnHeaderHeight={40}
          hideFooter
          hideFooterPagination
          disableColumnMenu
          {...rest}
        />
      </Box>
    </Stack>
  );
};

export { DataGridMui as DataGrid };
