import { ToggleGroup } from '@/components/toggle-group.tsx';
import {
  Filter,
  FilterProps,
} from '@/data-management/common/filtering/filter.tsx';
import { SingleSelectionFilterContextProvider } from '@/data-management/common/filtering/single-selection-filter-context';
import { Column } from '@tanstack/react-table';
import { ComponentPropsWithoutRef, PropsWithChildren, useId } from 'react';
import { z } from 'zod';

const filterValueSchema = z.string().catch('');

type ToggleGroupType = ComponentPropsWithoutRef<typeof ToggleGroup>['type'];

type ToggleGroupProps<T extends ToggleGroupType> = ComponentPropsWithoutRef<
  typeof ToggleGroup
> & { type: T };

export interface SingleSelectionFilterProps
  extends PropsWithChildren,
    FilterProps {
  column: Column<unknown>;
  toggleGroupProps?: Omit<ToggleGroupProps<'single'>, 'type'>;
}

export function SingleSelectionFilter(props: SingleSelectionFilterProps) {
  const { column, toggleGroupProps, children, ...filterProps } = props;
  const id = useId();
  return (
    <Filter
      id={id}
      {...filterProps}
    >
      <SingleSelectionFilterContextProvider id={id}>
        <ToggleGroup
          type='single'
          variant='outline'
          value={filterValueSchema.parse(column.getFilterValue())}
          onValueChange={column.setFilterValue}
          {...toggleGroupProps}
        >
          {children}
        </ToggleGroup>
      </SingleSelectionFilterContextProvider>
    </Filter>
  );
}
