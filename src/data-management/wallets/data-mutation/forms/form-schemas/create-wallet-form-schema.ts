import { z } from 'zod';
import { Currency } from '@/helpers/currency.ts';
import {
  BALANCE_TOO_SMALL_MSG,
  NAME_TOO_BIG_MSG,
  NAME_TOO_SMALL_MSG,
} from '@/data-management/wallets/data-mutation/forms/wallet-form-errors-messages.ts';
import {
  BALANCE_MIN,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
} from '@/database/wallets/wallet-schema.ts';

export const createWalletFormSchema = z.object({
  name: z
    .string()
    .min(NAME_MIN_LENGTH, { message: NAME_TOO_SMALL_MSG })
    .max(NAME_MAX_LENGTH, { message: NAME_TOO_BIG_MSG }),
  balance: z
    .instanceof(Currency)
    .refine(
      (currency) => currency.isGreaterOrEqualThan(BALANCE_MIN),
      BALANCE_TOO_SMALL_MSG,
    ),
});

export type CreateWalletFormValue = z.infer<typeof createWalletFormSchema>;
