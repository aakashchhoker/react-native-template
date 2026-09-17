import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Home,
  Search,
  Bell,
  User,
  LayoutGrid,
} from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from '../common/AppText';
import { spacing } from '../../constants/spacing';
import { componentStyles } from '../../styles/componentStyles';

/**
 * Custom Tab Bar for Bottom Navigation
 */
export const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  const getTabIcon = (routeName, isFocused, color) => {
    const iconSize = 22;
    switch (routeName) {
      case 'Home':
        return <Home size={iconSize} color={color} strokeWidth={isFocused ? 2.5 : 2} />;
      case 'Search':
        return <Search size={iconSize} color={color} strokeWidth={isFocused ? 2.5 : 2} />;
      case 'Notifications':
        return <Bell size={iconSize} color={color} strokeWidth={isFocused ? 2.5 : 2} />;
      case 'Profile':
        return <User size={iconSize} color={color} strokeWidth={isFocused ? 2.5 : 2} />;
      case 'More':
        return <LayoutGrid size={iconSize} color={color} strokeWidth={isFocused ? 2.5 : 2} />;
      default:
        return <Home size={iconSize} color={color} />;
    }
  };

  return (
    <View
      style={[
        styles.barContainer,
        {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          paddingBottom: Math.max(insets.bottom, spacing.xs),
        },
      ]}
    >
      <View style={styles.tabsRow}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const activeColor = theme.primary;
          const inactiveColor = theme.textMuted;
          const color = isFocused ? activeColor : inactiveColor;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
              <View style={styles.iconWrapper}>
                {getTabIcon(route.name, isFocused, color)}
                {route.name === 'Notifications' && (
                  <View
                    style={[
                      styles.badgeDot,
                      { backgroundColor: theme.error },
                    ]}
                  />
                )}
              </View>

              <AppText
                variant="caption"
                style={[
                  styles.label,
                  isFocused ? styles.labelFocused : styles.labelUnfocused,
                  { color },
                ]}
              >
                {label}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    ...componentStyles.shadowSm,
  },
  tabsRow: {
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  iconWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  badgeDot: {
    position: 'absolute',
    top: -2,
    right: -3,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  label: {
    fontSize: 10,
    lineHeight: 12,
  },
  labelFocused: {
    fontWeight: '600',
  },
  labelUnfocused: {
    fontWeight: '400',
  },
});

export default CustomTabBar;
