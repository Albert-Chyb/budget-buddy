import { MobileSorting } from '@/data-management/sorting/mobile-sorting.tsx';
import { MobileSortingColumn } from '@/data-management/sorting/mobile-sorting-column.tsx';
import { safelyGetTableColumn } from '@/helpers/safely-get-table-column.ts';
import { CategoriesTableColumnsId } from '@/data-management/categories/data-view/categories-table-columns.tsx';
import { DataTableProp } from '@/data-management/data-view/table-type.ts';

interface CategoriesMobileSortingProps {
  table: DataTableProp;
}

export function CategoriesMobileSorting(props: CategoriesMobileSortingProps) {
  return (
    <MobileSorting>
      <MobileSortingColumn
        label='Nazwa'
        column={safelyGetTableColumn(
          props.table,
          CategoriesTableColumnsId.Name,
        )}
      />

      <MobileSortingColumn
        label='Typ'
        column={safelyGetTableColumn(
          props.table,
          CategoriesTableColumnsId.Type,
        )}
      />

      <MobileSortingColumn
        label='Kolor'
        column={safelyGetTableColumn(
          props.table,
          CategoriesTableColumnsId.Color,
        )}
      />
    </MobileSorting>
  );
}
