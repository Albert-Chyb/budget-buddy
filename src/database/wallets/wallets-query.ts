import { useSupabase } from '@/init/supabase.tsx';
import { USER_QUERY_KEY, useUserQuery } from '@/auth/user-query.ts';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { walletSchema } from '@/database/wallets/wallet-schema.ts';

const recordSchema = z.object({
  id: walletSchema.shape.id,
  name: walletSchema.shape.name,
  balance: walletSchema.shape.balance,
});
export type WalletsQueryRecord = z.infer<typeof recordSchema>;

const queryResultSchema = z.array(recordSchema);
export type WalletsQueryData = z.infer<typeof queryResultSchema>;

export const WALLETS_QUERY_KEY = [...USER_QUERY_KEY, 'wallets'] as const;
export const useWalletsQuery = () => {
  const supabase = useSupabase();
  const { data: user } = useUserQuery();

  return useQuery({
    queryKey: WALLETS_QUERY_KEY,
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('wallets')
        .select('id, name, balance')
        .eq('owner_id', user!.id);

      if (error) throw error;

      return queryResultSchema.parse(data);
    },
  });
};
