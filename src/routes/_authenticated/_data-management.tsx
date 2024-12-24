import { createFileRoute, Outlet } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { paginationStateSchema } from '@/data-management/pagination/pagination-state-schema.ts';

export const Route = createFileRoute('/_authenticated/_data-management')({
  component: RouteComponent,
  validateSearch: zodValidator(paginationStateSchema),
});

function RouteComponent() {
  return <Outlet />;
}
