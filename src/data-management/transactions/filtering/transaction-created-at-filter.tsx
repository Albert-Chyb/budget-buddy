import { DateRangeFilter } from '@/data-management/common/filtering/date-range/date-range-filter';
import { TransactionsQueryRow } from '@/database/transactions/transactions-query.ts';
import { Column } from '@tanstack/react-table';

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
