import { DECIMAL_SEPARATOR } from '@/localization.ts';

const VALID_CHARS = new Set([
  '+',
  '-',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '.',
  'e',
  'E',
]);

const sanitize = (text: string): string => {
  return Array.from(text)
    .map((letter) => (letter === DECIMAL_SEPARATOR ? '.' : letter))
    .filter((letter) => VALID_CHARS.has(letter))
    .join('');
};

const convert = (text: string): number => {
  return Number(text);
};

export class EmptyUserInput extends Error {
  constructor() {
    super(
      `
        The provided input is an empty string
      `,
    );
  }
}

export class EmptySanitizedStringError extends Error {
  constructor() {
    super(
      `
        Sanitizing process returned an empty string.
        This likely means that all characters provided in the input were invalid.
      `,
    );
  }
}

export class ConvertedToNaNError extends Error {
  constructor() {
    super(
      `
        Sanitized string was converted to a NaN number.
        This likely means that the input has valid characters,
        but they do not represent a valid syntax.
      `,
    );
  }
}

export const parseUserInput = (userInput: string): number => {
  if (!userInput) throw new EmptyUserInput();

  const sanitizedInput = sanitize(userInput);
  if (!sanitizedInput) throw new EmptySanitizedStringError();

  const convertedInput = convert(sanitizedInput);

  if (isNaN(convertedInput)) throw new ConvertedToNaNError();

  return convertedInput;
};
