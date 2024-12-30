import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TablesInsert } from '@/database/types.ts';
import { useSupabase } from '@/init/supabase.tsx';
import { CATEGORIES_QUERY_KEY } from '@/data-management/categories/categories-table-data-query.ts';

export const useCreateCategoryMutation = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category: TablesInsert<'categories'>) => {
      const { error } = await supabase.from('categories').insert(category);

      if (error) throw error;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY }),
  });
};
