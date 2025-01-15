import { createFileRoute } from '@tanstack/react-router';
import { DataManagementPage } from '@/data-management/data-management-page.tsx';
import { WalletCreateButton } from '@/data-management/wallets/data-mutation/actions/create-button.tsx';

export const Route = createFileRoute(
  '/_authenticated/_data-management/wallets',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DataManagementPage>
      {{
        title: 'Portfele',
        description: 'Zarządzaj swoimi portfelami',
        creator: <WalletCreateButton />,
        content: <span>CONTENT</span>,
      }}
    </DataManagementPage>
  );
}
