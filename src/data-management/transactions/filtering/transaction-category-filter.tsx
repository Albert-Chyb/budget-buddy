import { Column } from '@tanstack/react-table';
import { TransactionsQueryRow } from '@/database/transactions/transactions-query.ts';
import { CategoriesListQueryData } from '@/database/categories/categories-list-query.ts';
import { CheckboxFilter } from '@/data-management/common/filtering/checkbox-filter.tsx';
import { CheckboxFilterOption } from '@/data-management/common/filtering/checkbox-filter-option.tsx';

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
      label='Kategoria'
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
