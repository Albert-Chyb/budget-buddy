import { PropsWithChildren, ReactNode } from 'react';
import { TablePagination } from '@/data-management/pagination/table-pagination.tsx';
import { DataTableProp } from '@/data-management/data-view/table-type.ts';
import { TableResets } from '@/data-management/table-resets.tsx';
import { TableTools } from '@/data-management/data-view/table-tools.tsx';
import { useIsMobile } from '@/data-management/is-mobile.ts';
import { MobileDataTables } from '@/data-management/data-view/mobile-data-tables.tsx';
import { DesktopDataTable } from '@/data-management/data-view/desktop-data-table.tsx';

export interface DataTableProps extends PropsWithChildren {
  table: DataTableProp;
  filters: ReactNode;
  sorting: ReactNode;
  emptyDatasetInfo: ReactNode;
  emptyFilteredDatasetInfo: ReactNode;
}

export function DataTable(props: DataTableProps) {
  const {
    table,
    filters,
    emptyDatasetInfo,
    emptyFilteredDatasetInfo,
    sorting,
  } = props;
  const isMobile = useIsMobile();

  if (!table.getPreFilteredRowModel().rows.length) return emptyDatasetInfo;

  const tableTools = (
    <TableTools
      filters={filters}
      sorting={sorting}
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

      {isMobile ? (
        <MobileDataTables table={table} />
      ) : (
        <DesktopDataTable table={table} />
      )}

      <TablePagination table={table} />
    </>
  );
}
