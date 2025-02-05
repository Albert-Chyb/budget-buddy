import {
  AccessorColumnDef,
  ColumnDef,
  createColumnHelper,
} from '@tanstack/react-table';
import { WalletsQueryRecord } from '@/database/wallets/wallets-query.ts';
import { APP_CURRENCY_CODE, APP_LOCALE } from '@/localization.ts';
import { DeleteWalletButton } from '@/data-management/wallets/data-mutation/actions/delete-wallet.tsx';
import { UpdateWalletButton } from '@/data-management/wallets/data-mutation/actions/update-wallet.tsx';
import { RowActions } from '@/data-management/data-mutation/row-actions.tsx';

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

const balanceColumn = column.accessor('balance', {
  id: WalletsColumnsIds.Balance,
  header: 'Aktualny balans',
  cell: (context) =>
    context.getValue().toLocaleString(APP_LOCALE, {
      style: 'currency',
      currency: APP_CURRENCY_CODE,
    }),
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
