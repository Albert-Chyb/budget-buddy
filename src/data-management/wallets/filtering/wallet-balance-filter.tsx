import { Column } from '@tanstack/react-table';
import { RangeFilter } from '@/data-management/common/filtering/range-filter.tsx';

export function WalletBalanceFilter({ column }: { column: Column<unknown> }) {
  return <RangeFilter column={column} />;
}
