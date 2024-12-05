import { createFileRoute } from '@tanstack/react-router';
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
import { SignUpSuggestion } from '@/auth/sign-up/sign-up-suggestion.tsx';
import { AuthSuggestions } from '@/auth/auth-suggestions.tsx';
import { ResetPasswordSuggestion } from '@/auth/reset-password/reset-password-suggestion.tsx';

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
        <AuthSuggestions>
          <SignUpSuggestion />
          <ResetPasswordSuggestion />
        </AuthSuggestions>
      </CardFooter>
    </Card>
  );
}
