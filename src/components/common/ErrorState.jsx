import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AlertCircle } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';
import { AppButton } from './AppButton';
import { spacing } from '../../constants/spacing';

/**
 * Reusable Error State Component
 */
export const ErrorState = ({
  icon,
  title = 'Something Went Wrong',
  message = 'An unexpected error occurred. Please try again.',
  retryTitle = 'Try Again',
  onRetry,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: theme.errorLight },
        ]}
      >
        {icon || <AlertCircle size={40} color={theme.error} />}
      </View>

      <AppText variant="h2" align="center" style={styles.title}>
        {title}
      </AppText>

      {message ? (
        <AppText
          variant="body"
          color="secondary"
          align="center"
          style={styles.message}
        >
          {message}
        </AppText>
      ) : null}

      {onRetry ? (
        <AppButton
          title={retryTitle}
          onPress={onRetry}
          variant="primary"
          size="md"
          style={styles.button}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xxxl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.sm,
  },
  message: {
    marginBottom: spacing.xl,
    maxWidth: 300,
  },
  button: {
    minWidth: 160,
  },
});

export default ErrorState;
