import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './BottomTabNavigator';
import { SettingsScreen } from '../screens/Settings/SettingsScreen';
import { ROUTES } from '../constants/constants';

const Stack = createNativeStackNavigator();

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name={ROUTES.MAIN_TABS} component={BottomTabNavigator} />
      <Stack.Screen name={ROUTES.SETTINGS} component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
