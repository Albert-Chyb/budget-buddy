import { TextFilter } from '@/data-management/common/filtering/text/text-filter';
import { Column } from '@tanstack/react-table';

export function WalletNameFilter({ column }: { column: Column<unknown> }) {
  return (
    <TextFilter
      column={column}
      inputProps={{
        placeholder: 'Wpisz szukaną nazwę',
      }}
      labelContent='Nazwa'
    />
  );
}
