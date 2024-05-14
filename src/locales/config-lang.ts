"use client";

import merge from "lodash/merge";
// date fns
import { enUS as enUSAdapter, de as deDEAdapter } from "date-fns/locale";

// date pickers (MUI)
import { enUS as enUSDate, deDE as deDEDate } from "@mui/x-date-pickers/locales";
// core (MUI)
import { enUS as enUSCore, deDE as deDECore } from "@mui/material/locale";
// data grid (MUI)
import { enUS as enUSDataGrid, deDE as deDEDataGrid } from "@mui/x-data-grid/locales";

export const allLangs = [
  {
    label: "English",
    value: "en",
    systemValue: merge(enUSDate, enUSDataGrid, enUSCore),
    adapterLocale: enUSAdapter,
    icon: "flagpack:us",
    numberFormat: {
      code: "en-US",
      currency: "USD",
    },
  },
  {
    label: "German",
    value: "de",
    systemValue: merge(deDEDate, deDEDataGrid, deDECore),
    adapterLocale: deDEAdapter,
    icon: "flagpack:de",
    numberFormat: {
      code: "de-DE",
      currency: "EUR",
    },
  },
];

export const defaultLang = allLangs[0]; // English

// GET MORE COUNTRY FLAGS
// https://icon-sets.iconify.design/flagpack/
// https://www.dropbox.com/sh/nec1vwswr9lqbh9/AAB9ufC8iccxvtWi3rzZvndLa?dl=0
