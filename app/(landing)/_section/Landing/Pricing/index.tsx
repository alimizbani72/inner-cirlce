import { Box, Stack } from '@mui/material';
import type { FC } from 'react';

import { Scrollbar } from '@/components/scrollbar';
import LandingContainer from '../LandingContainer';
import SectionTitle from '../SectionTitle';
import FisherMan from './FisherMan';
import PricingPlans from './PricingPlans';

import { usePricingData } from '@/hooks/usePricingData';
import PricingTable from '@app-components/PricingTable';
import { useRouter } from 'next/navigation';

const Pricing: FC = () => {
  const { push } = useRouter();

  const { plans, rows, isLoading } = usePricingData();

  return (
    <Stack
      id="pricing"
      pt={{ md: 20, xs: 14 }}
      pb={{ md: 9, xs: 14 }}
      width={'100%'}
      overflow={'hidden'}
      alignItems={'center'}
      sx={{
        '.os-scrollbar-handle': {
          cursor: 'pointer',
          backgroundColor: 'grey.dark',
          '&:hover': { backgroundColor: 'grey.dark' },
        },
      }}
    >
      <PricingPlans plans={plans} isLoading={isLoading} />

      <FisherMan />

      <LandingContainer gap={{ md: 6, xs: 4 }} alignItems={'center'}>
        <SectionTitle
          title={`Compare <span style="color: #565CE4">P</span>lans`}
          bigTypoColor="rgba(255, 255, 255, 0.02)"
          color="white"
          firsLetterColor="white"
        />
        <Stack maxWidth="100vw" width="100%">
          <Scrollbar sx={{ maxWidth: '100vw' }}>
            <Stack maxWidth="100vw" minWidth={1120}>
              {isLoading ? (
                <Box className="loading-skeleton" width="100%" height={1341} />
              ) : (
                <PricingTable
                  rows={rows}
                  plansData={plans}
                  userType={'plankton'}
                  buttonClick={() => push('/pricing')}
                  TableContainerSx={{
                    maxHeight: 'unset',
                    '& th.MuiTableCell-head': {
                      bgcolor: 'dark.1',
                      color: 'pink.light',
                    },
                  }}
                />
              )}
            </Stack>
          </Scrollbar>
        </Stack>
      </LandingContainer>
    </Stack>
  );
};

export default Pricing;
