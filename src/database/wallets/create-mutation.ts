import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabase } from '@/init/supabase.tsx';
import { useUserQuery } from '@/auth/user-query.ts';
import { WALLETS_QUERY_KEY } from '@/database/wallets/wallets-query.ts';
import { CreateWalletFormValue } from '@/data-management/wallets/data-mutation/forms/form-schemas/create-wallet-form-schema.ts';

export const useCreateWalletMutation = () => {
  const supabase = useSupabase();
  const { data: user } = useUserQuery();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formValue: CreateWalletFormValue) => {
      if (!user)
        throw new Error(
          'CreateWalletMutation requires the user to be logged in',
        );

      const { error } = await supabase.from('wallets').insert({
        name: formValue.name,
        balance: formValue.balance.toInt(),
        owner_id: user.id,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WALLETS_QUERY_KEY });
    },
  });
};
