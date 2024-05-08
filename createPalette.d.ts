import '@mui/material/styles/createPalette';

interface BlueOptions {
  light: string;
  dark: string;
}

interface PinkOptions {
  light: string;
  dark: string;
}

interface GradientOptions {
  blue: string;
  pink: string;
  sky: string;
  orange: string;
}

interface DarkOptions {
  1: string;
  2: string;
  3: string;
}

interface GreyOptions {
  light: string;
  dark: string;
}

// For grey color
declare module '@mui/material' {
  interface Color {
    light: string;
    dark: string;
  }
}

interface SuccessOptions {
  main: string;
}

interface WarningOptions {
  main: string;
}

interface DangerOptions {
  main: string;
}

declare module '@mui/material/styles/createPalette' {
  interface SimplePaletteColorOptions {
    [k: string]: string;
  }
  interface PaletteColor {
    [k: string]: string;
  }

  interface Palette {
    blue: BlueOptions;
    pink: PinkOptions;
    gradient: GradientOptions;
    dark: DarkOptions;
    grey: GreyOptions;
    success: SuccessOptions;
    warning: WarningOptions;
    danger: DangerOptions;
  }

  interface PaletteOptions {
    blue?: BlueOptions;
    pink?: PinkOptions;
    gradient?: GradientOptions;
    dark?: DarkOptions;
    grey?: GreyOptions;
    success?: SuccessOptions;
    warning?: WarningOptions;
    danger?: DangerOptions;
  }
}
