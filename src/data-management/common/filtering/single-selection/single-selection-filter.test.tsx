import {
  Column,
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import { getByTestId, queryByTestId, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ComponentRef,
  createRef,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { SingleSelectionFilter } from './single-selection-filter';
import { SingleSelectionFilterOption } from './single-selection-filter-option';

type RowData = { value: string };
const colId = 'id';
const columns = [
  createColumnHelper<RowData>().accessor('value', {
    id: colId,
    filterFn: 'equalsString',
  }),
];

type FilterOption = { value: string };
const optionA: FilterOption = { value: 'a' };
const optionB: FilterOption = { value: 'b' };
const filterOptions: FilterOption[] = [optionA, optionB];
const buildFilterOptionTestId = (data: FilterOption) =>
  `filter-option-${data.value}`;

interface WrapperProps {
  columnFilters?: ColumnFiltersState;
}
const Wrapper = forwardRef(
  (
    { columnFilters }: WrapperProps,
    forwardedRef: ForwardedRef<{ table: Table<RowData> }>,
  ) => {
    const table = useReactTable({
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
      <>
        <SingleSelectionFilter
          column={table.getColumn(colId)! as Column<unknown>}
          labelContent=''
        >
          {filterOptions.map((item, index) => (
            <SingleSelectionFilterOption
              key={item.value}
              isFirst={index === 0}
              value={item.value}
              data-testid={buildFilterOptionTestId(item)}
            />
          ))}
        </SingleSelectionFilter>
      </>
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

    const selectOption = async (option: FilterOption) => {
      await user.click(getByTestId(container, buildFilterOptionTestId(option)));
    };
    const getOption = (option: FilterOption) =>
      queryByTestId(container, buildFilterOptionTestId(option));

    return {
      container,
      selectOption,
      getOption,
      table: wrapperRef.current?.table,
    };
  };
};

describe('SingleSelectionFilterComponent', () => {
  let setup: ReturnType<typeof setupFnFactory>;

  beforeEach(() => {
    setup = setupFnFactory();
  });

  it('should update column filter state after option select', async () => {
    const { table, selectOption } = setup();

    await selectOption(optionB);

    expect(table?.getState().columnFilters).toContainEqual({
      id: colId,
      value: optionB.value,
    });
  });

  it('should select correct option based on filter value', () => {
    const { getOption } = setup({
      columnFilters: [{ id: colId, value: optionA.value }],
    });

    expect(getOption(optionA)).toHaveAttribute('aria-checked', 'true');
  });
});
