import { createFileRoute } from '@tanstack/react-router';
import { DataTable } from '@/data-management/data-view/data-table.tsx';
import { DataManagementCard } from '@/data-management/data-managment.tsx';
import { CategoriesFilters } from '@/data-management/categories/filters/categories-filters.tsx';
import { useCategoriesTable } from '@/data-management/categories/data-view/categories-table-model.ts';
import { useCategoriesTableDataQuery } from '@/database/categories/table-data-query.ts';
import { useCategoryColorsQuery } from '@/database/category-colors/query.ts';
import { useCategoryTypesQuery } from '@/database/category-types/query.ts';
import { CategoryCreateButton } from '@/data-management/categories/data-mutation/actions/category-create-button.tsx';
import { EmptyCategoriesTableInfo } from '@/data-management/categories/data-view/empty-categories-table-info.tsx';
import { DataManagementCardSkeleton } from '@/data-management/data-management-card-skeleton.tsx';
import { EmptyFilteredCategoriesTableInfo } from '@/data-management/categories/data-view/empty-filtered-categories-table-info.tsx';

export const Route = createFileRoute(
  '/_authenticated/_data-management/categories',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: categories, status: categoriesStatus } =
    useCategoriesTableDataQuery();
  const { data: categoryColors, status: categoryColorsStatus } =
    useCategoryColorsQuery();
  const { data: categoryTypes, status: categoryTypesStatus } =
    useCategoryTypesQuery();
  const table = useCategoriesTable(
    categories ?? [],
    categoryTypes ?? [],
    categoryColors ?? [],
  );

  const isLoading =
    categoriesStatus === 'pending' ||
    categoryColorsStatus === 'pending' ||
    categoryTypesStatus === 'pending';

  if (isLoading) return <DataManagementCardSkeleton />;

  if (
    categoriesStatus !== 'success' ||
    categoryColorsStatus !== 'success' ||
    categoryTypesStatus !== 'success'
  )
    return <p>Błąd w ładowaniu danych</p>;

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
