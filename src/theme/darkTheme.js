import { colors } from '../constants/colors';

const d = colors.dark;

export const darkTheme = {
  isDark: true,
  statusBar: 'light-content',

  background: d.background,
  surface: d.surface,
  surfaceSecondary: d.surfaceSecondary,
  surfaceCard: d.surface,

  primary: d.primary,
  primaryDark: d.primaryDark,
  primaryLight: d.primaryLight,

  text: d.text,
  textSecondary: d.textSecondary,
  textMuted: d.textMuted,
  textInverse: d.background,

  border: d.border,
  borderLight: d.surface,
  divider: d.border,

  success: d.success,
  successLight: d.successLight,
  warning: d.warning,
  warningLight: d.warningLight,
  error: d.error,
  errorLight: d.errorLight,

  cardShadow: 'rgba(0, 0, 0, 0.4)',
  modalOverlay: 'rgba(0, 0, 0, 0.7)',
};
