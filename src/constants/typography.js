import { Platform } from 'react-native';

/**
 * Centralized Typography System
 * Uses native system fonts without external font dependencies.
 */
const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

export const typography = {
  display: {
    fontFamily,
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  h1: {
    fontFamily,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  h2: {
    fontFamily,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  h3: {
    fontFamily,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  body: {
    fontFamily,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  bodyMedium: {
    fontFamily,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  bodySmall: {
    fontFamily,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  caption: {
    fontFamily,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '400',
  },
  label: {
    fontFamily,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600',
  },
  button: {
    fontFamily,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
};
