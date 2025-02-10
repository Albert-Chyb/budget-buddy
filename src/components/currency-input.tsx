import { Currency } from '@/helpers/currency.ts';
import { Input } from '@/components/input.tsx';
import { ControllerRenderProps } from 'react-hook-form';
import {
  ChangeEvent,
  ComponentRef,
  ForwardedRef,
  forwardRef,
  useState,
} from 'react';
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
  'Infinity',
]);
const stripInvalidChars = (text: string): string =>
  Array.from(text)
    .map((letter) => (letter === DECIMAL_SEPARATOR ? '.' : letter))
    .filter((letter) => VALID_CHARS.has(letter))
    .join('');

const convertStringIntoFloat = (text: string): number => {
  return Number(text);
};

const parseUserInput = (userInput: string) => {
  const normalizedInput = stripInvalidChars(userInput);
  if (!normalizedInput)
    return {
      success: false,
      value: null,
    } as const;

  const convertedInput = convertStringIntoFloat(normalizedInput);
  const success = !isNaN(convertedInput) && isFinite(convertedInput);

  if (success)
    return {
      success: true,
      value: convertedInput,
    } as const;
  else
    return {
      success: false,
      value: null,
    } as const;
};

export type CurrencyInputValue = Currency | null | undefined;

export interface CurrencyInputProps
  extends Omit<ControllerRenderProps, 'value' | 'onChange' | 'ref'> {
  value: CurrencyInputValue;
  onValueChange: (value: CurrencyInputValue) => void;
}

export const CurrencyInput = forwardRef(
  (
    { value, onValueChange, onBlur, ...inputProps }: CurrencyInputProps,
    forwardedRef: ForwardedRef<ComponentRef<typeof Input>>,
  ) => {
    const [userInput, setUserInput] = useState(value?.toDecimalString() ?? '');

    const handleFocus = () => {
      if (value) setUserInput(value.toDecimalString());
    };

    const handleBlur = () => {
      onBlur();

      if (value) setUserInput(value.toString());
    };

    const handleChange = ($event: ChangeEvent<HTMLInputElement>) => {
      const userInput = $event.target.value;
      setUserInput(userInput);

      const { value, success } = parseUserInput(userInput);
      if (success) onValueChange(Currency.fromDecimal(value));
      else onValueChange(null);
    };

    return (
      <Input
        type='text'
        placeholder='np: 1000,00'
        inputMode='decimal'
        value={userInput}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={forwardedRef}
        {...inputProps}
      />
    );
  },
);
