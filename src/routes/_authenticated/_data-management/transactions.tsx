import { createFileRoute } from '@tanstack/react-router';
import { DataManagementPage } from '@/data-management/data-management-page.tsx';
import { useTransactionsPageData } from '@/data-management/transactions/data-view/transactions-page-data.ts';
import { CreateTransactionAction } from '@/data-management/transactions/data-mutation/actions/create-transaction-action.tsx';
import { DataTable } from '@/data-management/data-view/data-table.tsx';
import { useDataTable } from '@/data-management/data-view/data-table-state.ts';
import { transactionsTableColumns } from '@/data-management/transactions/data-view/transactions-table-columns.tsx';
import { useMemo } from 'react';

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
  const table = useDataTable(transactions, columns);

  return (
    <DataManagementPage
      status={status}
      colsCount={3}
    >
      {{
        title: <h1>Transakcje</h1>,
        description: <p>Przeglądaj i zarządzaj swoimi transakcjami</p>,
        content: (
          <DataTable
            table={table}
            filters='Filtry'
            emptyFilteredDatasetInfo='Brak danych do tych filtrów'
            emptyDatasetInfo='Brak danych'
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
