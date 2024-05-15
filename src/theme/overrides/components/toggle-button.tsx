import type { Theme } from "@mui/material/styles";
import { button } from "./button";
import { toggleButtonClasses } from "@mui/material";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function toggleButton(theme: Theme) {
  return {
    MuiToggleButton: { styleOverrides: button(theme).MuiButton.styleOverrides },
    MuiToggleButtonGroup: {
      defaultProps: { color: "info", exclusive: true },
      styleOverrides: {
        root: {
          borderRadius: theme.spacing(3),
          border: `1px solid ${theme.palette.dark[3]}`,
        },
        grouped: {
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3),
          [`&.${toggleButtonClasses.selected}`]: {
            boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.16)",
            backgroundColor: theme.palette.dark[3],
            color: theme.palette.common.white,
          },
          "&:not(:last-of-type)": { borderRight: `1px solid ${theme.palette.dark[3]}` },
        },
      },
    },
  };
}
