import { Table } from '@tanstack/react-table';

export interface PageIndicatorProps {
  table: Table<unknown>;
}

export const PageIndicator = ({ table }: PageIndicatorProps) => {
  return (
    <span>
      Strona {table.getState().pagination.pageIndex + 1} z{' '}
      {table.getPageCount()}
    </span>
  );
};
