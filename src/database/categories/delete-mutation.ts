import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabase } from '@/init/supabase.tsx';
import { CATEGORIES_QUERY_KEY } from '@/database/categories/categories-query.ts';
import { useUserQuery } from '@/auth/user-query.ts';
import { CategorySchema } from '@/database/categories/category-schema.ts';

export type CategoryDeleteMutationVariables = CategorySchema['id'];

export const useCategoryDeleteMutation = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  const { data: user } = useUserQuery();

  return useMutation({
    mutationFn: async (id: CategoryDeleteMutationVariables) => {
      if (!user)
        throw new Error(
          'CategoryDeleteMutation requires the user to be logged in',
        );

      const { error } = await supabase
        .from('categories')
        .delete()
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
