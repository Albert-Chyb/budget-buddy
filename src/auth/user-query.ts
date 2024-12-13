import { QueryKey, useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/init/supabase.tsx';

export const USER_QUERY_KEY: Readonly<QueryKey> = ['user'];

export function useUserQuery() {
  const supabase = useSupabase();

  return useQuery({
    queryKey: USER_QUERY_KEY,
    staleTime: Infinity,
    queryFn: async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      const user = session?.user ?? null;

      if (error) throw error;

      return user;
    },
  });
}
