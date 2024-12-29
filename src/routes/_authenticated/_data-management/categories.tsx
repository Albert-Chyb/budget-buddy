import { createFileRoute } from '@tanstack/react-router';
import { DataTable } from '@/data-management/data-view/data-table.tsx';
import { DataManagementCard } from '@/data-management/data-managment.tsx';
import { CategoriesFilters } from '@/data-management/categories/filters/categories-filters.tsx';
import { useCategoriesTable } from '@/data-management/categories/data-view/categories-table-model.ts';
import {
  colors,
  categoryTypes,
  categories,
} from '@/data-management/categories/dummy-categories.ts';
import { CategoryCreator } from '@/data-management/categories/data-mutation/category-creator.tsx';
import { CategoryFormValue } from '@/data-management/categories/data-mutation/category-form-schema.ts';

export const Route = createFileRoute(
  '/_authenticated/_data-management/categories',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const table = useCategoriesTable(categories, categoryTypes, colors);

  function handleSubmit(formValue: CategoryFormValue) {
    console.log('Create category: ', formValue);
  }

  const filters = (
    <CategoriesFilters
      table={table}
      categoryColors={colors}
      categoryTypes={categoryTypes}
    />
  );
  const dataTable = (
    <DataTable
      table={table}
      filters={filters}
    />
  );
  const creator = (
    <CategoryCreator
      onSubmit={handleSubmit}
      categoryTypes={categoryTypes}
      categoryColors={colors}
    />
  );

  return (
    <DataManagementCard>
      {{
        title: <h1>Kategorie</h1>,
        description: <p>Zarządzaj kategoriami transakcji</p>,
        content: dataTable,
        creator,
      }}
    </DataManagementCard>
  );
}
