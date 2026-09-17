import { create } from 'zustand';
import { storageService } from '../services/storageService';
import { STORAGE_KEYS } from '../constants/constants';

const mockDelay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Local auth store for the template.
 * Swap login/signup bodies with your real API later — UI & flow stay the same.
 */
export const useAuthStore = create(set => ({
  isAuthenticated: false,
  user: null,
  isAuthLoading: false,

  initializeAuth: async () => {
    try {
      const user = await storageService.getItem(STORAGE_KEYS.AUTH_USER, null);
      if (user?.email) {
        set({ isAuthenticated: true, user });
      } else {
        set({ isAuthenticated: false, user: null });
      }
    } catch (error) {
      console.warn('[AuthStore] initializeAuth error:', error);
      set({ isAuthenticated: false, user: null });
    }
  },

  login: async ({ email, password }) => {
    set({ isAuthLoading: true });
    try {
      await mockDelay();

      const credentials = await storageService.getItem(
        STORAGE_KEYS.AUTH_CREDENTIALS,
        null,
      );

      if (credentials) {
        if (
          credentials.email?.toLowerCase() !== email.trim().toLowerCase() ||
          credentials.password !== password
        ) {
          throw new Error('Invalid email or password.');
        }
      }

      const existingUser = await storageService.getItem(
        STORAGE_KEYS.AUTH_USER,
        null,
      );

      const user = {
        id: existingUser?.id || `user_${Date.now()}`,
        name: existingUser?.name || email.split('@')[0],
        email: email.trim().toLowerCase(),
      };

      await storageService.setItem(STORAGE_KEYS.AUTH_USER, user);
      if (!credentials) {
        await storageService.setItem(STORAGE_KEYS.AUTH_CREDENTIALS, {
          email: user.email,
          password,
        });
      }

      set({ isAuthenticated: true, user, isAuthLoading: false });
      return { success: true, user };
    } catch (error) {
      set({ isAuthLoading: false });
      throw error;
    }
  },

  signup: async ({ name, email, password }) => {
    set({ isAuthLoading: true });
    try {
      await mockDelay();

      const user = {
        id: `user_${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
      };

      await storageService.setItem(STORAGE_KEYS.AUTH_CREDENTIALS, {
        email: user.email,
        password,
      });
      await storageService.setItem(STORAGE_KEYS.AUTH_USER, user);

      set({ isAuthenticated: true, user, isAuthLoading: false });
      return { success: true, user };
    } catch (error) {
      set({ isAuthLoading: false });
      throw error;
    }
  },

  logout: async () => {
    await storageService.removeItem(STORAGE_KEYS.AUTH_USER);
    set({ isAuthenticated: false, user: null });
  },

  /**
   * Full auth wipe — used by developer reset tools.
   */
  clearAuth: async () => {
    await Promise.all([
      storageService.removeItem(STORAGE_KEYS.AUTH_USER),
      storageService.removeItem(STORAGE_KEYS.AUTH_CREDENTIALS),
    ]);
    set({ isAuthenticated: false, user: null });
  },
}));
