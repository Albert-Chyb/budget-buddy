import { useUserQuery } from '@/auth/user-query';
import { Currency } from '@/helpers/currency';
import { useSupabase } from '@/init/supabase';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { WALLETS_QUERY_KEY } from '../wallets/wallets-query';

const queryResultSchema = z
  .array(
    z.object({
      sum: z
        .number()
        .nullable()
        .transform((v) => v ?? 0),
    }),
  )
  .length(1);

export const TOTAL_BALANCE_QUERY_KEY = [
  ...WALLETS_QUERY_KEY,
  'total-balance',
] as const;

export const useTotalBalanceQuery = () => {
  const supabase = useSupabase();
  const { data: user } = useUserQuery();

  return useQuery({
    enabled: !!user,
    queryKey: TOTAL_BALANCE_QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('wallets')
        .select('balance.sum()')
        .eq('owner_id', user!.id);

      if (error) throw error;

      const [{ sum }] = queryResultSchema.parse(data);
      return new Currency(sum);
    },
  });
};
