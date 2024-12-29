import { createColumnHelper, FilterFn } from '@tanstack/react-table';
import { CategoryActions } from '@/data-management/categories/data-mutation/category-actions.tsx';
import { arrayIncludesFilterFn } from '@/helpers/array-includes-filter-fn.ts';
import { CategoryType } from '@/database/category-type-schema.ts';
import { Category } from '@/database/category-schema.ts';
import { CategoryColor } from '@/database/category-color-schema.ts';

const AccessorColumnsIds = Object.freeze({
  Name: 'name',
  Type: 'type_id',
  Color: 'color_id',
} satisfies Record<string, keyof Category>);

const CategoriesTableColumnsId = Object.freeze({
  ...AccessorColumnsIds,
  Actions: 'actions',
});

const column = createColumnHelper<Category>();

const categoryNameColumn = column.accessor('name', {
  id: CategoriesTableColumnsId.Name,
  header: 'Nazwa',
  filterFn: 'includesString',
});

const categoryTypeColumn = column.accessor('type_id', {
  id: CategoriesTableColumnsId.Type,
  header: 'Typ',
  filterFn: 'equalsString',
});

const categoryColorColumn = column.accessor('color_id', {
  id: CategoriesTableColumnsId.Color,
  header: 'Kolor',
  filterFn: arrayIncludesFilterFn as FilterFn<Category>,
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
  categoryNameColumn,
  categoryTypeColumn,
  categoryColorColumn,
  categoryActionsColumnBuilder(categoryTypes, categoryColors),
];

export { categoriesTableColumns, CategoriesTableColumnsId };
