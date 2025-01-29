import { Column } from '@tanstack/react-table';
import { TransactionsQueryRow } from '@/database/transactions/transactions-query.ts';
import { TextFilter } from '@/data-management/filtering/text-filter.tsx';

export interface TransactionDescriptionFilterProps {
  column: Column<TransactionsQueryRow>;
}

export const TransactionDescriptionFilter = ({
  column,
}: TransactionDescriptionFilterProps) => (
  <TextFilter
    column={column as Column<unknown>}
    placeholder='Wpisz szukaną nazwę'
  />
);
