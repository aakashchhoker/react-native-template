import React from 'react';
import { View, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  Settings,
  Globe,
  MessageSquare,
  Info,
} from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from '../../components/common/AppText';
import { AppCard } from '../../components/common/AppCard';
import { appConfig } from '../../config/appConfig';
import { ROUTES } from '../../constants/constants';
import { createStyles } from './styles';

const openUrl = async url => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Unable to open', url);
    }
  } catch {
    Alert.alert('Unable to open', url);
  }
};

export const MoreScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const shortcuts = [
    {
      id: 'settings',
      title: 'Settings',
      subtitle: 'Theme & preferences',
      icon: <Settings size={24} color={theme.primary} />,
      bg: theme.primaryLight,
      onPress: () => navigation.navigate(ROUTES.SETTINGS),
    },
    {
      id: 'website',
      title: 'Website',
      subtitle: 'Visit our site',
      icon: <Globe size={24} color={theme.success} />,
      bg: theme.successLight,
      onPress: () => openUrl(appConfig.websiteUrl),
    },
    {
      id: 'feedback',
      title: 'Feedback',
      subtitle: 'Report an issue',
      icon: <MessageSquare size={24} color={theme.warning} />,
      bg: theme.warningLight,
      onPress: () =>
        openUrl(
          `mailto:${appConfig.supportEmail}?subject=${encodeURIComponent(
            `${appConfig.appName} Feedback`,
          )}`,
        ),
    },
    {
      id: 'about',
      title: 'About',
      subtitle: `v${appConfig.version}`,
      icon: <Info size={24} color={theme.textSecondary} />,
      bg: theme.surfaceSecondary,
      onPress: () =>
        Alert.alert(
          appConfig.appName,
          `${appConfig.appTagline}\n\nVersion ${appConfig.version} (${appConfig.buildNumber})\n${appConfig.packageId}`,
        ),
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <AppText variant="h1">More</AppText>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.grid}>
          {shortcuts.map(item => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={item.onPress}
              style={[
                styles.gridItem,
                { backgroundColor: theme.surfaceCard, borderColor: theme.border },
              ]}
            >
              <View style={[styles.gridIcon, { backgroundColor: item.bg }]}>
                {item.icon}
              </View>
              <AppText variant="label" style={styles.gridTitle}>
                {item.title}
              </AppText>
              <AppText variant="caption" color="secondary" align="center">
                {item.subtitle}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        <AppCard variant="surface" style={styles.infoCard}>
          <AppText variant="h3" style={styles.cardTitle}>
            App Details
          </AppText>
          <View style={styles.infoRow}>
            <AppText variant="bodySmall" color="secondary">
              Application Name
            </AppText>
            <AppText variant="bodySmall" style={styles.boldText}>
              {appConfig.appName}
            </AppText>
          </View>
          <View style={styles.infoRow}>
            <AppText variant="bodySmall" color="secondary">
              Version
            </AppText>
            <AppText variant="bodySmall" style={styles.boldText}>
              {appConfig.version} ({appConfig.buildNumber})
            </AppText>
          </View>
          <View style={[styles.infoRow, styles.infoRowLast]}>
            <AppText variant="bodySmall" color="secondary">
              Package ID
            </AppText>
            <AppText variant="bodySmall" style={styles.boldText}>
              {appConfig.packageId}
            </AppText>
          </View>
        </AppCard>
      </ScrollView>
    </View>
  );
};

export default MoreScreen;
