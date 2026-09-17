import { Platform } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const platformVersion = Platform.Version;

export const selectPlatform = (iosValue, androidValue, defaultValue = null) => {
  return Platform.select({
    ios: iosValue,
    android: androidValue,
    default: defaultValue ?? androidValue,
  });
};
