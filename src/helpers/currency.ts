import { APP_CURRENCY_CODE, APP_LOCALE } from '@/localization.ts';

const formatter = new Intl.NumberFormat(APP_LOCALE, {
  currency: APP_CURRENCY_CODE,
  style: 'currency',
});

const decimalFormatter = new Intl.NumberFormat(APP_LOCALE, {
  ...formatter.resolvedOptions(),
  style: 'decimal',
});

export class Currency {
  private readonly currencyAsInt;

  constructor(value: number) {
    if (!Number.isInteger(value))
      throw new Error('The currency has to be an integer');

    this.currencyAsInt = value;
  }

  toInt() {
    return this.currencyAsInt;
  }

  toDecimal() {
    return this.currencyAsInt / 100;
  }

  isGreaterThan(other: Currency) {
    return this.currencyAsInt > other.currencyAsInt;
  }

  isGreaterOrEqualThan(other: Currency) {
    return this.currencyAsInt >= other.currencyAsInt;
  }

  toString() {
    return formatter.format(this.toDecimal());
  }

  toDecimalString() {
    return decimalFormatter.format(this.toDecimal());
  }

  subtract(subtrahend: Currency) {
    return new Currency(this.currencyAsInt - subtrahend.currencyAsInt);
  }

  divide(divisor: Currency) {
    return Currency.fromDecimal(this.currencyAsInt / divisor.currencyAsInt);
  }

  static fromDecimal(value: number) {
    return new Currency(Math.trunc(value * 100));
  }

  static isCurrency(obj: unknown): obj is Currency {
    return obj instanceof Currency;
  }
}
