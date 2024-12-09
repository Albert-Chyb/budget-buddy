import { isAuthApiError } from '@supabase/supabase-js';
import { authErrorToFormFieldError } from '@/auth/auth-error-to-form-field-error.ts';
import { ChangePasswordFormErrors } from '@/auth/change-password/change-password-form.tsx';

export function convertChangePasswordErrorToFormError(
  error: unknown,
): ChangePasswordFormErrors | undefined {
  if (!isAuthApiError(error)) return;

  if (error.code === 'same_password')
    return {
      password: authErrorToFormFieldError(error),
    };
}
