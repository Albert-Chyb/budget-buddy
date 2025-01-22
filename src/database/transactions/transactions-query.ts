import { useSupabase } from '@/init/supabase.tsx';
import { USER_QUERY_KEY, useUserQuery } from '@/auth/user-query.ts';
import { useQuery } from '@tanstack/react-query';
import { SupabaseClient } from '@supabase/supabase-js';

const queryFn = async (supabase: SupabaseClient, userId: string) => {
  const { data, error } = await supabase
    .from('transactions')
    .select(
      `
        id,
        amount,
        description,
        wallet:wallets!inner (id, name),
        category:categories!inner (id, name)
      `,
    )
    .eq('id', userId)
    .order('created_at');

  if (error) throw error;

  return data;
};
export type TransactionsQueryData = Awaited<ReturnType<typeof queryFn>>;
export type TransactionsQueryRow = TransactionsQueryData[number];

export const TRANSACTIONS_QUERY_KEY = [...USER_QUERY_KEY, 'transactions'];
export const useTransactionsQuery = () => {
  const supabase = useSupabase();
  const { data: user } = useUserQuery();

  return useQuery({
    enabled: !!user,
    queryKey: TRANSACTIONS_QUERY_KEY,
    queryFn: () => queryFn(supabase, user!.id),
  });
};
