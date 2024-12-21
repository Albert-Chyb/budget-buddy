import { ToggleGroup } from '@/components/toggle-group.tsx';
import { ComponentPropsWithoutRef } from 'react';
import { Column } from '@tanstack/react-table';
import { z } from 'zod';

const filterValueSchema = z.string().optional().default('');

type ToggleGroupType = ComponentPropsWithoutRef<typeof ToggleGroup>['type'];

type ToggleGroupProps<T extends ToggleGroupType> = ComponentPropsWithoutRef<
  typeof ToggleGroup
> & { type: T };

export interface SingleEnumFilterProps
  extends Omit<ToggleGroupProps<'single'>, 'type'> {
  column: Column<unknown>;
}

export function SingleEnumFilter(props: SingleEnumFilterProps) {
  const { column, ...otherProps } = props;
  return (
    <li>
      <ToggleGroup
        type='single'
        variant='outline'
        value={filterValueSchema.parse(column.getFilterValue())}
        onValueChange={column.setFilterValue}
        {...otherProps}
      />
    </li>
  );
}
