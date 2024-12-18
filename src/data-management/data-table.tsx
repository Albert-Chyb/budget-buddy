import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table.tsx';
import { SortableTableHead } from '@/data-management/sortable-table-head.tsx';
import { PropsWithChildren } from 'react';

export function DataTable({ children }: PropsWithChildren) {
  return (
    <div className='border rounded'>
      <Table>
        <TableCaption>Lista kategorii</TableCaption>
        <TableHeader>
          <TableRow>
            <SortableTableHead>Nazwa</SortableTableHead>
            <SortableTableHead>Typ</SortableTableHead>
            <SortableTableHead>Kolor</SortableTableHead>
            <TableHead>Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </Table>
    </div>
  );
}
