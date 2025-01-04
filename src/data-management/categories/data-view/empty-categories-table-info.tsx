import {
  EmptyTableInfo,
  EmptyTableInfoDescription,
  EmptyTableInfoTitle,
} from '@/data-management/data-view/empty-table-info.tsx';

export const EmptyCategoriesTableInfo = () => (
  <EmptyTableInfo>
    <EmptyTableInfoTitle>Brak danych do wyświetlenia</EmptyTableInfoTitle>
    <EmptyTableInfoDescription>
      Dodaj nową kategorię, aby rozpocząć.
    </EmptyTableInfoDescription>
  </EmptyTableInfo>
);
