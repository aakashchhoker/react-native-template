import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomTabBar } from '../components/navigation/CustomTabBar';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { SearchScreen } from '../screens/Search/SearchScreen';
import { NotificationsScreen } from '../screens/Notifications/NotificationsScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { MoreScreen } from '../screens/More/MoreScreen';
import { appConfig } from '../config/appConfig';
import { ROUTES } from '../constants/constants';

const Tab = createBottomTabNavigator();

const renderTabBar = props => <CustomTabBar {...props} />;

export const BottomTabNavigator = () => {
  const { enableSearch, enableNotifications } = appConfig.features;

  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
      {enableSearch && (
        <Tab.Screen name={ROUTES.SEARCH} component={SearchScreen} />
      )}
      {enableNotifications && (
        <Tab.Screen
          name={ROUTES.NOTIFICATIONS}
          component={NotificationsScreen}
        />
      )}
      <Tab.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
      <Tab.Screen name={ROUTES.MORE} component={MoreScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
