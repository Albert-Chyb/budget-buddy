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
import { OTPForm } from '@/auth/verify-otp/otp-form.tsx';
import { useId } from 'react';
import { OTPFormValue } from '@/auth/verify-otp/otp-form-schema.ts';
import { useVerifyOTPMutation } from '@/auth/verify-otp/verify-otp-mutation.ts';
import { PendingButton } from '@/components/pending-button.tsx';
import { convertOtpErrorToFormError } from '@/auth/verify-otp/convert-otp-error-to-form-error.ts';

const searchParamsSchema = z.object({
  email: z.string().email().catch(''),
});

export const Route = createFileRoute(
  '/_unauthenticated/reset-password/otp-dialog',
)({
  component: RouteComponent,
  validateSearch: zodValidator(searchParamsSchema),
});

function RouteComponent() {
  const navigate = useNavigate();
  const { email } = Route.useSearch();
  const otpFormId = useId();
  const { mutate: verifyOTP, isPending, error } = useVerifyOTPMutation();
  const formErrors = convertOtpErrorToFormError(error);

  function handleCloseBtnClick() {
    navigate({ to: '..' });
  }

  function handleSubmit({ otp }: OTPFormValue) {
    verifyOTP({ type: 'email', email, token: otp });
  }

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sprawdź skrzynkę email</DialogTitle>
          <DialogDescription>
            Na adres <span className='text-foreground'>{email}</span> wysłano
            wiadomość email z dalszymi instrukcjami.
          </DialogDescription>
        </DialogHeader>

        <OTPForm
          onSubmit={handleSubmit}
          id={otpFormId}
          errors={formErrors}
        />

        <DialogFooter>
          <Button
            onClick={handleCloseBtnClick}
            variant='secondary'
          >
            Zamknij
          </Button>
          <PendingButton
            isPending={isPending}
            form={otpFormId}
          >
            Zaloguj się
          </PendingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
