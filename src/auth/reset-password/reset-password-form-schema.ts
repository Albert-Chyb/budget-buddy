import { z } from 'zod';
import { emailFormFieldSchema } from '@/auth/email-form-field-schema.ts';

export const resetPasswordFormSchema = z.object({
  email: emailFormFieldSchema,
});

export type ResetPasswordFormValue = z.infer<typeof resetPasswordFormSchema>;
