import {
  CheckboxFilter,
  CheckboxFilterProps,
} from '@/data-management/filtering/checkbox-filter.tsx';
import { CheckboxFilterOption } from '@/data-management/filtering/checkbox-filter-option.tsx';

interface CategoryColorFilterProps extends CheckboxFilterProps {
  colors: string[];
}

export function CategoryColorFilter(props: CategoryColorFilterProps) {
  const { colors, ...otherProps } = props;
  return (
    <CheckboxFilter {...otherProps}>
      {colors.map((color, index) => (
        <CheckboxFilterOption
          key={index}
          value={color}
        >
          {color}
        </CheckboxFilterOption>
      ))}
    </CheckboxFilter>
  );
}
