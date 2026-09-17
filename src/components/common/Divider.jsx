import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { spacing } from '../../constants/spacing';

/**
 * Reusable Divider Component
 */
export const Divider = ({
  orientation = 'horizontal',
  spacing: gutter = spacing.md,
  color,
  thickness = StyleSheet.hairlineWidth,
  style,
}) => {
  const { theme } = useTheme();

  const dividerColor = color || theme.divider;

  if (orientation === 'vertical') {
    return (
      <View
        style={[
          styles.vertical,
          {
            width: thickness,
            backgroundColor: dividerColor,
            marginHorizontal: gutter,
          },
          style,
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.horizontal,
        {
          height: thickness,
          backgroundColor: dividerColor,
          marginVertical: gutter,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  horizontal: {
    width: '100%',
  },
  vertical: {
    height: '100%',
  },
});

export default Divider;
