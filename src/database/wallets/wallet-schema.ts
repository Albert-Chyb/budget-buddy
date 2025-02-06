import { z } from 'zod';
import { Currency } from '@/helpers/currency.ts';
import {
  currencyCellSchema,
  numericIdSchema,
  uuidSchema,
} from '@/database/common-field-types-schemas.ts';

export const NAME_MIN_LENGTH = 1;
export const NAME_MAX_LENGTH = 32;
export const BALANCE_MIN = new Currency(0);

export const walletBalanceRefinement = (currency: Currency) =>
  currency.isGreaterOrEqualThan(BALANCE_MIN);

export const walletSchema = z.object({
  id: numericIdSchema,
  name: z.string().min(NAME_MIN_LENGTH).max(NAME_MAX_LENGTH),
  balance: currencyCellSchema
    .transform((balance) => new Currency(balance))
    .refine(
      walletBalanceRefinement,
      `Expected a value greater or equal than ${BALANCE_MIN.toString()}`,
    ),
  owner_id: uuidSchema,
});
export type WalletSchema = z.infer<typeof walletSchema>;
