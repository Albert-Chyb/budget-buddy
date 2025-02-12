import { z } from 'zod';
import { Currency } from '@/helpers/currency.ts';
import {
  DESCRIPTION_MAX_LENGTH,
  DESCRIPTION_MIN_LENGTH,
  transactionAmountRefinement,
} from '@/database/transactions/transaction-schema.ts';
import {
  AMOUNT_INVALID_SYNTAX_MSG,
  AMOUNT_REQUIRED_MSG,
  AMOUNT_TOO_SMALL_MSG,
  CATEGORY_REQUIRED_MSG,
  DESCRIPTION_TOO_BIG_MSG,
  DESCRIPTION_TOO_SMALL_MSG,
  WALLET_REQUIRED_MSG,
} from '@/data-management/transactions/data-mutation/forms/transaction-form-errors-messages.ts';
import { INVALID_SYNTAX_INDICATOR } from '@/components/currency-input.tsx';

const emptyDescriptionSchema = z
  .string()
  .length(0)
  .transform(() => null);

const populatedDescriptionSchema = z
  .string()
  .min(DESCRIPTION_MIN_LENGTH, DESCRIPTION_TOO_SMALL_MSG)
  .max(DESCRIPTION_MAX_LENGTH, DESCRIPTION_TOO_BIG_MSG);

const amountValidSyntaxSchema = z
  .instanceof(Currency, { message: AMOUNT_REQUIRED_MSG })
  .refine(transactionAmountRefinement, AMOUNT_TOO_SMALL_MSG);

const amountInvalidSyntaxSchema = z
  .literal(INVALID_SYNTAX_INDICATOR)
  .transform((_value, context) => {
    context.addIssue({
      code: 'custom',
      message: AMOUNT_INVALID_SYNTAX_MSG,
    });

    return z.NEVER;
  });

export const transactionFormSchema = z.object({
  amount: amountValidSyntaxSchema.or(amountInvalidSyntaxSchema),
  category_id: z.number({
    required_error: CATEGORY_REQUIRED_MSG,
  }),
  wallet_id: z.number({
    required_error: WALLET_REQUIRED_MSG,
  }),
  description: populatedDescriptionSchema.or(emptyDescriptionSchema),
});

export type TransactionFormValue = z.infer<typeof transactionFormSchema>;
