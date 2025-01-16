import { MobileSorting } from '@/data-management/sorting/mobile-sorting.tsx';
import { MobileSortingColumn } from '@/data-management/sorting/mobile-sorting-column.tsx';
import { DataTableProp } from '@/data-management/data-view/table-type.ts';
import { WalletsColumnsIds } from '@/data-management/wallets/data-view/wallets-table-columns.tsx';

interface WalletsMobileSortingMenuProps {
  table: DataTableProp;
}

export const WalletsMobileSortingMenu = ({
  table,
}: WalletsMobileSortingMenuProps) => (
  <MobileSorting>
    <MobileSortingColumn
      label='Nazwa'
      column={table.getColumn(WalletsColumnsIds.Name)!}
    />

    <MobileSortingColumn
      label='Aktualny balans'
      column={table.getColumn(WalletsColumnsIds.Balance)!}
    />
  </MobileSorting>
);
