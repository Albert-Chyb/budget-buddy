import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  CircleMinus,
} from 'lucide-react';
import { SortingDirection } from '@/helpers/tanstack-table-sort-bridge.ts';
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/dropdown-menu.tsx';
import { ReactElement, ReactNode } from 'react';
import { useIsMultiSort } from '@/data-management/sorting/use-is-multi-sort.tsx';

type SortingOption = {
  direction: SortingDirection;
  label: ReactNode;
  icon: ReactElement;
};
const SORTING_OPTION_ICON_STYLES = 'size-4 inline-block mr-2';
const SORTING_OPTIONS: SortingOption[] = [
  {
    direction: 'off',
    label: 'Bez sortowania',
    icon: <CircleMinus className={SORTING_OPTION_ICON_STYLES} />,
  },
  {
    direction: 'asc',
    label: 'Rosnący',
    icon: <ArrowUpNarrowWide className={SORTING_OPTION_ICON_STYLES} />,
  },
  {
    direction: 'desc',
    label: 'Malejący',
    icon: <ArrowDownWideNarrow className={SORTING_OPTION_ICON_STYLES} />,
  },
] as const;

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
