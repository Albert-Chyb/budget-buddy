import { createFileRoute } from '@tanstack/react-router';
import { DataTable } from '@/data-management/data-view/data-table.tsx';
import { DataManagementCard } from '@/data-management/data-managment.tsx';
import { CategoriesFilters } from '@/data-management/categories/categories-filters.tsx';
import { useCategoriesTable } from '@/data-management/categories/categories-table-model.ts';
import { categories } from '@/data-management/categories/dummy-categories.ts';
import { CategoryCreator } from '@/data-management/categories/category-creator.tsx';
import { CategoryFormValue } from '@/data-management/categories/category-form-schema.ts';

export const Route = createFileRoute(
  '/_authenticated/_data-management/categories',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const table = useCategoriesTable();
  const colors = categories.map((category) => category.color.name);

  function handleSubmit(formValue: CategoryFormValue) {
    console.log('Create category: ', formValue);
  }

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
  const creator = <CategoryCreator onSubmit={handleSubmit} />;

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
