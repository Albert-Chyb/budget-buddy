import {
  AccessorColumnDef,
  ColumnDef,
  createColumnHelper,
} from '@tanstack/react-table';
import { WalletsQueryRecord } from '@/database/wallets/wallets-query.ts';
import { DeleteWalletButton } from '@/data-management/wallets/data-mutation/actions/delete-wallet.tsx';
import { UpdateWalletButton } from '@/data-management/wallets/data-mutation/actions/update-wallet.tsx';
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
  cell: (context) => context.cell.row.original.balance.toString(),
  filterFn: 'inNumberRange',
});

const actionsColumn = column.display({
  id: WalletsColumnsIds.Actions,
  header: 'Akcje',
  cell: ({ row }) => (
    <RowActions>
      <DeleteWalletButton id={row.original.id} />
      <UpdateWalletButton wallet={row.original} />
    </RowActions>
  ),
});

const walletsTableColumns = [
  nameColumn as AccessorColumnDef<WalletsQueryRecord>,
  balanceColumn as AccessorColumnDef<WalletsQueryRecord>,
  actionsColumn,
] satisfies ColumnDef<WalletsQueryRecord>[];

export { walletsTableColumns, WalletsColumnsIds };
