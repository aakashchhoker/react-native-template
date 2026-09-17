/**
 * Application Constants
 */
export const STORAGE_KEYS = {
  THEME_MODE: '@app_theme_mode',
  HAS_COMPLETED_ONBOARDING: '@app_has_completed_onboarding',
  AUTH_USER: '@app_auth_user',
  AUTH_CREDENTIALS: '@app_auth_credentials',
  USER_PREFERENCES: '@app_user_preferences',
};

export const THEME_MODES = {
  SYSTEM: 'system',
  LIGHT: 'light',
  DARK: 'dark',
};

export const ROUTES = {
  SPLASH: 'Splash',
  ONBOARDING: 'Onboarding',
  AUTH: 'Auth',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  MAIN_TABS: 'MainTabs',
  HOME: 'Home',
  SEARCH: 'Search',
  NOTIFICATIONS: 'Notifications',
  PROFILE: 'Profile',
  MORE: 'More',
  SETTINGS: 'Settings',
};

export const HIT_SLOP = {
  sm: { top: 8, bottom: 8, left: 8, right: 8 },
  md: { top: 12, bottom: 12, left: 12, right: 12 },
  lg: { top: 16, bottom: 16, left: 16, right: 16 },
};
