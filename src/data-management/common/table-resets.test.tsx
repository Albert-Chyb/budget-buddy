import {
  ColumnFiltersState,
  getCoreRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import { fireEvent, render } from '@testing-library/react';
import {
  createRef,
  ReactNode,
  Ref,
  useImperativeHandle,
  useState,
} from 'react';
import { describe, expect, it, vi } from 'vitest';
import { TableResets } from './table-resets';

interface WrapperProps {
  ref: Ref<Table<unknown>>;
  children: (table: Table<unknown>) => ReactNode;
}
const Wrapper = ({ ref, children }: WrapperProps) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable<unknown>({
    columns: [],
    data: [],
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
  });
  useImperativeHandle(ref, () => table, [table]);

  return children(table);
};

const setupTest = () => {
  const tableRef = createRef<Table<unknown>>();
  const renderResult = render(
    <Wrapper ref={tableRef}>
      {(table) => <TableResets table={table} />}
    </Wrapper>,
  );

  return {
    table: tableRef.current!,
    renderResult,
  };
};

describe('TableResetsComponent', () => {
  it('should render a button that when clicked resets table column filters state', async () => {
    const { table, renderResult } = setupTest();

    fireEvent.click(renderResult.getByTestId('reset-filters-btn'));

    await vi.waitFor(() => expect(table.getState().columnFilters).toEqual([]));
  });

  it('should render a button that when clicked resets table sorting state', async () => {
    const { table, renderResult } = setupTest();

    fireEvent.click(renderResult.getByTestId('reset-sorting-btn'));

    await vi.waitFor(() => expect(table.getState().sorting).toEqual([]));
  });
});
