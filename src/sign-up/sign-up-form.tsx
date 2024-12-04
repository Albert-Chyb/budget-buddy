import {
  signUpFormSchema,
  SignUpFormSchema,
} from '@/sign-up/sign-up-form-schema.ts';
import { FieldErrors, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/form.tsx';
import { EmailFormField } from '@/auth/email-form-field.tsx';
import { PasswordFormField } from '@/auth/password-form-field.tsx';
import { PasswordRequirementsList } from '@/auth/password-requirements/password-requirements-list.tsx';
import { PendingButton } from '@/components/pending-button.tsx';

export type SignUpFormErrors = FieldErrors<SignUpFormSchema>;

export interface SignUpFormProps {
  onSubmit: (value: SignUpFormSchema) => void;
  errors?: SignUpFormErrors;
  isPending: boolean;
}

export function SignUpForm(props: SignUpFormProps) {
  const { onSubmit, errors, isPending } = props;
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
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
        <EmailFormField<SignUpFormSchema> name='email' />

        <PasswordFormField<SignUpFormSchema>
          name='password'
          placeholder='Utwórz silne hasło'
        />

        <PasswordRequirementsList<SignUpFormSchema> name='password' />

        <PasswordFormField<SignUpFormSchema>
          name='confirmPassword'
          placeholder='Wpisz utworzone hasło ponownie'
          label='Potwierdź hasło'
        />

        <PendingButton
          className='w-full'
          type='submit'
          isPending={isPending}
        >
          Załóż konto
        </PendingButton>
      </form>
    </Form>
  );
}
