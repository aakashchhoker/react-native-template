import { StyleSheet } from 'react-native';
import { spacing } from '../../constants/spacing';
import { componentStyles } from '../../styles/componentStyles';

export const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.xl,
    },
    content: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoContainer: {
      width: 96,
      height: 96,
      borderRadius: 28,
      backgroundColor: theme.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.lg,
      ...componentStyles.shadowLg,
    },
    appName: {
      color: theme.text,
      marginBottom: spacing.xs,
    },
    tagline: {
      color: theme.textSecondary,
      marginBottom: spacing.xxxl,
    },
    loaderContainer: {
      position: 'absolute',
      bottom: 60,
      alignItems: 'center',
    },
  });
