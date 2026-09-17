import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { useAuthStore } from '../../store/authStore';
import { AppText } from '../../components/common/AppText';
import { AppInput } from '../../components/common/AppInput';
import { AppButton } from '../../components/common/AppButton';
import { appConfig } from '../../config/appConfig';
import { ROUTES } from '../../constants/constants';
import { isValidEmail, isValidPassword } from '../../utils/helpers';
import { spacing } from '../../constants/spacing';
import { createAuthStyles } from './styles';

export const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createAuthStyles(theme);
  const login = useAuthStore(state => state.login);
  const isAuthLoading = useAuthStore(state => state.isAuthLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');

  const validate = () => {
    const next = {};
    if (!isValidEmail(email)) {
      next.email = 'Enter a valid email address';
    }
    if (!isValidPassword(password)) {
      next.password = 'Password must be at least 6 characters';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLogin = async () => {
    setFormError('');
    if (!validate()) return;

    try {
      await login({ email, password });
    } catch (error) {
      setFormError(error?.message || 'Unable to sign in. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + spacing.lg,
            paddingBottom: Math.max(insets.bottom, spacing.xl),
          },
        ]}
      >
        <View style={styles.header}>
          <View style={styles.brandMark}>
            <Sparkles size={28} color={theme.primary} />
          </View>
          <AppText variant="h1" style={styles.title}>
            Welcome back
          </AppText>
          <AppText variant="body" style={styles.subtitle}>
            Sign in to continue to {appConfig.appName}
          </AppText>
        </View>

        {formError ? (
          <View style={styles.errorBanner}>
            <AppText variant="bodySmall" color="error">
              {formError}
            </AppText>
          </View>
        ) : null}

        <View style={styles.form}>
          <AppInput
            label="Email"
            value={email}
            onChangeText={text => {
              setEmail(text);
              if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
            }}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
            leftIcon={<Mail size={18} color={theme.textMuted} />}
            error={errors.email}
          />

          <AppInput
            label="Password"
            value={password}
            onChangeText={text => {
              setPassword(text);
              if (errors.password) {
                setErrors(prev => ({ ...prev, password: undefined }));
              }
            }}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            textContentType="password"
            leftIcon={<Lock size={18} color={theme.textMuted} />}
            rightIcon={
              <TouchableOpacity
                onPress={() => setShowPassword(prev => !prev)}
                style={styles.passwordToggle}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                {showPassword ? (
                  <EyeOff size={18} color={theme.textMuted} />
                ) : (
                  <Eye size={18} color={theme.textMuted} />
                )}
              </TouchableOpacity>
            }
            error={errors.password}
          />

          <AppButton
            title="Sign In"
            variant="primary"
            size="lg"
            loading={isAuthLoading}
            onPress={handleLogin}
            style={styles.submitButton}
          />
        </View>

        <View style={styles.footer}>
          <AppText variant="bodySmall" color="secondary">
            Don&apos;t have an account?
          </AppText>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.SIGNUP)}
            style={styles.footerLink}
          >
            <AppText variant="bodySmall" color="primary">
              Sign Up
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
