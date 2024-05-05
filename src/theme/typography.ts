import { Roboto } from 'next/font/google';
import type { CSSProperties } from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    fontWeightBlack: CSSProperties['fontWeight'];
    'black-h1': CSSProperties;
    'black-h2': CSSProperties;
    'black-h3': CSSProperties;
    'black-h4': CSSProperties;
    'black-h5': CSSProperties;
    'black-h6': CSSProperties;
    // bold
    'bold-h1': CSSProperties;
    'bold-h2': CSSProperties;
    'bold-h3': CSSProperties;
    'bold-h4': CSSProperties;
    'bold-h5': CSSProperties;
    'bold-h6': CSSProperties;
    // medium
    'medium-h1': CSSProperties;
    'medium-h2': CSSProperties;
    'medium-h3': CSSProperties;
    'medium-h4': CSSProperties;
    'medium-h5': CSSProperties;
    'medium-h6': CSSProperties;
    // regular
    'regular-h1': CSSProperties;
    'regular-h2': CSSProperties;
    'regular-h3': CSSProperties;
    'regular-h4': CSSProperties;
    'regular-h5': CSSProperties;
    'regular-h6': CSSProperties;
    // input
    'input-title': CSSProperties;
    'input-body': CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    'black-h1'?: CSSProperties;
    'black-h2'?: CSSProperties;
    'black-h3'?: CSSProperties;
    'black-h4'?: CSSProperties;
    'black-h5'?: CSSProperties;
    'black-h6'?: CSSProperties;
    // bold
    'bold-h1'?: CSSProperties;
    'bold-h2'?: CSSProperties;
    'bold-h3'?: CSSProperties;
    'bold-h4'?: CSSProperties;
    'bold-h5'?: CSSProperties;
    'bold-h6'?: CSSProperties;
    // medium
    'medium-h1'?: CSSProperties;
    'medium-h2'?: CSSProperties;
    'medium-h3'?: CSSProperties;
    'medium-h4'?: CSSProperties;
    'medium-h5'?: CSSProperties;
    'medium-h6'?: CSSProperties;
    // regular
    'regular-h1'?: CSSProperties;
    'regular-h2'?: CSSProperties;
    'regular-h3'?: CSSProperties;
    'regular-h4'?: CSSProperties;
    'regular-h5'?: CSSProperties;
    'regular-h6'?: CSSProperties;
    // input
    'input-title'?: CSSProperties;
    'input-body'?: CSSProperties;
  }
}

// Update the Typography's variant prop options
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

    'black-h1': true;
    'black-h2': true;
    'black-h3': true;
    'black-h4': true;
    'black-h5': true;
    'black-h6': true;
    // bold
    'bold-h1': true;
    'bold-h2': true;
    'bold-h3': true;
    'bold-h4': true;
    'bold-h5': true;
    'bold-h6': true;
    // medium
    'medium-h1': true;
    'medium-h2': true;
    'medium-h3': true;
    'medium-h4': true;
    'medium-h5': true;
    'medium-h6': true;
    // regular
    'regular-h1': true;
    'regular-h2': true;
    'regular-h3': true;
    'regular-h4': true;
    'regular-h5': true;
    'regular-h6': true;
    // input
    'input-title': true;
    'input-body': true;
  }
}

export type Variant =
  | 'black-h1'
  | 'black-h2'
  | 'black-h3'
  | 'black-h4'
  | 'black-h5'
  | 'black-h6'
  // bold
  | 'bold-h1'
  | 'bold-h2'
  | 'bold-h3'
  | 'bold-h4'
  | 'bold-h5'
  | 'bold-h6'
  // medium
  | 'medium-h1'
  | 'medium-h2'
  | 'medium-h3'
  | 'medium-h4'
  | 'medium-h5'
  | 'medium-h6'
  // regular
  | 'regular-h1'
  | 'regular-h2'
  | 'regular-h3'
  | 'regular-h4'
  | 'regular-h5'
  | 'regular-h6'
  // input
  | 'input-title'
  | 'input-body'
  | 'body1'
  | 'body2'
  | 'button';

const pxToRem = (value: number): string => `${value / 16}rem`;

const mobileFontSize = (fontSize: number, lineHeight: number) => ({
  '@media (max-width:900px)': {
    fontSize: pxToRem(fontSize),
    lineHeight,
  },
});

export const primaryFont = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Arial', 'Helvetica', 'sans-serif'],
});

