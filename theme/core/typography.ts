import type { TypographyOptions } from '@mui/material/styles/createTypography';

import { pxToRem, setFont } from '../styles/utils';
import { toNumber } from '@/utils/toNumber';
import type { CSSProperties } from 'react';

const defaultFont = 'Montserrat';

export const primaryFont = setFont(defaultFont);

// ----------------------------------------------------------------------

declare module '@mui/material/styles' {
  interface TypographyVariants {
    fontWeightSemiBold: React.CSSProperties['fontWeight'];

    // bold
    'h1-bold': CSSProperties;
    'h2-bold': CSSProperties;
    'h3-bold': CSSProperties;
    'h4-bold': CSSProperties;
    'h5-bold': CSSProperties;
    'h6-bold': CSSProperties;
    'body1-bold': CSSProperties;
    'body2-bold': CSSProperties;
    'caption-bold': CSSProperties;
    // semi-bold
    'h1-semi-bold': CSSProperties;
    'h2-semi-bold': CSSProperties;
    'h3-semi-bold': CSSProperties;
    'h4-semi-bold': CSSProperties;
    'h5-semi-bold': CSSProperties;
    'h6-semi-bold': CSSProperties;
    'body1-semi-bold': CSSProperties;
    'body2-semi-bold': CSSProperties;
    'caption-semi-bold': CSSProperties;
    // medium
    'h1-medium': CSSProperties;
    'h2-medium': CSSProperties;
    'h3-medium': CSSProperties;
    'h4-medium': CSSProperties;
    'h5-medium': CSSProperties;
    'h6-medium': CSSProperties;
    'body1-medium': CSSProperties;
    'p2-medium': CSSProperties;
    'caption-medium': CSSProperties;
    // regular
    'h1-regular': CSSProperties;
    'h2-regular': CSSProperties;
    'h3-regular': CSSProperties;
    'h4-regular': CSSProperties;
    'h5-regular': CSSProperties;
    'h6-regular': CSSProperties;
    'body1-regular': CSSProperties;
    'p2-regular': CSSProperties;
    'caption-regular': CSSProperties;
  }
  interface TypographyVariantsOptions {
    fontWeightSemiBold?: React.CSSProperties['fontWeight'];

    // bold
    'h1-bold'?: CSSProperties;
    'h2-bold'?: CSSProperties;
    'h3-bold'?: CSSProperties;
    'h4-bold'?: CSSProperties;
    'h5-bold'?: CSSProperties;
    'h6-bold'?: CSSProperties;
    'body1-bold'?: CSSProperties;
    'body2-bold'?: CSSProperties;
    'caption-bold'?: CSSProperties;
    // semi-bold
    'h1-semi-bold'?: CSSProperties;
    'h2-semi-bold'?: CSSProperties;
    'h3-semi-bold'?: CSSProperties;
    'h4-semi-bold'?: CSSProperties;
    'h5-semi-bold'?: CSSProperties;
    'h6-semi-bold'?: CSSProperties;
    'body1-semi-bold'?: CSSProperties;
    'body2-semi-bold'?: CSSProperties;
    'caption-semi-bold'?: CSSProperties;
    // medium
    'h1-medium'?: CSSProperties;
    'h2-medium'?: CSSProperties;
    'h3-medium'?: CSSProperties;
    'h4-medium'?: CSSProperties;
    'h5-medium'?: CSSProperties;
    'h6-medium'?: CSSProperties;
    'body1-medium'?: CSSProperties;
    'p2-medium'?: CSSProperties;
    'caption-medium'?: CSSProperties;
    // regular
    'h1-regular'?: CSSProperties;
    'h2-regular'?: CSSProperties;
    'h3-regular'?: CSSProperties;
    'h4-regular'?: CSSProperties;
    'h5-regular'?: CSSProperties;
    'h6-regular'?: CSSProperties;
    'body1-regular'?: CSSProperties;
    'p2-regular'?: CSSProperties;
    'caption-regular'?: CSSProperties;
  }
  interface ThemeVars {
    typography: Theme['typography'];
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1: false;
    h2: false;
    h3: false;
    h4: false;
    h5: false;
    h6: false;
    subtitle1: false;
    subtitle2: false;
    caption: false;
    overline: false;
    body1: false;
    body2: false;
    button: false;
    // bold
    'h1-bold': true;
    'h2-bold': true;
    'h3-bold': true;
    'h4-bold': true;
    'p1-bold': true;
    'p2-bold': true;
    'caption-bold': true;
    // semi-bold
    'h1-semi-bold': true;
    'h2-semi-bold': true;
    'h3-semi-bold': true;
    'h4-semi-bold': true;
    'p1-semi-bold': true;
    'p2-semi-bold': true;
    'caption-semi-bold': true;
    // medium
    'h1-medium': true;
    'h2-medium': true;
    'h3-medium': true;
    'h4-medium': true;
    'p1-medium': true;
    'p2-medium': true;
    'caption-medium': true;
    // regular
    'h1-regular': true;
    'h2-regular': true;
    'h3-regular': true;
    'h4-regular': true;
    'p1-regular': true;
    'p2-regular': true;
    'caption-regular': true;
  }
}

// ----------------------------------------------------------------------

type FontWeight = 400 | 500 | 600 | 700;
const weights: Record<FontWeight, string> = {
  400: 'regular',
  500: 'medium',
  600: 'semi-bold',
  700: 'bold',
};

interface Style {
  fontWeight: FontWeight;
  fontSize: string;
  lineHeight: number;
}

const fontVariant = (name: string, fontSize: number, lineHeight: number): Record<string, Style> =>
  Object.entries(weights).reduce<Record<string, Style>>((accumulator, [weight, label]) => {
    accumulator[`${name}-${label}`] = {
      fontWeight: toNumber(weight) as FontWeight,
      fontSize: pxToRem(fontSize),
      lineHeight,
    };
    return accumulator;
  }, {});

// ----------------------------------------------------------------------

export const typography: TypographyOptions = {
  fontFamily: primaryFont,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,

  h1: undefined,
  h2: undefined,
  h3: undefined,
  h4: undefined,
  h5: undefined,
  h6: undefined,
  subtitle1: undefined,
  subtitle2: undefined,
  overline: undefined,

  ...fontVariant('h1', 48, 1.33),
  ...fontVariant('h2', 32, 1.5),
  ...fontVariant('h3', 24, 1.66),
  ...fontVariant('h4', 18, 1.77),
  ...fontVariant('p1', 16, 1.75),
  ...fontVariant('p2', 14, 1.71),
  ...fontVariant('caption', 12, 1.66),
};
