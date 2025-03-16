import { getQueryClient } from '@/app/_providers/customQueryClient';
import { selectLang } from '@/lib/features/dictionary/dicSlice';
import { makeStore } from '@/lib/store';
import { prefetchGetEducationVideos } from '@/services/cms/education-videos/education-videos';
import { cleanDehydratedState } from '@/utils/cleanDehydrateState';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import SliceWrapper from './SliceWrapper';
// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: { default: 'Education', template: '%s | ChainMind' },
};

export type LayoutProps = {
  children: ReactNode;
};

export default async function EducationLayout({ children }: LayoutProps) {
  const queryClient = getQueryClient();
  const store = makeStore();

  const lang = selectLang(store.getState());
  await Promise.all([prefetchGetEducationVideos(queryClient, { locale: lang, limit: 1000 })]);

  return (
    <HydrationBoundary state={cleanDehydratedState(dehydrate(queryClient))}>
      <SliceWrapper />
      {children}
    </HydrationBoundary>
  );
}
