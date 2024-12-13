import { useSupabase } from '@/init/supabase.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USER_QUERY_KEY } from '@/auth/user-query.ts';
import { SignInWithPasswordCredentials } from '@supabase/supabase-js';

export function useSignInMutation() {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: SignInWithPasswordCredentials) => {
      const { data, error } =
        await supabase.auth.signInWithPassword(credentials);

      if (error) throw error;

      return data;
    },
    onSuccess: ({ user }) => {
      queryClient.setQueryData(USER_QUERY_KEY, user);
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });
}
