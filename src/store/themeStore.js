import { create } from 'zustand';
import { storageService } from '../services/storageService';
import { STORAGE_KEYS, THEME_MODES } from '../constants/constants';

export const useThemeStore = create(set => ({
  themeMode: THEME_MODES.SYSTEM,
  isThemeLoaded: false,

  /**
   * Initializes theme setting from storage.
   */
  initializeTheme: async () => {
    try {
      const savedMode = await storageService.getItem(
        STORAGE_KEYS.THEME_MODE,
        THEME_MODES.SYSTEM,
      );
      set({ themeMode: savedMode, isThemeLoaded: true });
    } catch {
      set({ themeMode: THEME_MODES.SYSTEM, isThemeLoaded: true });
    }
  },

  /**
   * Updates theme mode and persists to storage.
   * @param {'system' | 'light' | 'dark'} mode
   */
  setThemeMode: async mode => {
    set({ themeMode: mode });
    await storageService.setItem(STORAGE_KEYS.THEME_MODE, mode);
  },
}));
