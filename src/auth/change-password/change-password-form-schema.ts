import { z } from 'zod';
import { passwordFormFieldSchema } from '@/auth/password-form-field-schema.ts';

export const changePasswordFormSchema = z
  .object({
    password: passwordFormFieldSchema,
    confirmPassword: passwordFormFieldSchema,
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Hasła nie są takie same',
    path: ['confirmPassword'],
  });

export type ChangePasswordFormValue = z.infer<typeof changePasswordFormSchema>;
