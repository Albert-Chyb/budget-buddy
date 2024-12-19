import { Table } from '@/components/table.tsx';
import { PropsWithChildren } from 'react';
import { Table as TanStackTable } from '@tanstack/react-table';
import { TablePagination } from '@/data-management/table-pagination.tsx';
import { DataTableBody } from '@/data-management/data-table-body.tsx';
import { DataTableHeader } from '@/data-management/data-table-header.tsx';

export interface DataTableProps extends PropsWithChildren {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: TanStackTable<any>;
}

export function DataTable(props: DataTableProps) {
  const { table } = props;

  return (
    <>
      <div className='border rounded'>
        <Table>
          <DataTableHeader table={table} />
          <DataTableBody table={table} />
        </Table>
      </div>

      <TablePagination />
    </>
  );
}
