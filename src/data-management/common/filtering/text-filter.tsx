import { Input } from '@/components/input.tsx';
import { ComponentProps, ComponentRef, ForwardedRef, forwardRef } from 'react';
import { Column } from '@tanstack/react-table';
import { z } from 'zod';
import { Filter } from '@/data-management/common/filtering/filter.tsx';

const filterValueSchema = z.string().optional().default('');

export interface TextFilterProps extends ComponentProps<typeof Input> {
  column: Column<unknown>;
}

export const TextFilter = forwardRef(
  (
    props: TextFilterProps,
    forwardedRef: ForwardedRef<ComponentRef<typeof Input>>,
  ) => {
    const { column, ...inputProps } = props;
    return (
      <Filter>
        <Input
          type='text'
          value={filterValueSchema.parse(column.getFilterValue())}
          onChange={($event) => column.setFilterValue($event.target.value)}
          ref={forwardedRef}
          {...inputProps}
        />
      </Filter>
    );
  },
);
