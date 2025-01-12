import { categoriesTableColumns } from '@/data-management/categories/data-view/categories-table-columns.tsx';
import { useMemo } from 'react';
import { CategoryRowData } from '@/database/categories/table-data-query.ts';
import { CategoryColor } from '@/database/category-colors/query.ts';
import { CategoryType } from '@/database/category-types/query.ts';
import { usePaginationState } from '@/data-management/pagination/pagination-state.ts';
import { useSortingState } from '@/data-management/sorting/sorting-state.ts';
import { useColumnFiltersState } from '@/data-management/filtering/column-filters-state.ts';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

export const useCategoriesTable = (
  categories: CategoryRowData[],
  categoryTypes: CategoryType[],
  categoryColors: CategoryColor[],
) => {
  const [pagination, handlePaginationChange] = usePaginationState();
  const [sorting, setSorting] = useSortingState();
  const [columnFilters, setColumnFilters] = useColumnFiltersState();
  const columns = useMemo(
    () => categoriesTableColumns(categoryTypes, categoryColors),
    [categoryColors, categoryTypes],
  );

  return useReactTable({
    columns,
    data: categories,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
      sorting,
      columnFilters,
    },
    onPaginationChange: handlePaginationChange,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  });
};
