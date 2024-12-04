import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/card.tsx';

export const Route = createFileRoute('/sign-in')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Card className='max-w-screen-sm mx-auto'>
      <CardHeader>
        <CardTitle>Zaloguj się</CardTitle>
        <CardDescription>
          Wypełnij ponizszy formularz, aby zalogować sie na istniejące konto.
        </CardDescription>
      </CardHeader>
      <CardContent>Formularz</CardContent>
      <CardFooter className='justify-center'>
        <p className='typography-muted'>
          Nie posiadasz jeszcze konta ?{' '}
          <Link
            to='/sign-up'
            className='typography-link'
          >
            Załóż konto
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
