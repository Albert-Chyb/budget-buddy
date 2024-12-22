import { flexRender, Table } from '@tanstack/react-table';
import { TableHead, TableHeader, TableRow } from '@/components/table.tsx';
import { SortableTableHead } from '@/data-management/sorting/sortable-table-head.tsx';

export interface DataTableHeaderProps {
  table: Table<unknown>;
}

export const DataTableHeader = ({ table }: DataTableHeaderProps) => {
  const rows = table.getHeaderGroups().map(({ id, headers }) => {
    const cells = headers.map((header) => {
      const cellContent = flexRender(
        header.column.columnDef.header,
        header.getContext(),
      );

      if (header.column.getCanSort())
        return (
          <SortableTableHead
            column={header.column}
            key={header.id}
          >
            {cellContent}
          </SortableTableHead>
        );

      return <TableHead key={header.id}>{cellContent}</TableHead>;
    });

    return <TableRow key={id}>{cells}</TableRow>;
  });

  return <TableHeader>{rows}</TableHeader>;
};
