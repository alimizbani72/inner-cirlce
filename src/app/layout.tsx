import 'src/locales/i18n';
import './global.css';

import type { Metadata, Viewport } from 'next';
import { getServerSession } from 'next-auth';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import ProgressBar from 'src/components/progress-bar';
import { SnackbarProvider } from 'src/components/snackbar';
import { LocalizationProvider } from 'src/locales';
import ThemeProvider from 'src/theme';
import { primaryFont } from 'src/theme/typography';

import { TanStackProvider } from './_providers';
import type { ReactNode } from 'react';
// ----------------------------------------------------------------------

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#fff',
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};
export const metadata: Metadata = {
  title: 'Chainmind',
  description: 'description',
  keywords: 'keywords',

  manifest: '/manifest.json',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/apple-touch-icon.png',
    },
  ],
};

export type LayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: LayoutProps) {
  const session = await getServerSession();
  return (
    <html lang="en" className={primaryFont.className}>
      <head>
        <script src="https://www.google.com/recaptcha/api.js" async defer />
      </head>
      <body style={{ backgroundColor: '#070720' }}>
        <TanStackProvider session={session}>
          <LocalizationProvider>
            <ThemeProvider>
              <MotionLazy>
                <ProgressBar />
                <SnackbarProvider>{children}</SnackbarProvider>
              </MotionLazy>
            </ThemeProvider>
          </LocalizationProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
