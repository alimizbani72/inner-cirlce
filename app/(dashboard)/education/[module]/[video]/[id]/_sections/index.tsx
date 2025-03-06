'use client';

import { Stack } from '@mui/material';
import VideoList from './VideoList';
import BreadCrumb from '@/components/breadcrumb';
import RenderVideo from './RenderVideo';

const EducationSingleVideoSection = () => {
  return (
    <Stack
      p={{ md: 4, xs: 3 }}
      height={'100%'}
      direction={{ md: 'row', xs: 'column' }}
      gap={{ md: 3, xs: 4 }}
    >
      <Stack sx={{ flex: 8 / 12 }} gap={3}>
        <BreadCrumb />
        <RenderVideo />
      </Stack>
      <Stack sx={{ flex: 4 / 12 }}>
        <VideoList />
      </Stack>
    </Stack>
  );
};

export default EducationSingleVideoSection;
