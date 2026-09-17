import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';
import { spacing } from '../../constants/spacing';
import { componentStyles } from '../../styles/componentStyles';

/**
 * Reusable Controlled TextInput Component
 */
export const AppInput = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  style,
  inputStyle,
  containerStyle,
  onFocus,
  onBlur,
  ...props
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = e => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = e => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const getBorderColor = () => {
    if (error) return theme.error;
    if (isFocused) return theme.primary;
    return theme.border;
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? (
        <AppText variant="label" style={[styles.label, { color: theme.textSecondary }]}>
          {label}
        </AppText>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          componentStyles.inputBase,
          isFocused || error ? styles.borderActive : styles.borderInactive,
          {
            backgroundColor: theme.surface,
            borderColor: getBorderColor(),
          },
          style,
        ]}
      >
        {leftIcon ? <View style={styles.iconContainer}>{leftIcon}</View> : null}

        <TextInput
          style={[
            styles.input,
            {
              color: theme.text,
            },
            inputStyle,
          ]}
          placeholderTextColor={theme.textMuted}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {rightIcon ? <View style={styles.iconContainer}>{rightIcon}</View> : null}
      </View>

      {error ? (
        <AppText variant="caption" color="error" style={styles.feedbackText}>
          {error}
        </AppText>
      ) : helperText ? (
        <AppText variant="caption" color="muted" style={styles.feedbackText}>
          {helperText}
        </AppText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  borderActive: {
    borderWidth: 1.5,
  },
  borderInactive: {
    borderWidth: 1,
  },
  input: {
    flex: 1,
    height: '100%',
    padding: 0,
    fontSize: 15,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing.xs,
  },
  feedbackText: {
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
});

export default AppInput;
