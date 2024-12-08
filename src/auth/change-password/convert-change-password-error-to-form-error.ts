import { isAuthError } from '@supabase/supabase-js';
import { FieldErrors } from 'react-hook-form';
import { ChangePasswordFormValue } from '@/auth/change-password/change-password-form-schema.ts';

export function convertChangePasswordErrorToFormError(
  error: unknown,
): FieldErrors<ChangePasswordFormValue> | undefined {
  if (isAuthError(error) && error.code === 'same_password')
    return {
      password: {
        type: `server_${error.code}`,
        message: 'Nowe hasło musi różnić się od dotychczasowego',
      },
    };
}
