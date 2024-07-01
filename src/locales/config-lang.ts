"use client";

import merge from "lodash/merge";

// date fns
import {
  enUS as enUSAdapter,
  de as deAdapter,
  bn as bnAdapter,
  es as esAdapter,
  fr as frAdapter,
  he as heAdapter,
  hi as hiAdapter,
  ja as jaAdapter,
  ko as koAdapter,
  mn as mnAdapter,
  pt as ptAdapter,
  ru as ruAdapter,
  sv as svAdapter,
  th as thAdapter,
  tr as trAdapter,
  vi as viAdapter,
} from "date-fns/locale";

// date pickers (MUI)
import {
  enUS as enUSDate,
  deDE as deDEDate,
  // bnBD as bnDate,
  esES as esDate,
  frFR as frDate,
  heIL as heDate,
  // hiIN as hiDate,
  jaJP as jaDate,
  koKR as koDate,
  // mnMN as mnDate,
  // ptPT as ptDate,
  ruRU as ruDate,
  svSE as svDate,
  // thTH as thDate,
  trTR as trDate,
  viVN as viDate,
} from "@mui/x-date-pickers/locales";
// core (MUI)
import {
  enUS as enUSCore,
  deDE as deDECore,
  bnBD as bnCore,
  esES as esCore,
  frFR as frCore,
  heIL as heCore,
  hiIN as hiCore,
  jaJP as jaCore,
  koKR as koCore,
  // mnMN as mnCore,
  ptPT as ptCore,
  ruRU as ruCore,
  svSE as svCore,
  thTH as thCore,
  trTR as trCore,
  viVN as viCore,
} from "@mui/material/locale";
// data grid (MUI)
import {
  enUS as enUSDataGrid,
  deDE as deDEDataGrid,
  // bnBD as bnDataGrid,
  esES as esDataGrid,
  frFR as frDataGrid,
  heIL as heDataGrid,
  // hiIN as hiDataGrid,
  jaJP as jaDataGrid,
  koKR as koDataGrid,
  // mnMN as mnDataGrid,
  ptPT as ptDataGrid,
  ruRU as ruDataGrid,
  svSE as svDataGrid,
  // thTH as thDataGrid,
  trTR as trDataGrid,
  viVN as viDataGrid,
} from "@mui/x-data-grid/locales";

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
    adapterLocale: deAdapter,
    icon: "flagpack:de",
    numberFormat: {
      code: "de-DE",
      currency: "EUR",
    },
  },
  {
    label: "Bengali",
    value: "bn",
    systemValue: merge(enUSDate, enUSDataGrid, bnCore),
    // systemValue: merge(bnDate, bnDataGrid, bnCore),
    adapterLocale: bnAdapter,
    icon: "flagpack:bd",
    numberFormat: {
      code: "bn-BD",
      currency: "BDT",
    },
  },
  {
    label: "Spanish",
    value: "es",
    systemValue: merge(esDate, esDataGrid, esCore),
    adapterLocale: esAdapter,
    icon: "flagpack:es",
    numberFormat: {
      code: "es-ES",
      currency: "EUR",
    },
  },
  {
    label: "French",
    value: "fr",
    systemValue: merge(frDate, frDataGrid, frCore),
    adapterLocale: frAdapter,
    icon: "flagpack:fr",
    numberFormat: {
      code: "fr-FR",
      currency: "EUR",
    },
  },
  {
    label: "Hebrew",
    value: "he",
    systemValue: merge(heDate, heDataGrid, heCore),
    adapterLocale: heAdapter,
    icon: "flagpack:il",
    numberFormat: {
      code: "he-IL",
      currency: "ILS",
    },
  },
  {
    label: "Hindi",
    value: "hi",
    systemValue: merge(enUSDate, enUSDataGrid, hiCore),
    // systemValue: merge(hiDate, hiDataGrid, hiCore),
    adapterLocale: hiAdapter,
    icon: "flagpack:in",
    numberFormat: {
      code: "hi-IN",
      currency: "INR",
    },
  },
  {
    label: "Japanese",
    value: "ja",
    systemValue: merge(jaDate, jaDataGrid, jaCore),
    adapterLocale: jaAdapter,
    icon: "flagpack:jp",
    numberFormat: {
      code: "ja-JP",
      currency: "JPY",
    },
  },
  {
    label: "Korean",
    value: "ko",
    systemValue: merge(koDate, koDataGrid, koCore),
    adapterLocale: koAdapter,
    icon: "flagpack:kr",
    numberFormat: {
      code: "ko-KR",
      currency: "KRW",
    },
  },
  {
    label: "Mongolian",
    value: "mn",
    systemValue: merge(enUSDate, enUSDataGrid, enUSCore),
    // systemValue: merge(mnDate, mnDataGrid, mnCore),
    adapterLocale: mnAdapter,
    icon: "flagpack:mn",
    numberFormat: {
      code: "mn-MN",
      currency: "MNT",
    },
  },
  {
    label: "Portuguese",
    value: "pt",
    systemValue: merge(enUSDate, ptDataGrid, ptCore),
    // systemValue: merge(ptDate, ptDataGrid, ptCore),
    adapterLocale: ptAdapter,
    icon: "flagpack:pt",
    numberFormat: {
      code: "pt-PT",
      currency: "EUR",
    },
  },
  {
    label: "Russian",
    value: "ru",
    systemValue: merge(ruDate, ruDataGrid, ruCore),
    adapterLocale: ruAdapter,
    icon: "flagpack:ru",
    numberFormat: {
      code: "ru-RU",
      currency: "RUB",
    },
  },
  {
    label: "Swedish",
    value: "sv",
    systemValue: merge(svDate, svDataGrid, svCore),
    adapterLocale: svAdapter,
    icon: "flagpack:se",
    numberFormat: {
      code: "sv-SE",
      currency: "SEK",
    },
  },
  {
    label: "Thai",
    value: "th",
    systemValue: merge(enUSDate, enUSDataGrid, thCore),
    // systemValue: merge(thDate, thDataGrid, thCore),
    adapterLocale: thAdapter,
    icon: "flagpack:th",
    numberFormat: {
      code: "th-TH",
      currency: "THB",
    },
  },
  {
    label: "Turkish",
    value: "tr",
    systemValue: merge(trDate, trDataGrid, trCore),
    adapterLocale: trAdapter,
    icon: "flagpack:tr",
    numberFormat: {
      code: "tr-TR",
      currency: "TRY",
    },
  },
  {
    label: "Vietnamese",
    value: "vi",
    systemValue: merge(viDate, viDataGrid, viCore),
    adapterLocale: viAdapter,
    icon: "flagpack:vn",
    numberFormat: {
      code: "vi-VN",
      currency: "VND",
    },
  },
];

export const defaultLang = allLangs[0]; // English

// GET MORE COUNTRY FLAGS
// https://icon-sets.iconify.design/flagpack/
// https://www.dropbox.com/sh/nec1vwswr9lqbh9/AAB9ufC8iccxvtWi3rzZvndLa?dl=0
