import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_authenticated/_data-management/wallets',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/_data-management/wallets"!</div>;
}
