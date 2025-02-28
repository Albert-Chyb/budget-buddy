import { useUserQuery } from '@/auth/user-query.ts';
import { TransactionFormValue } from '@/data-management/transactions/data-mutation/forms/form-schemas/transaction-form-schema.ts';
import { TRANSACTIONS_QUERY_KEY } from '@/database/transactions/transactions-query.ts';
import { useSupabase } from '@/init/supabase.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateTransactionMutation = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  const { data: user } = useUserQuery();

  return useMutation({
    mutationFn: async (payload: TransactionFormValue) => {
      if (!user)
        throw new Error(
          'CreateTransactionMutation requires the user to be logged in',
        );

      const { error } = await supabase.from('transactions').insert({
        ...payload,
        amount: payload.amount.toInt(),
        owner_id: user.id,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TRANSACTIONS_QUERY_KEY,
      });
    },
  });
};
