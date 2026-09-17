import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

/**
 * Custom hook providing keyboard visibility and height.
 */
export const useKeyboard = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return {
    isKeyboardVisible,
    keyboardHeight,
    dismissKeyboard: Keyboard.dismiss,
  };
};

export default useKeyboard;
