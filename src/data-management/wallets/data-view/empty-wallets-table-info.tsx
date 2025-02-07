import {
  TableInfo,
  TableInfoDescription,
  TableInfoTitle,
} from '@/data-management/common/data-view/table-info.tsx';

export const EmptyWalletsTableInfo = () => (
  <TableInfo>
    <TableInfoTitle>Brak danych</TableInfoTitle>
    <TableInfoDescription>
      Nie posiadasz obecnie, żadnych portfeli. Dodaj nowy, aby rozpocząć.
    </TableInfoDescription>
  </TableInfo>
);
