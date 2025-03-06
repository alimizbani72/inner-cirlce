import type { Theme, Components } from '@mui/material/styles';
import { checkboxClasses } from '@mui/material/Checkbox';

// ----------------------------------------------------------------------

const MuiCheckbox: Components<Theme>['MuiCheckbox'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: {
    size: 'small',
  },

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(1),

      [`&:not(&.${checkboxClasses.checked})`]: {
        'svg rect': { fill: '#191B26', stroke: '#333648' },
      },
      [`&.Mui-checked`]: {
        'svg path': { fill: theme.palette.pink.light, stroke: theme.palette.pink.light },
      },
      [`&.${checkboxClasses.disabled}`]: { color: theme.palette.action.disabled },
      variants: [
        {
          props: {
            color: 'default',
          },
          style: {
            [`&.${checkboxClasses.checked}`]: { color: theme.palette.text.primary },
          },
        },
      ],
    }),
  },
};

// ----------------------------------------------------------------------

export const checkbox = { MuiCheckbox };
