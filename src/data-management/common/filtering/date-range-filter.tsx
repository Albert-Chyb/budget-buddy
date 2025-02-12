import { Column, ColumnFilter, FilterFn, RowData } from '@tanstack/react-table';
import { DateRangePicker } from '@/components/date-range-picker.tsx';
import { DateRange } from 'react-day-picker';
import { isDateInRange } from '@/helpers/date.ts';
import { Filter } from '@/data-management/common/filtering/filter.tsx';

export type DateRangeFilterValue = DateRange | undefined;

export interface DateRangeFilterProps<TData extends RowData> {
  column: Column<TData>;
}

export const DateRangeFilter = <TData extends RowData>({
  column,
}: DateRangeFilterProps<TData>) => {
  return (
    <Filter>
      <DateRangePicker
        value={column.getFilterValue() as DateRangeFilterValue}
        onValueChange={column.setFilterValue}
      />
    </Filter>
  );
};

/**
 * Converts a date range filter's value from URL search parameters (string format)
 * into JavaScript Date objects.
 */
export const convertDateRangeFilterValue = (filter: ColumnFilter) => {
  if (!filter.value) return filter;

  const { from, to } = filter.value as Record<
    keyof NonNullable<DateRangeFilterValue>,
    string
  >;
  const value = {
    from: from ? new Date(from) : undefined,
    to: to ? new Date(to) : undefined,
  } satisfies NonNullable<DateRangeFilterValue>;

  return { ...filter, value };
};

export const dateRangeFilterFn: FilterFn<unknown> = (
  row,
  columnId,
  filterValue: DateRangeFilterValue,
) => {
  if (!filterValue) return true;

  const { from, to } = filterValue;
  return isDateInRange(from, to, new Date(row.getValue(columnId)));
};
