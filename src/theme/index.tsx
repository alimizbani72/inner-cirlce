"use client";

// @mui
import CssBaseline from "@mui/material/CssBaseline";
import type { ThemeOptions } from "@mui/material/styles";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import merge from "lodash/merge";
import { type ReactNode, useMemo } from "react";
// components
// locales
import { useLocales } from "src/locales";
//
// options
import RTL from "./options/right-to-left";
import { componentsOverrides } from "./overrides";
// system
import { palette } from "./palette";
import { shadows } from "./shadows";
import typography from "./typography";

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const { currentLang } = useLocales();

  const baseOption = useMemo(
    () => ({
      palette: palette("light"),
      shadows: shadows("light"),
      typography,
      shape: { borderRadius: 8 },
      spacing: 8,
    }),
    []
  );

  const memoizedValue = useMemo(
    () =>
      merge(
        // Base
        baseOption
      ),
    [baseOption]
  );

  const theme = createTheme(memoizedValue as ThemeOptions);

  theme.components = merge(componentsOverrides(theme));

  const themeWithLocale = useMemo(() => createTheme(theme, currentLang.systemValue), [currentLang.systemValue, theme]);

  return (
    <AppRouterCacheProvider options={{ key: "css" }}>
      <MuiThemeProvider theme={themeWithLocale}>
        <RTL themeDirection="ltr">
          <CssBaseline />
          {children}
        </RTL>
      </MuiThemeProvider>
    </AppRouterCacheProvider>
  );
}
