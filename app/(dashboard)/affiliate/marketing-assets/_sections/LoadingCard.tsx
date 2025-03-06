'use client';
import ContentStack from '@app-components/ContentStack';
import { Stack } from '@mui/material';

const LoadingCard = () => {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} flexWrap={'wrap'} gap={3} width={'100%'}>
      {Array.from({ length: 6 }).map((_, index) => (
        <ContentStack
          key={index}
          className="loading-skeleton"
          sx={{ height: { md: '285px', xs: '245px' } }}
          flex={{ md: '0 0 30%' }}
        />
      ))}
    </Stack>
  );
};

export default LoadingCard;
