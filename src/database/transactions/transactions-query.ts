import { useSupabase } from '@/init/supabase.tsx';
import { USER_QUERY_KEY, useUserQuery } from '@/auth/user-query.ts';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { transactionSchema } from '@/database/transactions/transaction-schema.ts';
import { walletSchema } from '@/database/wallets/wallet-schema.ts';
import { categorySchema } from '@/database/categories/category-schema.ts';

const recordSchema = z.object({
  id: transactionSchema.shape.id,
  amount: transactionSchema.shape.amount,
  description: transactionSchema.shape.description,
  created_at: transactionSchema.shape.created_at,
  wallet: z.object({
    id: walletSchema.shape.id,
    name: walletSchema.shape.name,
  }),
  category: z.object({
    id: categorySchema.shape.id,
    name: categorySchema.shape.name,
  }),
});
export type TransactionsQueryRow = z.infer<typeof recordSchema>;

const queryResultSchema = z.array(recordSchema);
export type TransactionsQueryData = z.infer<typeof queryResultSchema>;

export const TRANSACTIONS_QUERY_KEY = [
  ...USER_QUERY_KEY,
  'transactions',
] as const;
export const useTransactionsQuery = () => {
  const supabase = useSupabase();
  const { data: user } = useUserQuery();

  return useQuery({
    enabled: !!user,
    queryKey: TRANSACTIONS_QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select(
          `
            id,
            amount,
            description,
            created_at,
            wallet:wallets!inner (id, name),
            category:categories!inner (id, name)
          `,
        )
        .eq('owner_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return queryResultSchema.parse(data);
    },
  });
};
