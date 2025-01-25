import { useQuery } from '@tanstack/react-query';
import { USER_QUERY_KEY, useUserQuery } from '@/auth/user-query.ts';
import { useSupabase } from '@/init/supabase.tsx';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/database/types.ts';

const queryFn = async (supabase: SupabaseClient<Database>, userId: string) => {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name')
    .eq('owner_id', userId);

  if (error) throw error;

  return data;
};
export type CategoriesListQueryData = Awaited<ReturnType<typeof queryFn>>;
export type CategoriesListQueryRecord = CategoriesListQueryData[number];

export const CATEGORIES_LIST_QUERY_KEY = [
  ...USER_QUERY_KEY,
  'categories-list',
] as const;

export const useCategoriesListQuery = () => {
  const supabase = useSupabase();
  const { data: user } = useUserQuery();

  return useQuery({
    enabled: !!user,
    queryKey: CATEGORIES_LIST_QUERY_KEY,
    queryFn: () => queryFn(supabase, user!.id),
  });
};
