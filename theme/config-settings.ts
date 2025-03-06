import { primaryFont } from './core';
import type { ThemeColorScheme, ThemeDirection } from './types';

// ----------------------------------------------------------------------

export type SettingsState = {
  fontFamily: string;
  direction: ThemeDirection;
  colorScheme: ThemeColorScheme;
};

export const defaultSettings: SettingsState = {
  colorScheme: 'dark',
  direction: 'ltr',
  fontFamily: primaryFont,
} as const;
