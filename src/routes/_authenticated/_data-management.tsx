import { columnFiltersSchema } from '@/data-management/common/filtering/column-filters-state';
import {
  pageIndexSchema,
  pageSizeSchema,
} from '@/data-management/common/pagination/pagination-state-schema.ts';
import { sortingSchema } from '@/data-management/common/sorting/sorting-state.ts';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';

const tableStateSchema = z.object({
  pageSize: pageSizeSchema,
  pageIndex: pageIndexSchema,
  sorting: sortingSchema,
  columnFilters: columnFiltersSchema,
});

export const Route = createFileRoute('/_authenticated/_data-management')({
  component: RouteComponent,
  validateSearch: zodValidator(tableStateSchema),
});

function RouteComponent() {
  return <Outlet />;
}
