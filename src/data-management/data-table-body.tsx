import { flexRender, Table } from '@tanstack/react-table';
import { TableBody, TableCell, TableRow } from '@/components/table.tsx';

export interface DataTableBodyProps {
  table: Table<unknown>;
}

export const DataTableBody = (props: DataTableBodyProps) => {
  const { table } = props;

  const rows = table.getRowModel().rows.map((row) => {
    const cells = row.getVisibleCells().map((cell) => {
      return (
        <TableCell>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      );
    });

    return <TableRow>{cells}</TableRow>;
  });

  return <TableBody>{rows}</TableBody>;
};
