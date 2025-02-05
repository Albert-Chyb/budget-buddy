import { z } from 'zod';
import { WalletUpdateInput } from '@/database/wallets/wallet.ts';
import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
} from '@/database/wallets/wallet-schema.ts';
import {
  NAME_TOO_BIG_MSG,
  NAME_TOO_SMALL_MSG,
} from '@/data-management/wallets/data-mutation/forms/wallet-form-errors-messages.ts';

export const updateWalletFormSchema = z.object({
  name: z
    .string()
    .min(NAME_MIN_LENGTH, { message: NAME_TOO_SMALL_MSG })
    .max(NAME_MAX_LENGTH, { message: NAME_TOO_BIG_MSG }),
}) satisfies z.ZodType<WalletUpdateInput>;

export type UpdateWalletFormValue = z.infer<typeof updateWalletFormSchema>;
