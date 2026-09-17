import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { spacing } from '../../constants/spacing';
import { componentStyles } from '../../styles/componentStyles';

/**
 * Reusable Card Surface Component
 */
export const AppCard = ({
  children,
  onPress,
  variant = 'surface',
  shadow = 'sm',
  padding = spacing.lg,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const getShadowStyle = () => {
    if (theme.isDark || variant === 'flat' || shadow === 'none') return null;
    if (shadow === 'lg') return componentStyles.shadowLg;
    if (shadow === 'md') return componentStyles.shadowMd;
    return componentStyles.shadowSm;
  };

  const getBackgroundColor = () => {
    if (variant === 'flat') return theme.surfaceSecondary;
    return theme.surfaceCard;
  };

  const cardStyle = [
    styles.card,
    componentStyles.radiusLg,
    getShadowStyle(),
    {
      backgroundColor: getBackgroundColor(),
      borderColor: theme.border,
      borderWidth: variant === 'outlined' || theme.isDark ? 1 : 0,
      padding,
    },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={cardStyle}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
});

export default AppCard;
