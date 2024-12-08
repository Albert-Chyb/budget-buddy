import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
} from '@tanstack/react-router';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/card.tsx';
import { ResetPasswordForm } from '@/auth/reset-password/reset-password-form.tsx';
import { ResetPasswordFormValue } from '@/auth/reset-password/reset-password-form-schema.ts';
import { useResetPasswordMutation } from '@/auth/reset-password/reset-password-mutation.ts';
import {
  AuthSuggestion,
  AuthSuggestionLink,
  AuthSuggestions,
} from '@/auth/auth-suggestions.tsx';

export const Route = createFileRoute('/_unauthenticated/reset-password')({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate: resetPasswordFor, isPending: isResetPasswordPending } =
    useResetPasswordMutation();
  const navigate = useNavigate();

  function handleSubmit({ email }: ResetPasswordFormValue) {
    resetPasswordFor(email, {
      onSuccess: () =>
        navigate({
          to: '/reset-password/otp-dialog',
          mask: {
            to: '/reset-password',
          },
          search: {
            email,
          },
        }),
    });
  }

  return (
    <>
      <Card className='max-w-screen-sm mx-auto'>
        <CardHeader>
          <CardTitle>Zresetuj hasło</CardTitle>
          <CardDescription>
            Wypełnij poniższy formularz, aby zresetować hasło do konta. Na
            podany adres email zostanie wysłana wiadomość z linkiem
            umożliwiającym jednorazowe zalogowanie się na konto.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ResetPasswordForm
            onSubmit={handleSubmit}
            isPending={isResetPasswordPending}
          />
        </CardContent>

        <CardFooter className='justify-center'>
          <AuthSuggestions>
            <AuthSuggestion>
              <AuthSuggestionLink>
                <Link to='/sign-in'>Zaloguj się</Link>
              </AuthSuggestionLink>
            </AuthSuggestion>

            <AuthSuggestion>
              <AuthSuggestionLink>
                <Link to='/sign-up'>Zarejestruj się</Link>
              </AuthSuggestionLink>
            </AuthSuggestion>
          </AuthSuggestions>
        </CardFooter>
      </Card>

      <Outlet />
    </>
  );
}
