import { SignUpFormErrors } from '@/sign-up/sign-up-form.tsx';
import { isAuthError } from '@supabase/supabase-js';

export function convertSignUpErrorToFormError(
  apiError: unknown,
): SignUpFormErrors | undefined {
  if (!apiError || !isAuthError(apiError)) return;

  if (apiError.code === 'user_already_exists')
    return {
      email: {
        type: 'server',
        message: 'Użytkownik z podanym adresem email już istnieje',
      },
    };
}
