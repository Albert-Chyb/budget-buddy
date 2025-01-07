import { createFileRoute } from '@tanstack/react-router';
import { DataTable } from '@/data-management/data-view/data-table.tsx';
import { DataManagementCard } from '@/data-management/data-managment.tsx';
import { CategoriesFilters } from '@/data-management/categories/filters/categories-filters.tsx';
import { useCategoriesTable } from '@/data-management/categories/data-view/categories-table-model.ts';
import { CategoryCreateButton } from '@/data-management/categories/data-mutation/actions/category-create-button.tsx';
import { EmptyCategoriesTableInfo } from '@/data-management/categories/data-view/empty-categories-table-info.tsx';
import { DataManagementCardSkeleton } from '@/data-management/data-management-card-skeleton.tsx';
import { EmptyFilteredCategoriesTableInfo } from '@/data-management/categories/data-view/empty-filtered-categories-table-info.tsx';
import { useCategoriesPageData } from '@/data-management/categories/data-view/categories-page-data.ts';

export const Route = createFileRoute(
  '/_authenticated/_data-management/categories',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { categoryTypes, categoryColors, categories, status } =
    useCategoriesPageData();
  const table = useCategoriesTable(categories, categoryTypes, categoryColors);

  if (status === 'pending')
    return (
      <DataManagementCardSkeleton
        rowsCount={5}
        colsCount={table.getAllColumns().length}
      />
    );

  if (status === 'error') return <p>Błąd w ładowaniu danych</p>;

  const filters = (
    <CategoriesFilters
      table={table}
      categoryColors={categoryColors}
      categoryTypes={categoryTypes}
    />
  );
  const dataTable = (
    <DataTable
      table={table}
      filters={filters}
      emptyDatasetInfo={<EmptyCategoriesTableInfo />}
      emptyFilteredDatasetInfo={<EmptyFilteredCategoriesTableInfo />}
    />
  );
  const creator = (
    <CategoryCreateButton
      categoryTypes={categoryTypes}
      categoryColors={categoryColors}
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
