import { useQuery } from '@tanstack/react-query';
import { USER_QUERY_KEY, useUserQuery } from '@/auth/user-query.ts';
import { useSupabase } from '@/init/supabase.tsx';
import { z } from 'zod';
import { categorySchema } from '@/database/categories/category-schema.ts';
import { categoryTypeSchema } from '@/database/category-types/category-type-schema.ts';
import { categoryColorSchema } from '@/database/category-colors/category-color-schema.ts';

const recordSchema = z.object({
  id: categorySchema.shape.id,
  name: categorySchema.shape.name,
  type: z.object({
    id: categoryTypeSchema.shape.id,
    name: categoryTypeSchema.shape.name,
  }),
  color: z
    .object({
      id: categoryColorSchema.shape.id,
      name: categoryColorSchema.shape.name,
      red: categoryColorSchema.shape.red,
      green: categoryColorSchema.shape.green,
      blue: categoryColorSchema.shape.blue,
    })
    .nullable(),
  owner_id: z.string(),
});
export type CategoriesQueryRow = z.infer<typeof recordSchema>;

const queryResultSchema = z.array(recordSchema);
export type CategoriesQueryData = z.infer<typeof queryResultSchema>;

export const CATEGORIES_QUERY_KEY = [...USER_QUERY_KEY, 'categories'] as const;
export const useCategoriesQuery = () => {
  const supabase = useSupabase();
  const { data: user } = useUserQuery();

  return useQuery({
    enabled: !!user,
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select(
          `
            id, 
            name, 
            type:category_types!inner (id, name), 
            color:category_colors (id, name, red, green, blue),
            owner_id
          `,
        )
        .eq('owner_id', user!.id);

      if (error) throw error;

      return queryResultSchema.parse(data);
    },
  });
};
