import { SignInFormErrors } from '@/auth/sign-in/sign-in-form.tsx';
import { isAuthError } from '@supabase/supabase-js';
import { FieldError } from 'react-hook-form';

export function convertSignInErrorToFormError(
  error: unknown,
): SignInFormErrors {
  if (isAuthError(error) && error.code === 'invalid_credentials') {
    const error: FieldError = {
      type: 'server',
      message: 'Hasło lub email jest niepoprawne',
    };

    return {
      password: error,
      email: error,
    };
  }
}
