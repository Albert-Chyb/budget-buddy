import {
  SingleEnumFilter,
  SingleEnumFilterProps,
} from '@/data-management/enum-filter.tsx';
import { EnumFilterOption } from '@/data-management/enum-filter-option.tsx';

export function CategoryTypeFilter(
  props: Omit<SingleEnumFilterProps, 'children'>,
) {
  return (
    <SingleEnumFilter {...props}>
      <EnumFilterOption value='income'>Przychód</EnumFilterOption>
      <EnumFilterOption value='expense'>Wydatek</EnumFilterOption>
    </SingleEnumFilter>
  );
}
