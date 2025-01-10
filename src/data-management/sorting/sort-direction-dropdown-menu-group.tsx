import { SortingDirection } from '@/helpers/tanstack-table-sort-bridge.ts';
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/dropdown-menu.tsx';
import { useIsMultiSort } from '@/data-management/sorting/use-is-multi-sort.tsx';
import { SORTING_OPTIONS } from '@/data-management/sorting/sorting-options.tsx';

interface SortDropdownMenuGroupProps {
  value: SortingDirection;
  onValueChange: (value: SortingDirection, isMultiSort: boolean) => void;
}

export const SortDirectionDropdownMenuGroup = (
  props: SortDropdownMenuGroupProps,
) => {
  const { value, onValueChange } = props;
  const isMultiSortEnabled = useIsMultiSort();

  const sortingOptions = SORTING_OPTIONS.map((option) => {
    const { direction, label, icon } = option;
    return (
      <DropdownMenuRadioItem
        value={direction}
        key={direction}
      >
        {icon}
        {label}
      </DropdownMenuRadioItem>
    );
  });

  return (
    <DropdownMenuRadioGroup
      value={value}
      onValueChange={(value) =>
        onValueChange(value as SortingDirection, isMultiSortEnabled)
      }
    >
      {sortingOptions}
    </DropdownMenuRadioGroup>
  );
};
