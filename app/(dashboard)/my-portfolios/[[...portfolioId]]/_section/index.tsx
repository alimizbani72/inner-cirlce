'use client';
import { Box, Divider, Stack } from '@mui/material';
import Tabs from './created/Tabs';
import PlusTab from './created/PlusTab';
import PortfolioSummary from './created/PortfolioSummary';
import AddPortfolioSection from './add';
import usePortfolioData from './hook/usePortfolioData';
import { useIsMobile } from '@/hooks/use-responsive';
import { useAppSelector } from '@/lib/hooks';
import { isSidebarCollapsed } from '@/lib/features/menu/menuSlice';
import { Scrollbar } from '@/components/scrollbar';
import { useGetPortfolios } from '@/services/minecraft/portfolio/portfolio';
import Loading from '@/components/Loading';

const PortfolioSection = () => {
  const { data: portfolios, isFetching } = useGetPortfolios();
  const isMobile = useIsMobile();
  const isCollapsed = useAppSelector(isSidebarCollapsed);
  const { selectedPortfolio, portfolioId, isLoading } = usePortfolioData();
  if (isFetching) {
    return (
      <Stack width="100%" height="calc(100vh - 130px)" alignItems="center">
        <Loading sx={{ width: '100%', height: '100%' }} />
      </Stack>
    );
  }
  if (!portfolios?.data?.length) {
    return <AddPortfolioSection />;
  }

  return (
    <Stack>
      <Stack pt={{ xs: 3, md: 4 }} mb={{ xs: 2, md: 3 }} pl={{ xs: 3, md: 4 }}>
        <Stack
          direction={'row'}
          spacing={3}
          maxWidth={
            isMobile ? 'calc(100vw - 24px)' : `calc(100vw - ${isCollapsed ? '136px' : '281px'})`
          }
        >
          <PlusTab />
          <Box py={2}>
            <Divider orientation="vertical" />
          </Box>
          <Scrollbar>
            <Box sx={{ display: 'flex' }}>
              <Tabs
                portfolios={portfolios.data}
                portfolioId={portfolioId}
                overviewtotal_actual_value={portfolios?.meta?.total_actual_value!}
              />
            </Box>
          </Scrollbar>
        </Stack>
      </Stack>
      <Divider />
      <PortfolioSummary
        portfolios={portfolios.data}
        selectedPortfolio={selectedPortfolio?.data}
        portfolioId={portfolioId}
        isLoading={isLoading}
      />
    </Stack>
  );
};

export default PortfolioSection;
