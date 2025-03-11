'use client';

import RiveComp from '@/components/rive-loader';
import { Scrollbar } from '@/components/scrollbar';
import { plans } from '@/configs/plans';
import { useIsMobile } from '@/hooks/use-responsive';
import { useGetAffiliateChildren } from '@/services/minecraft/affiliate/affiliate';
import { toTitleCase } from '@/utils/change-case';
import { orderArrayPlan } from '@/utils/order-plans';
import { Box, Stack, Typography } from '@mui/material';

const Plans = () => {
  const isMobile = useIsMobile();
  const { data: children, isLoading } = useGetAffiliateChildren();

  // Approximate column count on mobile based on the minWidth of 130px
  const mobileColumnCount = 2; // Assuming 2 columns on mobile

  return (
    <Box
      sx={{
        border: '1.5px solid',
        borderColor: 'dark.3',
        overflow: 'hidden',
        borderRadius: '16px',
        width: '100%',
      }}
      className={isLoading ? 'loading-skeleton' : ''}
    >
      <Scrollbar>
        <Stack
          direction={'row'}
          height={{ md: '212px', xs: 'unset' }}
          flexWrap={{ md: 'unset', xs: 'wrap' }}
          sx={{
            display: { md: 'flex', xs: 'grid' },
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'unset' },
          }}
        >
          {orderArrayPlan(children?.data?.distribution_of_plans)?.map((item, index) => {
            // Calculate row and column position for mobile view
            const row = Math.floor(index / mobileColumnCount);
            const col = index % mobileColumnCount;

            // Create checkerboard pattern based on row+col being even/odd
            const isMobileDarkBg = isMobile ? (row + col) % 2 === 0 : undefined;
            // For desktop, maintain alternate pattern
            const isDesktopDarkBg = !isMobile ? !(index % 2) : undefined;

            // Choose background color based on device
            const bgColor = isMobileDarkBg || isDesktopDarkBg ? 'dark.3' : undefined;

            return (
              <Stack
                key={item.plan_type}
                flex={1}
                py={3}
                px={{ md: 2, xs: 3 }}
                alignItems={'center'}
                justifyContent={'center'}
                bgcolor={bgColor}
                sx={{ minWidth: '130px' }}
              >
                {(plans as any)[item.plan_type!]?.rive && (
                  <Box sx={{ aspectRatio: 1 }}>
                    <RiveComp width={80} height={80} src={(plans as any)[item.plan_type!]?.rive} />
                  </Box>
                )}
                <Typography mt={1} variant="h4-semi-bold">
                  {item.count}
                </Typography>
                <Typography variant="p2-medium" textTransform={'capitalize'} color="grey.light">
                  {toTitleCase(item.plan_type)}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Scrollbar>
    </Box>
  );
};

export default Plans;
