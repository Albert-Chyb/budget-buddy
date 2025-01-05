import { useCategoriesTableDataQuery } from '@/database/categories/table-data-query.ts';
import { useCategoryColorsQuery } from '@/database/category-colors/query.ts';
import { useCategoryTypesQuery } from '@/database/category-types/query.ts';

export const useCategoriesPageData = () => {
  const tableDataQuery = useCategoriesTableDataQuery();
  const categoryColorsQuery = useCategoryColorsQuery();
  const categoryTypesQuery = useCategoryTypesQuery();

  if (
    tableDataQuery.status === 'error' ||
    categoryColorsQuery.status === 'error' ||
    categoryTypesQuery.status === 'error'
  )
    return {
      status: 'error' as const,
      categories: tableDataQuery.data,
      categoryColors: categoryColorsQuery.data,
      categoryTypes: categoryTypesQuery.data,
    };
  else if (
    tableDataQuery.status === 'pending' ||
    categoryColorsQuery.status === 'pending' ||
    categoryTypesQuery.status === 'pending'
  )
    return {
      status: 'pending' as const,
      categories: tableDataQuery.data,
      categoryColors: categoryColorsQuery.data,
      categoryTypes: categoryTypesQuery.data,
    };
  else
    return {
      status: 'success' as const,
      categories: tableDataQuery.data,
      categoryColors: categoryColorsQuery.data,
      categoryTypes: categoryTypesQuery.data,
    };
};
