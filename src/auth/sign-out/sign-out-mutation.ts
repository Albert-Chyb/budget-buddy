import { useSupabase } from '@/init/supabase.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USER_QUERY_KEY } from '@/auth/user-query.ts';

export function useSignOutMutation() {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.setQueryData(USER_QUERY_KEY, null);
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });
}
