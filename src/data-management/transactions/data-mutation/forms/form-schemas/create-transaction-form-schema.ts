import { z } from 'zod';
import { TransactionInsertInput } from '@/database/transactions/transaction.ts';
import { currencyFormFieldSchema } from '@/data-management/data-mutation/currency-form-field-schema.ts';

export const createTransactionFormSchema = z.object({
  amount: currencyFormFieldSchema
    .positive('Kwota transakcji musi być większa od 0')
    .transform((v) => v * 100),
  category_id: z.number({
    required_error: 'Transakcja musi posiadać kategorię',
  }),
  wallet_id: z.number({
    required_error: 'Transakcja musi posiadać portfel',
  }),
  description: z.string().optional(),
}) satisfies z.ZodType<TransactionInsertInput>;

export type CreateTransactionFormValue = z.infer<
  typeof createTransactionFormSchema
>;
