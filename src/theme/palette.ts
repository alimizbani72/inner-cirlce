export type ColorSchema = "blue" | "pink" | "gradient" | "dark" | "grey" | "success" | "warning" | "danger";

// SETUP COLORS

export const BLUE = {
  light: "#779DFF",
  dark: "#565CE4",
  contrastText: "#FFFFFF",
};

export const PINK = {
  light: "#FF7DBC",
  dark: "#FF409D",
  contrastText: "#FFFFFF",
};

export const GRADIENT = {
  blue: "radial-gradient(50% 50% at 50% 50%, #779DFF 0%, #565CE4 100%)",
  pink: "radial-gradient(50% 50% at 50% 50%, #FF7DBC 0%, #FF409D 100%)",
  sky: "radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, #CDDFF2 100%)",
  orange: "radial-gradient(50% 50% at 50% 50%, #FFD18B 0%, #E68F0D 100%)",
};

export const DARK = {
  1: "#070720",
  2: "#090A23",
  3: "#14162E",
};

export const GREY = {
  light: "#9799B4",
  dark: "#626583",
  contrastText: "#FFFFFF",
};

export const SUCCESS = {
  main: "#03D489",
  contrastText: "#FFFFFF",
};

export const WARNING = {
  main: "#FFBE21",
  contrastText: "#FFFFFF",
};

export const DANGER = {
  main: "#FF5757",
  contrastText: "#FFFFFF",
};

const COMMON = {
  common: {
    black: "#000000",
    white: "#FFFFFF",
  },
  blue: BLUE,
  pink: PINK,
  gradient: GRADIENT,
  dark: DARK,
  grey: GREY,
  success: SUCCESS,
  warning: WARNING,
  danger: DANGER,
  error: DANGER,
  divider: DARK[3],
};

export function palette(mode: "light" | "dark") {
  const light = {
    ...COMMON,
    mode: "light",
    text: {
      primary: "#040911",
      secondary: "#919EAB",
      disabled: DARK[3],
    },
    background: {
      paper: "#FFFFFF",
      default: "#FFFFFF",
    },
  };

  const dark = {
    ...COMMON,
    mode: "dark",
    text: {
      primary: "#FFFFFF",
      secondary: DARK[3],
      disabled: GREY.dark,
    },
    background: {
      paper: DARK[3],
      default: DARK[3],
    },
  };

  return mode === "light" ? light : dark;
}
