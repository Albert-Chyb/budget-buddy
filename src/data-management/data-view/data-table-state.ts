import { usePaginationState } from '@/data-management/pagination/pagination-state.ts';
import { useSortingState } from '@/data-management/sorting/sorting-state.ts';
import { useColumnFiltersState } from '@/data-management/filtering/column-filters-state.ts';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  useReactTable,
} from '@tanstack/react-table';

export const useDataTable = <TRowData extends RowData>(
  data: TRowData[],
  columns: ColumnDef<TRowData>[],
) => {
  const [pagination, handlePaginationChange] = usePaginationState();
  const [sorting, setSorting] = useSortingState();
  const [columnFilters, setColumnFilters] = useColumnFiltersState();

  return useReactTable<TRowData>({
    columns,
    data,
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
