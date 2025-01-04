import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TablesInsert } from '@/database/types.ts';
import { useSupabase } from '@/init/supabase.tsx';
import { CATEGORIES_TABLE_DATA_QUERY_KEY } from '@/database/categories/table-data-query.ts';
import { useUserQuery } from '@/auth/user-query.ts';
import { CategoryInsertInput } from '@/database/categories/category.ts';

export const useCreateCategoryMutation = () => {
  const { data: user } = useUserQuery();
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category: CategoryInsertInput) => {
      if (!user)
        throw new Error(
          'CreateCategoryMutation requires the user to be logged in',
        );

      const categoryRecord: TablesInsert<'categories'> = {
        owner_id: user.id,
        ...category,
      };
      const { error } = await supabase
        .from('categories')
        .insert(categoryRecord);

      if (error) throw error;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: CATEGORIES_TABLE_DATA_QUERY_KEY,
      }),
  });
};
