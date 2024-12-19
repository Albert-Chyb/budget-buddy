import { createColumnHelper } from '@tanstack/react-table';
import { Category } from '@/data-management/categories/category-type.ts';
import { categoryTypeLabels } from '@/data-management/categories/category-type-labels.ts';
import { CategoryActions } from '@/data-management/categories/category-actions.tsx';

const column = createColumnHelper<Category>();

const nameColumn = column.accessor('name', {
  id: 'name',
  header: 'Nazwa',
});

const typeColumn = column.accessor('type', {
  id: 'type',
  header: 'Typ',
  cell: (context) => categoryTypeLabels[context.getValue()],
});

const colorColumn = column.accessor('color.name', {
  id: 'color',
  header: 'Kolor',
});

const actionsColumn = column.display({
  id: 'actions',
  header: 'Akcje',
  cell: () => <CategoryActions />,
});

export const categoriesTableColumns = [
  nameColumn,
  typeColumn,
  colorColumn,
  actionsColumn,
];
