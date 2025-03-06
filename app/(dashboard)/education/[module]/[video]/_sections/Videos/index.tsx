'use client';

import { Stack } from '@mui/material';
import type { FC } from 'react';
import VideoItem from './Item';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import { selectVideos } from '@/lib/features/academy/educationSlice';

const Videos: FC = () => {
  const { video } = useParams();

  const videos = useAppSelector((state) =>
    selectVideos(state)(decodeURIComponent(video as string))
  );

  return (
    <Stack gap={3} direction={{ md: 'row', xs: 'column' }} flexWrap={{ md: 'wrap', xs: undefined }}>
      {videos.map((item, index) => (
        <Stack
          key={index}
          flex={{ md: '0 0 50%', sm: 1 }}
          maxWidth={{ md: 'calc(50% - 12px)', xs: '100%' }}
        >
          <VideoItem content={item} />
        </Stack>
      ))}
    </Stack>
  );
};

export default Videos;
