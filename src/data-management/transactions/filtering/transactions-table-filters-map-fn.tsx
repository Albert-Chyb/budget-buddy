import { convertDateRangeFilterValue } from '@/data-management/common/filtering/date-range-filter.tsx';
import { FiltersMapFn } from '@/data-management/common/data-view/data-table-state.ts';
import { TRANSACTIONS_TABLE_COLUMNS_IDS } from '@/data-management/transactions/data-view/transactions-table-columns.tsx';

export const transactionsTableFiltersMapFn: FiltersMapFn = (filters) =>
  filters.map((filter) => {
    if (filter.id === TRANSACTIONS_TABLE_COLUMNS_IDS.CreatedAt)
      return convertDateRangeFilterValue(filter);

    return filter;
  });
