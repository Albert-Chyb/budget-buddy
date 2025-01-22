import { z } from 'zod';

export const currencyFormFieldSchema = z.coerce
  .number({ message: 'Podaj prawidłową liczbę' })
  .min(0, { message: 'Balans nie może być ujemny' })
  .multipleOf(0.01, 'Dozwolone sa tylko dwie cyfry po przecinku')
  .transform((value) => value * 100);