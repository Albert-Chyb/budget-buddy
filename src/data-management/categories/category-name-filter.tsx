import {
  TextFilter,
  TextFilterProps,
} from '@/data-management/filtering/text-filter.tsx';
import { ComponentRef, ForwardedRef, forwardRef } from 'react';

type CategoryNameFilterProps = TextFilterProps;

export const CategoryNameFilter = forwardRef(
  (
    props: CategoryNameFilterProps,
    forwardedRef: ForwardedRef<ComponentRef<typeof TextFilter>>,
  ) => {
    return (
      <TextFilter
        placeholder='Wpisz szukaną nazwę'
        ref={forwardedRef}
        {...props}
      />
    );
  },
);
