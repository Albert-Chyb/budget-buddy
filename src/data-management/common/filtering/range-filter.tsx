import { Column } from '@tanstack/react-table';
import { Input } from '@/components/input.tsx';
import {
  Filter,
  FilterProps,
} from '@/data-management/common/filtering/filter.tsx';
import { useId } from 'react';

export type RangeFilterValue = [number | null, number | null] | undefined;

const standardizeFilterValue = (
  filterValue: unknown,
): NonNullable<RangeFilterValue> => {
  if (Array.isArray(filterValue))
    return [filterValue[0] ?? null, filterValue[1] ?? null];

  return [null, null];
};

export interface RangeFilterProps extends FilterProps {
  column: Column<unknown>;
}

export const RangeFilter = ({ column, ...filterProps }: RangeFilterProps) => {
  const id = useId();
  const [min, max] = standardizeFilterValue(column.getFilterValue());

  const handleMinValueChange = (value: number) =>
    column.setFilterValue((prev: unknown) => {
      const [, max] = standardizeFilterValue(prev);

      return [value, max];
    });

  const handleMaxValueChange = (value: number) =>
    column.setFilterValue((prev: unknown) => {
      const [min] = standardizeFilterValue(prev);

      return [min, value];
    });

  return (
    <Filter
      id={id}
      {...filterProps}
    >
      <div className='flex gap-2'>
        <Input
          id={id}
          type='number'
          value={min ?? ''}
          onChange={($event) =>
            handleMinValueChange($event.target.valueAsNumber)
          }
          placeholder='Minimum'
        />

        <Input
          type='number'
          value={max ?? ''}
          onChange={($event) =>
            handleMaxValueChange($event.target.valueAsNumber)
          }
          placeholder='Maximum'
        />
      </div>
    </Filter>
  );
};
