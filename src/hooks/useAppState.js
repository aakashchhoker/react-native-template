import { useState, useEffect } from 'react';
import { AppState } from 'react-native';

/**
 * Custom hook for tracking active, background, or inactive app state.
 */
export const useAppState = (onChange = null) => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
      if (onChange) {
        onChange(nextAppState);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [onChange]);

  return {
    appState,
    isForeground: appState === 'active',
    isBackground: appState === 'background',
  };
};

export default useAppState;
