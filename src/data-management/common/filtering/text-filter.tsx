import { Input } from '@/components/input.tsx';
import {
  Filter,
  FilterProps,
} from '@/data-management/common/filtering/filter.tsx';
import { Column } from '@tanstack/react-table';
import {
  ComponentProps,
  ComponentRef,
  ForwardedRef,
  forwardRef,
  useId,
} from 'react';
import { z } from 'zod';

const filterValueSchema = z.string().default('');

export interface TextFilterProps extends FilterProps {
  column: Column<unknown>;
  inputProps?: ComponentProps<typeof Input>;
}

export const TextFilter = forwardRef(
  (
    props: TextFilterProps,
    forwardedRef: ForwardedRef<ComponentRef<typeof Input>>,
  ) => {
    const { column, inputProps, ...filterProps } = props;
    const id = useId();
    return (
      <Filter
        id={id}
        {...filterProps}
      >
        <Input
          data-testid='text-filter-input'
          id={id}
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
