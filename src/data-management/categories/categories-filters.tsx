import { Filters } from '@/data-management/filters.tsx';
import { CategoryNameFilter } from '@/data-management/categories/category-name-filter.tsx';
import { CategoryTypeFilter } from '@/data-management/categories/category-type-filter.tsx';
import { CategoryColorFilter } from '@/data-management/categories/category-color-filter.tsx';

interface CategoriesFiltersProps {
  colors: string[];
}

export const CategoriesFilters = (props: CategoriesFiltersProps) => {
  const { colors } = props;

  return (
    <Filters>
      <CategoryNameFilter />

      <CategoryTypeFilter />

      <CategoryColorFilter colors={colors} />
    </Filters>
  );
};
