/**
 * __tests__/theme.test.js
 * Unit tests for theme resolution
 */
import { getActiveTheme, themes } from '../src/theme/theme';
import { lightTheme } from '../src/theme/lightTheme';
import { darkTheme } from '../src/theme/darkTheme';
import { THEME_MODES } from '../src/constants/constants';

describe('getActiveTheme()', () => {
  it('returns light theme when mode is light', () => {
    expect(getActiveTheme(THEME_MODES.LIGHT, 'dark')).toBe(lightTheme);
  });

  it('returns dark theme when mode is dark', () => {
    expect(getActiveTheme(THEME_MODES.DARK, 'light')).toBe(darkTheme);
  });

  it('follows system scheme when mode is system (dark)', () => {
    expect(getActiveTheme(THEME_MODES.SYSTEM, 'dark')).toBe(darkTheme);
  });

  it('follows system scheme when mode is system (light)', () => {
    expect(getActiveTheme(THEME_MODES.SYSTEM, 'light')).toBe(lightTheme);
  });

  it('defaults to light theme when system scheme is null', () => {
    expect(getActiveTheme(THEME_MODES.SYSTEM, null)).toBe(lightTheme);
  });

  it('falls back to light theme for unknown modes', () => {
    expect(getActiveTheme('unknown', 'dark')).toBe(lightTheme);
  });
});

describe('themes map', () => {
  it('exposes light and dark themes', () => {
    expect(themes[THEME_MODES.LIGHT]).toBe(lightTheme);
    expect(themes[THEME_MODES.DARK]).toBe(darkTheme);
  });

  it('light and dark themes have expected shape', () => {
    expect(lightTheme.isDark).toBe(false);
    expect(darkTheme.isDark).toBe(true);
    expect(lightTheme).toHaveProperty('primary');
    expect(lightTheme).toHaveProperty('background');
    expect(lightTheme).toHaveProperty('text');
    expect(darkTheme).toHaveProperty('primary');
    expect(darkTheme).toHaveProperty('background');
    expect(darkTheme).toHaveProperty('text');
  });
});
