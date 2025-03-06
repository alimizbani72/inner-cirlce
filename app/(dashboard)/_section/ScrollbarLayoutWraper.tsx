'use client';

import { Scrollbar } from '@/components/scrollbar';
import { useIsMobile } from '@/hooks/use-responsive';
import { isSidebarCollapsed } from '@/lib/features/menu/menuSlice';
import { useAppSelector } from '@/lib/hooks';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const ScrollbarLayoutWrapper = ({ children }: Props) => {
  const isCollapsed = useAppSelector(isSidebarCollapsed);
  const isMobile = useIsMobile();

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <Scrollbar
      sx={{
        height: 'calc(100vh - 106px)',
        maxWidth: `calc(100vw - ${isCollapsed ? '104px' : '249px'})`,
      }}
    >
      {children}
    </Scrollbar>
  );
};

export default ScrollbarLayoutWrapper;
