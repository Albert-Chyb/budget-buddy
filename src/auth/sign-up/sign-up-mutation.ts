import { useSupabase } from '@/init/supabase.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USER_QUERY_KEY } from '@/auth/user-query.ts';

export interface SignUpMutationVariables {
  email: string;
  password: string;
}

export function useSignUpMutation() {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password }: SignUpMutationVariables) => {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) throw error;

      return data;
    },
    onSuccess: ({ user }) => {
      queryClient.setQueryData(USER_QUERY_KEY, user);
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });
}
