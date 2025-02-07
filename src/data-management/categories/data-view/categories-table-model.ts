import { categoriesTableColumns } from '@/data-management/categories/data-view/categories-table-columns.tsx';
import { useMemo } from 'react';
import { CategoriesQueryRow } from '@/database/categories/categories-query.ts';
import { CategoryColor } from '@/database/category-colors/query.ts';
import { CategoryTypesQueryRow } from '@/database/category-types/query.ts';
import { useDataTable } from '@/data-management/common/data-view/data-table-state.ts';

export const useCategoriesTable = (
  categories: CategoriesQueryRow[],
  categoryTypes: CategoryTypesQueryRow[],
  categoryColors: CategoryColor[],
) => {
  const columns = useMemo(
    () => categoriesTableColumns(categoryTypes, categoryColors),
    [categoryColors, categoryTypes],
  );

  return useDataTable(categories, columns);
};
