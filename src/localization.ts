export const APP_LOCALE = 'pl-PL' as const;
export const APP_CURRENCY_CODE = 'PLN' as const;

export const DECIMAL_SEPARATOR = new Intl.NumberFormat(APP_LOCALE)
  .formatToParts(1.1)
  .find((part) => part.type === 'decimal')!.value;
