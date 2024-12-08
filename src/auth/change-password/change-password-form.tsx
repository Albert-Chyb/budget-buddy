import {
  changePasswordFormSchema,
  ChangePasswordFormValue,
} from '@/auth/change-password/change-password-form-schema.ts';
import { FieldErrors, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/form.tsx';
import { PasswordFormField } from '@/auth/password-form-field.tsx';
import { PendingButton } from '@/components/pending-button.tsx';

export interface ChangePasswordFormProps {
  onSubmit: (formValue: ChangePasswordFormValue) => void;
  isPending: boolean;
  errors?: FieldErrors<ChangePasswordFormValue>;
}

export function ChangePasswordForm(props: ChangePasswordFormProps) {
  const { onSubmit, isPending, errors } = props;
  const form = useForm<ChangePasswordFormValue>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    errors,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <PasswordFormField<ChangePasswordFormValue>
          name='password'
          placeholder='Wpisz nowe hasło'
        />

        <PasswordFormField<ChangePasswordFormValue>
          name='confirmPassword'
          placeholder='Wpisz ponownie nowe hasło'
          label='Potwierdź hasło'
        />

        <PendingButton
          type='submit'
          className='w-full'
          isPending={isPending}
        >
          Zmień hasło
        </PendingButton>
      </form>
    </Form>
  );
}
