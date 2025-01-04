import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabase } from '@/init/supabase.tsx';
import { CATEGORIES_TABLE_DATA_QUERY_KEY } from '@/database/categories/table-data-query.ts';
import { useUserQuery } from '@/auth/user-query.ts';
import {
  Category,
  CategoryUpdateInput,
} from '@/database/categories/category.ts';
import { TablesUpdate } from '@/database/types.ts';

interface CategoryUpdateMutationVariables {
  id: Category['id'];
  category: CategoryUpdateInput;
}

export const useCategoryUpdateMutation = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  const { data: user } = useUserQuery();

  return useMutation({
    mutationFn: async ({ id, category }: CategoryUpdateMutationVariables) => {
      if (!user)
        throw new Error('CategoryUpdateMutation requires user to be logged in');

      const categoryUpdate: TablesUpdate<'categories'> = category;
      const { error } = await supabase
        .from('categories')
        .update(categoryUpdate)
        .eq('id', id)
        .eq('owner_id', user.id);

      if (error) throw error;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: CATEGORIES_TABLE_DATA_QUERY_KEY,
      }),
  });
};
