import { createFileRoute } from '@tanstack/react-router';
import { DataManagementPage } from '@/data-management/data-management-page.tsx';
import { useTransactionsPageData } from '@/data-management/transactions/data-view/transactions-page-data.ts';
import { CreateTransactionAction } from '@/data-management/transactions/data-mutation/actions/create-transaction-action.tsx';

export const Route = createFileRoute(
  '/_authenticated/_data-management/transactions',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { wallets, categories, status } = useTransactionsPageData();

  return (
    <DataManagementPage
      status={status}
      colsCount={3}
    >
      {{
        title: <h1>Transakcje</h1>,
        description: <p>Przeglądaj i zarządzaj swoimi transakcjami</p>,
        content: '[CONTENT]',
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
