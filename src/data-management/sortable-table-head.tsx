import {
  ComponentRef,
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
} from 'react';
import { TableHead } from '@/components/table.tsx';
import { ColumnSortMenu } from '@/data-management/column-sort-menu.tsx';

export const SortableTableHead = forwardRef(
  (
    { children }: PropsWithChildren,
    forwardedRef: ForwardedRef<ComponentRef<typeof TableHead>>,
  ) => {
    return (
      <TableHead ref={forwardedRef}>
        <div className='flex items-center gap-x-1'>
          <ColumnSortMenu aria-label='opcje sortowania kolumny' />
          {children}
        </div>
      </TableHead>
    );
  },
);
