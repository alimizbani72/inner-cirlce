import { Stack } from '@mui/material';
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import SettingsHeader from './_section/Header';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: { default: 'Settings', template: '%s | ChainMind' } };

export default async function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <Stack sx={{ flex: 1 }}>
      {/* Header and Tab bar*/}
      <SettingsHeader />

      {/* Tab content */}

      <Stack>{children}</Stack>
    </Stack>
  );
}
