import { EnumFilter } from '@/data-management/enum-filter.tsx';
import { EnumFilterOption } from '@/data-management/enum-filter-option.tsx';

export function CategoryTypeFilter() {
  return (
    <EnumFilter>
      <EnumFilterOption value='income'>Przychód</EnumFilterOption>
      <EnumFilterOption value='expense'>Wydatek</EnumFilterOption>
    </EnumFilter>
  );
}
