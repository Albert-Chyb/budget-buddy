import { Column } from '@tanstack/react-table';
import { DateRangeFilter } from '@/data-management/common/filtering/date-range-filter.tsx';
import { TransactionsQueryRow } from '@/database/transactions/transactions-query.ts';

export interface TransactionCreatedAtFilterProps {
  column: Column<TransactionsQueryRow>;
}

export const TransactionCreatedAtFilter = (
  props: TransactionCreatedAtFilterProps,
) => {
  return (
    <DateRangeFilter
      column={props.column}
      labelContent='Data'
    />
  );
};
