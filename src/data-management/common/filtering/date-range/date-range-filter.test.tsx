import {
  extractMockDatePickerValue,
  fromDate,
  TEST_ID,
  toDate,
} from '@/components/date-range-picker/mocked-date-range-picker-utils';
import { fireEvent, getByTestId, render } from '@testing-library/react';
import { DateRange } from 'react-day-picker';
import { describe, expect, it, vi } from 'vitest';
import {
  colId,
  createWrapperRef,
  WrapperForFilterTest,
} from '../wrapper-for-filter-tests';
import { DateRangeFilter } from './date-range-filter';

vi.mock('@/components/date-range-picker/date-range-picker');

const setupTest = () => {
  const tableRef = createWrapperRef();

  const { container } = render(
    <WrapperForFilterTest ref={tableRef}>
      {(column) => (
        <DateRangeFilter
          labelContent=''
          column={column}
        />
      )}
    </WrapperForFilterTest>,
  );

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
