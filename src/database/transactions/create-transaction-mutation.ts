import { useSupabase } from '@/init/supabase.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  TransactionInsert,
  TransactionInsertInput,
} from '@/database/transactions/transaction.ts';
import { useUserQuery } from '@/auth/user-query.ts';
import { TRANSACTIONS_QUERY_KEY } from '@/database/transactions/transactions-query.ts';
import { WALLETS_QUERY_KEY } from '@/database/wallets/wallets-query.ts';

export const useCreateTransactionMutation = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  const { data: user } = useUserQuery();

  return useMutation({
    mutationFn: async (payload: TransactionInsertInput) => {
      if (!user)
        throw new Error(
          'CreateTransactionMutation requires the user to be logged in',
        );

      const transaction: TransactionInsert = {
        ...payload,
        owner_id: user.id,
      };
      const { error } = await supabase.from('transactions').insert(transaction);

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
