import { Column } from '@tanstack/react-table';
import { RangeFilter } from '@/data-management/common/filtering/range-filter.tsx';

export interface WalletBalanceFilterProps {
  column: Column<unknown>;
}

export function WalletBalanceFilter({ column }: WalletBalanceFilterProps) {
  return (
    <RangeFilter
      column={column}
      labelContent='Balans'
    />
  );
}
