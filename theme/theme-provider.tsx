'use client';

import type {} from '@mui/lab/themeAugmentation';
import type {} from '@mui/material/themeCssVarsAugmentation';
import type {} from '@mui/x-date-pickers/themeAugmentation';

import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import { defaultSettings } from './config-settings';
import { palette, components, shadows, typography, customShadows } from './core';
import { schemeConfig } from './scheme-config';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  const theme = createTheme({
    cssVariables: {
      colorSchemeSelector: '.mode-%s',
      cssVarPrefix: '',
      disableCssColorScheme: true,
    },
    defaultColorScheme: 'dark',
    colorSchemes: { dark: { palette } },
    shadows: shadows(),
    customShadows: customShadows(),
    direction: defaultSettings.direction,
    shape: { borderRadius: 8 },
    components,
    typography,
  });
  return (
    <AppRouterCacheProvider>
      <MUIThemeProvider theme={theme} defaultMode={schemeConfig.defaultMode}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </AppRouterCacheProvider>
  );
}
