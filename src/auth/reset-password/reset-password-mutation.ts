import { useSupabase } from '@/init/supabase.tsx';
import { useMutation } from '@tanstack/react-query';
import { linkOptions } from '@tanstack/react-router';

const changePasswordRoute = linkOptions({ to: '/change-password' }).to;
const REDIRECT_URL = new URL(changePasswordRoute, location.origin);

export function useResetPasswordMutation() {
  const supabase = useSupabase();

  return useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: REDIRECT_URL.href,
      });

      if (error) throw error;
    },
  });
}
