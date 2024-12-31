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
        id, 
        name, 
        type:category_types!inner (id, name), 
        color:category_colors (id, name, red, green, blue),
        owner_id,
        parent_category_id
      `,
    )
    .eq('owner_id', userId);

  if (error) throw error;

  return data;
};
export type CategoryRowData = Awaited<ReturnType<typeof queryFn>>[number];

export const CATEGORIES_TABLE_DATA_QUERY_KEY = [
  ...USER_QUERY_KEY,
  'categories-table-data',
] as const satisfies QueryKey;
export const useCategoriesTableDataQuery = () => {
  const supabase = useSupabase();
  const { data: user } = useUserQuery();

  return useQuery<CategoryRowData[]>({
    enabled: !!user,
    queryKey: CATEGORIES_TABLE_DATA_QUERY_KEY,
    queryFn: () => queryFn(supabase, user!.id),
  });
};
