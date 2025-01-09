import { Column, Header, Table as TanStackTable } from '@tanstack/react-table';
import { MobileDataTable } from '@/data-management/data-view/mobile-data-table.tsx';

export type HeadersMap = Map<Column<unknown>['id'], Header<unknown, unknown>>;

export interface MobileDataTablesProps {
  table: TanStackTable<unknown>;
}
export const MobileDataTables = ({ table }: MobileDataTablesProps) => {
  const headers = new Map(
    table.getFlatHeaders().map((header) => [header.column.id, header]),
  );

  return table.getRowModel().rows.map((row) => (
    <MobileDataTable
      key={row.id}
      row={row}
      headers={headers}
    />
  ));
};
