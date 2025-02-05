import { z } from 'zod';
import { Currency } from '@/helpers/currency.ts';

export const walletSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(32),
  balance: z
    .number()
    .int()
    .min(0)
    .transform((balance) => new Currency(balance)),
  owner_id: z.string(),
});
export type WalletSchema = z.infer<typeof walletSchema>;
