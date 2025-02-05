import { z } from 'zod';
import { Currency } from '@/helpers/currency.ts';

export const transactionFormSchema = z.object({
  amount: z
    .instanceof(Currency)
    .refine(
      (currency) => currency.toInt() > 0,
      'Kwota transakcji musi być większa od 0',
    ),
  category_id: z.number({
    required_error: 'Transakcja musi posiadać kategorię',
  }),
  wallet_id: z.number({
    required_error: 'Transakcja musi posiadać portfel',
  }),
  description: z.string().optional(),
});

export type TransactionFormValue = z.infer<typeof transactionFormSchema>;
