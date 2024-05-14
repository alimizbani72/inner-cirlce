"use client";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider as MuiLocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useLocales } from "./use-locales";
import type { ReactNode } from "react";

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export default function LocalizationProvider({ children }: Props) {
  const { currentLang } = useLocales();

  return (
    <MuiLocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={currentLang.adapterLocale}>
      {children}
    </MuiLocalizationProvider>
  );
}
