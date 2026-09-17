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
import { Mail, Lock, Eye, EyeOff, User, Sparkles } from 'lucide-react-native';
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

export const SignupScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createAuthStyles(theme);
  const signup = useAuthStore(state => state.signup);
  const isAuthLoading = useAuthStore(state => state.isAuthLoading);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');

  const validate = () => {
    const next = {};
    if (!name.trim() || name.trim().length < 2) {
      next.name = 'Enter your full name';
    }
    if (!isValidEmail(email)) {
      next.email = 'Enter a valid email address';
    }
    if (!isValidPassword(password)) {
      next.password = 'Password must be at least 6 characters';
    }
    if (password !== confirmPassword) {
      next.confirmPassword = 'Passwords do not match';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSignup = async () => {
    setFormError('');
    if (!validate()) return;

    try {
      await signup({ name, email, password });
    } catch (error) {
      setFormError(error?.message || 'Unable to create account. Please try again.');
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
            Create account
          </AppText>
          <AppText variant="body" style={styles.subtitle}>
            Join {appConfig.appName} and get started in minutes
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
            label="Full name"
            value={name}
            onChangeText={text => {
              setName(text);
              if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
            }}
            placeholder="Alex Morgan"
            autoCapitalize="words"
            textContentType="name"
            leftIcon={<User size={18} color={theme.textMuted} />}
            error={errors.name}
          />

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
            placeholder="At least 6 characters"
            secureTextEntry={!showPassword}
            textContentType="newPassword"
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

          <AppInput
            label="Confirm password"
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
              if (errors.confirmPassword) {
                setErrors(prev => ({ ...prev, confirmPassword: undefined }));
              }
            }}
            placeholder="Re-enter your password"
            secureTextEntry={!showPassword}
            textContentType="newPassword"
            leftIcon={<Lock size={18} color={theme.textMuted} />}
            error={errors.confirmPassword}
          />

          <AppButton
            title="Create Account"
            variant="primary"
            size="lg"
            loading={isAuthLoading}
            onPress={handleSignup}
            style={styles.submitButton}
          />
        </View>

        <View style={styles.footer}>
          <AppText variant="bodySmall" color="secondary">
            Already have an account?
          </AppText>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.LOGIN)}
            style={styles.footerLink}
          >
            <AppText variant="bodySmall" color="primary">
              Sign In
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
