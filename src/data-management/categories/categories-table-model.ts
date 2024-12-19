import { getCoreRowModel, Table, useReactTable } from '@tanstack/react-table';
import { Category } from '@/data-management/categories/category-type.ts';
import { categoriesTableColumns } from '@/data-management/categories/categories-table-columns.tsx';
import { categories } from '@/data-management/categories/dummy-categories.ts';

type CategoriesTableHook = () => CategoriesTable;

export const useCategoriesTable: CategoriesTableHook = () =>
  useReactTable<Category>({
    columns: categoriesTableColumns,
    data: categories,
    getCoreRowModel: getCoreRowModel(),
  });

export type CategoriesTable = Table<Category>;
