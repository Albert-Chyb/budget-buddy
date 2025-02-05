import { z } from 'zod';
import { Currency } from '@/helpers/currency.ts';

export const transactionSchema = z.object({
  id: z.number().int(),
  category_id: z.number().int(),
  wallet_id: z.number().int(),
  owner_id: z.string(),

  amount: z
    .number()
    .int()
    .positive()
    .transform((amountAsInt) => new Currency(amountAsInt)),
  created_at: z.string().transform((ISOString) => new Date(ISOString)),
  description: z.string().nullable(),
});
export type TransactionSchema = z.infer<typeof transactionSchema>;
