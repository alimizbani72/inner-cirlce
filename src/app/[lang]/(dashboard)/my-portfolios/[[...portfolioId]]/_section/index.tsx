"use client";
import { Box, Divider, Stack } from "@mui/material";
import Tabs from "./created/Tabs";
import PlusTab from "./created/PlusTab";
import PortfolioSummary from "./created/PortfolioSummary";
import Scrollbar from "@/components/Scrollbar";
import AddPortfolioSection from "./add";
import { usePortfolioServicePortfoliosQuery } from "@minecraft/queries";
import usePortfolioData from "./hook/usePortfolioData";
import { useIsMobile } from "@/hooks/use-responsive";
import { useAppSelector } from "@/lib/hooks";
import { isSidebarCollapsed } from "@/lib/features/menu/menuSlice";

const PortfolioSsection = () => {
  const { data: portfolios } = usePortfolioServicePortfoliosQuery();
  const isMobile = useIsMobile();
  const isCollapsed = useAppSelector(isSidebarCollapsed);
  const { selectedPortfolio, portfolioId, overview } = usePortfolioData();

  if (!portfolios?.data?.length) {
    return <AddPortfolioSection />;
  }

  return (
    <Stack>
      <Stack pt={{ xs: 3, md: 4 }} mb={{ xs: 2, md: 3 }} pl={{ xs: 3, md: 4 }}>
        <Stack
          direction={"row"}
          spacing={3}
          maxWidth={isMobile ? "calc(100vw - 24px)" : `calc(100vw - ${isCollapsed ? "136px" : "281px"})`}
        >
          <PlusTab />
          <Box py={2}>
            <Divider orientation="vertical" />
          </Box>
          <Scrollbar options={{ scrollbars: { autoHide: "move" } }}>
            <Box sx={{ display: "flex" }}>
              <Tabs
                portfolios={portfolios.data as any}
                portfolioId={portfolioId}
                overviewId={overview?.data?.id as any}
                overviewtotal_actual_value={portfolios?.meta?.total_actual_value!}
              />
            </Box>
          </Scrollbar>
        </Stack>
      </Stack>
      <Divider />
      <PortfolioSummary
        portfolios={portfolios.data as any}
        selectedPortfolio={selectedPortfolio?.data as any}
        portfolioId={portfolioId}
      />
    </Stack>
  );
};

export default PortfolioSsection;
