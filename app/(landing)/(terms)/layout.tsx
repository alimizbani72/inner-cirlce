import type { ReactNode } from 'react';
import { Container } from '@mui/material';
import TermsBanner from './_section/TermsBanner';
// ----------------------------------------------------------------------

export type LayoutProps = {
  children: ReactNode;
};

export default async function termsLayout({ children }: LayoutProps) {
  return (
    <>
      <TermsBanner />
      <Container>{children}</Container>;
    </>
  );
}
