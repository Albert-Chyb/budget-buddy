import { PropsWithChildren, ReactNode } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/popover.tsx';
import { Button } from '@/components/button.tsx';
import { Column, FilterFn } from '@tanstack/react-table';
import { CheckboxesGroup } from '@/helpers/checkboxes-group.tsx';
import { z } from 'zod';
import { ScrollArea } from '@/components/scroll-area.tsx';

const filterValueSchema = z.array(z.any()).optional().default([]);

export interface CheckboxFilterProps extends PropsWithChildren {
  column: Column<unknown>;
  label: ReactNode;
}
export function CheckboxFilter({
  children,
  column,
  label,
}: CheckboxFilterProps) {
  return (
    <li>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className='w-full'
          >
            {label}
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

export const checkboxFilterFn: FilterFn<unknown> = (
  row,
  columnId,
  filterValue,
) => {
  if (!Array.isArray(filterValue) || !filterValue.length) return true;

  return filterValue.includes(row.getValue(columnId));
};
