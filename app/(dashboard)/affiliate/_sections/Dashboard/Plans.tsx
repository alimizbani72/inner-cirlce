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
  // TODO : ADD border radius like design and check mobile version UI
  return (
    <Scrollbar>
      <Stack
        className={isLoading ? 'loading-skeleton' : ''}
        direction={'row'}
        height={{ md: '212px', xs: 'unset' }}
        flexWrap={{ md: 'unset', xs: 'wrap' }}
        sx={{
          ...(isMobile && {
            '& > div:nth-child(3n + 3),& > div:nth-child(2)': {
              bgcolor: 'dark.3',
            },
          }),
        }}
      >
        {orderArrayPlan(children?.data?.distribution_of_plans)?.map((item, index) => (
          <Stack
            key={item.plan_type}
            flex={1}
            py={3}
            px={{ md: 2, xs: 3 }}
            alignItems={'center'}
            justifyContent={'center'}
            bgcolor={{ sm: !(index % 2) ? 'dark.3' : undefined }}
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
        ))}
      </Stack>
    </Scrollbar>
  );
};

export default Plans;
