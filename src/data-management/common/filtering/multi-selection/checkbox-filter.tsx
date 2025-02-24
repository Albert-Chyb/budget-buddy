import { Button } from '@/components/button.tsx';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/popover.tsx';
import { ScrollArea } from '@/components/scroll-area.tsx';
import {
  Filter,
  FilterProps,
} from '@/data-management/common/filtering/filter.tsx';
import { CheckboxesGroup } from '@/helpers/checkboxes-group/checkboxes-group';
import { Column, FilterFn } from '@tanstack/react-table';
import { PropsWithChildren, ReactNode, useId } from 'react';
import { z } from 'zod';

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
