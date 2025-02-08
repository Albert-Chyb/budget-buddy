import {
  AccessorColumnDef,
  createColumnHelper,
  FilterFn,
} from '@tanstack/react-table';
import { CategoriesQueryRow } from '@/database/categories/categories-query.ts';
import { Tables } from '@/database/types.ts';
import { CategoryColor } from '@/database/category-colors/query.ts';
import { CategoryTypesQueryRow } from '@/database/category-types/query.ts';
import { CategoryColorCell } from '@/data-management/categories/data-view/category-color-cell.tsx';
import { CategoryUpdateAction } from '@/data-management/categories/data-mutation/actions/category-update-action.tsx';
import { CategoryDeleteAction } from '@/data-management/categories/data-mutation/actions/category-delete-action.tsx';
import { RowActions } from '@/data-management/common/data-mutation/row-actions.tsx';
import { checkboxFilterFn } from '@/data-management/common/filtering/checkbox-filter.tsx';

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
});

const categoryColorColumn = column.accessor(
  (category) => category.color?.name,
  {
    id: CategoriesTableColumnsId.Color,
    header: 'Kolor',
    filterFn: checkboxFilterFn as FilterFn<CategoriesQueryRow>,
    cell: ({ row }) => <CategoryColorCell categoryColor={row.original.color} />,
  },
);

const categoryActionsColumnBuilder = (
  categoryTypes: CategoryTypesQueryRow[],
  categoryColors: CategoryColor[],
) =>
  column.display({
    id: CategoriesTableColumnsId.Actions,
    header: 'Akcje',
    cell: ({ row }) => (
      <RowActions>
        <CategoryUpdateAction
          categoryColors={categoryColors}
          categoryTypes={categoryTypes}
          category={row.original}
        />

        <CategoryDeleteAction category={row.original} />
      </RowActions>
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
