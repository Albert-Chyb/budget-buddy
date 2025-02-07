import {
  TableInfo,
  TableInfoDescription,
  TableInfoTitle,
} from '@/data-management/common/data-view/table-info.tsx';

export const EmptyTransactionsTableInfo = () => (
  <TableInfo>
    <TableInfoTitle>Brak danych</TableInfoTitle>
    <TableInfoDescription>
      Nie posiadasz obecnie, żadnych transakcji. Dodaj nową, aby rozpocząć.
    </TableInfoDescription>
  </TableInfo>
);
