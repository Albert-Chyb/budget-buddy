import { createFileRoute } from '@tanstack/react-router';
import { DataTable } from '@/data-management/data-table.tsx';
import { DataManagementCard } from '@/data-management/data-managment.tsx';
import { CategoriesFilters } from '@/data-management/categories/categories-filters.tsx';

import { useCategoriesTable } from '@/data-management/categories/categories-table-model.ts';

export const Route = createFileRoute('/_authenticated/categories')({
  component: RouteComponent,
});

function RouteComponent() {
  const table = useCategoriesTable();

  return (
    <DataManagementCard>
      {{
        title: <h1>Kategorie</h1>,
        description: <p>Zarządzaj kategoriami transakcji</p>,
        content: (
          <>
            <CategoriesFilters colors={[]} />

            <DataTable table={table} />
          </>
        ),
      }}
    </DataManagementCard>
  );
}
