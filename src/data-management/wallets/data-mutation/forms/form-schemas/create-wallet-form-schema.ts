import { z } from 'zod';
import { WalletInsertInput } from '@/database/wallets/wallet.ts';
import {
  convertCurrencyToInt,
  currencyFormFieldSchema,
} from '@/data-management/data-mutation/currency-form-field-schema.ts';

export const createWalletFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Nazwa jest wymagana' })
    .max(32, { message: 'Nazwa musi byc krótsza niż 32 znaki' }),
  balance: currencyFormFieldSchema
    .min(0, {
      message: 'Balans nie może być ujemny',
    })
    .transform(convertCurrencyToInt),
}) satisfies z.ZodType<WalletInsertInput>;

export type CreateWalletFormValue = z.infer<typeof createWalletFormSchema>;
