import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bell, CheckCheck } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from '../../components/common/AppText';
import { AppCard } from '../../components/common/AppCard';
import { AppButton } from '../../components/common/AppButton';
import { EmptyState } from '../../components/common/EmptyState';
import { mockNotifications } from '../../data/mockData';
import { createStyles } from './styles';

export const NotificationsScreen = () => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(item => ({ ...item, read: true })),
    );
  };

  const hasUnread = notifications.some(n => !n.read);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <AppText variant="h1">Notifications</AppText>
        {notifications.length > 0 && hasUnread ? (
          <AppButton
            title="Mark read"
            variant="ghost"
            size="sm"
            onPress={markAllAsRead}
            leftIcon={<CheckCheck size={16} color={theme.primary} />}
          />
        ) : null}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <AppCard
            style={styles.notificationCard}
            variant="surface"
            padding={14}
            onPress={() => {
              setNotifications(prev =>
                prev.map(n => (n.id === item.id ? { ...n, read: true } : n)),
              );
            }}
          >
            <View
              style={item.read ? styles.readIndicator : styles.unreadIndicator}
            />
            <View style={styles.notificationBody}>
              <View style={styles.notificationHeader}>
                <AppText
                  variant="label"
                  style={item.read ? styles.itemReadTitle : styles.itemUnreadTitle}
                >
                  {item.title}
                </AppText>
                <AppText variant="caption" color="muted">
                  {item.time}
                </AppText>
              </View>
              <AppText variant="bodySmall" color="secondary">
                {item.body}
              </AppText>
            </View>
          </AppCard>
        )}
        ListEmptyComponent={
          <EmptyState
            icon={<Bell size={40} color={theme.textMuted} />}
            title="All caught up!"
            description="You don't have any notifications at the moment."
            actionTitle="Reset Demo Notifications"
            onAction={() => setNotifications(mockNotifications)}
          />
        }
      />
    </View>
  );
};

export default NotificationsScreen;
