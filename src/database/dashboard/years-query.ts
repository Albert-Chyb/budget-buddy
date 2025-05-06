import { useSupabase } from '@/init/supabase';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { TRANSACTIONS_QUERY_KEY } from '../transactions/transactions-query';

const recordSchema = z.object({
  year: z.number(),
});
const queryResultSchema = z
  .array(recordSchema)
  .transform((records) => records.map((record) => record.year));

export const YEARS_QUERY_KEY = [...TRANSACTIONS_QUERY_KEY, ''] as const;

export const useYearsQuery = () => {
  const supabase = useSupabase();

  return useQuery({
    queryKey: YEARS_QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('financial_statistics_years')
        .select('year');

      if (error) throw error;

      return queryResultSchema.parse(data);
    },
  });
};
