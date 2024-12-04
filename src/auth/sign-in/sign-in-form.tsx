import { FieldErrors, useForm } from 'react-hook-form';
import {
  signInFormSchema,
  SignInFormValue,
} from '@/auth/sign-in/sign-in-form-schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmailFormField } from '@/auth/email-form-field.tsx';
import { PasswordFormField } from '@/auth/password-form-field.tsx';
import { PendingButton } from '@/components/pending-button.tsx';
import { Form } from '@/components/form.tsx';

type SignInFormErrors = FieldErrors<SignInFormValue>;

interface SignInFormProps {
  onSubmit: (formValue: SignInFormValue) => void;
  isPending: boolean;
  errors?: SignInFormErrors;
}

export function SignInForm(props: SignInFormProps) {
  const { onSubmit, errors, isPending } = props;

  const form = useForm<SignInFormValue>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    errors,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <EmailFormField<SignInFormValue> name='email' />

        <PasswordFormField<SignInFormValue>
          name='password'
          placeholder='Hasło do twojego konta'
        />

        <PendingButton
          isPending={isPending}
          className='w-full'
        >
          Zaloguj się
        </PendingButton>
      </form>
    </Form>
  );
}
