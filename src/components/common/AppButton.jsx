import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';
import { spacing } from '../../constants/spacing';
import { componentStyles } from '../../styles/componentStyles';

/**
 * Reusable Button Component
 */
export const AppButton = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  textStyle,
  ...props
}) => {
  const { theme } = useTheme();

  const isDisabled = disabled || loading;

  const getContainerStyles = () => {
    const sizeStyle =
      size === 'sm'
        ? componentStyles.buttonSm
        : size === 'lg'
        ? componentStyles.buttonLg
        : componentStyles.buttonMd;

    let variantBg = theme.primary;
    let variantBorder = 'transparent';

    if (variant === 'secondary') {
      variantBg = theme.isDark ? theme.border : theme.surfaceSecondary;
    } else if (variant === 'outline') {
      variantBg = 'transparent';
      variantBorder = theme.primary;
    } else if (variant === 'ghost') {
      variantBg = 'transparent';
    }

    return [
      styles.base,
      sizeStyle,
      {
        backgroundColor: variantBg,
        borderColor: variantBorder,
        borderWidth: variant === 'outline' ? 1.5 : 0,
      },
      fullWidth && styles.fullWidth,
      isDisabled && styles.disabled,
      style,
    ];
  };

  const getTextColor = () => {
    if (isDisabled) return theme.textMuted;
    if (variant === 'primary') return theme.textInverse;
    if (variant === 'outline' || variant === 'ghost') return theme.primary;
    return theme.text;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      disabled={isDisabled}
      style={getContainerStyles()}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? theme.textInverse : theme.primary}
        />
      ) : (
        <View style={styles.contentRow}>
          {leftIcon ? <View style={styles.iconLeft}>{leftIcon}</View> : null}
          <AppText
            variant={size === 'sm' ? 'bodyMedium' : 'button'}
            style={[{ color: getTextColor() }, textStyle]}
          >
            {title}
          </AppText>
          {rightIcon ? <View style={styles.iconRight}>{rightIcon}</View> : null}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: spacing.sm,
  },
  iconRight: {
    marginLeft: spacing.sm,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default AppButton;
