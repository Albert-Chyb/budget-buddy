import { createFileRoute } from '@tanstack/react-router';
import { DataTable } from '@/data-management/data-view/data-table.tsx';
import { DataManagementCard } from '@/data-management/data-managment.tsx';
import { CategoriesFilters } from '@/data-management/categories/categories-filters.tsx';
import { useCategoriesTable } from '@/data-management/categories/categories-table-model.ts';
import { categories } from '@/data-management/categories/dummy-categories.ts';

export const Route = createFileRoute(
  '/_authenticated/_data-management/categories',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const table = useCategoriesTable();
  const colors = categories.map((category) => category.color.name);

  const filters = (
    <CategoriesFilters
      table={table}
      colors={colors}
    />
  );
  const dataTable = (
    <DataTable
      table={table}
      filters={filters}
    />
  );

  return (
    <DataManagementCard>
      {{
        title: <h1>Kategorie</h1>,
        description: <p>Zarządzaj kategoriami transakcji</p>,
        content: dataTable,
      }}
    </DataManagementCard>
  );
}
