import { AccessorColumnDef, createColumnHelper } from '@tanstack/react-table';
import { TransactionsQueryRow } from '@/database/transactions/transactions-query.ts';
import { APP_CURRENCY_CODE, APP_LOCALE } from '@/localization.ts';
import { Transaction } from '@/database/transactions/transaction.ts';
import { RowActions } from '@/data-management/data-mutation/row-actions.tsx';
import { EditTransactionAction } from '@/data-management/transactions/data-mutation/actions/edit-transaction-action.tsx';
import { WalletsListQueryData } from '@/database/wallets/wallets-list-query.ts';
import { CategoriesListQueryData } from '@/database/categories/categories-list-query.ts';
import { DeleteTransactionAction } from '@/data-management/transactions/data-mutation/actions/delete-transaction-action.tsx';

const ACCESSOR_COLUMNS_IDS = {
  Wallet: 'wallet_id',
  Category: 'category_id',
  Amount: 'amount',
  Description: 'description',
} satisfies Record<string, keyof Transaction>;

export const TRANSACTIONS_TABLE_COLUMNS_IDS = Object.freeze({
  ...ACCESSOR_COLUMNS_IDS,
  Actions: 'transaction-action',
});

const column = createColumnHelper<TransactionsQueryRow>();

const walletColumn = column.accessor('wallet.name', {
  id: TRANSACTIONS_TABLE_COLUMNS_IDS.Wallet,
  header: 'Portfel',
  filterFn: 'equalsString',
});

const categoryColumns = column.accessor('category.name', {
  id: TRANSACTIONS_TABLE_COLUMNS_IDS.Category,
  header: 'Kategoria',
  filterFn: 'equalsString',
});

const amountColumn = column.accessor((data) => data.amount / 100, {
  id: TRANSACTIONS_TABLE_COLUMNS_IDS.Amount,
  header: 'Kwota',
  cell: (context) =>
    context.getValue().toLocaleString(APP_LOCALE, {
      style: 'currency',
      currency: APP_CURRENCY_CODE,
    }),
  filterFn: 'inNumberRange',
});

const descriptionColumn = column.accessor((data) => data.description, {
  id: TRANSACTIONS_TABLE_COLUMNS_IDS.Description,
  header: 'Opis',
  filterFn: 'includesString',
});

const actionsColumn = (
  wallets: WalletsListQueryData,
  categories: CategoriesListQueryData,
) =>
  column.display({
    id: TRANSACTIONS_TABLE_COLUMNS_IDS.Actions,
    header: 'Akcje',
    cell: ({ row }) => (
      <RowActions>
        <EditTransactionAction
          wallets={wallets}
          categories={categories}
          transaction={row.original}
        />
        <DeleteTransactionAction id={row.original.id} />
      </RowActions>
    ),
  });

export const transactionsTableColumns = (
  wallets: WalletsListQueryData,
  categories: CategoriesListQueryData,
) => [
  walletColumn as AccessorColumnDef<TransactionsQueryRow>,
  categoryColumns as AccessorColumnDef<TransactionsQueryRow>,
  amountColumn as AccessorColumnDef<TransactionsQueryRow>,
  descriptionColumn as AccessorColumnDef<TransactionsQueryRow>,
  actionsColumn(wallets, categories),
];
