'use client';

import { ProgressProvider } from '@bprogress/next/app';
import type { FC, PropsWithChildren } from 'react';

const ProgressBarProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ProgressProvider
      height="4px"
      color="var(--palette-pink-dark)"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};

export default ProgressBarProvider;
