/**
 * Jest Configuration
 *
 * react-native-gesture-handler v3 ships a jestSetup.js that uses relative
 * paths from its own package root — those paths break when Jest loads the file
 * from the project root.  We supply our own gesture-handler setup file
 * (`jest-setup.js`) that correctly mocks the library using absolute module
 * names, which is the recommended pattern for v3+.
 *
 * Note: @react-native/jest-preset only transforms .js/.ts/.tsx by default.
 * This template uses .jsx, so we extend the transform pattern below.
 */
module.exports = {
  preset: '@react-native/jest-preset',

  // Our custom setup file replaces 'react-native-gesture-handler/jestSetup'
  setupFiles: ['<rootDir>/jest-setup.js'],

  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],

  // Include .jsx — missing from the RN jest-preset transform regex
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  transformIgnorePatterns: [
    'node_modules/(?!(' +
      '(jest-)?react-native|' +
      '@react-native(-community)?|' +
      '@react-navigation|' +
      'lucide-react-native|' +
      'react-native-reanimated|' +
      'react-native-gesture-handler|' +
      'react-native-screens|' +
      'react-native-safe-area-context|' +
      'react-native-svg|' +
      '@react-native-async-storage' +
    ')/)',
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/assets/**',
    '!src/data/**',
  ],

  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
};
