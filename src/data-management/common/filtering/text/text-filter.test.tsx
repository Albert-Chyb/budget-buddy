import {
  Column,
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import { getByTestId } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ComponentRef,
  createRef,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { TextFilter } from './text-filter';

type RowData = { value: string };
const colId = 'name';
const columns = [
  createColumnHelper<RowData>().accessor('value', {
    id: colId,
    filterFn: 'equalsString',
  }),
];

interface WrapperProps {
  columnFilters?: ColumnFiltersState;
}

type WrapperForwardedRef = ForwardedRef<{
  table: Table<RowData>;
}>;

const Wrapper = forwardRef(
  ({ columnFilters }: WrapperProps, forwardRef: WrapperForwardedRef) => {
    const table = useReactTable({
      data: [],
      columns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      initialState: {
        columnFilters,
      },
    });

    useImperativeHandle(forwardRef, () => ({ table }), [table]);

    return (
      <TextFilter
        column={table.getColumn(colId)! as Column<unknown>}
        labelContent=''
      />
    );
  },
);

const setupFnFactory = () => {
  return (wrapperProps: Partial<WrapperProps> = {}) => {
    const user = userEvent.setup();
    const wrapperRef = createRef<ComponentRef<typeof Wrapper>>();
    const { container } = render(
      <Wrapper
        ref={wrapperRef}
        {...wrapperProps}
      />,
    );
    const input = getByTestId(container, 'text-filter-input');

    return { user, container, input, table: wrapperRef.current?.table };
  };
};

describe('TextFilterComponent', () => {
  let setup: ReturnType<typeof setupFnFactory>;

  beforeEach(() => {
    setup = setupFnFactory();
  });

  it('should render an input pre-filled with filter value', () => {
    const initialFilterValue = 'aaa';
    const { input } = setup({
      columnFilters: [{ id: colId, value: initialFilterValue }],
    });

    expect(input).toHaveValue(initialFilterValue);
  });

  it("should update the column filter value when input's value change", async () => {
    const { user, input, table } = setup();

    const newFilterValue = 'aaa';
    await user.type(input, newFilterValue);

    expect(table?.getState().columnFilters).toContainEqual({
      id: colId,
      value: newFilterValue,
    });
  });
});
