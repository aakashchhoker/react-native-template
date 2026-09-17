/**
 * __tests__/App.test.jsx
 * Smoke test — App mounts without throwing
 */
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    let tree;
    act(() => {
      tree = renderer.create(<App />);
    });
    expect(tree.toJSON()).toBeTruthy();
  });
});
