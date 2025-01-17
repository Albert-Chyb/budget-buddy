import { DataTableProp } from '@/data-management/data-view/table-type.ts';
import { Filters } from '@/data-management/filtering/filters.tsx';
import { WalletsColumnsIds } from '@/data-management/wallets/data-view/wallets-table-columns.tsx';
import { WalletNameFilter } from '@/data-management/wallets/filtering/wallet-name-filter.tsx';
import { WalletBalanceFilter } from '@/data-management/wallets/filtering/wallet-balance-filter.tsx';

export interface WalletsFiltersProps {
  table: DataTableProp;
}

export const WalletsFilters = ({ table }: WalletsFiltersProps) => {
  return (
    <Filters>
      <WalletNameFilter column={table.getColumn(WalletsColumnsIds.Name)!} />

      <WalletBalanceFilter
        column={table.getColumn(WalletsColumnsIds.Balance)!}
      />
    </Filters>
  );
};
