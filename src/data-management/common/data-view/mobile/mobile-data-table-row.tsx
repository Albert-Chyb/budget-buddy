import { TableCell, TableHead, TableRow } from '@/components/table.tsx';
import { flexRender, Row } from '@tanstack/react-table';
import { HeadersMap } from '@/data-management/common/data-view/mobile/mobile-data-tables.tsx';

interface MobileDataTableRowProps {
  row: Row<unknown>;
  headers: HeadersMap;
}

export const MobileDataTableRow = ({ row, headers }: MobileDataTableRowProps) =>
  row.getVisibleCells().map((cell) => {
    const header = headers.get(cell.column.id)!;

    return (
      <TableRow key={cell.id}>
        <TableHead>
          {flexRender(header.column.columnDef.header, header.getContext())}
        </TableHead>
        <TableCell>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      </TableRow>
    );
  });
