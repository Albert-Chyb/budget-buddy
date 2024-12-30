import { categoriesTableColumns } from '@/data-management/categories/data-view/categories-table-columns.tsx';
import { useDataManagementTable } from '@/data-management/data-management-table-hook.ts';
import { useMemo } from 'react';
import { CategoryRowData } from '@/data-management/categories/categories-table-data-query.ts';
import { CategoryColor } from '@/data-management/categories/category-colors-query.ts';
import { CategoryType } from '@/data-management/categories/category-types-query.ts';

export const useCategoriesTable = (
  categories: CategoryRowData[],
  categoryTypes: CategoryType[],
  categoryColors: CategoryColor[],
) => {
  const columns = useMemo(
    () => categoriesTableColumns(categoryTypes, categoryColors),
    [categoryColors, categoryTypes],
  );

  return useDataManagementTable(columns, categories);
};
