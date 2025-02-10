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
import {
  ConvertedToNaNError,
  EmptySanitizedStringError,
  EmptyUserInput,
  parseUserInput,
} from '@/helpers/user-input-to-decimal-parser.ts';

export const INVALID_SYNTAX_INDICATOR = Symbol(
  'Indicates that the value in the input field cannot be converted to a number',
);

export type CurrencyInputValue = Currency | null | undefined | symbol;

const applyFormattingTo = (
  value: CurrencyInputValue,
  userInput: string,
): string => {
  if (Currency.isCurrency(value)) return value.toString();

  return userInput;
};

const removeFormattingFrom = (
  value: CurrencyInputValue,
  userInput: string,
): string => {
  if (Currency.isCurrency(value)) return value.toDecimalString();

  return userInput;
};

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
    const [userInput, setUserInput] = useState(applyFormattingTo(value, ''));

    const handleFocus = () => {
      setUserInput((prevUserInput) =>
        removeFormattingFrom(value, prevUserInput),
      );
    };

    const handleBlur = () => {
      onBlur();

      setUserInput((prevUserInput) => applyFormattingTo(value, prevUserInput));
    };

    const handleParsingError = (e: unknown) => {
      if (
        e instanceof EmptySanitizedStringError ||
        e instanceof ConvertedToNaNError
      )
        onValueChange(INVALID_SYNTAX_INDICATOR);
      else if (e instanceof EmptyUserInput) onValueChange(null);
      else throw e;
    };

    const handleChange = ($event: ChangeEvent<HTMLInputElement>) => {
      const userInput = $event.target.value;
      setUserInput(userInput);

      try {
        onValueChange(Currency.fromDecimal(parseUserInput(userInput)));
      } catch (e) {
        handleParsingError(e);
      }
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
