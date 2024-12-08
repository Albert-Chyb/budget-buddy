import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog.tsx';
import { Button } from '@/components/button.tsx';
import { z } from 'zod';
import { OTPForm } from '@/auth/reset-password/otp-form.tsx';
import { useId } from 'react';
import { OTPFormValue } from '@/auth/reset-password/otp-form-schema.ts';

const searchParamsSchema = z.object({
  email: z.string().email().catch(''),
});

export const Route = createFileRoute('/_unauthenticated/reset-password/dialog')(
  {
    component: RouteComponent,
    validateSearch: zodValidator(searchParamsSchema),
  },
);

function RouteComponent() {
  const navigate = useNavigate();
  const searchParams = Route.useSearch();
  const otpFormId = useId();

  function handleCloseBtnClick() {
    navigate({ to: '..' });
  }

  function handleSubmit({ otp }: OTPFormValue) {
    console.log({ otp });
  }

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sprawdź skrzynkę email</DialogTitle>
          <DialogDescription>
            Na adres{' '}
            <span className='text-foreground'>{searchParams.email}</span>{' '}
            wysłano wiadomość email z dalszymi instrukcjami.
          </DialogDescription>
        </DialogHeader>

        <OTPForm
          onSubmit={handleSubmit}
          id={otpFormId}
        />

        <DialogFooter>
          <Button
            onClick={handleCloseBtnClick}
            variant='secondary'
          >
            Zamknij
          </Button>
          <Button form={otpFormId}>Zaloguj się</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
