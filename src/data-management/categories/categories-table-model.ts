import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Category } from '@/data-management/categories/category-type.ts';
import { categoriesTableColumns } from '@/data-management/categories/categories-table-columns.tsx';
import { categories } from '@/data-management/categories/dummy-categories.ts';
import { usePaginationState } from '@/data-management/pagination/pagination-state.ts';
import { useSortingState } from '@/data-management/sorting/sorting-state.ts';

export const useCategoriesTable = () => {
  const [pagination, handlePaginationChange] = usePaginationState();
  const [sorting, setSorting] = useSortingState();

  return useReactTable<Category>({
    columns: categoriesTableColumns,
    data: categories,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: handlePaginationChange,
    onSortingChange: setSorting,
  });
};
