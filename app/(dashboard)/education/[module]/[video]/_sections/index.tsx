'use client';

import { Stack } from '@mui/material';
import type { FC } from 'react';
import Videos from './Videos';
import BreadCrumb from '@/components/breadcrumb';

const EducationVideosSection: FC = () => {
  return (
    <Stack gap={3} p={{ md: 4, xs: 3 }} height={'100%'}>
      <BreadCrumb />
      <Videos />
    </Stack>
  );
};

export default EducationVideosSection;
