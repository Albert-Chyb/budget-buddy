import { SignUpFormErrors } from '@/auth/sign-up/sign-up-form.tsx';
import { isAuthApiError } from '@supabase/supabase-js';
import { authErrorToFormFieldError } from '@/auth/auth-error-to-form-field-error.ts';

export function convertSignUpErrorToFormError(
  error: unknown,
): SignUpFormErrors | undefined {
  if (!isAuthApiError(error)) return;

  if (error.code === 'user_already_exists')
    return {
      email: authErrorToFormFieldError(error),
    };
}
