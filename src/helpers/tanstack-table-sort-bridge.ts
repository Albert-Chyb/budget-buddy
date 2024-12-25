import { Column, SortDirection } from '@tanstack/react-table';

export type SortingDirection = SortDirection | 'off';

export function getSortingDirection(column: Column<unknown>): SortingDirection {
  const direction = column.getIsSorted();
  return typeof direction === 'boolean' ? 'off' : direction;
}

export function setSortingDirection(
  column: Column<unknown>,
  direction: SortingDirection,
  isMultiSort: boolean,
) {
  switch (direction) {
    case 'off':
      column.clearSorting();
      break;

    case 'asc':
      column.toggleSorting(false, isMultiSort);
      break;

    case 'desc':
      column.toggleSorting(true, isMultiSort);
      break;

    default:
      throw new Error('Unknown sorting direction');
  }
}
