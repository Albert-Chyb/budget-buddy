import { useSupabase } from '@/init/supabase.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
      queryClient.setQueryData(['user'], user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}
