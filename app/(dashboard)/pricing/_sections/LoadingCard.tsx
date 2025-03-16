'use client';
import { useIsMobile } from '@/hooks/use-responsive';
import ContentStack from '@app-components/ContentStack';
import { Stack } from '@mui/material';

const LoadingCard = () => {
  const isMobile = useIsMobile();
  return (
    <Stack direction={'row'} gap={3} width={'100%'}>
      {Array.from({ length: isMobile ? 2 : 7 }).map((_, index) => (
        <ContentStack
          key={index}
          className="loading-skeleton"
          sx={{ height: '520px', width: '100%' }}
        ></ContentStack>
      ))}
    </Stack>
  );
};

export default LoadingCard;
