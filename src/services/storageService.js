import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Reusable Storage Service
 * Handles serialization, deserialization, and error boundary.
 */
class StorageService {
  /**
   * Retrieves an item from storage and parses JSON.
   * @param {string} key
   * @param {any} [defaultValue=null]
   * @returns {Promise<any>}
   */
  async getItem(key, defaultValue = null) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null || value === undefined) {
        return defaultValue;
      }
      return JSON.parse(value);
    } catch (error) {
      console.warn(`[StorageService] Error getting key "${key}":`, error);
      return defaultValue;
    }
  }

  /**
   * Serializes and stores an item in storage.
   * @param {string} key
   * @param {any} value
   * @returns {Promise<boolean>}
   */
  async setItem(key, value) {
    try {
      const serializedValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.warn(`[StorageService] Error setting key "${key}":`, error);
      return false;
    }
  }

  /**
   * Removes an item from storage.
   * @param {string} key
   * @returns {Promise<boolean>}
   */
  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`[StorageService] Error removing key "${key}":`, error);
      return false;
    }
  }

  /**
   * Clears all items in storage.
   * @returns {Promise<boolean>}
   */
  async clear() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.warn('[StorageService] Error clearing storage:', error);
      return false;
    }
  }
}

export const storageService = new StorageService();
export default storageService;
