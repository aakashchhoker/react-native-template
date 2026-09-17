import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  Settings,
  Shield,
  HelpCircle,
  ChevronRight,
} from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from '../../components/common/AppText';
import { AppCard } from '../../components/common/AppCard';
import { mockUserProfile } from '../../data/mockData';
import { ROUTES } from '../../constants/constants';
import { createStyles } from './styles';

export const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const menuItems = [
    {
      id: 'settings',
      title: 'App Settings',
      icon: <Settings size={20} color={theme.text} />,
      onPress: () => navigation.navigate(ROUTES.SETTINGS),
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: <Shield size={20} color={theme.text} />,
      onPress: () => {},
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: <HelpCircle size={20} color={theme.text} />,
      onPress: () => {},
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <AppText variant="h1">Profile</AppText>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <AppCard style={styles.profileCard} variant="surface">
          <View style={styles.avatar}>
            <AppText style={styles.avatarText}>AM</AppText>
          </View>
          <AppText variant="h2" style={styles.name}>
            {mockUserProfile.name}
          </AppText>
          <AppText variant="bodySmall" color="secondary">
            {mockUserProfile.role} • {mockUserProfile.email}
          </AppText>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <AppText variant="h2">{mockUserProfile.stats.projects}</AppText>
              <AppText variant="caption" color="muted">
                Projects
              </AppText>
            </View>
            <View style={styles.statItem}>
              <AppText variant="h2">{mockUserProfile.stats.components}</AppText>
              <AppText variant="caption" color="muted">
                Components
              </AppText>
            </View>
            <View style={styles.statItem}>
              <AppText variant="h2">{mockUserProfile.stats.favorites}</AppText>
              <AppText variant="caption" color="muted">
                Favorites
              </AppText>
            </View>
          </View>
        </AppCard>

        {/* Menu Items */}
        <AppCard variant="surface" style={styles.menuSection}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              onPress={item.onPress}
              style={styles.menuItem}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIcon}>{item.icon}</View>
                <AppText variant="bodyMedium">{item.title}</AppText>
              </View>
              <ChevronRight size={18} color={theme.textMuted} />
            </TouchableOpacity>
          ))}
        </AppCard>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
