import { QueryKey, useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/init/supabase.tsx';

export const USER_QUERY_KEY: Readonly<QueryKey> = ['user'];

export function useUserQuery() {
  const supabase = useSupabase();

  return useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) throw error;

      return user;
    },
  });
}
