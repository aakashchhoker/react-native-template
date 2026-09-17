/**
 * __tests__/helpers.test.js
 * Unit tests for src/utils/helpers.js
 */
import {
  capitalize,
  truncateText,
  formatRelativeTime,
  debounce,
  isValidEmail,
  isValidPassword,
} from '../src/utils/helpers';

// ─── capitalize ───────────────────────────────────────────────────────────────
describe('capitalize()', () => {
  it('capitalizes the first letter of a lowercase word', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('leaves an already capitalized string unchanged', () => {
    expect(capitalize('World')).toBe('World');
  });

  it('capitalizes only the first letter of a multi-word string', () => {
    expect(capitalize('hello world')).toBe('Hello world');
  });

  it('returns an empty string for empty input', () => {
    expect(capitalize('')).toBe('');
  });

  it('returns an empty string for null / undefined input', () => {
    expect(capitalize(null)).toBe('');
    expect(capitalize(undefined)).toBe('');
  });

  it('handles a single character', () => {
    expect(capitalize('a')).toBe('A');
  });
});

// ─── truncateText ─────────────────────────────────────────────────────────────
describe('truncateText()', () => {
  it('returns text unchanged when shorter than maxLength', () => {
    expect(truncateText('Short text', 50)).toBe('Short text');
  });

  it('returns text unchanged when exactly at maxLength', () => {
    const text = 'a'.repeat(50);
    expect(truncateText(text, 50)).toBe(text);
  });

  it('truncates and appends ellipsis when text exceeds maxLength', () => {
    const text = 'a'.repeat(60);
    const result = truncateText(text, 50);
    expect(result).toBe('a'.repeat(50) + '...');
    expect(result.length).toBe(53);
  });

  it('uses default maxLength of 50', () => {
    const text = 'a'.repeat(51);
    const result = truncateText(text);
    expect(result.endsWith('...')).toBe(true);
  });

  it('returns the original value for null / undefined', () => {
    expect(truncateText(null, 10)).toBeNull();
    expect(truncateText(undefined, 10)).toBeUndefined();
  });
});

// ─── formatRelativeTime ───────────────────────────────────────────────────────
describe('formatRelativeTime()', () => {
  const now = new Date();

  it('returns "Just now" for a date less than 1 minute ago', () => {
    const thirtySecondsAgo = new Date(now.getTime() - 30 * 1000);
    expect(formatRelativeTime(thirtySecondsAgo)).toBe('Just now');
  });

  it('returns minutes ago for a date within the last hour', () => {
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    expect(formatRelativeTime(fiveMinutesAgo)).toBe('5m ago');
  });

  it('returns hours ago for a date within the last day', () => {
    const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);
    expect(formatRelativeTime(threeHoursAgo)).toBe('3h ago');
  });

  it('returns days ago for a date older than 24 hours', () => {
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(twoDaysAgo)).toBe('2d ago');
  });
});

// ─── debounce ─────────────────────────────────────────────────────────────────
describe('debounce()', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('calls the function after the specified wait time', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 300);

    debounced('arg1');
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('arg1');
  });

  it('calls the function only once for multiple rapid calls', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 300);

    debounced('first');
    debounced('second');
    debounced('third');

    jest.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('third');
  });

  it('does not call the function before the wait time elapses', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 500);

    debounced();
    jest.advanceTimersByTime(499);
    expect(fn).not.toHaveBeenCalled();
  });

  it('uses the default wait time of 300ms', () => {
    const fn = jest.fn();
    const debounced = debounce(fn);

    debounced();
    jest.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('isValidEmail()', () => {
  it('accepts valid emails', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
  });

  it('rejects invalid emails', () => {
    expect(isValidEmail('not-an-email')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});

describe('isValidPassword()', () => {
  it('requires at least 6 characters', () => {
    expect(isValidPassword('123456')).toBe(true);
    expect(isValidPassword('12345')).toBe(false);
  });
});
