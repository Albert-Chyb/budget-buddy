import { useSupabase } from '@/init/supabase.tsx';
import { useUserQuery } from '@/auth/user-query.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Wallet } from '@/database/wallets/wallet.ts';
import { WALLETS_QUERY_KEY } from '@/database/wallets/wallets-query.ts';

export const useDeleteWalletMutation = () => {
  const supabase = useSupabase();
  const { data: user } = useUserQuery();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: Wallet['id']) => {
      if (!user)
        throw new Error(
          'DeleteWalletMutation requires the user to be logged in',
        );

      const { error } = await supabase
        .from('wallets')
        .delete()
        .eq('owner_id', user.id)
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WALLETS_QUERY_KEY });
    },
  });
};
