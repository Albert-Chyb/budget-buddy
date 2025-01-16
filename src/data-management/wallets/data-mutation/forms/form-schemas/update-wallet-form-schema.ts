import { z } from 'zod';
import { WalletUpdateInput } from '@/database/wallets/wallet.ts';

export const updateWalletFormSchema = z.object({
  name: z.string(),
}) satisfies z.ZodType<WalletUpdateInput>;

export type UpdateWalletFormValue = z.infer<typeof updateWalletFormSchema>;
