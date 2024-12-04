import { z } from 'zod';
import { passwordFormFieldSchema } from '@/auth/password-form-field-schema.ts';
import { emailFormFieldSchema } from '@/auth/email-form-field-schema.ts';

export const signUpFormSchema = z
  .object({
    email: emailFormFieldSchema,
    password: passwordFormFieldSchema,
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Hasła nie są takie same',
    path: ['confirmPassword'],
  });

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
