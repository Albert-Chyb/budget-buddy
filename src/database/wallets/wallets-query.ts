import { useSupabase } from '@/init/supabase.tsx';
import { USER_QUERY_KEY, useUserQuery } from '@/auth/user-query.ts';
import { useQuery } from '@tanstack/react-query';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/database/types.ts';

const queryFn = async (supabase: SupabaseClient<Database>, userId: string) => {
  const { data, error } = await supabase
    .from('wallets')
    .select('id, name, balance')
    .eq('owner_id', userId);

  if (error) throw error;

  return data;
};
export type WalletsQueryData = Awaited<ReturnType<typeof queryFn>>;
export type WalletsQueryRecord = WalletsQueryData[number];

export const WALLETS_QUERY_KEY = [...USER_QUERY_KEY, 'wallets'] as const;
export const useWalletsQuery = () => {
  const supabase = useSupabase();
  const { data: user } = useUserQuery();

  return useQuery({
    queryKey: WALLETS_QUERY_KEY,
    enabled: !!user,
    queryFn: () => queryFn(supabase, user!.id),
  });
};
