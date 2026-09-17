/**
 * __tests__/AppButton.test.jsx
 * Component tests for AppButton
 */
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { AppButton } from '../src/components/common/AppButton';

describe('AppButton', () => {
  it('renders the title', () => {
    let tree;
    act(() => {
      tree = renderer.create(
        <AppButton title="Continue" onPress={jest.fn()} />,
      );
    });
    expect(JSON.stringify(tree.toJSON())).toContain('Continue');
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    let tree;
    act(() => {
      tree = renderer.create(<AppButton title="Tap" onPress={onPress} />);
    });
    act(() => {
      tree.root.findByType(TouchableOpacity).props.onPress();
    });
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('disables press while loading and shows a spinner', () => {
    const onPress = jest.fn();
    let tree;
    act(() => {
      tree = renderer.create(
        <AppButton title="Save" onPress={onPress} loading />,
      );
    });
    const touchable = tree.root.findByType(TouchableOpacity);
    expect(touchable.props.disabled).toBe(true);
    expect(tree.root.findAllByType(ActivityIndicator).length).toBe(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    let tree;
    act(() => {
      tree = renderer.create(
        <AppButton title="Nope" onPress={onPress} disabled />,
      );
    });
    expect(tree.root.findByType(TouchableOpacity).props.disabled).toBe(true);
  });
});
