import { ToggleGroup } from '@/components/toggle-group.tsx';
import { ComponentPropsWithoutRef, PropsWithChildren, useId } from 'react';
import { Column } from '@tanstack/react-table';
import { z } from 'zod';
import {
  Filter,
  FilterProps,
} from '@/data-management/common/filtering/filter.tsx';
import { EnumFilterContextProvider } from '@/data-management/common/filtering/enum-filter-context.tsx';

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
  const id = useId();
  return (
    <Filter
      id={id}
      {...filterProps}
    >
      <EnumFilterContextProvider id={id}>
        <ToggleGroup
          type='single'
          variant='outline'
          value={filterValueSchema.parse(column.getFilterValue())}
          onValueChange={column.setFilterValue}
          {...toggleGroupProps}
        >
          {children}
        </ToggleGroup>
      </EnumFilterContextProvider>
    </Filter>
  );
}
