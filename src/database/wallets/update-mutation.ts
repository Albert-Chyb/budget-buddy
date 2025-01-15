import { useSupabase } from '@/init/supabase.tsx';
import { useUserQuery } from '@/auth/user-query.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Wallet, WalletUpdateInput } from '@/database/wallets/wallet.ts';
import { WALLETS_QUERY_KEY } from '@/database/wallets/wallets-query.ts';

interface UpdateWalletMutationVariables {
  formValue: WalletUpdateInput;
  id: Wallet['id'];
}

export const useUpdateWalletMutation = () => {
  const supabase = useSupabase();
  const { data: user } = useUserQuery();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ formValue, id }: UpdateWalletMutationVariables) => {
      if (!user)
        throw new Error(
          'UpdateWalletMutation requires the user to be logged in',
        );

      const { error } = await supabase
        .from('wallets')
        .update(formValue)
        .eq('owner_id', user.id)
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WALLETS_QUERY_KEY });
    },
  });
};
