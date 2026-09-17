import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';
import { AppIconButton } from './AppIconButton';
import { spacing } from '../../constants/spacing';

/**
 * Reusable Safe-Area Top Header Component
 */
export const AppHeader = ({
  title,
  subtitle,
  showBack = false,
  onBackPress,
  rightAction,
  style,
  titleAlign = 'center',
}) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, spacing.md),
          backgroundColor: theme.surface,
          borderBottomColor: theme.border,
        },
        style,
      ]}
    >
      <View style={styles.contentRow}>
        <View style={styles.leftSlot}>
          {showBack ? (
            <AppIconButton
              icon={<ChevronLeft size={24} color={theme.text} />}
              onPress={onBackPress}
              variant="ghost"
              size={36}
            />
          ) : null}
        </View>

        <View
          style={[
            styles.titleContainer,
            titleAlign === 'center' ? styles.titleCenter : styles.titleLeft,
          ]}
        >
          {title ? (
            <AppText
              variant="h3"
              numberOfLines={1}
              style={{ color: theme.text }}
            >
              {title}
            </AppText>
          ) : null}
          {subtitle ? (
            <AppText
              variant="caption"
              color="secondary"
              numberOfLines={1}
            >
              {subtitle}
            </AppText>
          ) : null}
        </View>

        <View style={styles.rightSlot}>{rightAction || null}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  contentRow: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSlot: {
    width: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightSlot: {
    width: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: spacing.xs,
  },
  titleCenter: {
    alignItems: 'center',
  },
  titleLeft: {
    alignItems: 'flex-start',
  },
});

export default AppHeader;
