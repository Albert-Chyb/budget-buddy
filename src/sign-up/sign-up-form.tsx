import {
  signUpFormSchema,
  SignUpFormSchema,
} from '@/sign-up/sign-up-form-schema.ts';
import { FieldErrors, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/form.tsx';
import { EmailFormField } from '@/auth/email-form-field.tsx';
import { PasswordFormField } from '@/auth/password-form-field.tsx';
import { Button } from '@/components/button.tsx';

export type SignUpFormErrors = FieldErrors<SignUpFormSchema>;

export interface SignUpFormProps {
  onSubmit: (value: SignUpFormSchema) => void;
  errors?: SignUpFormErrors;
}

export function SignUpForm(props: SignUpFormProps) {
  const { onSubmit, errors } = props;
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    errors,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <EmailFormField<SignUpFormSchema> name='email' />

        <PasswordFormField<SignUpFormSchema> name='password' />

        <Button
          className='mt-2 w-full'
          type='submit'
        >
          Załóż konto
        </Button>
      </form>
    </Form>
  );
}
