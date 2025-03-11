'use client';

import type { FC } from 'react';
import Modules from './Modules';
import BreadCrumb from '@/components/breadcrumb';
import { Stack } from '@mui/material';

const EducationModuleSection: FC = () => {
  return (
    <Stack gap={3} p={{ md: 4, xs: 3 }} height={'100%'}>
      <BreadCrumb />
      <Modules />
    </Stack>
  );
};

export default EducationModuleSection;
