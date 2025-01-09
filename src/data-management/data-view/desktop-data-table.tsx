import { Table as TanStackTable } from '@tanstack/react-table';
import { DesktopDataTableHeader } from '@/data-management/data-view/desktop-data-table-header.tsx';
import { DesktopDataTableBody } from '@/data-management/data-view/desktop-data-table-body.tsx';
import { Table } from '@/components/table.tsx';

interface DesktopDataTableProps {
  table: TanStackTable<unknown>;
}

export const DesktopDataTable = ({ table }: DesktopDataTableProps) => {
  return (
    <div className='border rounded'>
      <Table>
        <DesktopDataTableHeader table={table} />
        <DesktopDataTableBody table={table} />
      </Table>
    </div>
  );
};
