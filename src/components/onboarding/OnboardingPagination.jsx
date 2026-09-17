import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { spacing } from '../../constants/spacing';

/**
 * Pagination Dots Indicator for Onboarding Carousel
 */
export const OnboardingPagination = ({
  total = 3,
  currentIndex = 0,
  onDotPress,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === currentIndex;
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => onDotPress && onDotPress(index)}
            disabled={!onDotPress}
            style={[
              styles.dot,
              isActive ? styles.dotActive : styles.dotInactive,
              {
                backgroundColor: isActive ? theme.primary : theme.border,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: spacing.xs,
  },
  dotActive: {
    width: 24,
  },
  dotInactive: {
    width: 8,
  },
});

export default OnboardingPagination;
