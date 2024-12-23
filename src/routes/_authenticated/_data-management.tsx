import { createFileRoute, Outlet } from '@tanstack/react-router';
import { paginationStateSchema } from '@/data-management/pagination/pagination-state.ts';
import { zodValidator } from '@tanstack/zod-adapter';

export const Route = createFileRoute('/_authenticated/_data-management')({
  component: RouteComponent,
  validateSearch: zodValidator(paginationStateSchema),
});

function RouteComponent() {
  return <Outlet />;
}
