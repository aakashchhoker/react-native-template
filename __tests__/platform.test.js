/**
 * __tests__/platform.test.js
 * Unit tests for platform helpers
 */
import { Platform } from 'react-native';
import {
  isIOS,
  isAndroid,
  platformVersion,
  selectPlatform,
} from '../src/utils/platform';

describe('platform helpers', () => {
  it('exposes OS flags consistent with Platform.OS', () => {
    expect(isIOS).toBe(Platform.OS === 'ios');
    expect(isAndroid).toBe(Platform.OS === 'android');
  });

  it('exposes platformVersion from Platform.Version', () => {
    expect(platformVersion).toBe(Platform.Version);
  });

  it('selectPlatform returns the value for the current OS', () => {
    const result = selectPlatform('ios-value', 'android-value', 'default-value');
    if (Platform.OS === 'ios') {
      expect(result).toBe('ios-value');
    } else if (Platform.OS === 'android') {
      expect(result).toBe('android-value');
    } else {
      expect(result).toBe('default-value');
    }
  });
});