const typography = {
  fontFamily: primaryFont.style.fontFamily,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  fontWeightBlack: 900,

  h1: undefined,
  h2: undefined,
  h3: undefined,
  h4: undefined,
  h5: undefined,
  h6: undefined,
  subtitle1: undefined,
  subtitle2: undefined,
  overline: undefined,

  'black-h1': {
    fontWeight: 900,
    fontSize: pxToRem(46),
    lineHeight: 1.17,
    ...mobileFontSize(36, 1.22),
  },
  'black-h2': {
    fontWeight: 900,
    fontSize: pxToRem(36),
    lineHeight: 1.16,
    ...mobileFontSize(26, 1.23),
  },
  'black-h3': {
    fontWeight: 900,
    fontSize: pxToRem(26),
    lineHeight: 1.23,
    ...mobileFontSize(18, 1.33),
  },
  'black-h4': {
    fontWeight: 900,
    fontSize: pxToRem(20),
    lineHeight: 1.2,
    ...mobileFontSize(16, 1.25),
  },
  'black-h5': {
    fontWeight: 900,
    fontSize: pxToRem(18),
    lineHeight: 1.22,
    ...mobileFontSize(14, 1.28),
  },
  'black-h6': {
    fontWeight: 900,
    fontSize: pxToRem(16),
    lineHeight: 1.5,
    ...mobileFontSize(13, 1.23),
  },
  'bold-h1': {
    fontWeight: 700,
    fontSize: pxToRem(46),
    lineHeight: 1.17,
    ...mobileFontSize(36, 1.22),
  },
  'bold-h2': {
    fontWeight: 700,
    fontSize: pxToRem(36),
    lineHeight: 1.16,
    ...mobileFontSize(26, 1.23),
  },
  'bold-h3': {
    fontWeight: 700,
    fontSize: pxToRem(26),
    lineHeight: 1.23,
    ...mobileFontSize(18, 1.33),
  },
  'bold-h4': {
    fontWeight: 700,
    fontSize: pxToRem(20),
    lineHeight: 1.2,
    ...mobileFontSize(16, 1.25),
  },
  'bold-h5': {
    fontWeight: 700,
    fontSize: pxToRem(18),
    lineHeight: 1.22,
    ...mobileFontSize(14, 1.28),
  },
  'bold-h6': {
    fontWeight: 700,
    fontSize: pxToRem(16),
    lineHeight: 1.5,
    ...mobileFontSize(13, 1.23),
  },
  'medium-h1': {
    fontWeight: 500,
    fontSize: pxToRem(46),
    lineHeight: 1.17,
    ...mobileFontSize(36, 1.22),
  },
  'medium-h2': {
    fontWeight: 500,
    fontSize: pxToRem(36),
    lineHeight: 1.16,
    ...mobileFontSize(26, 1.23),
  },
  'medium-h3': {
    fontWeight: 500,
    fontSize: pxToRem(26),
    lineHeight: 1.23,
    ...mobileFontSize(18, 1.33),
  },
  'medium-h4': {
    fontWeight: 500,
    fontSize: pxToRem(20),
    lineHeight: 1.2,
    ...mobileFontSize(16, 1.25),
  },
  'medium-h5': {
    fontWeight: 500,
    fontSize: pxToRem(18),
    lineHeight: 1.22,
    ...mobileFontSize(14, 1.28),
  },
  'medium-h6': {
    fontWeight: 500,
    fontSize: pxToRem(16),
    lineHeight: 1.5,
    ...mobileFontSize(13, 1.23),
  },
  'regular-h1': {
    fontWeight: 400,
    fontSize: pxToRem(46),
    lineHeight: 1.17,
    ...mobileFontSize(36, 1.22),
  },
  'regular-h2': {
    fontWeight: 400,
    fontSize: pxToRem(36),
    lineHeight: 1.16,
    ...mobileFontSize(26, 1.23),
  },
  'regular-h3': {
    fontWeight: 400,
    fontSize: pxToRem(26),
    lineHeight: 1.23,
    ...mobileFontSize(18, 1.33),
  },
  'regular-h4': {
    fontWeight: 400,
    fontSize: pxToRem(20),
    lineHeight: 1.2,
    ...mobileFontSize(16, 1.25),
  },
  'regular-h5': {
    fontWeight: 400,
    fontSize: pxToRem(18),
    lineHeight: 1.22,
    ...mobileFontSize(14, 1.28),
  },
  'regular-h6': {
    fontWeight: 400,
    fontSize: pxToRem(16),
    lineHeight: 1.5,
    ...mobileFontSize(13, 1.23),
  },
  'input-title': {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
    ...mobileFontSize(14, 1.28),
  },
  'input-body': {
    fontWeight: 400,
    lineHeight: 1.22,
    fontSize: pxToRem(18),
    ...mobileFontSize(15, 1.33),
  },
  body1: {
    fontWeight: 400,
    lineHeight: 1.28,
    fontSize: pxToRem(14),
    ...mobileFontSize(12, 1.33),
  },
  body2: {
    fontWeight: 400,
    lineHeight: 1,
    fontSize: pxToRem(12),
    ...mobileFontSize(10, 1),
  },
  button: {
    fontWeight: 500,
    lineHeight: 1.73,
    fontSize: pxToRem(15),
    textTransform: 'unset',
    ...mobileFontSize(13, 1.38),
  },
} as const;

export default typography;
