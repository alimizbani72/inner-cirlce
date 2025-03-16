'use client';
import Footer from '@/app/(landing)/_section/Landing/Footer';
import Header from '@/app/(landing)/_section/Landing/Header';
import { Stack } from '@mui/material';
import type { FC, PropsWithChildren } from 'react';

const LadingLayoutSection: FC<PropsWithChildren<{ isLogin: boolean }>> = ({
  children,
  isLogin,
}) => {
  return (
    <Stack height={'100vh'} component={'main'}>
      <Header isLogin={isLogin} />
      {children}
      <Footer />
    </Stack>
  );
};

export default LadingLayoutSection;
