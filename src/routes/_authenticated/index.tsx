import { WalletPicker } from '@/dashboard/wallet-picker';
import { useTotalBalanceQuery } from '@/database/dashboard/total-balance-query';
import { useTransactionsSummaryQuery } from '@/database/dashboard/transactions-summary-query';
import { useWalletsListQuery } from '@/database/wallets/wallets-list-query';
import { createFileRoute } from '@tanstack/react-router';

/*
 * Create a selection for a wallet, category, year and month
 */

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: totalBalance, status: totalBalanceStatus } =
    useTotalBalanceQuery();
  const { data: transactionsSummary, status: transactionsSummaryStatus } =
    useTransactionsSummaryQuery();
  const { data: wallets, status: walletsStatus } = useWalletsListQuery();

  if (
    totalBalanceStatus === 'success' &&
    transactionsSummaryStatus === 'success' &&
    walletsStatus === 'success'
  ) {
    const financialResult = transactionsSummary.incomes.subtract(
      transactionsSummary.expenses,
    );

    return (
      <>
        <h1 className='typography-large'>Statystyki</h1>

        <WalletPicker wallets={wallets} />
      </>
    );
  }
}
