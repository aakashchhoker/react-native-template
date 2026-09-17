import { create } from 'zustand';
import { storageService } from '../services/storageService';
import { STORAGE_KEYS } from '../constants/constants';
import { useThemeStore } from './themeStore';

export const useAppStore = create(set => ({
  isInitialized: false,
  hasCompletedOnboarding: false,

  /**
   * Initializes application state and checks persistent storage.
   */
  initializeApp: async () => {
    try {
      // Parallelize critical startup storage reads
      const [onboardingStatus] = await Promise.all([
        storageService.getItem(STORAGE_KEYS.HAS_COMPLETED_ONBOARDING, false),
        useThemeStore.getState().initializeTheme(),
      ]);

      set({
        hasCompletedOnboarding: Boolean(onboardingStatus),
        isInitialized: true,
      });
    } catch (error) {
      console.warn('[AppStore] Initialization error:', error);
      set({
        hasCompletedOnboarding: false,
        isInitialized: true,
      });
    }
  },

  /**
   * Marks onboarding as completed and persists to storage.
   */
  completeOnboarding: async () => {
    set({ hasCompletedOnboarding: true });
    await storageService.setItem(STORAGE_KEYS.HAS_COMPLETED_ONBOARDING, true);
  },

  /**
   * Resets onboarding state (useful for developer testing and app reset).
   */
  resetOnboarding: async () => {
    set({ hasCompletedOnboarding: false });
    await storageService.setItem(STORAGE_KEYS.HAS_COMPLETED_ONBOARDING, false);
  },
}));
