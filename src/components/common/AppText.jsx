import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { typography } from '../../constants/typography';

/**
 * Reusable Typography Text Component
 */
export const AppText = ({
  children,
  variant = 'body',
  color,
  align,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  // Resolve color
  const resolveColor = () => {
    switch (color) {
      case 'primary':
        return theme.primary;
      case 'secondary':
        return theme.textSecondary;
      case 'muted':
        return theme.textMuted;
      case 'inverse':
        return theme.textInverse;
      case 'error':
        return theme.error;
      case 'success':
        return theme.success;
      case 'warning':
        return theme.warning;
      default:
        return color || theme.text;
    }
  };

  const dynamicStyles = {
    color: resolveColor(),
    ...(align && { textAlign: align }),
  };

  return (
    <Text
      style={[
        styles.base,
        typography[variant] || typography.body,
        dynamicStyles,
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});

export default AppText;
