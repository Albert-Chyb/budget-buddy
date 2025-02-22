import { TextFilter } from '@/data-management/common/filtering/text/text-filter';
import { Column } from '@tanstack/react-table';
import { ComponentRef, ForwardedRef, forwardRef } from 'react';

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
