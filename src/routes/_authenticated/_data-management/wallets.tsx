import { createFileRoute } from '@tanstack/react-router';
import { DataManagementPage } from '@/data-management/data-management-page.tsx';
import { WalletCreateAction } from '@/data-management/wallets/data-mutation/actions/create-button-action.tsx';
import { useWalletsQuery } from '@/database/wallets/wallets-query.ts';
import { useDataTable } from '@/data-management/common/data-view/data-table-state.ts';
import { walletsTableColumns } from '@/data-management/wallets/data-view/wallets-table-columns.tsx';
import { DataTable } from '@/data-management/common/data-view/data-table.tsx';
import { EmptyWalletsTableInfo } from '@/data-management/wallets/data-view/empty-wallets-table-info.tsx';
import { EmptyFilteredWalletsTableInfo } from '@/data-management/wallets/data-view/empty-filtered-wallets-table-info.tsx';
import { WalletsFilters } from '@/data-management/wallets/filtering/wallets-filters.tsx';

export const Route = createFileRoute(
  '/_authenticated/_data-management/wallets',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { status, data: wallets } = useWalletsQuery();
  const table = useDataTable(wallets ?? [], walletsTableColumns);

  return (
    <DataManagementPage
      status={status}
      colsCount={table.getAllColumns().length}
    >
      {{
        title: <h1>Portfele</h1>,
        description: <p>Zarządzaj swoimi portfelami</p>,
        creator: <WalletCreateAction />,
        content: (
          <DataTable
            table={table}
            filters={<WalletsFilters table={table} />}
            emptyDatasetInfo={<EmptyWalletsTableInfo />}
            emptyFilteredDatasetInfo={<EmptyFilteredWalletsTableInfo />}
          />
        ),
      }}
    </DataManagementPage>
  );
}
