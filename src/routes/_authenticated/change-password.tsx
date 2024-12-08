import { createFileRoute } from '@tanstack/react-router';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/card.tsx';
import { ChangePasswordForm } from '@/auth/change-password/change-password-form.tsx';
import { useChangePasswordMutation } from '@/auth/change-password/change-password-mutation.ts';
import { ChangePasswordFormValue } from '@/auth/change-password/change-password-form-schema.ts';
import { convertChangePasswordErrorToFormError } from '@/auth/change-password/convert-change-password-error-to-form-error.ts';

export const Route = createFileRoute('/_authenticated/change-password')({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    mutate: changePassword,
    isPending: isChangingPassword,
    error,
  } = useChangePasswordMutation();
  const formErrors = convertChangePasswordErrorToFormError(error);

  function handleSubmit({ password }: ChangePasswordFormValue) {
    changePassword(password);
  }

  return (
    <Card className='max-w-screen-sm mx-auto'>
      <CardHeader>
        <CardTitle>
          <h1>Zmień hasło</h1>
        </CardTitle>
        <CardDescription>
          <p>
            Wypełnij poniższy formularz, aby zmienić hasło do swojego konta.
          </p>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChangePasswordForm
          onSubmit={handleSubmit}
          isPending={isChangingPassword}
          errors={formErrors}
        />
      </CardContent>
    </Card>
  );
}
