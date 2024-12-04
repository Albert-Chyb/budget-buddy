import { useSupabase } from '@/init/supabase.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface SignInMutationVariables {
  email: string;
  password: string;
}

export function useSignInMutation() {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: SignInMutationVariables) => {
      const { data, error } = await supabase.auth.signInWithPassword(variables);

      if (error) throw error;

      return data;
    },
    onSuccess: ({ user }) => {
      queryClient.setQueryData(['user'], user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}
