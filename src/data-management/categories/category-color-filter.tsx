import { CheckboxFilter } from '@/data-management/checkbox-filter.tsx';
import { CheckboxFilterOption } from '@/data-management/checkbox-filter-option.tsx';

interface CategoryColorFilterProps {
  colors: string[];
}

export function CategoryColorFilter({ colors }: CategoryColorFilterProps) {
  return (
    <CheckboxFilter>
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
