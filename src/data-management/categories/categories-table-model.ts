import { categoriesTableColumns } from '@/data-management/categories/categories-table-columns.tsx';
import { categories } from '@/data-management/categories/dummy-categories.ts';
import { useDataManagementTable } from '@/data-management/data-management-table-hook.ts';

export const useCategoriesTable = () => {
  return useDataManagementTable(categoriesTableColumns, categories);
};
