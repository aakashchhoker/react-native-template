import React, { useRef, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Compass, FolderCheck, Rocket } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { useAppStore } from '../../store/appStore';
import { AppText } from '../../components/common/AppText';
import { AppButton } from '../../components/common/AppButton';
import { OnboardingPagination } from '../../components/onboarding/OnboardingPagination';
import { onboardingData } from './onboardingData';
import { dimensions } from '../../constants/dimensions';
import { spacing } from '../../constants/spacing';
import { createStyles } from './styles';

export const OnboardingScreen = () => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const completeOnboarding = useAppStore(state => state.completeOnboarding);

  const isLastSlide = currentIndex === onboardingData.length - 1;

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / dimensions.width);
    if (index !== currentIndex && index >= 0 && index < onboardingData.length) {
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    if (isLastSlide) {
      completeOnboarding();
    } else {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const renderIcon = iconName => {
    const size = 64;
    const color = theme.primary;
    switch (iconName) {
      case 'Compass':
        return <Compass size={size} color={color} strokeWidth={1.8} />;
      case 'FolderCheck':
        return <FolderCheck size={size} color={color} strokeWidth={1.8} />;
      case 'Rocket':
        return <Rocket size={size} color={color} strokeWidth={1.8} />;
      default:
        return <Compass size={size} color={color} />;
    }
  };

  const renderSlide = ({ item }) => (
    <View style={styles.slideItem}>
      <View style={styles.illustrationContainer}>
        {renderIcon(item.iconName)}
      </View>
      <AppText variant="h1" style={styles.title}>
        {item.title}
      </AppText>
      <AppText variant="body" style={styles.description}>
        {item.description}
      </AppText>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, spacing.md) },
      ]}
    >
      <View style={styles.header}>
        {!isLastSlide ? (
          <AppButton
            title="Skip"
            variant="ghost"
            size="sm"
            onPress={handleSkip}
            style={styles.skipButton}
          />
        ) : null}
      </View>

      <FlatList
        ref={flatListRef}
        data={onboardingData}
        keyExtractor={item => item.id}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        bounces={false}
      />

      <View style={styles.footer}>
        <OnboardingPagination
          total={onboardingData.length}
          currentIndex={currentIndex}
          onDotPress={index => {
            flatListRef.current?.scrollToIndex({ index, animated: true });
            setCurrentIndex(index);
          }}
        />

        {isLastSlide ? (
          <AppButton
            title="Get Started"
            variant="primary"
            size="lg"
            onPress={handleNext}
            style={styles.getStartedButton}
          />
        ) : (
          <View style={styles.buttonRow}>
            <AppButton
              title="Next"
              variant="primary"
              size="md"
              onPress={handleNext}
              style={styles.nextButton}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default OnboardingScreen;
