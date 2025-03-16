'use client';
// core (MUI)
import {
  bnBD as bnCore,
  deDE as deDECore,
  enUS as enUSCore,
  esES as esCore,
  fiFI as fiCore,
  frFR as frCore,
  jaJP as jaCore,
  koKR as koCore,
  nbNO as nbCore,
  // mnMN as mnCore,
  ptPT as ptCore,
  ruRU as ruCore,
  svSE as svCore,
  thTH as thCore,
  trTR as trCore,
  viVN as viCore,
} from '@mui/material/locale';

// date pickers (MUI)
import {
  deDE as deDEDate,
  enUS as enUSDate,
  // bnBD as bnDate,
  esES as esDate,
  fiFI as fiDate,
  frFR as frDate,
  // hiIN as hiDate,
  jaJP as jaDate,
  koKR as koDate,
  nbNO as nbDate,
  // mnMN as mnDate,
  // ptPT as ptDate,
  ruRU as ruDate,
  svSE as svDate,
  // thTH as thDate,
  trTR as trDate,
  viVN as viDate,
} from '@mui/x-date-pickers/locales';

// ----------------------------------------------------------------------

export const allLangs = [
  {
    value: 'en',
    label: 'English',
    countryCode: 'GB',
    adapterLocale: 'en',
    numberFormat: { code: 'en-US', currency: 'USD' },
    systemValue: {
      components: { ...enUSCore, ...enUSDate.components },
    },
  },
  {
    value: 'de',
    label: 'German',
    countryCode: 'DE',
    adapterLocale: 'de',
    numberFormat: { code: 'de-DE', currency: 'EUR' },
    systemValue: {
      components: { ...deDECore.components, ...deDEDate.components },
    },
  },

  {
    value: 'es',
    label: 'Spanish',
    countryCode: 'ES',
    adapterLocale: 'es',
    numberFormat: { code: 'es-ES', currency: 'EUR' },
    systemValue: {
      components: { ...esCore.components, ...esDate.components },
    },
  },
  {
    value: 'fr',
    label: 'French',
    countryCode: 'FR',
    adapterLocale: 'fr',
    numberFormat: { code: 'fr-FR', currency: 'EUR' },
    systemValue: {
      components: { ...frCore.components, ...frDate.components },
    },
  },
  {
    value: 'ru',
    label: 'Russian',
    countryCode: 'RU',
    adapterLocale: 'ru',
    numberFormat: { code: 'ru-RU', currency: 'RUB' },
    systemValue: {
      components: { ...ruCore.components, ...ruDate.components },
    },
  },
  {
    value: 'pt',
    label: 'Portuguese',
    countryCode: 'PT',
    adapterLocale: 'pt',
    numberFormat: { code: 'pt-BR', currency: 'BRL' },
    systemValue: {
      components: { ...ptCore.components, ...trDate.components },
    },
  },
  {
    value: 'fi',
    label: 'Finnish',
    countryCode: 'FI',
    adapterLocale: 'fi',
    numberFormat: { code: 'fi-FI', currency: 'EUR' },
    systemValue: {
      components: { ...fiCore.components, ...fiDate.components },
    },
  },
  {
    value: 'no',
    label: 'Norwegian',
    countryCode: 'NO',
    adapterLocale: 'nb',
    numberFormat: { code: 'nb-NO', currency: 'NOK' },
    systemValue: {
      components: { ...nbCore.components, ...nbDate.components },
    },
  },
  {
    value: 'sv',
    label: 'Swedish',
    countryCode: 'SE',
    adapterLocale: 'sv',
    numberFormat: { code: 'sv-SE', currency: 'SEK' },
    systemValue: {
      components: { ...svCore.components, ...svDate.components },
    },
  },
  {
    value: 'he',
    label: 'Hebrew',
    countryCode: 'IL',
    adapterLocale: 'he',
    numberFormat: { code: 'he-IL', currency: 'ILS' },
    systemValue: {},
  },
  {
    value: 'hi',
    label: 'Hindi',
    countryCode: 'IN',
    adapterLocale: 'hi',
    numberFormat: { code: 'hi-IN', currency: 'INR' },
    systemValue: {},
  },
  {
    value: 'ja',
    label: 'Japanese',
    countryCode: 'JP',
    adapterLocale: 'ja',
    numberFormat: { code: 'ja-JP', currency: 'JPY' },
    systemValue: {
      components: { ...jaCore.components, ...jaDate.components },
    },
  },
  {
    value: 'ko',
    label: 'Korean',
    countryCode: 'KR',
    adapterLocale: 'ko',
    numberFormat: { code: 'ko-KR', currency: 'KRW' },
    systemValue: {
      components: { ...koCore.components, ...koDate.components },
    },
  },
  {
    value: 'mn',
    label: 'Mongolian',
    countryCode: 'MN',
    adapterLocale: 'mn',
    numberFormat: { code: 'mn-MN', currency: 'MNT' },
    systemValue: {},
  },
  {
    value: 'bn',
    label: 'Bengali',
    countryCode: 'BD',
    adapterLocale: 'bn',
    numberFormat: { code: 'bn-BD', currency: 'BDT' },
    systemValue: { components: { ...bnCore } },
  },

  {
    value: 'th',
    label: 'Thai',
    countryCode: 'TH',
    adapterLocale: 'th',
    numberFormat: { code: 'th-TH', currency: 'THB' },
    systemValue: {
      components: { ...thCore.components },
    },
  },
  {
    value: 'tr',
    label: 'Turkish',
    countryCode: 'TR',
    adapterLocale: 'tr',
    numberFormat: { code: 'tr-TR', currency: 'TRY' },
    systemValue: {
      components: { ...trCore.components, ...trDate.components },
    },
  },
  {
    value: 'vi',
    label: 'Vietnamese',
    countryCode: 'VN',
    adapterLocale: 'vi',
    numberFormat: { code: 'vi-VN', currency: 'VND' },
    systemValue: {
      components: { ...viCore.components, ...viDate.components },
    },
  },
];

export const defaultLang = allLangs[0];

/**
 * Country code:
 * https://flagcdn.com/en/codes.json
 *
 * Number format code:
 * https://gist.github.com/raushankrjha/d1c7e35cf87e69aa8b4208a8171a8416
 */
