import { Table } from '@/components/table.tsx';
import { PropsWithChildren } from 'react';
import { TablePagination } from '@/data-management/pagination/table-pagination.tsx';
import { DataTableBody } from '@/data-management/data-view/data-table-body.tsx';
import { DataTableHeader } from '@/data-management/data-view/data-table-header.tsx';
import { DataTableProp } from '@/data-management/data-view/table-type.ts';

export interface DataTableProps extends PropsWithChildren {
  table: DataTableProp;
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

      <TablePagination table={table} />
    </>
  );
}
