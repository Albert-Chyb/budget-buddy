import {
  AccessorColumnDef,
  ColumnDef,
  createColumnHelper,
} from '@tanstack/react-table';
import { WalletsQueryRecord } from '@/database/wallets/wallets-query.ts';
import { DeleteWalletAction } from '@/data-management/wallets/data-mutation/actions/delete-wallet-action.tsx';
import { UpdateWalletAction } from '@/data-management/wallets/data-mutation/actions/update-wallet-action.tsx';
import { RowActions } from '@/data-management/common/data-mutation/row-actions.tsx';

const AccessorColumnsIds = {
  Name: 'name',
  Balance: 'balance',
} as const satisfies Record<string, keyof WalletsQueryRecord>;

const WalletsColumnsIds = {
  ...AccessorColumnsIds,
  Actions: 'wallets-actions',
} as const;

const column = createColumnHelper<WalletsQueryRecord>();

const nameColumn = column.accessor('name', {
  id: WalletsColumnsIds.Name,
  header: () => 'Nazwa',
  filterFn: 'includesString',
});

const balanceColumn = column.accessor((wallet) => wallet.balance.toDecimal(), {
  id: WalletsColumnsIds.Balance,
  header: 'Aktualny balans',
  cell: ({ row }) => row.original.balance.toString(),
  filterFn: 'inNumberRange',
});

const actionsColumn = column.display({
  id: WalletsColumnsIds.Actions,
  header: 'Akcje',
  cell: ({ row }) => (
    <RowActions>
      <DeleteWalletAction wallet={row.original} />
      <UpdateWalletAction wallet={row.original} />
    </RowActions>
  ),
});

const walletsTableColumns = [
  nameColumn as AccessorColumnDef<WalletsQueryRecord>,
  balanceColumn as AccessorColumnDef<WalletsQueryRecord>,
  actionsColumn,
] satisfies ColumnDef<WalletsQueryRecord>[];

export { walletsTableColumns, WalletsColumnsIds };
