import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Inbox } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';
import { AppButton } from './AppButton';
import { spacing } from '../../constants/spacing';

/**
 * Reusable Empty State Component
 */
export const EmptyState = ({
  icon,
  title = 'No Items Found',
  description = 'There are currently no items to display.',
  actionTitle,
  onAction,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: theme.surfaceSecondary },
        ]}
      >
        {icon || <Inbox size={40} color={theme.textMuted} />}
      </View>

      <AppText variant="h2" align="center" style={styles.title}>
        {title}
      </AppText>

      {description ? (
        <AppText
          variant="body"
          color="secondary"
          align="center"
          style={styles.description}
        >
          {description}
        </AppText>
      ) : null}

      {actionTitle && onAction ? (
        <AppButton
          title={actionTitle}
          onPress={onAction}
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
  description: {
    marginBottom: spacing.xl,
    maxWidth: 280,
  },
  button: {
    minWidth: 160,
  },
});

export default EmptyState;
