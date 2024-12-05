import { Form } from '@/components/form.tsx';
import { useForm } from 'react-hook-form';
import {
  resetPasswordFormSchema,
  ResetPasswordFormValue,
} from '@/auth/reset-password/reset-password-form-schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmailFormField } from '@/auth/email-form-field';
import { PendingButton } from '@/components/pending-button.tsx';

interface ResetPasswordFormProps {
  onSubmit: (formValue: ResetPasswordFormValue) => void;
  isPending: boolean;
}

export function ResetPasswordForm(props: ResetPasswordFormProps) {
  const { onSubmit, isPending } = props;

  const form = useForm({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <EmailFormField<ResetPasswordFormValue> name='email' />

        <PendingButton
          type='submit'
          className='w-full'
          isPending={isPending}
        >
          Zresetuj hasło
        </PendingButton>
      </form>
    </Form>
  );
}
