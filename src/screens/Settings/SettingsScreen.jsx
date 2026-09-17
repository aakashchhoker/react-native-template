import React from 'react';
import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Sun, Moon, Smartphone, RotateCcw, LogOut } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import { AppHeader } from '../../components/common/AppHeader';
import { AppText } from '../../components/common/AppText';
import { AppCard } from '../../components/common/AppCard';
import { AppButton } from '../../components/common/AppButton';
import { THEME_MODES } from '../../constants/constants';
import { appConfig } from '../../config/appConfig';
import { createStyles } from './styles';

export const SettingsScreen = () => {
  const navigation = useNavigation();
  const { theme, themeMode, setThemeMode } = useTheme();
  const styles = createStyles(theme);
  const resetOnboarding = useAppStore(state => state.resetOnboarding);
  const logout = useAuthStore(state => state.logout);
  const user = useAuthStore(state => state.user);

  const themeOptions = [
    {
      mode: THEME_MODES.SYSTEM,
      label: 'System',
      icon: <Smartphone size={18} color={themeMode === THEME_MODES.SYSTEM ? theme.primary : theme.textMuted} />,
    },
    {
      mode: THEME_MODES.LIGHT,
      label: 'Light',
      icon: <Sun size={18} color={themeMode === THEME_MODES.LIGHT ? theme.primary : theme.textMuted} />,
    },
    {
      mode: THEME_MODES.DARK,
      label: 'Dark',
      icon: <Moon size={18} color={themeMode === THEME_MODES.DARK ? theme.primary : theme.textMuted} />,
    },
  ];

  const handleResetOnboarding = () => {
    Alert.alert(
      'Reset Onboarding',
      'This will reset onboarding and sign you out so you can test the full first-launch flow again.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetOnboarding();
          },
        },
      ],
    );
  };

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => logout(),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="Settings"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Theme Settings Section */}
        <View style={styles.section}>
          <AppText variant="label" color="secondary" style={styles.sectionHeader}>
            APPEARANCE
          </AppText>

          <AppCard variant="surface">
            <AppText variant="bodySmall" color="secondary" style={styles.themeDescription}>
              Choose your preferred interface theme or match device system settings.
            </AppText>

            <View style={styles.themeSelector}>
              {themeOptions.map(option => {
                const isActive = themeMode === option.mode;
                return (
                  <TouchableOpacity
                    key={option.mode}
                    activeOpacity={0.7}
                    onPress={() => setThemeMode(option.mode)}
                    style={[
                      styles.themeOption,
                      isActive && styles.themeOptionActive,
                    ]}
                  >
                    {option.icon}
                    <AppText
                      variant="bodySmall"
                      style={[
                        styles.themeOptionText,
                        isActive && styles.themeOptionTextActive,
                        styles.themeOptionLabel,
                      ]}
                    >
                      {option.label}
                    </AppText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </AppCard>
        </View>

        <View style={styles.section}>
          <AppText variant="label" color="secondary" style={styles.sectionHeader}>
            ACCOUNT
          </AppText>

          <AppCard variant="surface">
            <View style={styles.settingRow}>
              <AppText variant="bodyMedium">Signed in as</AppText>
              <AppText variant="bodyMedium" color="secondary">
                {user?.email || '—'}
              </AppText>
            </View>
            <AppButton
              title="Sign Out"
              variant="outline"
              size="sm"
              leftIcon={<LogOut size={16} color={theme.primary} />}
              onPress={handleLogout}
              style={styles.resetButton}
            />
          </AppCard>
        </View>

        {__DEV__ ? (
          <View style={styles.section}>
            <AppText variant="label" color="secondary" style={styles.sectionHeader}>
              DEVELOPER TOOLS
            </AppText>

            <AppCard variant="surface">
              <View style={styles.settingRow}>
                <View style={styles.settingRowLeft}>
                  <View style={styles.iconWrap}>
                    <RotateCcw size={20} color={theme.warning} />
                  </View>
                  <View>
                    <AppText variant="label">Reset Onboarding</AppText>
                    <AppText variant="bodySmall" color="secondary">
                      Clears onboarding + auth for full flow testing
                    </AppText>
                  </View>
                </View>
              </View>

              <AppButton
                title="Reset & Launch Onboarding"
                variant="outline"
                size="sm"
                onPress={handleResetOnboarding}
                style={styles.resetButton}
              />
            </AppCard>
          </View>
        ) : null}

        <View style={styles.section}>
          <AppText variant="label" color="secondary" style={styles.sectionHeader}>
            APP INFORMATION
          </AppText>

          <AppCard variant="surface">
            <View style={styles.settingRow}>
              <AppText variant="bodyMedium">App Name</AppText>
              <AppText variant="bodyMedium" color="secondary">
                {appConfig.appName}
              </AppText>
            </View>
            <View style={styles.settingRow}>
              <AppText variant="bodyMedium">Version</AppText>
              <AppText variant="bodyMedium" color="secondary">
                {appConfig.version} ({appConfig.buildNumber})
              </AppText>
            </View>
            <View style={[styles.settingRow, styles.settingRowLast]}>
              <AppText variant="bodyMedium">Website</AppText>
              <AppText variant="bodyMedium" color="primary">
                {appConfig.websiteUrl}
              </AppText>
            </View>
          </AppCard>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
