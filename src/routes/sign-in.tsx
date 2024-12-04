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
import { useSignInMutation } from '@/auth/sign-in/sign-in-mutation.ts';
import { convertSignInErrorToFormError } from '@/auth/sign-in/convert-sign-in-error-to-form-error.ts';

export const Route = createFileRoute('/sign-in')({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    mutate: signIn,
    error: signInError,
    isPending: isSignInPending,
  } = useSignInMutation();

  function handleSignInFormSubmit(formValue: SignInFormValue) {
    signIn(formValue);
  }

  const formErrors = convertSignInErrorToFormError(signInError);

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
          isPending={isSignInPending}
          onSubmit={handleSignInFormSubmit}
          errors={formErrors}
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
