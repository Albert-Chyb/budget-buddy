import { categoriesTableColumns } from '@/data-management/categories/data-view/categories-table-columns.tsx';
import { useDataManagementTable } from '@/data-management/data-management-table-hook.ts';
import { useMemo } from 'react';

import { CategoryType } from '@/database/category-type-schema.ts';
import { CategoryColor } from '@/database/category-color-schema.ts';
import { Category } from '@/database/category-schema.ts';

export const useCategoriesTable = (
  categories: Category[],
  categoryTypes: CategoryType[],
  categoryColors: CategoryColor[],
) => {
  const columns = useMemo(
    () => categoriesTableColumns(categoryTypes, categoryColors),
    [categoryColors, categoryTypes],
  );

  return useDataManagementTable(columns, categories);
};
