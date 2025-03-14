import { DateRangePicker } from '@/components/date-range-picker/date-range-picker';
import {
  Filter,
  FilterProps,
} from '@/data-management/common/filtering/filter.tsx';
import { isDateInRange } from '@/helpers/date.ts';
import { Column, ColumnFilter, FilterFn, RowData } from '@tanstack/react-table';
import { useId } from 'react';
import { DateRange } from 'react-day-picker';

export type DateRangeFilterValue = DateRange | undefined;

export interface DateRangeFilterProps<TData extends RowData>
  extends FilterProps {
  column: Column<TData>;
}

export const DateRangeFilter = <TData extends RowData>({
  column,
  ...filterProps
}: DateRangeFilterProps<TData>) => {
  const id = useId();
  return (
    <Filter
      id={id}
      {...filterProps}
    >
      <DateRangePicker
        triggerId={id}
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
