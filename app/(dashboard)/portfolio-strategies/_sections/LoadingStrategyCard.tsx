'use client';
import { flexItem } from '@/utils/grid';
import ContentStack from '@app-components/ContentStack';
import { Stack } from '@mui/material';

const LoadingStrategyCard = () => {
  return (
    <Stack
      direction={{ md: 'row', xs: 'column' }}
      gap={3}
      sx={{ p: { md: 4, xs: 3 } }}
      width={'100%'}
      flexWrap={'wrap'}
    >
      {Array.from({ length: 7 }).map((_, index) => (
        <ContentStack
          key={index}
          className="loading-skeleton"
          height={'162px'}
          sx={flexItem({ count: { lg: 3, md: 2 }, gap: 24 })}
        ></ContentStack>
      ))}
    </Stack>
  );
};

export default LoadingStrategyCard;
