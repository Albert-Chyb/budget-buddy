import { useSupabase } from '@/init/supabase.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserQuery } from '@/auth/user-query.ts';
import { TRANSACTIONS_QUERY_KEY } from '@/database/transactions/transactions-query.ts';
import { WALLETS_QUERY_KEY } from '@/database/wallets/wallets-query.ts';
import { TransactionSchema } from '@/database/transactions/transaction-schema.ts';

export const useDeleteTransactionMutation = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  const { data: user } = useUserQuery();

  return useMutation({
    mutationFn: async (id: TransactionSchema['id']) => {
      if (!user)
        throw new Error(
          'DeleteTransactionMutation requires the user to be logged in',
        );

      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
        .eq('owner_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TRANSACTIONS_QUERY_KEY,
      });
      queryClient.invalidateQueries({
        queryKey: WALLETS_QUERY_KEY,
      });
    },
  });
};
