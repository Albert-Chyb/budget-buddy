import { useWalletsListQuery } from '@/database/wallets/wallets-list-query.ts';
import { useCategoriesListQuery } from '@/database/categories/categories-list-query.ts';
import { determineQueriesStatus } from '@/helpers/queries.ts';
import { useTransactionsQuery } from '@/database/transactions/transactions-query.ts';

export const useTransactionsPageData = () => {
  const transactionsQuery = useTransactionsQuery();
  const walletsQuery = useWalletsListQuery();
  const categoriesQuery = useCategoriesListQuery();
  const [status, error] = determineQueriesStatus([
    walletsQuery,
    categoriesQuery,
    transactionsQuery,
  ]);

  return {
    wallets: walletsQuery.data ?? [],
    categories: categoriesQuery.data ?? [],
    transactions: transactionsQuery.data ?? [],
    status,
    error,
  };
};
