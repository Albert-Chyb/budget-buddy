import { SingleEnumFilter } from '@/data-management/common/filtering/enum-filter.tsx';
import { EnumFilterOption } from '@/data-management/common/filtering/enum-filter-option.tsx';
import { CategoryTypesQueryRow } from '@/database/category-types/query.ts';
import { Column } from '@tanstack/react-table';

export interface CategoryTypeFilterProps {
  categoryTypes: CategoryTypesQueryRow[];
  column: Column<unknown>;
}

export function CategoryTypeFilter(props: CategoryTypeFilterProps) {
  const { categoryTypes, column } = props;
  return (
    <SingleEnumFilter
      labelContent='Typ kategorii'
      column={column}
    >
      {categoryTypes.map((type) => (
        <EnumFilterOption
          key={type.id}
          value={String(type.name)}
        >
          {type.name}
        </EnumFilterOption>
      ))}
    </SingleEnumFilter>
  );
}
