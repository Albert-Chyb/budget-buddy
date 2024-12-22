import {
  ComponentRef,
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
} from 'react';
import { TableHead } from '@/components/table.tsx';
import { ColumnSortMenu } from '@/data-management/sorting/column-sort-menu.tsx';
import { Column } from '@tanstack/react-table';

export interface SortableTableHeadProps extends PropsWithChildren {
  column: Column<unknown>;
}

export const SortableTableHead = forwardRef(
  (
    props: SortableTableHeadProps,
    forwardedRef: ForwardedRef<ComponentRef<typeof TableHead>>,
  ) => {
    const { children, column } = props;

    return (
      <TableHead ref={forwardedRef}>
        <div className='flex items-center gap-x-1'>
          <ColumnSortMenu
            column={column}
            aria-label='opcje sortowania kolumny'
          />
          {children}
        </div>
      </TableHead>
    );
  },
);
