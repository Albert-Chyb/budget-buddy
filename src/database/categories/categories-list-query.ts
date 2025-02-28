import { useUserQuery } from '@/auth/user-query.ts';
import { categorySchema } from '@/database/categories/category-schema.ts';
import { useSupabase } from '@/init/supabase.tsx';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { CATEGORIES_QUERY_KEY } from './categories-query';

const recordSchema = z.object({
  id: categorySchema.shape.id,
  name: categorySchema.shape.name,
});
export type CategoriesListQueryRecord = z.infer<typeof recordSchema>;

const queryResultSchema = z.array(recordSchema);
export type CategoriesListQueryData = z.infer<typeof queryResultSchema>;

export const CATEGORIES_LIST_QUERY_KEY = [
  ...CATEGORIES_QUERY_KEY,
  'categories-list',
] as const;

export const useCategoriesListQuery = () => {
  const supabase = useSupabase();
  const { data: user } = useUserQuery();

  return useQuery({
    enabled: !!user,
    queryKey: CATEGORIES_LIST_QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .eq('owner_id', user!.id);

      if (error) throw error;

      return queryResultSchema.parse(data);
    },
  });
};
