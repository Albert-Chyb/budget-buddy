import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/card.tsx';
import { Button } from '@/components/button.tsx';
import { useSignOutMutation } from '@/auth/sign-out/sign-out-mutation.ts';
import { PendingButton } from '@/components/pending-button.tsx';

export const Route = createFileRoute('/_authenticated/sign-out')({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate: signOut, isPending: isSigningOut } = useSignOutMutation();
  const navigate = useNavigate();

  function handleSignOutBtnClick() {
    signOut();
  }

  function handleCancelBtnClick() {
    navigate({ to: '/' });
  }

  return (
    <Card className='max-w-96 mx-auto'>
      <CardHeader>
        <CardTitle>Wyloguj się</CardTitle>
        <CardDescription>Potwierdź chęć wylogowania się.</CardDescription>
      </CardHeader>

      <CardFooter className='gap-x-2 justify-end'>
        <PendingButton
          isPending={isSigningOut}
          type='button'
          variant='secondary'
          onClick={handleSignOutBtnClick}
        >
          Wyloguj się
        </PendingButton>
        <Button
          type='button'
          onClick={handleCancelBtnClick}
        >
          Anuluj
        </Button>
      </CardFooter>
    </Card>
  );
}
