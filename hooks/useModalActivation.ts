'use client';

import { usePathname } from 'next/navigation';

export function useModalActivation(route: string) {
  const pathname = usePathname();

  return pathname.endsWith(route);
}
