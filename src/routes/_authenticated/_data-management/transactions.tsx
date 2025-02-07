import { createFileRoute } from '@tanstack/react-router';
import { DataManagementPage } from '@/data-management/data-management-page.tsx';
import { useTransactionsPageData } from '@/data-management/transactions/data-view/transactions-page-data.ts';
import { CreateTransactionAction } from '@/data-management/transactions/data-mutation/actions/create-transaction-action.tsx';
import { DataTable } from '@/data-management/common/data-view/data-table.tsx';
import { useDataTable } from '@/data-management/common/data-view/data-table-state.ts';
import { transactionsTableColumns } from '@/data-management/transactions/data-view/transactions-table-columns.tsx';
import { useMemo } from 'react';
import { EmptyTransactionsTableInfo } from '@/data-management/transactions/data-view/empty-transactions-table-info.tsx';
import { EmptyFilteredTransactionsTableInfo } from '@/data-management/transactions/data-view/empty-filtered-transactions-table-info.tsx';
import { TransactionsTableFilters } from '@/data-management/transactions/filtering/transactions-table-filters';
import { transactionsTableFiltersMapFn } from '@/data-management/transactions/filtering/transactions-table-filters-map-fn.tsx';

export const Route = createFileRoute(
  '/_authenticated/_data-management/transactions',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { wallets, categories, status, transactions } =
    useTransactionsPageData();
  const columns = useMemo(
    () => transactionsTableColumns(wallets, categories),
    [wallets, categories],
  );
  const table = useDataTable(
    transactions,
    columns,
    transactionsTableFiltersMapFn,
  );

  return (
    <DataManagementPage
      status={status}
      colsCount={table.getAllColumns().length}
    >
      {{
        title: <h1>Transakcje</h1>,
        description: <p>Przeglądaj i zarządzaj swoimi transakcjami</p>,
        content: (
          <DataTable
            table={table}
            filters={
              <TransactionsTableFilters
                table={table}
                wallets={wallets}
                categories={categories}
              />
            }
            emptyFilteredDatasetInfo={<EmptyFilteredTransactionsTableInfo />}
            emptyDatasetInfo={<EmptyTransactionsTableInfo />}
          />
        ),
        creator: (
          <CreateTransactionAction
            wallets={wallets}
            categories={categories}
          />
        ),
      }}
    </DataManagementPage>
  );
}
