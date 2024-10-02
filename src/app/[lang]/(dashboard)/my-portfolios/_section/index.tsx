"use client";
import { Box, Divider, Stack } from "@mui/material";
import Tabs from "./created/Tabs";
import PlusTab from "./created/PlusTab";
import PortfolioSummary from "./created/PortfolioSummary";
import { useAppSelector } from "@/lib/hooks";
import { selectSelectedPortfolioId } from "@/lib/features/portfolio/portfolioSlice";
import Scrollbar from "@/components/Scrollbar";
import AddPortfolioSection from "./add";

const PortfolioSsection = () => {
  const selectedTabId = useAppSelector(selectSelectedPortfolioId);

  if (selectedTabId === null) {
    return <AddPortfolioSection />;
  }
  return (
    <Stack>
      <Stack py={{ xs: 3, md: 4 }} pl={{ xs: 3, md: 4 }}>
        <Stack
          direction={"row"}
          spacing={3}
          sx={{
            maxWidth: "calc(100vw - 24px)",
          }}
        >
          <PlusTab />
          <Box py={2}>
            <Divider orientation="vertical" />
          </Box>
          <Scrollbar>
            <Box sx={{ display: "flex" }}>
              <Tabs />
            </Box>
          </Scrollbar>
        </Stack>
      </Stack>
      <Divider />
      <PortfolioSummary />
    </Stack>
  );
};

export default PortfolioSsection;
