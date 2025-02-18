import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getByTestId, render } from '@testing-library/react';
import {
  CurrencyInput,
  CurrencyInputProps,
  CurrencyInputValue,
  INVALID_SYNTAX_INDICATOR,
} from '@/components/currency-input.tsx';
import { Currency } from '@/helpers/currency.ts';
import userEvent, { UserEvent } from '@testing-library/user-event';

describe('CurrencyInputComponent', () => {
  let currency: Currency;
  let renderCurrencyInput: (
    value: CurrencyInputValue,
    onChange?: CurrencyInputProps['onValueChange'],
  ) => {
    user: UserEvent;
    input: HTMLElement;
    container: HTMLElement;
  };

  beforeEach(() => {
    currency = Currency.fromDecimal(26.99);

    renderCurrencyInput = (value, onChange) => {
      const user = userEvent.setup();
      const { container } = render(
        <CurrencyInput
          value={value}
          onValueChange={onChange ?? (() => {})}
          onBlur={() => {}}
          name=''
        />,
      );
      const input = getByTestId(container, 'currency-input');

      return { user, input, container };
    };
  });

  it('should display an empty string if the value is undefined', () => {
    const { input } = renderCurrencyInput(undefined);

    expect(input).toHaveValue('');
  });

  it('should display an empty string if the value is null', () => {
    const { input } = renderCurrencyInput(null);

    expect(input).toHaveValue('');
  });

  it('should display an empty string if the value is a symbol', () => {
    const { input } = renderCurrencyInput(INVALID_SYNTAX_INDICATOR);

    expect(input).toHaveValue('');
  });

  it('should display formatted currency initially', () => {
    const { input } = renderCurrencyInput(currency);

    expect(input).toHaveValue(currency.toString());
  });

  it('should display formatted currency on blur', async () => {
    const { user, input, container } = renderCurrencyInput(currency);

    await user.click(input);
    await user.click(container);

    expect(input).toHaveValue(currency.toString());
  });

  it('should display unformatted currency on focus', async () => {
    const { user, input } = renderCurrencyInput(currency);

    await user.click(input);

    expect(input).toHaveValue(currency.toDecimalString());
  });

  it('should call onValueChange callback on change', async () => {
    const spy = vi.fn();
    const newValue = '23,45';
    const { user, input } = renderCurrencyInput(null, spy);

    await user.click(input);
    await user.keyboard(newValue);

    expect(spy).toHaveBeenCalledTimes(newValue.length);
  });

  it('should call onValueChange callback with a symbol from INVALID_SYNTAX_INDICATOR constant if the value cannot be parsed into a number', async () => {
    const spy = vi.fn();
    const { user, input, container } = renderCurrencyInput(null, spy);

    await user.click(input);
    await user.keyboard('34-,99');
    await user.click(container);

    expect(spy).toHaveBeenLastCalledWith(INVALID_SYNTAX_INDICATOR);
  });
});
