import { usePaginationState } from '@/data-management/common/pagination/pagination-state.ts';
import { useSortingState } from '@/data-management/common/sorting/sorting-state.ts';
import { useColumnFiltersState } from '@/data-management/common/filtering/column-filters-state.ts';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  useReactTable,
} from '@tanstack/react-table';

export type FiltersMapFn = (filters: ColumnFiltersState) => ColumnFiltersState;

const defaultFiltersParser: FiltersMapFn = (filters) => filters;

export const useDataTable = <TRowData extends RowData>(
  data: TRowData[],
  columns: ColumnDef<TRowData>[],
  filtersMapFn: FiltersMapFn = defaultFiltersParser,
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
      columnFilters: filtersMapFn(columnFilters),
    },
    onPaginationChange: handlePaginationChange,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  });
};
