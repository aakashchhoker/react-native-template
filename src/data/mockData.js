/**
 * Reusable Mock Data for Demonstrating Starter Template Capabilities
 */

export const mockStats = [
  { id: '1', title: 'Total Tasks', value: '24', change: '+12%', isPositive: true },
  { id: '2', title: 'Completed', value: '18', change: '+8%', isPositive: true },
  { id: '3', title: 'Pending', value: '6', change: '-4%', isPositive: false },
];

export const mockRecentActivities = [
  {
    id: '1',
    title: 'Project Setup Finished',
    description: 'React Native starter template initialized cleanly.',
    time: '10m ago',
    category: 'System',
  },
  {
    id: '2',
    title: 'Theme Configured',
    description: 'Light and Dark mode styles set up with Zustand.',
    time: '1h ago',
    category: 'Design',
  },
  {
    id: '3',
    title: 'Navigation Wired',
    description: 'Bottom tab and stack navigators connected.',
    time: '2h ago',
    category: 'Code',
  },
  {
    id: '4',
    title: 'AsyncStorage Bound',
    description: 'Persistent storage configured for app states.',
    time: '1d ago',
    category: 'Storage',
  },
];

export const mockSearchCategories = [
  'All',
  'Components',
  'Navigation',
  'Themes',
  'Hooks',
  'Services',
];

export const mockSearchItems = [
  { id: '1', title: 'AppButton', category: 'Components', description: 'Customizable button supporting multiple variants and loading states.' },
  { id: '2', title: 'AppInput', category: 'Components', description: 'Accessible text field with label, error states, and icon slots.' },
  { id: '3', title: 'AppCard', category: 'Components', description: 'Container card with clean theme-aware background and subtle shadow.' },
  { id: '4', title: 'CustomTabBar', category: 'Navigation', description: 'Floating modern bottom tab bar with animated indicator.' },
  { id: '5', title: 'useTheme', category: 'Hooks', description: 'Hook for accessing active theme tokens and switching themes.' },
  { id: '6', title: 'storageService', category: 'Services', description: 'Type-safe JSON serialization layer over AsyncStorage.' },
];

export const mockNotifications = [
  {
    id: '1',
    title: 'Welcome to StarterApp!',
    body: 'Your master React Native template is ready for rapid development.',
    time: '5m ago',
    read: false,
  },
  {
    id: '2',
    title: 'Dark Mode Available',
    body: 'Switch themes dynamically from the Settings screen.',
    time: '30m ago',
    read: false,
  },
  {
    id: '3',
    title: 'Architecture Verified',
    body: 'Clean separation of constants, services, stores, and screens confirmed.',
    time: '2h ago',
    read: true,
  },
];

export const mockUserProfile = {
  name: 'Alex Morgan',
  role: 'Mobile Developer',
  email: 'alex.morgan@example.com',
  avatarUrl: null, // Displays initials placeholder
  stats: {
    projects: 12,
    components: 48,
    favorites: 19,
  },
};
