import {
  TableInfo,
  TableInfoDescription,
  TableInfoTitle,
} from '@/data-management/data-view/table-info.tsx';

export const EmptyFilteredCategoriesTableInfo = () => (
  <TableInfo>
    <TableInfoTitle>Brak wyników</TableInfoTitle>
    <TableInfoDescription>
      Wybrane filtry nie pasują do żadnej kategorii. Spróbuj zmienić ustawienia
      filtrów, aby znaleźć interesujące Cię dane.
    </TableInfoDescription>
  </TableInfo>
);
