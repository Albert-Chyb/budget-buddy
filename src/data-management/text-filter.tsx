import { Input } from '@/components/input.tsx';
import { ComponentProps, ComponentRef, ForwardedRef, forwardRef } from 'react';
import { Column } from '@tanstack/react-table';
import { z } from 'zod';

const filterValueSchema = z.string().optional().default('');

export interface TextFilterProps extends ComponentProps<typeof Input> {
  column: Column<unknown>;
}

export const TextFilter = forwardRef(
  (
    props: TextFilterProps,
    forwardedRef: ForwardedRef<ComponentRef<typeof Input>>,
  ) => {
    const { column, ...otherProps } = props;
    return (
      <li>
        <Input
          type='text'
          value={filterValueSchema.parse(column.getFilterValue())}
          onChange={($event) => column.setFilterValue($event.target.value)}
          ref={forwardedRef}
          {...otherProps}
        />
      </li>
    );
  },
);
