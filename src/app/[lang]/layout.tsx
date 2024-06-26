import "./global.css";

import type { Metadata, Viewport } from "next";
import { LocalizationProvider } from "@/locales";
import { getServerSession } from "next-auth";
import { MotionLazy } from "@/components/animate/motion-lazy";
import { SnackbarProvider } from "@/components/snackbar";
import ThemeProvider from "@/theme";
import { TanStackProvider } from "./_providers";
import type { ReactNode } from "react";
import { StoreProvider } from "./_providers/StoreProvider";
import ProgressBarProvider from "./_providers/ProgressBarProvider";
import { getDictionary } from "@/locales/dictionary";
import { primaryFont } from "@/theme/localFonts";
// ----------------------------------------------------------------------

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#fff",
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};
export const metadata: Metadata = {
  title: "ChainMind",
  description:
    "Discover ChainMind! Join an elite group of crypto investors, benefit from exclusive insights, in-depth analysis, strategic investment tools & more!",
  keywords: "keywords",
  openGraph: {
    type: "website",
    locale: "en-US",
    description:
      "Discover ChainMind! Join an elite group of crypto investors, benefit from exclusive insights, in-depth analysis, strategic investment tools & more!",
    title: "ChainMind - Unlock The Secret With Expert Crypto Guidance!",
    siteName: "ChainMind",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChainMind - Unlock The Secret With Expert Crypto Guidance!",
    description:
      "Discover ChainMind! Join an elite group of crypto investors, benefit from exclusive insights, in-depth analysis, strategic investment tools & more!",
  },

  manifest: "/manifest.json",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
  ],
};

export type LayoutProps = {
  children: ReactNode;
  params: { lang: string };
};

export default async function RootLayout({ children, params }: LayoutProps) {
  const session = await getServerSession();
  const dict = await getDictionary(params.lang);
  return (
    <StoreProvider currentLang={params.lang} dict={dict}>
      <html lang="en" className={primaryFont.className}>
        <head>
          <script src="https://www.google.com/recaptcha/api.js" async defer />
        </head>
        <body style={{ backgroundColor: "#070720" }}>
          <TanStackProvider session={session}>
            <LocalizationProvider>
              <ThemeProvider>
                <MotionLazy>
                  <ProgressBarProvider>
                    <SnackbarProvider>{children}</SnackbarProvider>
                  </ProgressBarProvider>
                </MotionLazy>
              </ThemeProvider>
            </LocalizationProvider>
          </TanStackProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
