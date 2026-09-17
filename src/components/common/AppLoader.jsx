import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';
import { spacing } from '../../constants/spacing';

/**
 * Reusable Activity Loader Component
 */
export const AppLoader = ({
  message,
  size = 'large',
  color,
  overlay = false,
  style,
}) => {
  const { theme } = useTheme();

  const loaderContent = (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color || theme.primary} />
      {message ? (
        <AppText
          variant="bodyMedium"
          color="secondary"
          style={styles.message}
        >
          {message}
        </AppText>
      ) : null}
    </View>
  );

  if (overlay) {
    return (
      <View
        style={[
          styles.overlay,
          { backgroundColor: theme.modalOverlay },
        ]}
      >
        <View
          style={[
            styles.modalCard,
            { backgroundColor: theme.surfaceCard },
          ]}
        >
          {loaderContent}
        </View>
      </View>
    );
  }

  return loaderContent;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  modalCard: {
    padding: spacing.xl,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 160,
  },
  message: {
    marginTop: spacing.md,
    textAlign: 'center',
  },
});

export default AppLoader;
