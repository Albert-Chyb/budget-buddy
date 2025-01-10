import { SortingDirection } from '@/helpers/tanstack-table-sort-bridge.ts';
import { ReactElement, ReactNode } from 'react';
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  CircleMinus,
} from 'lucide-react';

type SortingOption = {
  direction: SortingDirection;
  label: ReactNode;
  icon: ReactElement;
};
const SORTING_OPTION_ICON_STYLES = 'size-4 inline-block mr-2';
export const SORTING_OPTIONS: SortingOption[] = [
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
