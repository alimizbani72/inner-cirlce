import { useIsMobile } from "@/hooks/use-responsive";
import { Box, Stack } from "@mui/material";
import { useState } from "react";
import DepthReport from "./DepthReport";
import TableTabs from "./TableTabs";
import type { SelectedTabKey } from "./types";
export type ReportSection = {
  title: string;
  description: string;
};

export type ReportSingleCoinReports = Record<SelectedTabKey, ReportSection>;
type TableOfContentProps = {
  reports: ReportSingleCoinReports | undefined;
};

const TableOfContent = ({ reports }: TableOfContentProps) => {
  const isMobile = useIsMobile();

  const keys = reports ? (Object.keys(reports) as SelectedTabKey[]) : [];

  const [selectedTab, setSelectedTab] = useState<SelectedTabKey>(
    keys[0] ?? "marketdata",
  );

  const activeTab = reports?.[selectedTab] ? selectedTab : keys[0];

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        flexDirection: { xs: "column", md: "row-reverse" },
      }}
    >
      <Stack
        flex={1}
        sx={
          isMobile
            ? {}
            : {
                position: "sticky",
                top: "24px",
                alignSelf: "flex-start",
              }
        }
      >
        <TableTabs
          contentData={reports}
          selectedTab={activeTab as SelectedTabKey}
          onSelect={setSelectedTab}
        />
      </Stack>

      <Stack flex={2}>
        <DepthReport sections={reports?.[activeTab as SelectedTabKey]} />
      </Stack>
    </Box>
  );
};
export default TableOfContent;
