import { FilterFn } from '@tanstack/react-table';

export const arrayIncludesFilterFn: FilterFn<unknown> = (
  row,
  columnId,
  filterValue,
) => {
  if (!Array.isArray(filterValue) || !filterValue.length) return true;

  return filterValue.includes(row.getValue(columnId));
};
