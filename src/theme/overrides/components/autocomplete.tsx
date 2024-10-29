import { autocompleteClasses } from "@mui/material/Autocomplete";
import type { Theme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import { svgIconClasses } from "@mui/material/SvgIcon";

export function autocomplete(theme: Theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          [`& .${autocompleteClasses.inputRoot}`]: {
            padding: theme.spacing(0.5, 1),
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: theme.palette.grey.dark,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.blue.light,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.blue.dark,
              },
            },
          },
        },
        paper: {
          backgroundColor: theme.palette.background.paper,
          boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`,
          borderRadius: theme.shape.borderRadius,
          [`& .${autocompleteClasses.listbox}`]: {
            padding: theme.spacing(0),
            margin: 0,
            backgroundColor: theme.palette.dark[3],
            color: theme.palette.text.primary, // Ensure text color is correct
            "& li": {
              padding: theme.spacing(1.5, 2),
              color: theme.palette.text.primary,
              fontSize: theme.typography.body2.fontSize,
              "&[aria-selected='true']": {
                backgroundColor: alpha(theme.palette.blue.light, 0.2),
                color: theme.palette.blue.dark,
              },
              "&.Mui-focused": {
                backgroundColor: alpha(theme.palette.blue.dark, 0.1),
              },
            },
          },
          // Styles for "No Options" and "Loading" states
          [`& .${autocompleteClasses.noOptions}, & .${autocompleteClasses.loading}`]: {
            padding: theme.spacing(1.5, 2),
            backgroundColor: theme.palette.dark[3],
            color: `${theme.palette.common.white} !important`, // Ensure the text color is correct
          },
        },
        listbox: {
          padding: 0,
          [`& .${autocompleteClasses.option}`]: {
            padding: theme.spacing(1.5, 2),
            color: `${theme.palette.common.white} !important`,
            "&[aria-selected='true']": {
              backgroundColor: alpha(theme.palette.blue.light, 0.2),
              color: theme.palette.blue.dark,
            },
            "&.Mui-focused": {
              backgroundColor: alpha(theme.palette.blue.dark, 0.1),
            },
          },
        },
        option: {
          padding: theme.spacing(1.5, 2),
          "&[aria-selected='true']": {
            backgroundColor: alpha(theme.palette.blue.light, 0.2),
            color: theme.palette.blue.dark,
          },
          "&.Mui-focused": {
            backgroundColor: alpha(theme.palette.blue.dark, 0.1),
          },
        },
        endAdornment: {
          [`& .${svgIconClasses.root}`]: {
            width: 18,
            height: 18,
            color: theme.palette.grey.light,
          },
        },
      },
    },
  };
}
