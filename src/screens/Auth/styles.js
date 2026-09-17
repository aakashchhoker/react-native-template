import { StyleSheet } from 'react-native';
import { spacing } from '../../constants/spacing';

export const createAuthStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: spacing.xl,
      paddingBottom: spacing.xxl,
    },
    header: {
      marginTop: spacing.xl,
      marginBottom: spacing.xxl,
    },
    brandMark: {
      width: 56,
      height: 56,
      borderRadius: 16,
      backgroundColor: theme.primaryLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.lg,
    },
    title: {
      color: theme.text,
      marginBottom: spacing.sm,
    },
    subtitle: {
      color: theme.textSecondary,
      lineHeight: 22,
    },
    form: {
      marginBottom: spacing.lg,
    },
    passwordToggle: {
      padding: spacing.xs,
    },
    submitButton: {
      marginTop: spacing.sm,
      width: '100%',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: spacing.xl,
      flexWrap: 'wrap',
    },
    footerLink: {
      marginLeft: spacing.xs,
    },
    errorBanner: {
      backgroundColor: theme.errorLight,
      borderRadius: 12,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      marginBottom: spacing.md,
    },
  });
