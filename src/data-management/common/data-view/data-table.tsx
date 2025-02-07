import { PropsWithChildren, ReactNode } from 'react';
import { TablePagination } from '@/data-management/common/pagination/table-pagination.tsx';
import { DataTableProp } from '@/data-management/common/data-view/table-type.ts';
import { TableResets } from '@/data-management/table-resets.tsx';
import { TableTools } from '@/data-management/common/data-view/table-tools.tsx';
import { useIsMobile } from '@/data-management/is-mobile.ts';
import { MobileDataTables } from '@/data-management/common/data-view/mobile/mobile-data-tables.tsx';
import { DesktopDataTable } from '@/data-management/common/data-view/desktop/desktop-data-table.tsx';

export interface DataTableProps extends PropsWithChildren {
  table: DataTableProp;
  filters: ReactNode;
  emptyDatasetInfo: ReactNode;
  emptyFilteredDatasetInfo: ReactNode;
}

export function DataTable(props: DataTableProps) {
  const { table, filters, emptyDatasetInfo, emptyFilteredDatasetInfo } = props;
  const isMobile = useIsMobile();

  if (!table.getPreFilteredRowModel().rows.length) return emptyDatasetInfo;

  const tableTools = (
    <TableTools
      filters={filters}
      table={table}
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
