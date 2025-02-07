import {
  Filters,
  FiltersProps,
} from '@/data-management/common/filtering/filters.tsx';
import { CategoryNameFilter } from '@/data-management/categories/filters/category-name-filter.tsx';
import { CategoryTypeFilter } from '@/data-management/categories/filters/category-type-filter.tsx';
import { CategoryColorFilter } from '@/data-management/categories/filters/category-color-filter.tsx';
import { safelyGetTableColumn } from '@/helpers/safely-get-table-column.ts';
import { CategoriesTableColumnsId } from '@/data-management/categories/data-view/categories-table-columns.tsx';
import { DataTableProp } from '@/data-management/common/data-view/table-type.ts';
import { CategoryColor } from '@/database/category-colors/query.ts';
import { CategoryTypesQueryRow } from '@/database/category-types/query.ts';

interface CategoriesFiltersProps extends FiltersProps {
  table: DataTableProp;
  categoryColors: CategoryColor[];
  categoryTypes: CategoryTypesQueryRow[];
}

export const CategoriesFilters = (props: CategoriesFiltersProps) => {
  const { categoryColors, table, categoryTypes } = props;

  return (
    <Filters>
      <CategoryNameFilter
        column={safelyGetTableColumn(table, CategoriesTableColumnsId.Name)}
      />

      <CategoryTypeFilter
        column={safelyGetTableColumn(table, CategoriesTableColumnsId.Type)}
        categoryTypes={categoryTypes}
      />

      <CategoryColorFilter
        column={safelyGetTableColumn(table, CategoriesTableColumnsId.Color)}
        colors={categoryColors}
        label='Kolor'
      />
    </Filters>
  );
};
