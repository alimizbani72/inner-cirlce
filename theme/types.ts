import type { Theme as BaseTheme } from '@mui/material/styles/createTheme';
import type { CssVarsTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type Theme = Omit<BaseTheme, 'palette' | 'applyStyles'> & CssVarsTheme;

export type ThemeColorScheme = 'light' | 'dark';

export type ThemeDirection = 'ltr' | 'rtl';
