import { categoriesTableColumns } from '@/data-management/categories/data-view/categories-table-columns.tsx';
import { useDataManagementTable } from '@/data-management/data-management-table-hook.ts';
import { useMemo } from 'react';
import { CategoryRowData } from '@/database/categories/table-data-query.ts';
import { CategoryColor } from '@/database/category-colors/query.ts';
import { CategoryType } from '@/database/category-types/query.ts';

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
