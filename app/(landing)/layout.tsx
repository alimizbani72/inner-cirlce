import { STORAGE_KEY } from '@/auth';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';
import LandingLayoutSection from './_section';
// ----------------------------------------------------------------------

export type LayoutProps = {
  children: ReactNode;
};

export default async function LandingLayout({ children }: LayoutProps) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(STORAGE_KEY);

  return <LandingLayoutSection isLogin={!!accessToken}>{children}</LandingLayoutSection>;
}
