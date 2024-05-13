import type { Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export function skeleton(theme: Theme) {
  return {
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.default,
        },
        rounded: {
          borderRadius: theme.shape.borderRadius * 2,
        },
      },
    },
  };
}
