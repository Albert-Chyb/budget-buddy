import { z } from 'zod';
import { Currency } from '@/helpers/currency.ts';

export const createWalletFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Nazwa jest wymagana' })
    .max(32, { message: 'Nazwa musi byc krótsza niż 32 znaki' }),
  balance: z
    .instanceof(Currency)
    .refine(
      (currency) => currency.toInt() > 0,
      'Balans portfela nie może być ujemny',
    ),
});

export type CreateWalletFormValue = z.infer<typeof createWalletFormSchema>;
