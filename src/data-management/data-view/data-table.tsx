import { Table } from '@/components/table.tsx';
import { PropsWithChildren, ReactNode } from 'react';
import { TablePagination } from '@/data-management/pagination/table-pagination.tsx';
import { DataTableBody } from '@/data-management/data-view/data-table-body.tsx';
import { DataTableHeader } from '@/data-management/data-view/data-table-header.tsx';
import { DataTableProp } from '@/data-management/data-view/table-type.ts';
import { TableResets } from '@/data-management/table-resets.tsx';
import { TableTools } from '@/data-management/data-view/table-tools.tsx';

export interface DataTableProps extends PropsWithChildren {
  table: DataTableProp;
  filters: ReactNode;
  emptyDatasetInfo: ReactNode;
  emptyFilteredDatasetInfo: ReactNode;
}

export function DataTable(props: DataTableProps) {
  const { table, filters, emptyDatasetInfo, emptyFilteredDatasetInfo } = props;

  if (!table.getPreFilteredRowModel().rows.length) return emptyDatasetInfo;

  const tableTools = (
    <TableTools
      filters={filters}
      tableResets={<TableResets table={table} />}
    />
  );

  if (!table.getFilteredRowModel().rows.length)
    return (
      <>
        {tableTools}

        {emptyFilteredDatasetInfo}
      </>
    );

  return (
    <>
      {tableTools}

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
