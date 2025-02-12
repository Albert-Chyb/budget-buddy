import { CheckboxFilter } from '@/data-management/common/filtering/checkbox-filter.tsx';
import { Column } from '@tanstack/react-table';
import { WalletsListQueryData } from '@/database/wallets/wallets-list-query.ts';
import { CheckboxFilterOption } from '@/data-management/common/filtering/checkbox-filter-option.tsx';
import { TransactionsQueryRow } from '@/database/transactions/transactions-query.ts';

interface TransactionWalletFilterProps {
  column: Column<TransactionsQueryRow>;
  wallets: WalletsListQueryData;
}

export const TransactionWalletFilter = ({
  column,
  wallets,
}: TransactionWalletFilterProps) => {
  return (
    <CheckboxFilter
      column={column as Column<unknown>}
      triggerContent='Portfel'
      labelContent='Portfel'
    >
      {wallets.map(({ name, id }) => (
        <CheckboxFilterOption
          value={name}
          key={id}
        >
          {name}
        </CheckboxFilterOption>
      ))}
    </CheckboxFilter>
  );
};
