import { Table } from '@/components/table.tsx';
import { PropsWithChildren, ReactNode } from 'react';
import { TablePagination } from '@/data-management/pagination/table-pagination.tsx';
import { DataTableBody } from '@/data-management/data-view/data-table-body.tsx';
import { DataTableHeader } from '@/data-management/data-view/data-table-header.tsx';
import { DataTableProp } from '@/data-management/data-view/table-type.ts';
import { TableResets } from '@/data-management/table-resets.tsx';

export interface DataTableProps extends PropsWithChildren {
  table: DataTableProp;
  filters: ReactNode;
  emptyDatasetInfo: ReactNode;
  emptyFilteredDatasetInfo: ReactNode;
}

export function DataTable(props: DataTableProps) {
  const { table, filters, emptyDatasetInfo, emptyFilteredDatasetInfo } = props;

  if (!table.getPreFilteredRowModel().rows.length) return emptyDatasetInfo;

  const filtersSection = (
    <div className='flex items-end gap-2 flex-wrap'>
      {filters}

      <TableResets table={table} />
    </div>
  );

  if (!table.getFilteredRowModel().rows.length)
    return (
      <>
        {filtersSection}

        {emptyFilteredDatasetInfo}
      </>
    );

  return (
    <>
      {filtersSection}

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
