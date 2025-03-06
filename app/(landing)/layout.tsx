import { getToken } from '@/utils/getToken';
import type { ReactNode } from 'react';
import LandingLayoutSection from './_section';
// ----------------------------------------------------------------------

export type LayoutProps = {
  children: ReactNode;
};

export default async function LandingLayout({ children }: LayoutProps) {
  const accessToken = getToken();

  return <LandingLayoutSection isLogin={!!accessToken}>{children}</LandingLayoutSection>;
}
