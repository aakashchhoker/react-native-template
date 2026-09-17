import { colors } from '../constants/colors';

export const lightTheme = {
  isDark: false,
  statusBar: 'dark-content',

  // Core Theme Colors
  background: colors.background,
  surface: colors.surface,
  surfaceSecondary: '#F1F5F9',
  surfaceCard: '#FFFFFF',

  primary: colors.primary,
  primaryDark: colors.primaryDark,
  primaryLight: colors.primaryLight,

  text: colors.text,
  textSecondary: colors.textSecondary,
  textMuted: colors.textMuted,
  textInverse: colors.white,

  border: colors.border,
  borderLight: '#F3F4F6',
  divider: '#E2E8F0',

  success: colors.success,
  successLight: '#DCFCE7',
  warning: colors.warning,
  warningLight: '#FEF3C7',
  error: colors.error,
  errorLight: '#FEE2E2',

  // Shadows
  cardShadow: 'rgba(0, 0, 0, 0.05)',
  modalOverlay: 'rgba(0, 0, 0, 0.4)',
};
