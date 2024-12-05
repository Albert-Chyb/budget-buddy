import { createFileRoute } from '@tanstack/react-router';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/card.tsx';
import { ResetPasswordForm } from '@/auth/reset-password/reset-password-form.tsx';
import { ResetPasswordFormValue } from '@/auth/reset-password/reset-password-form-schema.ts';
import { useResetPasswordMutation } from '@/auth/reset-password/reset-password-mutation.ts';

export const Route = createFileRoute('/reset-password')({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate: resetPasswordFor, isPending: isResetPasswordPending } =
    useResetPasswordMutation();

  function handleSubmit({ email }: ResetPasswordFormValue) {
    resetPasswordFor(email);
  }

  return (
    <Card className='max-w-screen-sm mx-auto'>
      <CardHeader>
        <CardTitle>Zresetuj hasło</CardTitle>
        <CardDescription>
          Wypełnij poniższy formularz, aby zresetować hasło do konta. Na podany
          adres email zostanie wysłana wiadomość z linkiem umożliwiającym
          jednorazowe zalogowanie się na konto.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ResetPasswordForm
          onSubmit={handleSubmit}
          isPending={isResetPasswordPending}
        />
      </CardContent>
    </Card>
  );
}
