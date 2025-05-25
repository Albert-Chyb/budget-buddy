import { describe, expect, it } from 'vitest';
import { capitalize } from './capitalize';

describe('capitalize', () => {
  it('should capitalize a text', () => {
    expect(capitalize('aaa')).toBe('Aaa');
  });

  it('should return an empty string if it was called with an empty string', () => {
    expect(capitalize('')).toBe('');
  });

  it('should capitalize a string containing a single character', () => {
    expect(capitalize('a')).toBe('A');
  });
});
