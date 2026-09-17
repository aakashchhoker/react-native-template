import { StyleSheet } from 'react-native';
import { spacing } from '../../constants/spacing';

export const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      paddingBottom: spacing.xxxl,
    },
    section: {
      marginBottom: spacing.xl,
    },
    sectionHeader: {
      marginBottom: spacing.sm,
      marginLeft: spacing.xs,
    },
    themeSelector: {
      flexDirection: 'row',
      borderRadius: 12,
      padding: spacing.xs,
      backgroundColor: theme.surfaceSecondary,
      marginBottom: spacing.xs,
    },
    themeOption: {
      flex: 1,
      paddingVertical: spacing.sm,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
    },
    themeOptionActive: {
      backgroundColor: theme.surface,
    },
    themeOptionText: {
      color: theme.textSecondary,
    },
    themeOptionTextActive: {
      color: theme.text,
      fontWeight: '600',
    },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spacing.md,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.border,
    },
    settingRowLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconWrap: {
      width: 36,
      height: 36,
      borderRadius: 8,
      backgroundColor: theme.surfaceSecondary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.md,
    },
    themeDescription: {
      marginBottom: spacing.md,
    },
    themeOptionLabel: {
      marginTop: spacing.xs,
    },
    settingRowLast: {
      borderBottomWidth: 0,
    },
    resetButton: {
      marginTop: spacing.md,
    },
  });
