import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabase } from '@/init/supabase.tsx';
import { CATEGORIES_QUERY_KEY } from '@/database/categories/categories-query.ts';
import { useUserQuery } from '@/auth/user-query.ts';
import { CategoryFormValue } from '@/data-management/categories/data-mutation/forms/form-schemas/category-form-schema.ts';

export const useCreateCategoryMutation = () => {
  const { data: user } = useUserQuery();
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category: CategoryFormValue) => {
      if (!user)
        throw new Error(
          'CreateCategoryMutation requires the user to be logged in',
        );

      const { error } = await supabase.from('categories').insert({
        owner_id: user.id,
        ...category,
      });

      if (error) throw error;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: CATEGORIES_QUERY_KEY,
      }),
  });
};
