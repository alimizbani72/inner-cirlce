import { Box, Stack } from "@mui/material";
import DepthReport from "./DepthReport";
import TableTabs from "./TableTabs";
import { useState } from "react";
import type { SelectedTabKey } from "./types";
import type { SingleCoinReports } from "@minecraft/requests";

type TableOfContentProps = {
  reports: SingleCoinReports;
};

const TableOfContent = ({ reports }: TableOfContentProps) => {
  const [selectedTab, setSelectedTab] = useState<SelectedTabKey>("marketdata");

  return (
    <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row-reverse" } }}>
      <Stack flex={1}>
        <TableTabs contentData={reports} selectedTab={selectedTab} onSelect={setSelectedTab} />
      </Stack>
      <Stack flex={2}>
        <DepthReport sections={reports[selectedTab]?.sections || []} />
      </Stack>
    </Box>
  );
};

export default TableOfContent;
