import { useCategoriesTableDataQuery } from '@/database/categories/table-data-query.ts';
import { useCategoryColorsQuery } from '@/database/category-colors/query.ts';
import { useCategoryTypesQuery } from '@/database/category-types/query.ts';
import { determineQueriesStatus } from '@/helpers/queries.ts';

export const useCategoriesPageData = () => {
  const tableDataQuery = useCategoriesTableDataQuery();
  const categoryColorsQuery = useCategoryColorsQuery();
  const categoryTypesQuery = useCategoryTypesQuery();
  const queries = [tableDataQuery, categoryColorsQuery, categoryTypesQuery];
  const [status, error] = determineQueriesStatus(queries);

  return {
    status,
    error,
    categories: tableDataQuery.data ?? [],
    categoryColors: categoryColorsQuery.data ?? [],
    categoryTypes: categoryTypesQuery.data ?? [],
  };
};
