import { z } from 'zod';
import { Currency } from '@/helpers/currency.ts';
import {
  currencyCellSchema,
  uuidSchema,
} from '@/database/common-field-types-schemas.ts';

export const walletBalanceSchema = currencyCellSchema.min(0);

export const walletSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(32),
  balance: walletBalanceSchema.transform((balance) => new Currency(balance)),
  owner_id: uuidSchema,
});
export type WalletSchema = z.infer<typeof walletSchema>;
