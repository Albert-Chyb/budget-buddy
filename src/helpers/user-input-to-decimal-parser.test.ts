import { describe, expect, it } from 'vitest';
import {
  ConvertedToNaNError,
  EmptySanitizedStringError,
  EmptyUserInput,
  parseUserInput,
} from '@/helpers/user-input-to-decimal-parser.ts';
import { DECIMAL_SEPARATOR } from '@/localization.ts';

describe('parseUserInput', () => {
  it('should parse a string with a valid number', () => {
    const result = parseUserInput('1.1');

    expect(result).toBe(1.1);
  });

  it('should parse a string with a number containing locale decimal separator', () => {
    const result = parseUserInput(`1${DECIMAL_SEPARATOR}1`);

    expect(result).toBe(1.1);
  });

  it('should parse a string that after sanitization is a valid number', () => {
    const result = parseUserInput('1a.1');

    expect(result).toBe(1.1);
  });

  it('should throw an error if received an empty string', () => {
    expect(() => parseUserInput('')).toThrowError(EmptyUserInput);
  });

  it('should throw an error if received string consists only of invalid characters', () => {
    expect(() => parseUserInput('a')).toThrowError(EmptySanitizedStringError);
  });

  it('should throw an error if received string has invalid syntax', () => {
    expect(() => parseUserInput('1-.1')).toThrowError(ConvertedToNaNError);
  });
});
