import { createFileRoute } from '@tanstack/react-router';
import { SignUpFormSchema } from '@/sign-up/sign-up-form-schema';
import { SignUpForm } from '@/sign-up/sign-up-form.tsx';
import { useSignUpMutation } from '@/sign-up/sign-up-mutation.ts';
import { convertSignUpErrorToFormError } from '@/sign-up/convert-sign-up-error-to-form-error.ts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/card.tsx';

export const Route = createFileRoute('/sign-up')({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    mutate: signUp,
    error: signUpError,
    isPending: isSignUpPending,
  } = useSignUpMutation();

  function handleSubmit({ email, password }: SignUpFormSchema) {
    signUp({ email, password });
  }

  const formErrors = convertSignUpErrorToFormError(signUpError);

  return (
    <Card className='max-w-screen-sm mx-auto'>
      <CardHeader>
        <CardTitle>
          <h1>Załóż konto</h1>
        </CardTitle>
        <CardDescription>
          <p>
            Wypełnij poniższy formularz, aby założyć nowe konto w aplikacji.
          </p>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <SignUpForm
          onSubmit={handleSubmit}
          errors={formErrors}
          isPending={isSignUpPending}
        />
      </CardContent>

      <CardFooter className='justify-center'>
        <p className='typography-muted'>
          Masz już konto ?{' '}
          <a
            href='#'
            className='typography-link'
          >
            Zaloguj się
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
