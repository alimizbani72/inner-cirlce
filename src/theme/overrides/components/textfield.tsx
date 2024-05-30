import { inputBaseClasses } from "@mui/material";
import type { Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export function textField(theme: Theme) {
  return {
    MuiTextField: { defaultProps: { variant: "outlined" } },

    // LABEL
    MuiFormLabel: {
      styleOverrides: {
        root: {
          marginBottom: `${theme.spacing(1)} !important`,
          transform: "none !important",
          ...theme.typography["caption-semi-bold"],
        },
      },
    },

    // BASE
    MuiInputBase: {
      styleOverrides: {
        root: {
          marginTop: `0 !important`,
          borderRadius: `${theme.spacing(1.5)} !important`,
          backgroundColor: theme.palette.dark[2],

          [`&.${inputBaseClasses.focused}`]: {
            backgroundColor: theme.palette.dark[1],
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: `${theme.palette.blue.dark} !important`,
            },
          },
        },
        input: {
          ...theme.typography["p2-medium"],
          color: theme.palette.common.white,
          padding: `${theme.spacing(2)} !important`,
          "&::placeholder": {
            opacity: 1,
            color: theme.palette.grey.dark,
          },
        },
      },
    },

    // OUTLINED
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderWidth: "2px",
          borderColor: theme.palette.dark[3],
        },
      },
    },

    // HELPER
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          ...theme.typography["caption-medium"],
          color: theme.palette.grey.light,
          marginTop: theme.spacing(1),
          marginLeft: 0,
        },
      },
    },
  };
}
