import { CheckboxFilter } from '@/data-management/common/filtering/multi-selection/checkbox-filter';
import { CheckboxFilterOption } from '@/data-management/common/filtering/multi-selection/checkbox-filter-option';
import { CategoriesListQueryData } from '@/database/categories/categories-list-query.ts';
import { TransactionsQueryRow } from '@/database/transactions/transactions-query.ts';
import { Column } from '@tanstack/react-table';

export interface TransactionCategoryFilterProps {
  column: Column<TransactionsQueryRow>;
  categories: CategoriesListQueryData;
}

export const TransactionCategoryFilter = ({
  column,
  categories,
}: TransactionCategoryFilterProps) => {
  return (
    <CheckboxFilter
      column={column as Column<unknown>}
      triggerContent='Kategoria'
      labelContent='Kategoria'
    >
      {categories.map(({ id, name }) => (
        <CheckboxFilterOption
          key={id}
          value={name}
        >
          {name}
        </CheckboxFilterOption>
      ))}
    </CheckboxFilter>
  );
};
