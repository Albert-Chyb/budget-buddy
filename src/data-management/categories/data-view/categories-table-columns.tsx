import {
  AccessorColumnDef,
  createColumnHelper,
  FilterFn,
} from '@tanstack/react-table';
import { CategoryActions } from '@/data-management/categories/data-mutation/category-actions.tsx';
import { arrayIncludesFilterFn } from '@/helpers/array-includes-filter-fn.ts';
import { CategoriesQueryRow } from '@/database/categories/categories-query.ts';
import { Tables } from '@/database/types.ts';
import { CategoryColor } from '@/database/category-colors/query.ts';
import { CategoryTypesQueryRow } from '@/database/category-types/query.ts';
import { CategoryColorCell } from '@/data-management/categories/data-view/category-color-cell.tsx';

const AccessorColumnsIds = Object.freeze({
  Name: 'name',
  Type: 'type_id',
  Color: 'color_id',
} satisfies Record<string, keyof Tables<'categories'>>);

const CategoriesTableColumnsId = Object.freeze({
  ...AccessorColumnsIds,
  Actions: 'actions',
});

const column = createColumnHelper<CategoriesQueryRow>();

const categoryNameColumn = column.accessor('name', {
  id: CategoriesTableColumnsId.Name,
  header: 'Nazwa',
  filterFn: 'includesString',
});

const categoryTypeColumn = column.accessor('type.name', {
  id: CategoriesTableColumnsId.Type,
  header: 'Typ',
  filterFn: 'equalsString',
  cell: (context) => context.row.original.type?.name,
});

const categoryColorColumn = column.accessor(
  (category) => category.color?.name,
  {
    id: CategoriesTableColumnsId.Color,
    header: 'Kolor',
    filterFn: arrayIncludesFilterFn as FilterFn<CategoriesQueryRow>,
    cell: (context) => (
      <CategoryColorCell categoryColor={context.row.original.color} />
    ),
  },
);

const categoryActionsColumnBuilder = (
  categoryTypes: CategoryTypesQueryRow[],
  categoryColors: CategoryColor[],
) =>
  column.display({
    id: CategoriesTableColumnsId.Actions,
    header: 'Akcje',
    cell: (context) => (
      <CategoryActions
        category={context.row.original}
        categoryTypes={categoryTypes}
        categoryColors={categoryColors}
      />
    ),
  });

const categoriesTableColumns = (
  categoryTypes: CategoryTypesQueryRow[],
  categoryColors: CategoryColor[],
) => [
  categoryNameColumn as AccessorColumnDef<CategoriesQueryRow>,
  categoryTypeColumn as AccessorColumnDef<CategoriesQueryRow>,
  categoryColorColumn as AccessorColumnDef<CategoriesQueryRow>,
  categoryActionsColumnBuilder(categoryTypes, categoryColors),
];

export { categoriesTableColumns, CategoriesTableColumnsId };
