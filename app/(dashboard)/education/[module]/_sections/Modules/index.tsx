'use client';

import { selectPlaylists, selectStatus } from '@/lib/features/academy/educationSlice';
import { useAppSelector } from '@/lib/hooks';
import { flexItem } from '@/utils/grid';
import { Box, Stack } from '@mui/material';
import { useParams } from 'next/navigation';
import type { FC } from 'react';
import ModuleItem from './Item';

const Modules: FC = () => {
  const { module } = useParams();

  const playlist = useAppSelector((state) =>
    selectPlaylists(state)(decodeURIComponent(module as string))
  );
  const isLoading = useAppSelector(selectStatus) === 'loading';

  return (
    <Stack gap={3} direction={{ md: 'row', xs: 'column' }} flexWrap={{ md: 'wrap', xs: undefined }}>
      {isLoading
        ? Array.from({ length: 6 }).map((_, index) => (
            <Box
              className="loading-skeleton"
              key={index}
              sx={flexItem({ count: { md: 2 }, gap: 24 })}
              height={104}
            />
          ))
        : playlist.map((item, index) => (
            <Stack key={index} sx={flexItem({ count: { md: 2 }, gap: 24 })}>
              <ModuleItem content={item} />
            </Stack>
          ))}
    </Stack>
  );
};

export default Modules;
