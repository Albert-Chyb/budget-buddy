import {
  CheckboxFilter,
  CheckboxFilterProps,
} from '@/data-management/filtering/checkbox-filter.tsx';
import { CheckboxFilterOption } from '@/data-management/filtering/checkbox-filter-option.tsx';
import { CategoryColor } from '@/database/category-color-schema.ts';

interface CategoryColorFilterProps extends CheckboxFilterProps {
  colors: CategoryColor[];
}

export function CategoryColorFilter(props: CategoryColorFilterProps) {
  const { colors, ...otherProps } = props;
  return (
    <CheckboxFilter {...otherProps}>
      {colors.map((color) => (
        <CheckboxFilterOption
          key={color.id}
          value={color.id}
        >
          {color.name}
        </CheckboxFilterOption>
      ))}
    </CheckboxFilter>
  );
}
