import { Column } from '@tanstack/react-table';
import { Input } from '@/components/input.tsx';
import { Filter } from '@/data-management/common/filtering/filter.tsx';

export type RangeFilterValue = [number | null, number | null] | undefined;

const standardizeFilterValue = (
  filterValue: unknown,
): NonNullable<RangeFilterValue> => {
  if (Array.isArray(filterValue))
    return [filterValue[0] ?? null, filterValue[1] ?? null];

  return [null, null];
};

export interface RangeFilterProps {
  column: Column<unknown>;
}

export const RangeFilter = ({ column }: RangeFilterProps) => {
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
    <Filter className='flex gap-2'>
      <Input
        type='number'
        value={min ?? ''}
        onChange={($event) => handleMinValueChange($event.target.valueAsNumber)}
        placeholder='Minimum'
      />

      <Input
        type='number'
        value={max ?? ''}
        onChange={($event) => handleMaxValueChange($event.target.valueAsNumber)}
        placeholder='Maximum'
      />
    </Filter>
  );
};
