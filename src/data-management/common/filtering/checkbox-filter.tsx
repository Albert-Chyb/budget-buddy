import { PropsWithChildren, ReactNode, useId } from 'react';
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
import {
  Filter,
  FilterProps,
} from '@/data-management/common/filtering/filter.tsx';

const filterValueSchema = z.array(z.any()).optional().default([]);

export interface CheckboxFilterProps extends PropsWithChildren, FilterProps {
  column: Column<unknown>;
  triggerContent: ReactNode;
}
export function CheckboxFilter({
  children,
  column,
  triggerContent,
  ...filterProps
}: CheckboxFilterProps) {
  const id = useId();
  return (
    <Filter
      id={id}
      {...filterProps}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant='outline'
            className='w-full'
          >
            {triggerContent}
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
    </Filter>
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
