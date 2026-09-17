import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';
import { THEME_MODES } from '../constants/constants';

export const themes = {
  [THEME_MODES.LIGHT]: lightTheme,
  [THEME_MODES.DARK]: darkTheme,
};

/**
 * Resolves the active theme based on user preference and system color scheme.
 * @param {'system' | 'light' | 'dark'} mode
 * @param {'light' | 'dark' | null} systemColorScheme
 * @returns {typeof lightTheme}
 */
export const getActiveTheme = (mode, systemColorScheme) => {
  if (mode === THEME_MODES.SYSTEM) {
    return systemColorScheme === 'dark' ? darkTheme : lightTheme;
  }
  return themes[mode] || lightTheme;
};
