import { z } from 'zod';
import { passwordFormFieldSchema } from '@/auth/password-form-field-schema.ts';
import { emailFormFieldSchema } from '@/auth/email-form-field-schema.ts';

export const signInFormSchema = z.object({
  email: emailFormFieldSchema,
  password: passwordFormFieldSchema,
});

export type SignInFormValue = z.infer<typeof signInFormSchema>;
