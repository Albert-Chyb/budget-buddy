import { DesktopDataTable } from '@/data-management/common/data-view/desktop/desktop-data-table.tsx';
import { MobileDataTables } from '@/data-management/common/data-view/mobile/mobile-data-tables.tsx';
import { TableTools } from '@/data-management/common/data-view/table-tools.tsx';
import { DataTableProp } from '@/data-management/common/data-view/table-type.ts';
import { TablePagination } from '@/data-management/common/pagination/table-pagination.tsx';
import { TableResets } from '@/data-management/common/table-resets.tsx';
import { useIsMobile } from '@/helpers/is-mobile';
import { PropsWithChildren, ReactNode } from 'react';

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
