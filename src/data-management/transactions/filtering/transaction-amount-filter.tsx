import { RangeFilter } from '@/data-management/filtering/range-filter.tsx';
import { Column } from '@tanstack/react-table';
import { TransactionsQueryRow } from '@/database/transactions/transactions-query.ts';

export interface TransactionAmountFilterProps {
  column: Column<TransactionsQueryRow>;
}

export const TransactionAmountFilter = ({
  column,
}: TransactionAmountFilterProps) => {
  return <RangeFilter column={column as Column<unknown>} />;
};
