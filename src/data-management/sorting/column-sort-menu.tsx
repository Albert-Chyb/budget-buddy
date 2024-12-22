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
  SortingDirection,
} from '@/helpers/tanstack-table-sort-bridge.ts';
import { SortDirectionDropdownMenuGroup } from '@/data-management/sorting/sort-direction-dropdown-menu-group.tsx';

interface ColumnSortMenuProps extends Omit<ButtonProps, 'children'> {
  column: Column<unknown>;
}

export const ColumnSortMenu = forwardRef(
  (
    props: ColumnSortMenuProps,
    forwardedRef: ForwardedRef<ComponentRef<typeof Button>>,
  ) => {
    const { column, ...otherProps } = props;

    const sortDirection = getSortingDirection(column);
    function handleSortDirectionChange(newDirection: SortingDirection) {
      setSortingDirection(column, newDirection);
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
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
            value={sortDirection}
            onValueChange={handleSortDirectionChange}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
);
