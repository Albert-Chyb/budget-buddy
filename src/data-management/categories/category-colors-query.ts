import { QueryKey, useQuery } from '@tanstack/react-query';
import { USER_QUERY_KEY, useUserQuery } from '@/auth/user-query.ts';
import { useSupabase } from '@/init/supabase.tsx';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/database/types.ts';

const queryFn = async (supabase: SupabaseClient<Database>) => {
  const { data, error } = await supabase
    .from('category_colors')
    .select('id::text, name, red, green, blue');

  if (error) throw error;

  return data ?? [];
};
export type CategoryColor = Awaited<ReturnType<typeof queryFn>>[number];

export const CATEGORIES_COLORS_QUERY_KEY = [
  ...USER_QUERY_KEY,
  'category-colors',
] satisfies QueryKey;

export const useCategoryColorsQuery = () => {
  const supabase = useSupabase();
  const { data: user } = useUserQuery();

  return useQuery<CategoryColor[]>({
    enabled: !!user,
    queryKey: CATEGORIES_COLORS_QUERY_KEY,
    queryFn: () => queryFn(supabase),
  });
};
