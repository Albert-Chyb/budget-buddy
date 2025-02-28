import { useUserQuery } from '@/auth/user-query.ts';
import { walletSchema } from '@/database/wallets/wallet-schema.ts';
import { useSupabase } from '@/init/supabase.tsx';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { WALLETS_QUERY_KEY } from './wallets-query';

const recordSchema = z.object({
  id: walletSchema.shape.id,
  name: walletSchema.shape.name,
});
export type WalletsListQueryRecord = z.infer<typeof recordSchema>;

const queryResultSchema = z.array(recordSchema);
export type WalletsListQueryData = z.infer<typeof queryResultSchema>;

export const WALLETS_LIST_QUERY_KEY = [
  ...WALLETS_QUERY_KEY,
  'wallets-list',
] as const;
export const useWalletsListQuery = () => {
  const supabase = useSupabase();
  const { data: user } = useUserQuery();

  return useQuery({
    enabled: !!user,
    queryKey: WALLETS_LIST_QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('wallets')
        .select('id, name')
        .eq('owner_id', user!.id);

      if (error) throw error;

      return queryResultSchema.parse(data);
    },
  });
};
