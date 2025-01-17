import { Column } from '@tanstack/react-table';
import { TextFilter } from '@/data-management/filtering/text-filter.tsx';

export function WalletNameFilter({ column }: { column: Column<unknown> }) {
  return (
    <TextFilter
      column={column}
      placeholder='Wpisz szukaną nazwę'
    />
  );
}