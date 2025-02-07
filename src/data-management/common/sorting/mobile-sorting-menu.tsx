import { MobileSorting } from '@/data-management/common/sorting/mobile-sorting.tsx';
import { MobileSortingColumn } from '@/data-management/common/sorting/mobile-sorting-column.tsx';
import { flexRender } from '@tanstack/react-table';
import { DataTableProp } from '@/data-management/common/data-view/table-type.ts';

interface MobileSortingMenuProps {
  table: DataTableProp;
}

export const MobileSortingMenu = ({ table }: MobileSortingMenuProps) => {
  const sortableHeaders = table
    .getFlatHeaders()
    .filter((header) => header.column.getCanSort());

  return (
    <MobileSorting>
      {sortableHeaders.map(({ id, column, getContext }) => (
        <MobileSortingColumn
          key={id}
          label={flexRender(column.columnDef.header, getContext())}
          column={column}
        />
      ))}
    </MobileSorting>
  );
};
