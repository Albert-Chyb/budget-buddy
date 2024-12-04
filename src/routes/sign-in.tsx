import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/card.tsx';
import { SignInForm } from '@/auth/sign-in/sign-in-form.tsx';
import { SignInFormValue } from '@/auth/sign-in/sign-in-form-schema.ts';

export const Route = createFileRoute('/sign-in')({
  component: RouteComponent,
});

function RouteComponent() {
  function handleSignInFormSubmit(formValue: SignInFormValue) {
    console.log(formValue);
  }

  return (
    <Card className='max-w-screen-sm mx-auto'>
      <CardHeader>
        <CardTitle>Zaloguj się</CardTitle>
        <CardDescription>
          Wypełnij poniższy formularz, aby zalogować sie na istniejące konto.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm
          isPending={false}
          onSubmit={handleSignInFormSubmit}
        />
      </CardContent>
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
