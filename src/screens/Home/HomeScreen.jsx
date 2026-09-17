import React from 'react';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Settings, Sparkles, Activity, CheckCircle, Clock } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from '../../components/common/AppText';
import { AppCard } from '../../components/common/AppCard';
import { AppButton } from '../../components/common/AppButton';
import { AppIconButton } from '../../components/common/AppIconButton';
import { mockStats, mockRecentActivities } from '../../data/mockData';
import { ROUTES } from '../../constants/constants';
import { createStyles } from './styles';

export const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const getActivityIcon = category => {
    switch (category) {
      case 'System':
        return <CheckCircle size={20} color={theme.success} />;
      case 'Design':
        return <Sparkles size={20} color={theme.primary} />;
      case 'Code':
        return <Activity size={20} color={theme.warning} />;
      default:
        return <Clock size={20} color={theme.textMuted} />;
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.greetingContainer}>
          <AppText variant="caption" color="secondary">
            WELCOME BACK
          </AppText>
          <AppText variant="h1">Dashboard</AppText>
        </View>

        <View style={styles.headerActions}>
          <AppIconButton
            icon={<Settings size={22} color={theme.text} />}
            onPress={() => navigation.navigate(ROUTES.SETTINGS)}
            variant="surface"
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Banner Card */}
        <AppCard style={styles.bannerCard} shadow="md">
          <View style={styles.bannerContent}>
            <AppText variant="h2" style={styles.bannerTitle}>
              Starter Template Active
            </AppText>
            <AppText variant="bodySmall" style={styles.bannerSubtitle}>
              Clean architecture ready for multiple Android and iOS apps.
            </AppText>
          </View>
          <AppButton
            title="Explore Settings"
            variant="secondary"
            size="sm"
            onPress={() => navigation.navigate(ROUTES.SETTINGS)}
            style={styles.bannerButton}
            textStyle={{ color: theme.primary }}
          />
        </AppCard>

        {/* Quick Stats Grid */}
        <AppText variant="label" color="secondary" style={styles.sectionTitle}>
          OVERVIEW
        </AppText>
        <View style={styles.statsGrid}>
          {mockStats.map(stat => (
            <AppCard key={stat.id} style={styles.statCard} variant="surface">
              <AppText variant="caption" color="muted" align="center">
                {stat.title}
              </AppText>
              <AppText variant="h2" align="center" style={styles.statValue}>
                {stat.value}
              </AppText>
              <AppText
                variant="caption"
                color={stat.isPositive ? 'success' : 'error'}
              >
                {stat.change}
              </AppText>
            </AppCard>
          ))}
        </View>

        {/* Recent Activities */}
        <AppText variant="label" color="secondary" style={styles.sectionTitle}>
          RECENT ACTIVITY
        </AppText>
        <AppCard variant="surface">
          {mockRecentActivities.map(activity => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                {getActivityIcon(activity.category)}
              </View>

              <View style={styles.activityDetails}>
                <AppText variant="label" numberOfLines={1}>
                  {activity.title}
                </AppText>
                <AppText variant="bodySmall" color="secondary" numberOfLines={1}>
                  {activity.description}
                </AppText>
              </View>

              <View style={styles.activityMeta}>
                <AppText variant="caption" color="muted">
                  {activity.time}
                </AppText>
              </View>
            </View>
          ))}
        </AppCard>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
