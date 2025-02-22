import {
  Column,
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import { getByTestId, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ComponentRef,
  createRef,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { RangeFilter } from './range-filter';

type RowData = { value: number };
const colId = 'id';
const columns = [
  createColumnHelper<RowData>().accessor('value', {
    id: colId,
    filterFn: 'inNumberRange',
  }),
];

interface WrapperProps {
  columnFilters?: ColumnFiltersState;
}
const Wrapper = forwardRef(
  (
    { columnFilters }: WrapperProps,
    forwardedRef: ForwardedRef<{ table: Table<RowData> }>,
  ) => {
    const table = useReactTable<RowData>({
      data: [],
      columns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      initialState: {
        columnFilters,
      },
    });

    useImperativeHandle(forwardedRef, () => ({ table }), [table]);

    return (
      <RangeFilter
        column={table.getColumn(colId)! as Column<unknown>}
        labelContent=''
      />
    );
  },
);

const setupFnFactory = () => {
  return (wrapperProps: WrapperProps = {}) => {
    const user = userEvent.setup();
    const wrapperRef = createRef<ComponentRef<typeof Wrapper>>();
    const { container } = render(
      <Wrapper
        ref={wrapperRef}
        {...wrapperProps}
      />,
    );
    const minInput = getByTestId(container, 'range-filter-min-input');
    const maxInput = getByTestId(container, 'range-filter-max-input');

    return {
      user,
      container,
      minInput,
      maxInput,
      table: wrapperRef.current?.table,
    };
  };
};

const expectAnyFilterValue = expect.toSatisfy(
  (v) => v === null || typeof v === 'number',
);

describe('RangeFilter', () => {
  let setup: ReturnType<typeof setupFnFactory>;

  beforeEach(() => {
    setup = setupFnFactory();
  });

  it('should render an input pre-filled with a min value from the filter value', () => {
    const initialMinValue = 10;
    const { minInput } = setup({
      columnFilters: [{ id: colId, value: [initialMinValue, null] }],
    });

    expect(minInput).toHaveValue(initialMinValue);
  });

  it('should update the filter value after min value change', async () => {
    const { minInput, table, user } = setup();
    const newMinValue = 1;

    await user.type(minInput, String(newMinValue));

    expect(table?.getState().columnFilters).toContainEqual({
      id: colId,
      value: [newMinValue, expectAnyFilterValue],
    });
  });

  it('should render an input pre-filled with a max value from the filter value', () => {
    const initialMaxValue = 20;
    const { maxInput } = setup({
      columnFilters: [{ id: colId, value: [null, initialMaxValue] }],
    });

    expect(maxInput).toHaveValue(initialMaxValue);
  });

  it('should update the filter value after max value change', async () => {
    const { maxInput, table, user } = setup();
    const newMaxValue = 5;

    await user.type(maxInput, String(newMaxValue));

    expect(table?.getState().columnFilters).toContainEqual({
      id: colId,
      value: [expectAnyFilterValue, newMaxValue],
    });
  });
});
