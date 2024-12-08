import { useSupabase } from '@/init/supabase.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { VerifyOtpParams } from '@supabase/supabase-js';
import { USER_QUERY_KEY } from '@/auth/user-query.ts';

export function useVerifyOTPMutation() {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: VerifyOtpParams) => {
      const {
        data: { user },
        error,
      } = await supabase.auth.verifyOtp(variables);

      if (error) throw error;

      return user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(USER_QUERY_KEY, user);
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });
}
