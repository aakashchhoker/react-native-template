/**
 * __tests__/storageService.test.js
 * Unit tests for src/services/storageService.js
 *
 * AsyncStorage is mocked via jest-setup.js and the official async-storage mock.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import storageService from '../src/services/storageService';

// Reset the mock state before each test
beforeEach(async () => {
  jest.restoreAllMocks();
  await AsyncStorage.clear();
});

// ─── getItem ──────────────────────────────────────────────────────────────────
describe('storageService.getItem()', () => {
  it('returns the parsed value for an existing key', async () => {
    await AsyncStorage.setItem('test_key', JSON.stringify({ a: 1 }));
    const result = await storageService.getItem('test_key');
    expect(result).toEqual({ a: 1 });
  });

  it('returns the defaultValue when the key does not exist', async () => {
    const result = await storageService.getItem('missing_key', 'fallback');
    expect(result).toBe('fallback');
  });

  it('returns null as the default when no defaultValue is provided', async () => {
    const result = await storageService.getItem('missing_key');
    expect(result).toBeNull();
  });

  it('handles boolean values correctly', async () => {
    await AsyncStorage.setItem('bool_key', JSON.stringify(true));
    const result = await storageService.getItem('bool_key', false);
    expect(result).toBe(true);
  });

  it('handles numeric values correctly', async () => {
    await AsyncStorage.setItem('num_key', JSON.stringify(42));
    const result = await storageService.getItem('num_key');
    expect(result).toBe(42);
  });

  it('handles array values correctly', async () => {
    const arr = [1, 2, 3];
    await AsyncStorage.setItem('arr_key', JSON.stringify(arr));
    const result = await storageService.getItem('arr_key');
    expect(result).toEqual(arr);
  });

  it('returns defaultValue when AsyncStorage throws', async () => {
    jest.spyOn(AsyncStorage, 'getItem').mockRejectedValueOnce(new Error('Storage error'));
    const result = await storageService.getItem('any_key', 'safe_default');
    expect(result).toBe('safe_default');
  });
});

// ─── setItem ──────────────────────────────────────────────────────────────────
describe('storageService.setItem()', () => {
  it('stores a value and returns true on success', async () => {
    const result = await storageService.setItem('my_key', { foo: 'bar' });
    expect(result).toBe(true);

    const stored = await AsyncStorage.getItem('my_key');
    expect(JSON.parse(stored)).toEqual({ foo: 'bar' });
  });

  it('serializes boolean values correctly', async () => {
    await storageService.setItem('bool', false);
    const stored = await AsyncStorage.getItem('bool');
    expect(JSON.parse(stored)).toBe(false);
  });

  it('returns false when AsyncStorage.setItem throws', async () => {
    jest.spyOn(AsyncStorage, 'setItem').mockRejectedValueOnce(new Error('Write error'));
    const result = await storageService.setItem('key', 'value');
    expect(result).toBe(false);
  });
});

// ─── removeItem ───────────────────────────────────────────────────────────────
describe('storageService.removeItem()', () => {
  it('removes a key and returns true', async () => {
    await AsyncStorage.setItem('rm_key', '"hello"');
    const result = await storageService.removeItem('rm_key');
    expect(result).toBe(true);

    const stored = await AsyncStorage.getItem('rm_key');
    expect(stored).toBeNull();
  });

  it('returns true even when the key did not exist', async () => {
    const result = await storageService.removeItem('nonexistent');
    expect(result).toBe(true);
  });

  it('returns false when AsyncStorage.removeItem throws', async () => {
    jest.spyOn(AsyncStorage, 'removeItem').mockRejectedValueOnce(new Error('Remove error'));
    const result = await storageService.removeItem('key');
    expect(result).toBe(false);
  });
});

// ─── clear ────────────────────────────────────────────────────────────────────
describe('storageService.clear()', () => {
  it('clears all keys and returns true', async () => {
    await AsyncStorage.setItem('k1', '"v1"');
    await AsyncStorage.setItem('k2', '"v2"');

    const result = await storageService.clear();
    expect(result).toBe(true);

    const keys = await AsyncStorage.getAllKeys();
    expect(keys).toHaveLength(0);
  });

  it('returns false when AsyncStorage.clear throws', async () => {
    jest.spyOn(AsyncStorage, 'clear').mockRejectedValueOnce(new Error('Clear error'));
    const result = await storageService.clear();
    expect(result).toBe(false);
  });
});
