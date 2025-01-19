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
export type CategoriesQueryData = Awaited<ReturnType<typeof queryFn>>;
export type CategoriesQueryRow = CategoriesQueryData[number];

export const CATEGORIES_QUERY_KEY = [
  ...USER_QUERY_KEY,
  'categories',
] as const satisfies QueryKey;
export const useCategoriesQuery = () => {
  const supabase = useSupabase();
  const { data: user } = useUserQuery();

  return useQuery({
    enabled: !!user,
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: () => queryFn(supabase, user!.id),
  });
};
