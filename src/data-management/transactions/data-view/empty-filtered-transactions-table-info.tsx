import {
  TableInfo,
  TableInfoDescription,
  TableInfoTitle,
} from '@/data-management/common/data-view/table-info.tsx';

export const EmptyFilteredTransactionsTableInfo = () => (
  <TableInfo>
    <TableInfoTitle>Brak danych</TableInfoTitle>
    <TableInfoDescription>
      Wybrane filtry nie pasują do żadnej transakcji.
    </TableInfoDescription>
  </TableInfo>
);
