import { RangeFilter } from '@/data-management/common/filtering/range/range-filter';
import { TransactionsQueryRow } from '@/database/transactions/transactions-query.ts';
import { Column } from '@tanstack/react-table';

export interface TransactionAmountFilterProps {
  column: Column<TransactionsQueryRow>;
}

export const TransactionAmountFilter = ({
  column,
}: TransactionAmountFilterProps) => {
  return (
    <RangeFilter
      column={column as Column<unknown>}
      labelContent='Kwota'
    />
  );
};
