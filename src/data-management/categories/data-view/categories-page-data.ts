import { useCategoriesQuery } from '@/database/categories/categories-query.ts';
import { useCategoryColorsQuery } from '@/database/category-colors/query.ts';
import { useCategoryTypesQuery } from '@/database/category-types/query.ts';
import { determineQueriesStatus } from '@/helpers/queries.ts';

export const useCategoriesPageData = () => {
  const categoriesQuery = useCategoriesQuery();
  const categoryColorsQuery = useCategoryColorsQuery();
  const categoryTypesQuery = useCategoryTypesQuery();
  const queries = [categoriesQuery, categoryColorsQuery, categoryTypesQuery];
  const [status, error] = determineQueriesStatus(queries);

  return {
    status,
    error,
    categories: categoriesQuery.data ?? [],
    categoryColors: categoryColorsQuery.data ?? [],
    categoryTypes: categoryTypesQuery.data ?? [],
  };
};
