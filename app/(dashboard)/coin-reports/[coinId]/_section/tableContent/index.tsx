import { useIsMobile } from '@/hooks/use-responsive';
import type { ReportSingleCoinReports } from '@/services/minecraft/minecraftAPI.schemas';
import { Box, Stack } from '@mui/material';
import { useState } from 'react';
import DepthReport from './DepthReport';
import TableTabs from './TableTabs';
import type { SelectedTabKey } from './types';

type TableOfContentProps = {
  reports: ReportSingleCoinReports | undefined;
};

const TableOfContent = ({ reports }: TableOfContentProps) => {
  const [selectedTab, setSelectedTab] = useState<SelectedTabKey>('marketdata');
  const isMobile = useIsMobile();

  return (
    <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row-reverse' } }}>
      <Stack
        flex={1}
        sx={{
          ...(isMobile
            ? {}
            : {
                position: 'sticky',
                top: '24px',
                alignSelf: 'flex-start',
              }),
        }}
      >
        <TableTabs contentData={reports} selectedTab={selectedTab} onSelect={setSelectedTab} />
      </Stack>
      <Stack flex={2}>
        <DepthReport sections={reports?.[selectedTab]} />
      </Stack>
    </Box>
  );
};

export default TableOfContent;
