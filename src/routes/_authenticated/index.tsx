import { useTotalBalanceQuery } from '@/database/dashboard/total-balance-query';
import { useTransactionsSummaryQuery } from '@/database/dashboard/transactions-summary-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: totalBalance } = useTotalBalanceQuery();
  const { data: summary } = useTransactionsSummaryQuery();

  return (
    <>
      <h1 className='typography-large mb-4'>Statystyki</h1>

      <table>
        <tbody>
          <tr>
            <th>Balans</th>
            <td>{totalBalance?.toString()}</td>
          </tr>
          <tr>
            <th>Wydatki</th>
            <td>{summary?.expenses.toString()}</td>
          </tr>
          <tr>
            <th>Przychody</th>
            <td>{summary?.incomes.toString()}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
