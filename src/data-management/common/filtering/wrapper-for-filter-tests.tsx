import {
  Column,
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import {
  ComponentRef,
  createRef,
  ForwardedRef,
  forwardRef,
  ReactNode,
  useImperativeHandle,
} from 'react';

export type RowData = { value: unknown };
export const colId = 'a';

export const columns = [
  createColumnHelper<RowData>().accessor('value', {
    id: colId,
  }),
];

const getInitialColumnFiltersState = (
  initialValue: unknown,
): ColumnFiltersState | undefined => {
  if (initialValue)
    return [
      {
        id: colId,
        value: initialValue,
      },
    ];

  return undefined;
};

export interface WrapperForFilterTestProps {
  initialFilterValue?: unknown;
  children?: (column: Column<RowData>) => ReactNode;
}

export const WrapperForFilterTest = forwardRef(
  (
    { children, initialFilterValue }: WrapperForFilterTestProps,
    forwardedRef: ForwardedRef<{ table: Table<RowData> }>,
  ) => {
    const table = useReactTable<RowData>({
      data: [],
      columns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      initialState: {
        columnFilters: getInitialColumnFiltersState(initialFilterValue),
      },
    });

    useImperativeHandle(forwardedRef, () => ({ table }), [table]);

    return children?.(table.getColumn(colId)!);
  },
);

export const createWrapperRef = () =>
  createRef<ComponentRef<typeof WrapperForFilterTest>>();
