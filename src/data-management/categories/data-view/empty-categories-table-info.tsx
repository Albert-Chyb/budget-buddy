import {
  TableInfo,
  TableInfoDescription,
  TableInfoTitle,
} from '@/data-management/common/data-view/table-info.tsx';

export const EmptyCategoriesTableInfo = () => (
  <TableInfo>
    <TableInfoTitle>Brak danych do wyświetlenia</TableInfoTitle>
    <TableInfoDescription>
      Dodaj nową kategorię, aby rozpocząć.
    </TableInfoDescription>
  </TableInfo>
);
