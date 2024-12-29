import { QueryKey, useQuery } from '@tanstack/react-query';
import { USER_QUERY_KEY, useUserQuery } from '@/auth/user-query.ts';
import { useSupabase } from '@/init/supabase.tsx';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/database/types.ts';

const queryFn = async (supabase: SupabaseClient<Database>, userId: string) => {
  const { data, error } = await supabase
    .from('categories')
    .select(
      `
        id::text, 
        name, 
        type:category_types!inner (id::text, name), 
        color:category_colors (id::text, name, red, green, blue)
      `,
    )
    .eq('owner_id', userId);

  if (error) throw error;

  return data;
};
export type CategoryRowData = Awaited<ReturnType<typeof queryFn>>[number];

export const CATEGORIES_QUERY_KEY = [
  ...USER_QUERY_KEY,
  'row-data-categories',
] as const satisfies QueryKey;
export const useCategoriesTableDataQuery = () => {
  const supabase = useSupabase();
  const { data: user } = useUserQuery();

  return useQuery<CategoryRowData[]>({
    enabled: !!user,
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: () => queryFn(supabase, user!.id),
  });
};
