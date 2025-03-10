import { CheckboxFilter } from '@/data-management/common/filtering/multi-selection/checkbox-filter';
import { CheckboxFilterOption } from '@/data-management/common/filtering/multi-selection/checkbox-filter-option';

import { CategoryColor } from '@/database/category-colors/query.ts';
import { Column } from '@tanstack/react-table';

interface CategoryColorFilterProps {
  column: Column<unknown>;
  colors: CategoryColor[];
}

export function CategoryColorFilter(props: CategoryColorFilterProps) {
  const { colors, column } = props;
  return (
    <CheckboxFilter
      column={column}
      labelContent='Kolor kategorii'
      triggerContent='Kolor'
    >
      {colors.map((color) => (
        <CheckboxFilterOption
          key={color.id}
          value={color.name}
        >
          {color.name}
        </CheckboxFilterOption>
      ))}
    </CheckboxFilter>
  );
}
