import { Filters, FiltersProps } from '@/data-management/filters.tsx';
import { CategoryNameFilter } from '@/data-management/categories/category-name-filter.tsx';
import { CategoryTypeFilter } from '@/data-management/categories/category-type-filter.tsx';
import { CategoryColorFilter } from '@/data-management/categories/category-color-filter.tsx';
import { safelyGetTableColumn } from '@/helpers/safely-get-table-column.ts';
import { CategoriesTableColumnsId } from '@/data-management/categories/categories-table-columns.tsx';

interface CategoriesFiltersProps extends FiltersProps {
  colors: string[];
}

export const CategoriesFilters = (props: CategoriesFiltersProps) => {
  const { colors, table } = props;

  return (
    <Filters table={table}>
      <CategoryNameFilter
        column={safelyGetTableColumn(table, CategoriesTableColumnsId.Name)}
      />

      <CategoryTypeFilter
        column={safelyGetTableColumn(table, CategoriesTableColumnsId.Type)}
      />

      <CategoryColorFilter
        column={safelyGetTableColumn(table, CategoriesTableColumnsId.Color)}
        colors={colors}
      />
    </Filters>
  );
};
