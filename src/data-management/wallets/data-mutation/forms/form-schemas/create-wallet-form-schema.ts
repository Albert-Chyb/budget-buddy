import { z } from 'zod';
import { Currency } from '@/helpers/currency.ts';
import {
  BALANCE_INVALID_SYNTAX_MSG,
  BALANCE_REQUIRED_MSG,
  BALANCE_TOO_SMALL_MSG,
  NAME_TOO_BIG_MSG,
  NAME_TOO_SMALL_MSG,
} from '@/data-management/wallets/data-mutation/forms/wallet-form-errors-messages.ts';
import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  walletBalanceRefinement,
} from '@/database/wallets/wallet-schema.ts';
import { INVALID_SYNTAX_INDICATOR } from '@/components/currency-input.tsx';

const balanceValidSyntaxSchema = z
  .instanceof(Currency, { message: BALANCE_REQUIRED_MSG })
  .refine(walletBalanceRefinement, BALANCE_TOO_SMALL_MSG);

const valanceInvalidSchema = z
  .literal(INVALID_SYNTAX_INDICATOR)
  .refine(() => false, {
    message: BALANCE_INVALID_SYNTAX_MSG,
  });

export const createWalletFormSchema = z.object({
  name: z
    .string()
    .min(NAME_MIN_LENGTH, { message: NAME_TOO_SMALL_MSG })
    .max(NAME_MAX_LENGTH, { message: NAME_TOO_BIG_MSG }),
  balance: balanceValidSyntaxSchema.or(valanceInvalidSchema),
});

export type CreateWalletFormValue = z.infer<typeof createWalletFormSchema>;
