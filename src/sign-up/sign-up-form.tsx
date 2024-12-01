import {
  signUpFormSchema,
  SignUpFormSchema,
} from '@/sign-up/sign-up-form-schema.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/form.tsx';
import { EmailFormField } from '@/auth/email-form-field.tsx';
import { PasswordFormField } from '@/auth/password-form-field.tsx';
import { Button } from '@/components/button.tsx';

export function SignUpForm(props: {
  handleSubmit: (value: SignUpFormSchema) => void;
}) {
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.handleSubmit)}>
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
