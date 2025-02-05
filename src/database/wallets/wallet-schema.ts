import { z } from 'zod';

export const walletSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(32),
  balance: z
    .number()
    .int()
    .min(0)
    .transform((balanceAsInt) => balanceAsInt / 100),
  owner_id: z.string(),
});
export type WalletSchema = z.infer<typeof walletSchema>;
