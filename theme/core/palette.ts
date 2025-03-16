import type { PaletteOptions } from '@mui/material/styles';

import COLORS from './colors.json';

// ----------------------------------------------------------------------

declare module '@mui/material/styles/createPalette' {
  interface GradientOptions {
    blue: string;
    pink: string;
    sky: string;
    orange: string;
  }

  interface Color {
    light: string;
    dark: string;
    contrastText: string;
  }

  interface DarkColor {
    1: string;
    2: string;
    3: string;
  }

  interface Palette {
    gradient: GradientOptions;
    blue: Color;
    pink: Color;
    dark: DarkColor;
    primary: PaletteColor;
  }
}

declare module '@mui/material/styles' {
  interface ThemeVars {
    transitions: Theme['transitions'];
  }
}

export type ColorType =
  | 'gradient'
  | 'blue'
  | 'pink'
  | 'dark'
  | 'grey'
  | 'success'
  | 'warning'
  | 'danger';

// ----------------------------------------------------------------------
export const gradient = COLORS.gradient;
export const grey = COLORS.grey;
export const blue = COLORS.blue;
export const pink = COLORS.pink;
export const dark = COLORS.dark;
export const success = COLORS.success;
export const warning = COLORS.warning;
export const danger = COLORS.danger;
export const common = COLORS.common;

// Text
export const text = {
  primary: '#FFFFFF',
  secondary: '#14162E',
  disabled: '#626583',
};

// Background
export const background = {
  paper: '#14162E',
  default: '#14162E',
};

/*
 * Base palette
 */
export const basePalette = {
  common,
  gradient,
  blue,
  pink,
  dark,
  grey,
  success,
  warning,
  danger,
  divider: dark[3],
};

// ----------------------------------------------------------------------

export const palette: Partial<PaletteOptions> = {
  ...basePalette,
  text,
  background,
  mode: 'dark',
};
