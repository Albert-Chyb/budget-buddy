import { useSupabase } from '@/init/supabase.tsx';
import { useUserQuery } from '@/auth/user-query.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WALLETS_QUERY_KEY } from '@/database/wallets/wallets-query.ts';
import { UpdateWalletFormValue } from '@/data-management/wallets/data-mutation/forms/form-schemas/update-wallet-form-schema.ts';
import { WalletSchema } from '@/database/wallets/wallet-schema.ts';

interface UpdateWalletMutationVariables {
  id: WalletSchema['id'];
  formValue: UpdateWalletFormValue;
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
