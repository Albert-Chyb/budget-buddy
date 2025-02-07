import { ComponentRef, ForwardedRef, forwardRef } from 'react';
import { Button, ButtonProps } from '@/components/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu.tsx';
import { ArrowUpDown } from 'lucide-react';
import { Column } from '@tanstack/react-table';
import {
  getSortingDirection,
  setSortingDirection,
} from '@/helpers/tanstack-table-sort-bridge.ts';
import { SortDirectionDropdownMenuGroup } from '@/data-management/common/sorting/sort-direction-dropdown-menu-group.tsx';
import { twMerge } from 'tailwind-merge';

interface ColumnSortMenuProps extends Omit<ButtonProps, 'children'> {
  column: Column<unknown>;
}

export const ColumnSortMenu = forwardRef(
  (
    props: ColumnSortMenuProps,
    forwardedRef: ForwardedRef<ComponentRef<typeof Button>>,
  ) => {
    const { column, className, ...otherProps } = props;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className={twMerge(
              className,
              column.getIsSorted() ? 'text-foreground' : '',
            )}
            {...otherProps}
            ref={forwardedRef}
          >
            <ArrowUpDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='text-foreground'>
          <DropdownMenuLabel>Kierunek sortowania</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <SortDirectionDropdownMenuGroup
            value={getSortingDirection(column)}
            onValueChange={(direction, isMultiSort) =>
              setSortingDirection(column, direction, isMultiSort)
            }
          />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
);
