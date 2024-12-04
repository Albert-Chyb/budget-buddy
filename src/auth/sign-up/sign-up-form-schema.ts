import { z } from 'zod';
import { passwordFormFieldSchema } from '@/auth/password-form-field-schema.ts';

export const signUpFormSchema = z
  .object({
    email: z.string().email({ message: 'Adres e-mail jest niepoprawny' }),
    password: passwordFormFieldSchema,
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Hasła nie są takie same',
    path: ['confirmPassword'],
  });

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
