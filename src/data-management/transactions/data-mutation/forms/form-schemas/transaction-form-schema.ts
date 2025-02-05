import { z } from 'zod';
import { Currency } from '@/helpers/currency.ts';
import {
  DESCRIPTION_MAX_LENGTH,
  DESCRIPTION_MIN_LENGTH,
  MIN_AMOUNT,
} from '@/database/transactions/transaction-schema.ts';
import {
  AMOUNT_TOO_SMALL_MSG,
  CATEGORY_REQUIRED_MSG,
  DESCRIPTION_TOO_BIG_MSG,
  DESCRIPTION_TOO_SMALL_MSG,
  WALLET_REQUIRED_MSG,
} from '@/data-management/transactions/data-mutation/forms/transaction-form-errors-messages.ts';

const emptyDescriptionSchema = z
  .string()
  .length(0)
  .transform(() => null);

const populatedDescriptionSchema = z
  .string()
  .min(DESCRIPTION_MIN_LENGTH, DESCRIPTION_TOO_SMALL_MSG)
  .max(DESCRIPTION_MAX_LENGTH, DESCRIPTION_TOO_BIG_MSG);

export const transactionFormSchema = z.object({
  amount: z
    .instanceof(Currency)
    .refine(
      (currency) => currency.isGreaterThan(MIN_AMOUNT),
      AMOUNT_TOO_SMALL_MSG,
    ),
  category_id: z.number({
    required_error: CATEGORY_REQUIRED_MSG,
  }),
  wallet_id: z.number({
    required_error: WALLET_REQUIRED_MSG,
  }),
  description: populatedDescriptionSchema.or(emptyDescriptionSchema),
});

export type TransactionFormValue = z.infer<typeof transactionFormSchema>;
