import { useWalletsListQuery } from '@/database/wallets/wallets-list-query.ts';
import { useCategoriesListQuery } from '@/database/categories/categories-list-query.ts';
import { determineQueriesStatus } from '@/helpers/queries.ts';

export const useTransactionsPageData = () => {
  const walletsQuery = useWalletsListQuery();
  const categoriesQuery = useCategoriesListQuery();
  const queries = [walletsQuery, categoriesQuery];
  const wallets = walletsQuery.data ?? [];
  const categories = categoriesQuery.data ?? [];
  const [status, error] = determineQueriesStatus(queries);

  return {
    wallets,
    categories,
    status,
    error,
  };
};
