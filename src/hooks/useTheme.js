import { useColorScheme } from 'react-native';
import { useMemo } from 'react';
import { useThemeStore } from '../store/themeStore';
import { getActiveTheme } from '../theme/theme';

/**
 * Custom hook providing the active theme tokens and theme control.
 * Reacts automatically to system theme changes and user overrides.
 */
export const useTheme = () => {
  const systemColorScheme = useColorScheme();
  const { themeMode, setThemeMode } = useThemeStore();

  const theme = useMemo(() => {
    return getActiveTheme(themeMode, systemColorScheme);
  }, [themeMode, systemColorScheme]);

  return {
    theme,
    themeMode,
    setThemeMode,
    isDark: theme.isDark,
  };
};

export default useTheme;
