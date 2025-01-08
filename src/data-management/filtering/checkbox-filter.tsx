import { PropsWithChildren } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/popover.tsx';
import { Button } from '@/components/button.tsx';
import { Column } from '@tanstack/react-table';
import { CheckboxesGroup } from '@/helpers/checkboxes-group.tsx';
import { z } from 'zod';
import { ScrollArea } from '@/components/scroll-area.tsx';

const filterValueSchema = z.array(z.any()).optional().default([]);

export interface CheckboxFilterProps extends PropsWithChildren {
  column: Column<unknown>;
}
export function CheckboxFilter(props: CheckboxFilterProps) {
  const { children, column } = props;

  return (
    <li>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className='w-full'
          >
            Kolor
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <ScrollArea className='h-64'>
            <CheckboxesGroup
              checkedOptions={filterValueSchema.parse(column.getFilterValue())}
              onCheckedOptionsChange={column.setFilterValue}
            >
              <div className='space-y-4'>{children}</div>
            </CheckboxesGroup>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </li>
  );
}
