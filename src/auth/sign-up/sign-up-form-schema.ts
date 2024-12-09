import { z } from 'zod';
import { emailFormFieldSchema } from '@/auth/email-form-field-schema.ts';
import {
  passwordsEqualRefinement,
  passwordWithConfirmFormFieldSchema,
} from '@/auth/password-with-confirm-form-field-schema.ts';

export const signUpFormSchema = passwordsEqualRefinement(
  passwordWithConfirmFormFieldSchema.extend({
    email: emailFormFieldSchema,
  }),
);

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
