import { useMutation } from '@tanstack/react-query';
import { WalletInsert, WalletInsertInput } from '@/database/wallets/wallet.ts';
import { useSupabase } from '@/init/supabase.tsx';
import { useUserQuery } from '@/auth/user-query.ts';

export const useCreateWalletMutation = () => {
  const supabase = useSupabase();
  const { data: user } = useUserQuery();

  return useMutation({
    mutationFn: async (formValue: WalletInsertInput) => {
      if (!user)
        throw new Error(
          'CreateWalletMutation requires the user to be logged in',
        );

      const wallet: WalletInsert = {
        ...formValue,
        owner_id: user.id,
      };
      const { error } = await supabase.from('wallets').insert(wallet);
      if (error) throw error;
    },
  });
};
