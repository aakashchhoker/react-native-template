/**
 * __tests__/constants.test.js
 * Sanity checks for shared constants / config used across the template
 */
import { STORAGE_KEYS, THEME_MODES, ROUTES } from '../src/constants/constants';
import { appConfig } from '../src/config/appConfig';
import { colors } from '../src/constants/colors';
import { spacing } from '../src/constants/spacing';

describe('STORAGE_KEYS', () => {
  it('defines required persistence keys', () => {
    expect(STORAGE_KEYS.THEME_MODE).toBeTruthy();
    expect(STORAGE_KEYS.HAS_COMPLETED_ONBOARDING).toBeTruthy();
    expect(STORAGE_KEYS.AUTH_USER).toBeTruthy();
    expect(STORAGE_KEYS.AUTH_CREDENTIALS).toBeTruthy();
  });
});

describe('THEME_MODES', () => {
  it('includes system, light, and dark', () => {
    expect(THEME_MODES).toEqual({
      SYSTEM: 'system',
      LIGHT: 'light',
      DARK: 'dark',
    });
  });
});

describe('ROUTES', () => {
  it('includes splash, onboarding, and main tab routes', () => {
    expect(ROUTES.SPLASH).toBe('Splash');
    expect(ROUTES.ONBOARDING).toBe('Onboarding');
    expect(ROUTES.LOGIN).toBe('Login');
    expect(ROUTES.SIGNUP).toBe('Signup');
    expect(ROUTES.HOME).toBe('Home');
    expect(ROUTES.SETTINGS).toBe('Settings');
  });
});

describe('appConfig', () => {
  it('has rebrand-friendly metadata fields', () => {
    expect(appConfig.appName).toBeTruthy();
    expect(appConfig.version).toBeTruthy();
    expect(appConfig.packageId).toMatch(/^com\./);
    expect(appConfig.features).toEqual(
      expect.objectContaining({
        enableSearch: expect.any(Boolean),
        enableNotifications: expect.any(Boolean),
      }),
    );
  });
});

describe('design tokens', () => {
  it('exposes primary color, dark palette, and spacing scale', () => {
    expect(colors.primary).toMatch(/^#/);
    expect(colors.dark.background).toMatch(/^#/);
    expect(spacing.md).toBeGreaterThan(0);
  });
});
