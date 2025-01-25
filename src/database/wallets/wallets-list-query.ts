import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/database/types.ts';
import { useSupabase } from '@/init/supabase.tsx';
import { USER_QUERY_KEY, useUserQuery } from '@/auth/user-query.ts';
import { useQuery } from '@tanstack/react-query';

const queryFn = async (supabase: SupabaseClient<Database>, userId: string) => {
  const { data, error } = await supabase
    .from('wallets')
    .select('id, name')
    .eq('owner_id', userId);

  if (error) throw error;

  return data;
};
export type WalletsListQueryData = Awaited<ReturnType<typeof queryFn>>;
export type WalletsListQueryRecord = WalletsListQueryData[number];

export const WALLETS_LIST_QUERY_KEY = [
  ...USER_QUERY_KEY,
  'wallets-list',
] as const;
export const useWalletsListQuery = () => {
  const supabase = useSupabase();
  const { data: user } = useUserQuery();

  return useQuery({
    enabled: !!user,
    queryKey: WALLETS_LIST_QUERY_KEY,
    queryFn: () => queryFn(supabase, user!.id),
  });
};
