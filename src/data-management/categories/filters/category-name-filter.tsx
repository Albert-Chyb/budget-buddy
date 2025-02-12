import { TextFilter } from '@/data-management/common/filtering/text-filter.tsx';
import { ComponentRef, ForwardedRef, forwardRef } from 'react';
import { Column } from '@tanstack/react-table';

interface CategoryNameFilterProps {
  column: Column<unknown>;
}

export const CategoryNameFilter = forwardRef(
  (
    { column }: CategoryNameFilterProps,
    forwardedRef: ForwardedRef<ComponentRef<typeof TextFilter>>,
  ) => {
    return (
      <TextFilter
        ref={forwardedRef}
        labelContent='Nazwa kategorii'
        column={column}
        inputProps={{
          placeholder: 'Wpisz szukaną nazwę',
        }}
      />
    );
  },
);
