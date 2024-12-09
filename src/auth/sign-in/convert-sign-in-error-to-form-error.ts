import { SignInFormErrors } from '@/auth/sign-in/sign-in-form.tsx';
import { isAuthApiError } from '@supabase/supabase-js';
import { authErrorToFormFieldError } from '@/auth/auth-error-to-form-field-error.ts';

export function convertSignInErrorToFormError(
  error: unknown,
): SignInFormErrors {
  if (!isAuthApiError(error)) return;

  if (error.code === 'invalid_credentials') {
    const fieldError = authErrorToFormFieldError(error);

    return {
      password: fieldError,
      email: fieldError,
    };
  }
}
