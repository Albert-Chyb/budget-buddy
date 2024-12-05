import { useSupabase } from '@/init/supabase.tsx';
import { useMutation } from '@tanstack/react-query';

export function useResetPasswordMutation() {
  const supabase = useSupabase();

  return useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) throw error;
    },
  });
}
