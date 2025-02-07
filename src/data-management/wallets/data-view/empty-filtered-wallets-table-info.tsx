import {
  TableInfo,
  TableInfoDescription,
  TableInfoTitle,
} from '@/data-management/common/data-view/table-info.tsx';

export const EmptyFilteredWalletsTableInfo = () => (
  <TableInfo>
    <TableInfoTitle>Brak wyników</TableInfoTitle>
    <TableInfoDescription>
      Wybrane filtry nie pasują do żadnego portfela. Spróbuj zmienić ustawienia
      filtrów, aby znaleźć interesujące Cię dane.
    </TableInfoDescription>
  </TableInfo>
);
