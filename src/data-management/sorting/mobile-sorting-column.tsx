import { ReactNode } from 'react';
import { Column } from '@tanstack/react-table';
import { ToggleGroup, ToggleGroupItem } from '@/components/toggle-group.tsx';
import {
  getSortingDirection,
  setSortingDirection,
  SortingDirection,
} from '@/helpers/tanstack-table-sort-bridge.ts';
import { SORTING_OPTIONS } from '@/data-management/sorting/sorting-options.tsx';

interface MobileSortingColumnProps {
  label: ReactNode;
  column: Column<unknown>;
}

export const MobileSortingColumn = ({
  label,
  column,
}: MobileSortingColumnProps) => {
  return (
    <li>
      <div className='mb-2'>{label}</div>

      <ToggleGroup
        className='justify-start'
        type='single'
        variant='outline'
        value={getSortingDirection(column)}
        onValueChange={(value) =>
          setSortingDirection(column, value as SortingDirection, true)
        }
      >
        {SORTING_OPTIONS.map(({ direction, label }) => (
          <ToggleGroupItem
            key={direction}
            value={direction}
          >
            {label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </li>
  );
};
