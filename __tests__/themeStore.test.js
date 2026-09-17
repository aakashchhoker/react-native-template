/**
 * __tests__/themeStore.test.js
 * Unit tests for Zustand theme store
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeStore } from '../src/store/themeStore';
import { STORAGE_KEYS, THEME_MODES } from '../src/constants/constants';

beforeEach(async () => {
  await AsyncStorage.clear();
  useThemeStore.setState({
    themeMode: THEME_MODES.SYSTEM,
    isThemeLoaded: false,
  });
});

describe('useThemeStore', () => {
  it('defaults to system theme and unloaded', () => {
    const state = useThemeStore.getState();
    expect(state.themeMode).toBe(THEME_MODES.SYSTEM);
    expect(state.isThemeLoaded).toBe(false);
  });

  it('initializeTheme loads default system when nothing saved', async () => {
    await useThemeStore.getState().initializeTheme();
    expect(useThemeStore.getState().themeMode).toBe(THEME_MODES.SYSTEM);
    expect(useThemeStore.getState().isThemeLoaded).toBe(true);
  });

  it('initializeTheme restores saved dark mode', async () => {
    await AsyncStorage.setItem(
      STORAGE_KEYS.THEME_MODE,
      JSON.stringify(THEME_MODES.DARK),
    );
    await useThemeStore.getState().initializeTheme();
    expect(useThemeStore.getState().themeMode).toBe(THEME_MODES.DARK);
    expect(useThemeStore.getState().isThemeLoaded).toBe(true);
  });

  it('setThemeMode updates state and persists', async () => {
    await useThemeStore.getState().setThemeMode(THEME_MODES.LIGHT);
    expect(useThemeStore.getState().themeMode).toBe(THEME_MODES.LIGHT);

    const stored = await AsyncStorage.getItem(STORAGE_KEYS.THEME_MODE);
    expect(JSON.parse(stored)).toBe(THEME_MODES.LIGHT);
  });
});
