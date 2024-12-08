import { useSupabase } from '@/init/supabase.tsx';
import { useMutation } from '@tanstack/react-query';

export function useChangePasswordMutation() {
  const supabase = useSupabase();

  return useMutation({
    mutationFn: async (password: string) => {
      const {
        data: { user },
        error,
      } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;

      return user;
    },
  });
}
