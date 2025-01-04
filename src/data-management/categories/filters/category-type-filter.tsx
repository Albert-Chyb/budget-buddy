import {
  SingleEnumFilter,
  SingleEnumFilterProps,
} from '@/data-management/filtering/enum-filter.tsx';
import { EnumFilterOption } from '@/data-management/filtering/enum-filter-option.tsx';

import { CategoryType } from '@/database/category-types/query.ts';

export interface CategoryTypeFilterProps
  extends Omit<SingleEnumFilterProps, 'children'> {
  categoryTypes: CategoryType[];
}

export function CategoryTypeFilter(props: CategoryTypeFilterProps) {
  const { categoryTypes, ...otherProps } = props;
  return (
    <SingleEnumFilter {...otherProps}>
      {categoryTypes.map((color) => (
        <EnumFilterOption
          key={color.id}
          value={String(color.id)}
        >
          {color.name}
        </EnumFilterOption>
      ))}
    </SingleEnumFilter>
  );
}
