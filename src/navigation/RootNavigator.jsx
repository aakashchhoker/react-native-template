import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppStore } from '../store/appStore';
import { SplashScreen } from '../screens/Splash/SplashScreen';
import { OnboardingScreen } from '../screens/Onboarding/OnboardingScreen';
import { MainNavigator } from './MainNavigator';
import { ROUTES } from '../constants/constants';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const isInitialized = useAppStore(state => state.isInitialized);
  const hasCompletedOnboarding = useAppStore(
    state => state.hasCompletedOnboarding,
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      {!isInitialized ? (
        <Stack.Screen name={ROUTES.SPLASH} component={SplashScreen} />
      ) : !hasCompletedOnboarding ? (
        <Stack.Screen name={ROUTES.ONBOARDING} component={OnboardingScreen} />
      ) : (
        <Stack.Screen name="MainApp" component={MainNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
