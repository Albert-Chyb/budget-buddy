import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabase } from '@/init/supabase.tsx';
import { CATEGORIES_TABLE_DATA_QUERY_KEY } from '@/data-management/categories/categories-table-data-query.ts';

export const useCategoryDeleteMutation = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from('categories').delete().eq('id', id);

      if (error) throw error;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: CATEGORIES_TABLE_DATA_QUERY_KEY,
      }),
  });
};
