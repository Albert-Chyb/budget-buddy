import { TextFilter } from '@/data-management/common/filtering/text/text-filter';
import { TransactionsQueryRow } from '@/database/transactions/transactions-query.ts';
import { Column } from '@tanstack/react-table';

export interface TransactionDescriptionFilterProps {
  column: Column<TransactionsQueryRow>;
}

export const TransactionDescriptionFilter = ({
  column,
}: TransactionDescriptionFilterProps) => (
  <TextFilter
    column={column as Column<unknown>}
    inputProps={{
      placeholder: 'Wpisz szukaną nazwę',
    }}
    labelContent='Opis'
  />
);
