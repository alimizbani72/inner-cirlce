'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressBarProvider = () => {
  return (
    <ProgressBar height="4px" color="var(--palette-pink-dark)" options={{ showSpinner: false }} />
  );
};

export default ProgressBarProvider;
