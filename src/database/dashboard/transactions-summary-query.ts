import { useUserQuery } from '@/auth/user-query';
import { Currency } from '@/helpers/currency';
import { useSupabase } from '@/init/supabase';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { TRANSACTIONS_QUERY_KEY } from '../transactions/transactions-query';

const recordSchema = z.object({
  is_expense: z.boolean(),
  sum: z.number(),
});
type Record = z.infer<typeof recordSchema>;

const summaryValue = z
  .number()
  .optional()
  .default(0)
  .transform((sum) => new Currency(sum));
const summarySchema = z.object({
  expenses: summaryValue,
  incomes: summaryValue,
});

const convertRecordsToSummary = (records: z.ZodType<Record[]>) => {
  return records.transform((records) => {
    const entries = records.map(({ is_expense, sum }) => {
      const key = is_expense ? 'expenses' : 'incomes';

      return [key, sum];
    });

    return Object.fromEntries(entries);
  });
};

const queryResultSchema = convertRecordsToSummary(z.array(recordSchema)).pipe(
  summarySchema,
);

export const TRANSACTIONS_SUMMARY_QUERY_KEY = [
  ...TRANSACTIONS_QUERY_KEY,
  'transactions-summary',
] as const;

export const useTransactionsSummaryQuery = () => {
  const supabase = useSupabase();
  const { data: user } = useUserQuery();

  return useQuery({
    enabled: !!user,
    queryKey: TRANSACTIONS_SUMMARY_QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_transactions_summary');

      if (error) throw error;

      return queryResultSchema.parse(data);
    },
  });
};
