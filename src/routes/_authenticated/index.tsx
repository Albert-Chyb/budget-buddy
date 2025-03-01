import { buttonVariants } from '@/components/button.tsx';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/card.tsx';
import { useTotalBalanceQuery } from '@/database/dashboard/total-balance-query';
import { useTransactionsSummaryQuery } from '@/database/dashboard/transactions-summary-query';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: totalBalance } = useTotalBalanceQuery();
  const { data: summary } = useTransactionsSummaryQuery();

  return (
    <>
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

      <h1 className='typography-large mb-4'>Zarządzaj danymi</h1>

      <ul
        aria-label='Lista funkcji'
        className='grid gap-2'
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        }}
      >
        <li>
          <section>
            <Card>
              <CardHeader>
                <CardTitle>
                  <h2>Kategorie</h2>
                </CardTitle>
                <CardDescription>
                  <p>
                    Kategorie w dzienniku wydatków służą do przypisywania
                    wydatków do określonych grup tematycznych, co pozwala na
                    lepsze zrozumienie, jak rozkładają się Twoje finanse.
                    Użytkownik może tworzyć własne kategorie, dostosowane do
                    swoich potrzeb. Dzięki temu:
                  </p>
                  <ul className='typography-list'>
                    <li>
                      Możesz łatwo zobaczyć, ile wydajesz na poszczególne
                      aspekty życia.
                    </li>
                    <li>
                      Analiza danych finansowych staje się bardziej intuicyjna
                      dzięki podziałowi na segmenty.
                    </li>
                  </ul>
                </CardDescription>
              </CardHeader>

              <CardFooter className='justify-end'>
                <Link
                  to='/categories'
                  className={buttonVariants({ variant: 'link' })}
                >
                  Zarządzaj kategoriami
                </Link>
              </CardFooter>
            </Card>
          </section>
        </li>

        <li>
          <section>
            <Card>
              <CardHeader>
                <CardTitle>
                  <h2>Portfele</h2>
                </CardTitle>
                <CardDescription>
                  <p>
                    Portfele reprezentują różne źródła lub miejsca
                    przechowywania środków finansowych, takie jak gotówka, konto
                    bankowe, karta kredytowa czy portfel cyfrowy. Każdy portfel
                    pozwala na śledzenie przepływów finansowych w konkretnym
                    kanale, co pomaga w:
                  </p>
                  <ul className='typography-list'>
                    <li>
                      Monitorowaniu salda i transakcji dla każdego portfela z
                      osobna.
                    </li>
                    <li>
                      Analizie, z którego źródła najczęściej finansowane są
                      poszczególne wydatki.
                    </li>
                  </ul>
                </CardDescription>
              </CardHeader>

              <CardFooter className='justify-end'>
                <Link
                  to='/wallets'
                  className={buttonVariants({ variant: 'link' })}
                >
                  Zarządzaj portfelami
                </Link>
              </CardFooter>
            </Card>
          </section>
        </li>

        <li>
          <section>
            <Card>
              <CardHeader>
                <CardTitle>
                  <h2>Transakcje</h2>
                </CardTitle>
                <CardDescription>
                  <p>
                    Funkcja "Transakcje" umożliwia zarządzanie wydatkami i
                    przychodami, pomagając w lepszej kontroli budżetu
                    osobistego. Użytkownik może dodawać, edytować, przeglądać
                    oraz usuwać transakcje.
                  </p>
                </CardDescription>
              </CardHeader>

              <CardFooter className='justify-end'>
                <Link
                  to='/transactions'
                  className={buttonVariants({ variant: 'link' })}
                >
                  Zarządzaj portfelami
                </Link>
              </CardFooter>
            </Card>
          </section>
        </li>
      </ul>
    </>
  );
}
