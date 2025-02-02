import { Filters } from '@/data-management/filtering/filters.tsx';
import { TransactionWalletFilter } from '@/data-management/transactions/filtering/transaction-wallet-filter.tsx';
import { Table } from '@tanstack/react-table';
import { WalletsListQueryData } from '@/database/wallets/wallets-list-query.ts';
import { TRANSACTIONS_TABLE_COLUMNS_IDS } from '@/data-management/transactions/data-view/transactions-table-columns.tsx';
import { TransactionsQueryRow } from '@/database/transactions/transactions-query.ts';
import { TransactionCategoryFilter } from '@/data-management/transactions/filtering/transaction-category-filter.tsx';
import { CategoriesListQueryData } from '@/database/categories/categories-list-query.ts';
import { TransactionAmountFilter } from '@/data-management/transactions/filtering/transaction-amount-filter.tsx';
import { TransactionDescriptionFilter } from '@/data-management/transactions/filtering/transaction-description-filter.tsx';
import { DateRangeFilter } from '@/data-management/filtering/date-range-filter.tsx';

export interface TransactionsTableFiltersProps {
  table: Table<TransactionsQueryRow>;
  wallets: WalletsListQueryData;
  categories: CategoriesListQueryData;
}

export const TransactionsTableFilters = ({
  table,
  wallets,
  categories,
}: TransactionsTableFiltersProps) => {
  return (
    <Filters>
      <TransactionWalletFilter
        column={table.getColumn(TRANSACTIONS_TABLE_COLUMNS_IDS.Wallet)!}
        wallets={wallets}
      />

      <TransactionCategoryFilter
        column={table.getColumn(TRANSACTIONS_TABLE_COLUMNS_IDS.Category)!}
        categories={categories}
      />

      <TransactionAmountFilter
        column={table.getColumn(TRANSACTIONS_TABLE_COLUMNS_IDS.Amount)!}
      />

      <TransactionDescriptionFilter
        column={table.getColumn(TRANSACTIONS_TABLE_COLUMNS_IDS.Description)!}
      />

      <DateRangeFilter
        column={table.getColumn(TRANSACTIONS_TABLE_COLUMNS_IDS.CreatedAt)!}
      />
    </Filters>
  );
};
