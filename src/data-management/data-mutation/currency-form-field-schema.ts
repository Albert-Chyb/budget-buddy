import { z } from 'zod';

export const currencyFormFieldSchema = z.coerce
  .number({ message: 'Podaj prawidłową liczbę' })
  .multipleOf(0.01, 'Dozwolone sa tylko dwie cyfry po przecinku');
