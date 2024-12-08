import {
  changePasswordFormSchema,
  ChangePasswordFormValue,
} from '@/auth/change-password/change-password-form-schema.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/form.tsx';
import { PasswordFormField } from '@/auth/password-form-field.tsx';
import { Button } from '@/components/button.tsx';

export interface ChangePasswordFormProps {
  onSubmit: (formValue: ChangePasswordFormValue) => void;
}

export function ChangePasswordForm(props: ChangePasswordFormProps) {
  const { onSubmit } = props;
  const form = useForm<ChangePasswordFormValue>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
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
        />

        <Button
          type='submit'
          className='w-full'
        >
          Zmień hasło
        </Button>
      </form>
    </Form>
  );
}
