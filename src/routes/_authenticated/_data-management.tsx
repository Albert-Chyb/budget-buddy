import { createFileRoute, Outlet } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import {
  pageIndexSchema,
  pageSizeSchema,
} from '@/data-management/pagination/pagination-state-schema.ts';
import { z } from 'zod';
import { sortingSchema } from '@/data-management/sorting/sorting-state.ts';

const tableStateSchema = z.object({
  pageSize: pageSizeSchema,
  pageIndex: pageIndexSchema,
  sorting: sortingSchema,
});

export const Route = createFileRoute('/_authenticated/_data-management')({
  component: RouteComponent,
  validateSearch: zodValidator(tableStateSchema),
});

function RouteComponent() {
  return <Outlet />;
}
