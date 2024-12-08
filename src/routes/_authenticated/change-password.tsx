import { createFileRoute } from '@tanstack/react-router';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/card.tsx';
import { ChangePasswordForm } from '@/auth/change-password/change-password-form.tsx';

export const Route = createFileRoute('/_authenticated/change-password')({
  component: RouteComponent,
});

function RouteComponent() {
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
        <ChangePasswordForm onSubmit={console.log} />
      </CardContent>
    </Card>
  );
}
