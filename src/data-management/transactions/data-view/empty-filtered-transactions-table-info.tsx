import {
  TableInfo,
  TableInfoDescription,
  TableInfoTitle,
} from '@/data-management/data-view/table-info.tsx';

export const EmptyFilteredTransactionsTableInfo = () => (
  <TableInfo>
    <TableInfoTitle>Brak danych</TableInfoTitle>
    <TableInfoDescription>
      Wybrane filtry nie pasują do żadnej transakcji.
    </TableInfoDescription>
  </TableInfo>
);
