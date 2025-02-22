import { RangeFilter } from '@/data-management/common/filtering/range/range-filter';
import { Column } from '@tanstack/react-table';

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
