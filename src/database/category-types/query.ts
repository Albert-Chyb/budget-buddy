import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/database/types.ts';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { USER_QUERY_KEY, useUserQuery } from '@/auth/user-query.ts';
import { useSupabase } from '@/init/supabase.tsx';

const queryFn = async (supabase: SupabaseClient<Database>) => {
  const { data, error } = await supabase
    .from('category_types')
    .select('id, name, is_expense');

  if (error) throw error;

  return data ?? [];
};
export type CategoryType = Awaited<ReturnType<typeof queryFn>>[number];

export const CATEGORY_TYPES_QUERY_KEY = [
  ...USER_QUERY_KEY,
  'category-types',
] as const satisfies QueryKey;

export const useCategoryTypesQuery = () => {
  const supabase = useSupabase();
  const { data: user } = useUserQuery();

  return useQuery<CategoryType[]>({
    enabled: !!user,
    queryKey: CATEGORY_TYPES_QUERY_KEY,
    queryFn: () => queryFn(supabase),
  });
};
