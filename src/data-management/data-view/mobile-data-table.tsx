import { Table, TableBody } from '@/components/table.tsx';
import { MobileDataTableRow } from '@/data-management/data-view/mobile-data-table-row.tsx';
import { Row } from '@tanstack/react-table';
import { HeadersMap } from '@/data-management/data-view/mobile-data-tables.tsx';

interface MobileDataTableProps {
  row: Row<unknown>;
  headers: HeadersMap;
}

export const MobileDataTable = ({ row, headers }: MobileDataTableProps) => (
  <div
    className='border rounded'
    key={row.id}
  >
    <Table>
      <TableBody>
        <MobileDataTableRow
          row={row}
          headers={headers}
        />
      </TableBody>
    </Table>
  </div>
);
