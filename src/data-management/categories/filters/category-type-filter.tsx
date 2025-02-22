import { SingleSelectionFilter } from '@/data-management/common/filtering/single-selection/single-selection-filter';
import { SingleSelectionFilterOption } from '@/data-management/common/filtering/single-selection/single-selection-filter-option';
import { CategoryTypesQueryRow } from '@/database/category-types/query.ts';
import { Column } from '@tanstack/react-table';

export interface CategoryTypeFilterProps {
  categoryTypes: CategoryTypesQueryRow[];
  column: Column<unknown>;
}

export function CategoryTypeFilter(props: CategoryTypeFilterProps) {
  const { categoryTypes, column } = props;
  return (
    <SingleSelectionFilter
      labelContent='Typ kategorii'
      column={column}
    >
      {categoryTypes.map((type, index) => (
        <SingleSelectionFilterOption
          key={type.id}
          value={String(type.name)}
          isFirst={index === 0}
        >
          {type.name}
        </SingleSelectionFilterOption>
      ))}
    </SingleSelectionFilter>
  );
}
