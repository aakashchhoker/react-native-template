import { StyleSheet, Platform } from 'react-native';
import { spacing } from '../constants/spacing';

/**
 * Reusable Component Sizing and Surface Styles
 */
export const componentStyles = StyleSheet.create({
  // Border Radius Presets
  radiusSm: {
    borderRadius: 6,
  },
  radiusMd: {
    borderRadius: 10,
  },
  radiusLg: {
    borderRadius: 14,
  },
  radiusXl: {
    borderRadius: 20,
  },
  radiusFull: {
    borderRadius: 9999,
  },

  // Shadows
  shadowSm: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  shadowMd: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  shadowLg: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  // Inputs
  inputBase: {
    height: 48,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    fontSize: 15,
  },

  // Buttons
  buttonSm: {
    height: 36,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
  },
  buttonMd: {
    height: 46,
    paddingHorizontal: spacing.lg,
    borderRadius: 10,
  },
  buttonLg: {
    height: 52,
    paddingHorizontal: spacing.xl,
    borderRadius: 12,
  },
});
