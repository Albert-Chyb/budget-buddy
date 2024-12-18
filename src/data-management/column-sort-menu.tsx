import { ComponentRef, ForwardedRef, forwardRef } from 'react';
import { Button, ButtonProps } from '@/components/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu.tsx';
import {
  ArrowDownWideNarrow,
  ArrowUpDown,
  ArrowUpNarrowWide,
  CircleMinus,
} from 'lucide-react';

export const ColumnSortMenu = forwardRef(
  (
    props: Omit<ButtonProps, 'children'>,
    forwardedRef: ForwardedRef<ComponentRef<typeof Button>>,
  ) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            {...props}
            ref={forwardedRef}
          >
            <ArrowUpDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='text-foreground'>
          <DropdownMenuLabel>Kierunek sortowania</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuRadioGroup value='off'>
            <DropdownMenuRadioItem value='off'>
              <CircleMinus className='size-4 inline-block mr-2' />
              Bez sortowania
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='asc'>
              <ArrowUpNarrowWide className='size-4 inline-block mr-2' />
              Rosnący
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='desc'>
              <ArrowDownWideNarrow className='size-4 inline-block mr-2' />
              Malejący
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
);
