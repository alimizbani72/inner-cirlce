"use client";
import Loading from "@/components/Loading";
import { Scrollbar } from "@/components/scrollbar";
import { Box, Divider, Stack } from "@mui/material";
import PlusTab from "./created/PlusTab";
import PortfolioSummary from "./created/PortfolioSummary";
import Tabs from "./created/Tabs";
import { useGetPortfolios } from "./hooks";

const PortfolioSection = () => {
  // const { portfolioId } = useParams();
  // const activePortfolioId = getActivePortfolioId(portfolioId);
  const { data: portfolios, isFetching } = useGetPortfolios();

  if (isFetching) {
    return (
      <Stack width="100%" height="calc(100vh - 130px)" alignItems="center">
        <Loading sx={{ width: "100%", height: "100%" }} />
      </Stack>
    );
  }

  return (
    <Stack>
      <Stack pt={{ xs: 3, md: 4 }} mb={{ xs: 2, md: 3 }} pl={{ xs: 3, md: 4 }}>
        <Stack
          direction={"row"}
          spacing={3}
          maxWidth={{ xs: "calc(100vw - 24px)", md: "100%" }}
        >
          <PlusTab />
          <Box py={2}>
            <Divider orientation="vertical" />
          </Box>
          <Scrollbar sx={{ width: "100%" }}>
            <Box sx={{ display: "flex" }}>
              <Tabs
                // portfolios={portfolios?.data}
                // portfolioId={activePortfolioId}
                overviewtotal_actual_value={
                  portfolios?.meta?.total_actual_value! as any
                }
              />
            </Box>
          </Scrollbar>
        </Stack>
      </Stack>
      <Divider />
      <PortfolioSummary portfolios={portfolios as any} />
    </Stack>
  );
};

export default PortfolioSection;
