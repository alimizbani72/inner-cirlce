import type { Theme, Components } from '@mui/material/styles';
import { inputBaseClasses } from '@mui/material';

const MuiTextField: Components<Theme>['MuiTextField'] = {
  defaultProps: {
    variant: 'outlined',
  },
};

const MuiFormLabel: Components<Theme>['MuiFormLabel'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      marginBottom: `${theme.spacing(1)} !important`,
      transform: 'none !important',
      ...theme.typography['caption-semi-bold'],
    }),
  },
};

const MuiInputBase: Components<Theme>['MuiInputBase'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      marginTop: `0 !important`,
      borderRadius: `${theme.spacing(1.5)} !important`,
      backgroundColor: theme.vars.palette.dark[2],

      [`&.${inputBaseClasses.focused}`]: {
        backgroundColor: theme.vars.palette.dark[1],
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: `${theme.palette.blue.dark} !important`,
        },
      },
    }),
    input: ({ theme }) => ({
      color: theme.vars.palette.common.white,
      padding: `${theme.spacing(2.25)} !important`,
      '&::placeholder': {
        opacity: 1,
        color: theme.vars.palette.grey.dark,
      },
    }),
    inputSizeSmall: ({ theme }) => ({
      padding: `${theme.spacing(1.25)} !important`,
    }),
  },
};

const MuiOutlinedInput: Components<Theme>['MuiOutlinedInput'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.vars.palette.dark[1],
      },
    }),
    notchedOutline: ({ theme }) => ({
      borderWidth: '2px',
      borderColor: theme.palette.dark[3],
    }),
  },
};

const MuiFormHelperText: Components<Theme>['MuiFormHelperText'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography['caption-medium'],
      color: theme.palette.grey.light,
      marginTop: theme.spacing(1),
      marginLeft: 0,
    }),
  },
};

export const textField = {
  MuiTextField,
  MuiFormLabel,
  MuiInputBase,
  MuiOutlinedInput,
  MuiFormHelperText,
};
