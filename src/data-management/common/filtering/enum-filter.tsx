import { ToggleGroup } from '@/components/toggle-group.tsx';
import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import { Column } from '@tanstack/react-table';
import { z } from 'zod';
import {
  Filter,
  FilterProps,
} from '@/data-management/common/filtering/filter.tsx';

const filterValueSchema = z.string().optional().default('');

type ToggleGroupType = ComponentPropsWithoutRef<typeof ToggleGroup>['type'];

type ToggleGroupProps<T extends ToggleGroupType> = ComponentPropsWithoutRef<
  typeof ToggleGroup
> & { type: T };

export interface SingleEnumFilterProps extends PropsWithChildren, FilterProps {
  column: Column<unknown>;
  toggleGroupProps?: Omit<ToggleGroupProps<'single'>, 'type'>;
}

export function SingleEnumFilter(props: SingleEnumFilterProps) {
  const { column, toggleGroupProps, children, ...filterProps } = props;
  return (
    <Filter {...filterProps}>
      <ToggleGroup
        type='single'
        variant='outline'
        value={filterValueSchema.parse(column.getFilterValue())}
        onValueChange={column.setFilterValue}
        {...toggleGroupProps}
      >
        {children}
      </ToggleGroup>
    </Filter>
  );
}
