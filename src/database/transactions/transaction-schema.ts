import { z } from 'zod';
import { Currency } from '@/helpers/currency.ts';
import {
  currencyCellSchema,
  numericIdSchema,
  uuidSchema,
} from '@/database/common-field-types-schemas.ts';
import { categorySchema } from '@/database/categories/category-schema.ts';
import { walletSchema } from '@/database/wallets/wallet-schema.ts';

export const MIN_AMOUNT = new Currency(0);
export const DESCRIPTION_MIN_LENGTH = 1;
export const DESCRIPTION_MAX_LENGTH = 64;

export const transactionSchema = z.object({
  id: numericIdSchema,
  category_id: categorySchema.shape.id,
  wallet_id: walletSchema.shape.id,
  owner_id: uuidSchema,
  amount: currencyCellSchema
    .transform((amountAsInt) => new Currency(amountAsInt))
    .refine(
      (currency) => currency.isGreaterThan(MIN_AMOUNT),
      `Expected a value that is greater than ${MIN_AMOUNT.toString()}`,
    ),
  created_at: z.string().transform((ISOString) => new Date(ISOString)),
  description: z
    .string()
    .min(DESCRIPTION_MIN_LENGTH)
    .max(DESCRIPTION_MAX_LENGTH)
    .nullable(),
});

export type TransactionSchema = z.infer<typeof transactionSchema>;
