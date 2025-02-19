import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getByTestId, render } from '@testing-library/react';
import {
  CurrencyInput,
  CurrencyInputProps,
  INVALID_SYNTAX_INDICATOR,
} from '@/components/currency-input.tsx';
import { Currency } from '@/helpers/currency.ts';
import userEvent from '@testing-library/user-event';

type RenderFnArgs = Partial<Omit<CurrencyInputProps, 'value'>> &
  Pick<CurrencyInputProps, 'value'>;

const renderFnFactory = () => {
  return ({
    value,
    onValueChange = () => {},
    onBlur = () => {},
    name = '',
  }: RenderFnArgs) => {
    const user = userEvent.setup();
    const { container } = render(
      <CurrencyInput
        value={value}
        onValueChange={onValueChange}
        onBlur={onBlur}
        name={name}
      />,
    );
    const input = getByTestId(container, 'currency-input');
    const focusInput = async () => await user.click(input);
    const blurInput = async () => await user.click(container);
    const enterValueIntoInput = async (text: string) =>
      await user.keyboard(text);

    return {
      user,
      input,
      container,
      focusInput,
      blurInput,
      enterValueIntoInput,
    };
  };
};

describe('CurrencyInputComponent', () => {
  let currency: Currency;
  let renderCurrencyInput: ReturnType<typeof renderFnFactory>;

  beforeEach(() => {
    currency = Currency.fromDecimal(26.99);

    renderCurrencyInput = renderFnFactory();
  });

  it('should display an empty string if the value is undefined', () => {
    const { input } = renderCurrencyInput({ value: undefined });

    expect(input).toHaveValue('');
  });

  it('should display an empty string if the value is null', () => {
    const { input } = renderCurrencyInput({ value: null });

    expect(input).toHaveValue('');
  });

  it('should display an empty string if the value is a symbol', () => {
    const { input } = renderCurrencyInput({ value: INVALID_SYNTAX_INDICATOR });

    expect(input).toHaveValue('');
  });

  it('should display formatted currency initially', () => {
    const { input } = renderCurrencyInput({ value: currency });

    expect(input).toHaveValue(currency.toString());
  });

  it('should display formatted currency on blur', async () => {
    const { input, focusInput, blurInput } = renderCurrencyInput({
      value: currency,
    });

    await focusInput();
    await blurInput();

    expect(input).toHaveValue(currency.toString());
  });

  it('should display unformatted currency on focus', async () => {
    const { input, focusInput } = renderCurrencyInput({ value: currency });

    await focusInput();

    expect(input).toHaveValue(currency.toDecimalString());
  });

  it('should call onValueChange callback on change', async () => {
    const spy = vi.fn();
    const newValue = '23,45';
    const { focusInput, enterValueIntoInput } = renderCurrencyInput({
      value: null,
      onValueChange: spy,
    });

    await focusInput();
    await enterValueIntoInput(newValue);

    expect(spy).toHaveBeenCalledTimes(newValue.length);
  });

  it('should call onValueChange callback with a symbol from INVALID_SYNTAX_INDICATOR constant if the value cannot be parsed into a number', async () => {
    const spy = vi.fn();
    const { focusInput, blurInput, enterValueIntoInput } = renderCurrencyInput({
      value: null,
      onValueChange: spy,
    });

    await focusInput();
    await enterValueIntoInput('34-,99');
    await blurInput();

    expect(spy).toHaveBeenLastCalledWith(INVALID_SYNTAX_INDICATOR);
  });
});
