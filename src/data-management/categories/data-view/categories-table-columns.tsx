import { createColumnHelper } from '@tanstack/react-table';
import { Category } from '@/data-management/categories/category-type.ts';
import { categoryTypeLabels } from '@/data-management/categories/data-view/category-type-labels.ts';
import { CategoryActions } from '@/data-management/categories/data-mutation/category-actions.tsx';
import { arrayIncludesFilterFn } from '@/helpers/array-includes-filter-fn.ts';

enum CategoriesTableColumnsId {
  Name = 'name',
  Type = 'type',
  Color = 'color',
  Actions = 'actions',
}

const column = createColumnHelper<Category>();

const categoryNameColumn = column.accessor('name', {
  id: CategoriesTableColumnsId.Name,
  header: 'Nazwa',
  filterFn: 'includesString',
});

const categoryTypeColumn = column.accessor('type', {
  id: CategoriesTableColumnsId.Type,
  header: 'Typ',
  cell: (context) => categoryTypeLabels[context.getValue()],
  filterFn: 'equalsString',
});

const categoryColorColumn = column.accessor('color.name', {
  id: CategoriesTableColumnsId.Color,
  header: 'Kolor',
  filterFn: arrayIncludesFilterFn,
});

const categoryActionsColumn = column.display({
  id: CategoriesTableColumnsId.Actions,
  header: 'Akcje',
  cell: (context) => <CategoryActions category={context.row.original} />,
});

const categoriesTableColumns = [
  categoryNameColumn,
  categoryTypeColumn,
  categoryColorColumn,
  categoryActionsColumn,
];

export { categoriesTableColumns, CategoriesTableColumnsId };
