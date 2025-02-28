import { useUserQuery } from '@/auth/user-query.ts';
import { categoryTypeSchema } from '@/database/category-types/category-type-schema.ts';
import { useSupabase } from '@/init/supabase.tsx';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

const recordSchema = z.object({
  id: categoryTypeSchema.shape.id,
  name: categoryTypeSchema.shape.name,
  is_expense: categoryTypeSchema.shape.is_expense,
});
export type CategoryTypesQueryRow = z.infer<typeof recordSchema>;

const queryResultSchema = z.array(recordSchema);
export type CategoryTypesQueryData = z.infer<typeof queryResultSchema>;

export const CATEGORY_TYPES_QUERY_KEY = ['category-types'] as const;

export const useCategoryTypesQuery = () => {
  const supabase = useSupabase();
  const { data: user } = useUserQuery();

  return useQuery<CategoryTypesQueryRow[]>({
    enabled: !!user,
    queryKey: CATEGORY_TYPES_QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('category_types')
        .select('id, name, is_expense');

      if (error) throw error;

      return queryResultSchema.parse(data);
    },
  });
};
