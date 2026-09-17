import { Dimensions } from 'react-native';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

export const dimensions = {
  window: {
    width: windowWidth,
    height: windowHeight,
  },
  screen: {
    width: screenWidth,
    height: screenHeight,
  },
  isSmallDevice: windowWidth < 375,
  isLargeDevice: windowWidth >= 768,
  width: windowWidth,
  height: windowHeight,
};
