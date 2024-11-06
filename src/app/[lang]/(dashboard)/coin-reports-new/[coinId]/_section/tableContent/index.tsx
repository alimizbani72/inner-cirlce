import { Box, Stack } from "@mui/material";
import DepthReport from "./DepthReport";
import TableTabs from "./TableTabs";
import { useState } from "react";
import type { ContentData, SelectedTabKey } from "./types";
import { contentData } from "./mock";

const TableOfContent = () => {
  const [selectedTab, setSelectedTab] = useState<SelectedTabKey>("MarketData");

  return (
    <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row-reverse" } }}>
      <Stack flex={1}>
        <TableTabs contentData={contentData} selectedTab={selectedTab} onSelect={setSelectedTab} />
      </Stack>
      <Stack flex={2}>
        <DepthReport sections={(contentData as ContentData)[selectedTab].sections} />
      </Stack>
    </Box>
  );
};

export default TableOfContent;
