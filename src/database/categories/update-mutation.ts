import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabase } from '@/init/supabase.tsx';
import { CATEGORIES_QUERY_KEY } from '@/database/categories/categories-query.ts';
import { useUserQuery } from '@/auth/user-query.ts';
import { TablesUpdate } from '@/database/types.ts';
import { CategorySchema } from '@/database/categories/category-schema.ts';
import { UpdateCategoryFormValue } from '@/data-management/categories/data-mutation/forms/form-schemas/update-category-form-schema.ts';

interface CategoryUpdateMutationVariables {
  id: CategorySchema['id'];
  category: UpdateCategoryFormValue;
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
        queryKey: CATEGORIES_QUERY_KEY,
      }),
  });
};
