import { categoriesTableColumns } from '@/data-management/categories/data-view/categories-table-columns.tsx';
import { useDataManagementTable } from '@/data-management/data-management-table-hook.ts';
import { useMemo } from 'react';
import { CategoryType } from '@/database/category-type-schema.ts';
import { CategoryColor } from '@/database/category-color-schema.ts';
import { CategoryRowData } from '@/data-management/categories/categories-table-data-query.ts';

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
