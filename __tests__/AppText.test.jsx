/**
 * __tests__/AppText.test.jsx
 * Component tests for AppText
 */
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { AppText } from '../src/components/common/AppText';

describe('AppText', () => {
  it('renders children text', () => {
    let tree;
    act(() => {
      tree = renderer.create(<AppText>Hello</AppText>);
    });
    expect(tree.root.findByType('Text').props.children).toBe('Hello');
  });

  it('applies primary color token', () => {
    let tree;
    act(() => {
      tree = renderer.create(<AppText color="primary">Primary</AppText>);
    });
    const styles = tree.root.findByType('Text').props.style;
    const flat = styles.flat ? styles.flat() : styles;
    const colorStyle = flat.find(s => s && s.color);
    expect(colorStyle).toBeTruthy();
    expect(colorStyle.color).toBeTruthy();
  });

  it('applies textAlign when align is set', () => {
    let tree;
    act(() => {
      tree = renderer.create(<AppText align="center">Centered</AppText>);
    });
    const styles = tree.root.findByType('Text').props.style;
    const flat = Array.isArray(styles) ? styles.flat(Infinity) : [styles];
    const alignStyle = flat.find(s => s && s.textAlign === 'center');
    expect(alignStyle).toBeTruthy();
  });
});
