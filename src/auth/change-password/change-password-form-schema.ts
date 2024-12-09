import { z } from 'zod';
import {
  passwordsEqualRefinement,
  passwordWithConfirmFormFieldSchema,
} from '@/auth/password-with-confirm-form-field-schema.ts';

export const changePasswordFormSchema = passwordsEqualRefinement(
  passwordWithConfirmFormFieldSchema,
);

export type ChangePasswordFormValue = z.infer<typeof changePasswordFormSchema>;
