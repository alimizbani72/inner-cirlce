import type { Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export function typography(theme: Theme) {
  return {
    MuiTypography: {
      defaultProps: { color: "white" },
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
      },
    },
  };
}
