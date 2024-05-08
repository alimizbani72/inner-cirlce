import type { ButtonProps } from "@mui/material/Button";
import type { Theme } from "@mui/material/styles";

export type ButtonPropsOverride = ButtonProps & { color: "primary" | "secondary" | "info" };

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    warning: false;
    error: false;
    success: false;
  }
}

// ----------------------------------------------------------------------

const COLORS = (theme: Theme) => ({
  disabled: {
    borderColor: theme.palette.grey.light,
    background: theme.palette.grey.light,
    color: theme.palette.grey.dark,
    boxShadow: "none",
  },
  primary: {
    boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.24), 0px 0px 0px 2px rgba(255, 255, 255, 0.16) inset",
    color: "white",
    normal: {
      borderColor: "rgba(0, 0, 0, 0.40)",
      background: theme.palette.gradient.blue,
      transition: theme.transitions.create("all", { duration: "0.2s", easing: "ease-in-out" }),
    },
    hover: {
      background: `radial-gradient(50% 50% at 50% 50%, ${theme.palette.blue.dark} 100%, ${theme.palette.blue.dark} 100%)`,
    },
  },
  secondary: {
    boxShadow: "0px 0px 0px 2px rgba(255, 255, 255, 0.40) inset, 0px 4px 8px 0px rgba(0, 0, 0, 0.24)",
    color: theme.palette.dark[3],
    normal: {
      borderColor: "rgba(0, 0, 0, 0.24)",
      background: theme.palette.gradient.sky,
    },
    hover: {},
  },
  info: {
    boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.24)",
    color: "white",
    normal: {
      borderColor: theme.palette.dark[3],
      backgroundColor: theme.palette.dark[1],
    },
    hover: {
      backgroundColor: theme.palette.dark[3],
    },
  },
});

export function button(theme: Theme) {
  return {
    MuiButton: {
      defaultProps: { variant: "contained", color: "primary" },
      styleOverrides: {
        root: ({ ownerState }: { ownerState: ButtonPropsOverride }) => ({
          borderRadius: "24px",
          border: "1px solid transparent",
          color: theme.palette.common.white,
          textTransform: "none",
          ...theme.typography["p2-medium"],
          lineHeight: "24px",
          "&.Mui-disabled": {
            ...COLORS(theme).disabled,
            ".MuiButton-icon": { "svg path, svg circle": { stroke: COLORS(theme).disabled.color } },
          },

          ".MuiButton-icon": {
            color: COLORS(theme)[ownerState.color].color,
            "svg path, svg circle": { stroke: COLORS(theme)[ownerState.color].color },
          },
        }),
        startIcon: { marginLeft: 0 },
        endIcon: { marginRight: 0 },
        sizeLarge: { height: theme.spacing(6), padding: theme.spacing(1.5, 4) },
        sizeMedium: { height: theme.spacing(5), padding: theme.spacing(1, 4) },
        sizeSmall: { height: theme.spacing(4), padding: theme.spacing(0.5, 3) },
        contained: ({ ownerState }: { ownerState: ButtonPropsOverride }) => ({
          ...COLORS(theme)[ownerState.color].normal,
          color: COLORS(theme)[ownerState.color].color,
          boxShadow: COLORS(theme)[ownerState.color].boxShadow,
          "&:hover": {
            boxShadow: COLORS(theme)[ownerState.color].boxShadow,
            ...COLORS(theme)[ownerState.color].normal,
            ...COLORS(theme)[ownerState.color].hover,
          },
        }),
      },
    },
  };
}
