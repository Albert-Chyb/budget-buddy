import {
  AccessorColumnDef,
  createColumnHelper,
  FilterFn,
} from '@tanstack/react-table';
import { CategoryActions } from '@/data-management/categories/data-mutation/category-actions.tsx';
import { arrayIncludesFilterFn } from '@/helpers/array-includes-filter-fn.ts';
import { CategoryRowData } from '@/database/categories/table-data-query.ts';
import { Tables } from '@/database/types.ts';
import { CategoryColor } from '@/database/category-colors/query.ts';
import { CategoryType } from '@/database/category-types/query.ts';
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

const column = createColumnHelper<CategoryRowData>();

const categoryNameColumn = column.accessor('name', {
  id: CategoriesTableColumnsId.Name,
  header: 'Nazwa',
  filterFn: 'includesString',
});

const categoryTypeColumn = column.accessor('type.id', {
  id: CategoriesTableColumnsId.Type,
  header: 'Typ',
  filterFn: 'equalsString',
  cell: (context) => context.row.original.type?.name,
});

const categoryColorColumn = column.accessor((category) => category.color?.id, {
  id: CategoriesTableColumnsId.Color,
  header: 'Kolor',
  filterFn: arrayIncludesFilterFn as FilterFn<CategoryRowData>,
  cell: (context) => (
    <CategoryColorCell categoryColor={context.row.original.color} />
  ),
});

const categoryActionsColumnBuilder = (
  categoryTypes: CategoryType[],
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
  categoryTypes: CategoryType[],
  categoryColors: CategoryColor[],
) => [
  categoryNameColumn as AccessorColumnDef<CategoryRowData>,
  categoryTypeColumn as AccessorColumnDef<CategoryRowData>,
  categoryColorColumn as AccessorColumnDef<CategoryRowData>,
  categoryActionsColumnBuilder(categoryTypes, categoryColors),
];

export { categoriesTableColumns, CategoriesTableColumnsId };
