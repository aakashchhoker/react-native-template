import { StyleSheet } from 'react-native';
import { spacing } from '../../constants/spacing';
import { dimensions } from '../../constants/dimensions';

export const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      height: 48,
    },
    slideItem: {
      width: dimensions.width,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.xxxl,
    },
    illustrationContainer: {
      width: 160,
      height: 160,
      borderRadius: 80,
      backgroundColor: theme.surfaceSecondary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.xxxl,
    },
    title: {
      color: theme.text,
      marginBottom: spacing.md,
      textAlign: 'center',
    },
    description: {
      color: theme.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
    },
    footer: {
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.md,
    },
    buttonRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: spacing.md,
    },
    nextButton: {
      flex: 1,
      marginLeft: spacing.md,
    },
    skipButton: {
      minWidth: 80,
    },
    getStartedButton: {
      width: '100%',
      marginTop: spacing.md,
    },
  });
