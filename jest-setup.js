/**
 * jest-setup.js
 *
 * Global Jest setup for the React Native Starter Template.
 *
 * We manually mock react-native-gesture-handler here instead of using the
 * package's own jestSetup.js, because that file uses relative paths that
 * break when Jest loads it from the project root in gesture-handler v3+.
 */

// ─── Gesture Handler Mocks ────────────────────────────────────────────────────
jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    FlatList: View,
    GestureHandlerRootView: View,
    Directions: {},
    gestureHandlerRootHOC: jest.fn(comp => comp),
    GestureDetector: View,
    Gesture: {
      Tap: jest.fn(() => ({
        onBegin: jest.fn().mockReturnThis(),
        onEnd: jest.fn().mockReturnThis(),
        onFinalize: jest.fn().mockReturnThis(),
        runOnJS: jest.fn().mockReturnThis(),
      })),
      Pan: jest.fn(() => ({
        onUpdate: jest.fn().mockReturnThis(),
        onEnd: jest.fn().mockReturnThis(),
        runOnJS: jest.fn().mockReturnThis(),
      })),
      Simultaneous: jest.fn(),
      Exclusive: jest.fn(),
      Race: jest.fn(),
    },
  };
});

// ─── Reanimated Mock ──────────────────────────────────────────────────────────
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

// ─── Safe Area Context Mock ───────────────────────────────────────────────────
jest.mock('react-native-safe-area-context', () => {
  const insets = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: ({ children }) => children,
    useSafeAreaInsets: () => insets,
    useSafeAreaFrame: () => ({ x: 0, y: 0, width: 390, height: 844 }),
    initialWindowMetrics: { insets, frame: { x: 0, y: 0, width: 390, height: 844 } },
  };
});

// ─── React Navigation Mocks ───────────────────────────────────────────────────
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      reset: jest.fn(),
      dispatch: jest.fn(),
    }),
    useRoute: () => ({ params: {} }),
    NavigationContainer: ({ children }) => children,
  };
});

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children,
  }),
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children,
  }),
}));

// ─── Async Storage Mock (v3+ exports "./jest", not "./jest/async-storage-mock") ─
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest'),
);

// ─── Lucide Icons Mock ────────────────────────────────────────────────────────
jest.mock('lucide-react-native', () => {
  const React = require('react');
  const { View } = require('react-native');
  const Icon = props =>
    React.createElement(View, {
      ...props,
      testID: props.testID || 'lucide-icon',
    });
  return new Proxy(
    {},
    {
      get: () => Icon,
    },
  );
});
