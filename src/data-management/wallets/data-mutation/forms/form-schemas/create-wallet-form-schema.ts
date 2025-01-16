import { z } from 'zod';
import { WalletInsertInput } from '@/database/wallets/wallet.ts';

export const createWalletFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Nazwa jest wymagana' })
    .max(32, { message: 'Nazwa musi byc krótsza niż 32 znaki' }),
  balance: z.coerce
    .number({ message: 'Podaj prawidłową liczbę' })
    .min(0, { message: 'Balans nie może być ujemny' })
    .multipleOf(0.01, 'Dozwolone sa tylko dwie cyfry po przecinku')
    .transform((value) => value * 100),
}) satisfies z.ZodType<WalletInsertInput>;

export type CreateWalletFormValue = z.infer<typeof createWalletFormSchema>;
