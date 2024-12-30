import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabase } from '@/init/supabase.tsx';
import { TablesUpdate } from '@/database/types.ts';
import { CATEGORIES_TABLE_DATA_QUERY_KEY } from '@/data-management/categories/categories-table-data-query.ts';

type RequireRecordId = { id: number };

export const useCategoryUpdateMutation = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      category: Omit<TablesUpdate<'categories'>, 'id'> & RequireRecordId,
    ) => {
      const { error } = await supabase
        .from('categories')
        .update(category)
        .eq('id', category.id);

      if (error) throw error;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: CATEGORIES_TABLE_DATA_QUERY_KEY,
      }),
  });
};
