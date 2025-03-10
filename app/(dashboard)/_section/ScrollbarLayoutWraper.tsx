'use client';
import { isSidebarCollapsed } from '@/lib/features/menu/menuSlice';
import { useAppSelector } from '@/lib/hooks';
import { Stack } from '@mui/material';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const LayoutWrapper = ({ children }: Props) => {
  const isCollapsed = useAppSelector(isSidebarCollapsed);

  return (
    <Stack sx={{ width: { md: `calc(100% - ${isCollapsed ? 104 : 248}px)`, xs: '100%' } }}>
      {children}
    </Stack>
  );
};

export default LayoutWrapper;
