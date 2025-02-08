import {
  AccessorColumnDef,
  createColumnHelper,
  FilterFn,
} from '@tanstack/react-table';
import { TransactionsQueryRow } from '@/database/transactions/transactions-query.ts';
import { RowActions } from '@/data-management/common/data-mutation/row-actions.tsx';
import { EditTransactionAction } from '@/data-management/transactions/data-mutation/actions/edit-transaction-action.tsx';
import { WalletsListQueryData } from '@/database/wallets/wallets-list-query.ts';
import { CategoriesListQueryData } from '@/database/categories/categories-list-query.ts';
import { DeleteTransactionAction } from '@/data-management/transactions/data-mutation/actions/delete-transaction-action.tsx';
import { dateRangeFilterFn } from '@/data-management/common/filtering/date-range-filter.tsx';
import { TransactionSchema } from '@/database/transactions/transaction-schema.ts';
import { checkboxFilterFn } from '@/data-management/common/filtering/checkbox-filter.tsx';
import { formatCreatedAtDate } from '@/data-management/transactions/transaction-row-data.ts';

const ACCESSOR_COLUMNS_IDS = {
  Wallet: 'wallet_id',
  Category: 'category_id',
  Amount: 'amount',
  Description: 'description',
  CreatedAt: 'created_at',
} satisfies Record<string, keyof TransactionSchema>;

export const TRANSACTIONS_TABLE_COLUMNS_IDS = Object.freeze({
  ...ACCESSOR_COLUMNS_IDS,
  Actions: 'transaction-action',
});

const column = createColumnHelper<TransactionsQueryRow>();

const walletColumn = column.accessor('wallet.name', {
  id: TRANSACTIONS_TABLE_COLUMNS_IDS.Wallet,
  header: 'Portfel',
  filterFn: checkboxFilterFn as FilterFn<TransactionsQueryRow>,
});

const categoryColumn = column.accessor('category.name', {
  id: TRANSACTIONS_TABLE_COLUMNS_IDS.Category,
  header: 'Kategoria',
  filterFn: checkboxFilterFn as FilterFn<TransactionsQueryRow>,
});

const createdAtColumn = column.accessor('created_at', {
  id: TRANSACTIONS_TABLE_COLUMNS_IDS.CreatedAt,
  header: 'Data',
  cell: ({ getValue }) => formatCreatedAtDate(getValue()),
  sortingFn: 'datetime',
  filterFn: dateRangeFilterFn as FilterFn<TransactionsQueryRow>,
});

const amountColumn = column.accessor(
  (transaction) => transaction.amount.toDecimal(),
  {
    id: TRANSACTIONS_TABLE_COLUMNS_IDS.Amount,
    header: 'Kwota',
    cell: ({ row }) => row.original.amount.toString(),
    filterFn: 'inNumberRange',
  },
);

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
        <DeleteTransactionAction transaction={row.original} />
      </RowActions>
    ),
  });

export const transactionsTableColumns = (
  wallets: WalletsListQueryData,
  categories: CategoriesListQueryData,
) => [
  walletColumn as AccessorColumnDef<TransactionsQueryRow>,
  categoryColumn as AccessorColumnDef<TransactionsQueryRow>,
  amountColumn as AccessorColumnDef<TransactionsQueryRow>,
  descriptionColumn as AccessorColumnDef<TransactionsQueryRow>,
  createdAtColumn as AccessorColumnDef<TransactionsQueryRow>,
  actionsColumn(wallets, categories),
];
