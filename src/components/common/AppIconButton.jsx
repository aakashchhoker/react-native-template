import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { HIT_SLOP } from '../../constants/constants';

/**
 * Reusable Icon Button Component
 */
export const AppIconButton = ({
  icon,
  onPress,
  size = 40,
  variant = 'ghost',
  rounded = true,
  disabled = false,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const getBackgroundColor = () => {
    if (variant === 'surface') return theme.surfaceSecondary;
    if (variant === 'primary') return theme.primary;
    if (variant === 'outline') return 'transparent';
    return 'transparent';
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      hitSlop={HIT_SLOP.sm}
      style={[
        styles.button,
        rounded ? styles.roundedCircle : styles.roundedSquare,
        variant === 'outline' && styles.outlineBorder,
        variant === 'outline' && { borderColor: theme.border },
        disabled && styles.disabledOpacity,
        {
          width: size,
          height: size,
          backgroundColor: getBackgroundColor(),
        },
        style,
      ]}
      {...props}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundedCircle: {
    borderRadius: 9999,
  },
  roundedSquare: {
    borderRadius: 8,
  },
  outlineBorder: {
    borderWidth: 1,
  },
  disabledOpacity: {
    opacity: 0.4,
  },
});

export default AppIconButton;
