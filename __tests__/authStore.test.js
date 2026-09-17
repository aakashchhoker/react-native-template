/**
 * __tests__/authStore.test.js
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '../src/store/authStore';
import { STORAGE_KEYS } from '../src/constants/constants';

beforeEach(async () => {
  await AsyncStorage.clear();
  useAuthStore.setState({
    isAuthenticated: false,
    user: null,
    isAuthLoading: false,
  });
});

describe('useAuthStore', () => {
  it('signup authenticates and persists user', async () => {
    const result = await useAuthStore.getState().signup({
      name: 'Alex Morgan',
      email: 'alex@example.com',
      password: 'secret1',
    });

    expect(result.success).toBe(true);
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(useAuthStore.getState().user.email).toBe('alex@example.com');

    const stored = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_USER);
    expect(JSON.parse(stored).name).toBe('Alex Morgan');
  });

  it('login rejects wrong password after signup', async () => {
    await useAuthStore.getState().signup({
      name: 'Alex',
      email: 'alex@example.com',
      password: 'secret1',
    });
    await useAuthStore.getState().logout();

    await expect(
      useAuthStore.getState().login({
        email: 'alex@example.com',
        password: 'wrong-pass',
      }),
    ).rejects.toThrow('Invalid email or password.');
  });

  it('login succeeds with correct credentials', async () => {
    await useAuthStore.getState().signup({
      name: 'Alex',
      email: 'alex@example.com',
      password: 'secret1',
    });
    await useAuthStore.getState().logout();

    await useAuthStore.getState().login({
      email: 'alex@example.com',
      password: 'secret1',
    });

    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(useAuthStore.getState().user.email).toBe('alex@example.com');
  });

  it('initializeAuth restores session from storage', async () => {
    await AsyncStorage.setItem(
      STORAGE_KEYS.AUTH_USER,
      JSON.stringify({ id: '1', name: 'Alex', email: 'alex@example.com' }),
    );

    await useAuthStore.getState().initializeAuth();
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(useAuthStore.getState().user.name).toBe('Alex');
  });
});
