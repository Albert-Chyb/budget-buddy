import {
  extractMockDatePickerValue,
  fromDate,
  TEST_ID,
  toDate,
} from '@/components/date-range-picker/mocked-date-range-picker-utils';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import { fireEvent, getByTestId, render } from '@testing-library/react';
import {
  ComponentRef,
  createRef,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { DateRange } from 'react-day-picker';
import { describe, expect, it, vi } from 'vitest';
import { DateRangeFilter } from './date-range-filter';

vi.mock('@/components/date-range-picker/date-range-picker');

type RowData = { value: number };
const colId = 'id';
const columns = [
  createColumnHelper<RowData>().accessor('value', {
    id: colId,
  }),
];
const Wrapper = forwardRef(
  (_props, forwardedRef: ForwardedRef<{ table: Table<RowData> }>) => {
    const table = useReactTable({
      data: [],
      columns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
    });

    useImperativeHandle(forwardedRef, () => ({ table }), [table]);

    return (
      <DateRangeFilter
        labelContent=''
        column={table.getColumn(colId)!}
      />
    );
  },
);

const setupTest = () => {
  const tableRef = createRef<ComponentRef<typeof Wrapper>>();
  const { container } = render(<Wrapper ref={tableRef} />);
  const datePicker = getByTestId(container, TEST_ID);
  const selectDateRange = () => fireEvent.click(datePicker);
  const getDateRangePickerValue = () => extractMockDatePickerValue(datePicker);

  return {
    table: tableRef.current?.table,
    container,
    datePicker,
    selectDateRange,
    getDateRangePickerValue,
  };
};

describe('DateRangeFilterComponent', () => {
  it('should update the date range picker value to match the column filter value', () => {
    const { getDateRangePickerValue, selectDateRange } = setupTest();

    selectDateRange();

    expect(getDateRangePickerValue()).toEqual({
      from: fromDate,
      to: toDate,
    });
  });

  it('should update the column filter value to reflect the new date range selection', () => {
    const { selectDateRange, table } = setupTest();

    selectDateRange();

    expect(table?.getState().columnFilters).toContainEqual({
      id: colId,
      value: {
        from: fromDate,
        to: toDate,
      } satisfies DateRange,
    });
  });
});
