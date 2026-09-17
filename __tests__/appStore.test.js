/**
 * __tests__/appStore.test.js
 * Unit tests for Zustand app store (onboarding + init flow)
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppStore } from '../src/store/appStore';
import { useThemeStore } from '../src/store/themeStore';
import { useAuthStore } from '../src/store/authStore';
import { STORAGE_KEYS } from '../src/constants/constants';

beforeEach(async () => {
  await AsyncStorage.clear();
  useAppStore.setState({
    isInitialized: false,
    hasCompletedOnboarding: false,
  });
  useThemeStore.setState({
    themeMode: 'system',
    isThemeLoaded: false,
  });
  useAuthStore.setState({
    isAuthenticated: false,
    user: null,
    isAuthLoading: false,
  });
});

describe('useAppStore', () => {
  it('starts uninitialized with onboarding incomplete', () => {
    const state = useAppStore.getState();
    expect(state.isInitialized).toBe(false);
    expect(state.hasCompletedOnboarding).toBe(false);
  });

  it('initializeApp marks initialized and reads onboarding=false', async () => {
    await useAppStore.getState().initializeApp();
    const state = useAppStore.getState();
    expect(state.isInitialized).toBe(true);
    expect(state.hasCompletedOnboarding).toBe(false);
    expect(useThemeStore.getState().isThemeLoaded).toBe(true);
  });

  it('initializeApp restores completed onboarding from storage', async () => {
    await AsyncStorage.setItem(
      STORAGE_KEYS.HAS_COMPLETED_ONBOARDING,
      JSON.stringify(true),
    );
    await useAppStore.getState().initializeApp();
    expect(useAppStore.getState().hasCompletedOnboarding).toBe(true);
    expect(useAppStore.getState().isInitialized).toBe(true);
  });

  it('completeOnboarding persists and updates state', async () => {
    await useAppStore.getState().completeOnboarding();
    expect(useAppStore.getState().hasCompletedOnboarding).toBe(true);

    const stored = await AsyncStorage.getItem(
      STORAGE_KEYS.HAS_COMPLETED_ONBOARDING,
    );
    expect(JSON.parse(stored)).toBe(true);
  });

  it('resetOnboarding clears onboarding and auth', async () => {
    await useAppStore.getState().completeOnboarding();
    await useAuthStore.getState().signup({
      name: 'Test User',
      email: 'test@example.com',
      password: 'secret1',
    });
    await useAppStore.getState().resetOnboarding();

    expect(useAppStore.getState().hasCompletedOnboarding).toBe(false);
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().user).toBeNull();
  });
});
