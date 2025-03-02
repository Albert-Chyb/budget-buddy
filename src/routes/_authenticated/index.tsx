import { StatCard } from '@/dashboard/stat-card';
import { useTotalBalanceQuery } from '@/database/dashboard/total-balance-query';
import { useTransactionsSummaryQuery } from '@/database/dashboard/transactions-summary-query';
import { Currency } from '@/helpers/currency';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: totalBalance, status: totalBalanceStatus } =
    useTotalBalanceQuery();
  const { data: transactionsSummary, status: transactionsSummaryStatus } =
    useTransactionsSummaryQuery();

  if (
    totalBalanceStatus === 'success' &&
    transactionsSummaryStatus === 'success'
  ) {
    const financialResult = transactionsSummary.incomes.subtract(
      transactionsSummary.expenses,
    );

    return (
      <>
        <h1 className='typography-large mb-4'>Statystyki</h1>

        <ul className='grid grid-cols-4 gap-2'>
          <li>
            <StatCard
              value={totalBalance}
              baseValue={Currency.fromDecimal(10_000)}
            >
              <h2>Balans</h2>
            </StatCard>
          </li>
          <li>
            <StatCard
              value={transactionsSummary.expenses}
              baseValue={Currency.fromDecimal(10_000)}
              negativeDeltaIsBetter
            >
              <h2>Wydatki</h2>
            </StatCard>
          </li>
          <li>
            <StatCard
              value={transactionsSummary.incomes}
              baseValue={Currency.fromDecimal(10_000)}
            >
              <h2>Przychody</h2>
            </StatCard>
          </li>
          <li>
            <StatCard
              value={financialResult}
              baseValue={Currency.fromDecimal(10_000)}
            >
              <h2>Bilans</h2>
            </StatCard>
          </li>
        </ul>
      </>
    );
  }
}
