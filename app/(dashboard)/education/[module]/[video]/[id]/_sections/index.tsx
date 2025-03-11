'use client';

import BreadCrumb from '@/components/breadcrumb';
import { Stack } from '@mui/material';
import RenderVideo from './RenderVideo';
import VideoList from './VideoList';

const EducationSingleVideoSection = () => {
  return (
    <Stack
      p={{ md: 4, xs: 3 }}
      height={'100%'}
      direction={{ md: 'row', xs: 'column' }}
      gap={{ md: 3, xs: 4 }}
    >
      <Stack sx={{ width: { xs: '100%', md: '67%' } }} gap={3}>
        <BreadCrumb />
        <RenderVideo />
      </Stack>
      <Stack sx={{ width: { xs: '100%', md: '33%' } }}>
        <VideoList />
      </Stack>
    </Stack>
  );
};

export default EducationSingleVideoSection;
