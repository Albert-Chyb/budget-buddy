import {
  CheckboxFilter,
  CheckboxFilterProps,
} from '@/data-management/checkbox-filter.tsx';
import { CheckboxFilterOption } from '@/data-management/checkbox-filter-option.tsx';

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
