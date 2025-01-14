import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/card.tsx';
import { buttonVariants } from '@/components/button.tsx';

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h1 className='typography-large mb-4'>Zarządzaj danymi</h1>

      <div className='grid grid-cols-4 gap-2'>
        <section>
          <Card>
            <CardHeader>
              <CardTitle>
                <h2>Kategorie</h2>
              </CardTitle>
              <CardDescription>
                <p>Przeglądaj i edytuj kategorie transakcji.</p>
              </CardDescription>
            </CardHeader>

            <CardFooter className='justify-end'>
              <Link
                to='/categories'
                className={buttonVariants({ variant: 'ghost' })}
              >
                Przejdź do strony
              </Link>
            </CardFooter>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>
                <h2>Portfele</h2>
              </CardTitle>
              <CardDescription>
                <p>Przeglądaj i edytuj swoje portfele.</p>
              </CardDescription>
            </CardHeader>

            <CardFooter className='justify-end'>
              <Link
                to='/wallets'
                className={buttonVariants({ variant: 'ghost' })}
              >
                Przejdź do strony
              </Link>
            </CardFooter>
          </Card>
        </section>
      </div>
    </>
  );
}
