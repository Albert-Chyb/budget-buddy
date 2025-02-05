import { z } from 'zod';
import { Currency } from '@/helpers/currency.ts';
import {
  currencyCellSchema,
  numericIdSchema,
  uuidSchema,
} from '@/database/common-field-types-schemas.ts';
import { categorySchema } from '@/database/categories/category-schema.ts';
import { walletSchema } from '@/database/wallets/wallet-schema.ts';

export const transactionAmountSchema = currencyCellSchema.positive();

export const transactionSchema = z.object({
  id: numericIdSchema,
  category_id: categorySchema.shape.id,
  wallet_id: walletSchema.shape.id,
  owner_id: uuidSchema,
  amount: transactionAmountSchema.transform(
    (amountAsInt) => new Currency(amountAsInt),
  ),
  created_at: z.string().transform((ISOString) => new Date(ISOString)),
  description: z.string().nullable(),
});

export type TransactionSchema = z.infer<typeof transactionSchema>;
