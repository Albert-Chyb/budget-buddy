import { useUserQuery } from '@/auth/user-query.ts';
import { TransactionFormValue } from '@/data-management/transactions/data-mutation/forms/form-schemas/transaction-form-schema.ts';
import { TransactionSchema } from '@/database/transactions/transaction-schema.ts';
import { TRANSACTIONS_QUERY_KEY } from '@/database/transactions/transactions-query.ts';
import { useSupabase } from '@/init/supabase.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface UpdateTransactionMutationVariables {
  id: TransactionSchema['id'];
  payload: TransactionFormValue;
}

export const useUpdateTransactionMutation = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  const { data: user } = useUserQuery();

  return useMutation({
    mutationFn: async ({ id, payload }: UpdateTransactionMutationVariables) => {
      if (!user)
        throw new Error(
          'UpdateTransactionMutation requires the user to be logged in',
        );

      const { error } = await supabase
        .from('transactions')
        .update({
          ...payload,
          amount: payload.amount.toInt(),
        })
        .eq('id', id)
        .eq('owner_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TRANSACTIONS_QUERY_KEY,
      });
    },
  });
};
