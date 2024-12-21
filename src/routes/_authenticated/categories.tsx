import { createFileRoute } from '@tanstack/react-router';
import { DataTable } from '@/data-management/data-table.tsx';
import { DataManagementCard } from '@/data-management/data-managment.tsx';
import { CategoriesFilters } from '@/data-management/categories/categories-filters.tsx';
import { useCategoriesTable } from '@/data-management/categories/categories-table-model.ts';
import { categories } from '@/data-management/categories/dummy-categories.ts';
import { TableResets } from '@/data-management/table-resets.tsx';

export const Route = createFileRoute('/_authenticated/categories')({
  component: RouteComponent,
});

function RouteComponent() {
  const table = useCategoriesTable();
  const colors = categories.map((category) => category.color.name);

  return (
    <DataManagementCard>
      {{
        title: <h1>Kategorie</h1>,
        description: <p>Zarządzaj kategoriami transakcji</p>,
        content: (
          <>
            <div className='flex items-end gap-2 flex-wrap'>
              <CategoriesFilters
                colors={colors}
                table={table}
              />

              <TableResets table={table} />
            </div>

            <DataTable table={table} />
          </>
        ),
      }}
    </DataManagementCard>
  );
}
