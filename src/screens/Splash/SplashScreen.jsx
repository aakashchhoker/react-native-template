import React, { useEffect, useRef } from 'react';
import { View, Animated, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layers } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { useAppStore } from '../../store/appStore';
import { appConfig } from '../../config/appConfig';
import { AppText } from '../../components/common/AppText';
import { createStyles } from './styles';

export const SplashScreen = () => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const initializeApp = useAppStore(state => state.initializeApp);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    // Smooth logo entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Trigger state initialization without arbitrary timeout
    initializeApp();
  }, [fadeAnim, scaleAnim, initializeApp]);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <Layers size={48} color={theme.textInverse} strokeWidth={2.2} />
        </View>

        <AppText variant="display" style={styles.appName}>
          {appConfig.appName}
        </AppText>

        <AppText variant="bodyMedium" style={styles.tagline}>
          {appConfig.appTagline}
        </AppText>
      </Animated.View>

      <View style={[styles.loaderContainer, { bottom: Math.max(insets.bottom + 20, 40) }]}>
        <ActivityIndicator size="small" color={theme.primary} />
      </View>
    </View>
  );
};

export default SplashScreen;
